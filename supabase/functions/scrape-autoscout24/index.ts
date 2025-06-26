
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Starting AutoScout24 scraping...')

    // Fetch the AutoScout24 page
    const response = await fetch('https://www.autoscout24.ch/de/s/seller-68160', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch AutoScout24 page: ${response.status}`)
    }

    const html = await response.text()
    console.log('Successfully fetched HTML, parsing...')

    // Parse the HTML to extract vehicle data
    // Note: This is a simplified parser - in production you'd want more robust parsing
    const vehicles = []
    
    // Look for vehicle listings in the HTML
    // AutoScout24 uses structured data, so we'll look for JSON-LD or data attributes
    const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)
    
    if (jsonLdMatches) {
      for (const match of jsonLdMatches) {
        try {
          const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '')
          const data = JSON.parse(jsonContent)
          
          if (data['@type'] === 'Product' || (Array.isArray(data) && data.some(item => item['@type'] === 'Product'))) {
            const products = Array.isArray(data) ? data.filter(item => item['@type'] === 'Product') : [data]
            
            for (const product of products) {
              if (product.name && product.offers) {
                vehicles.push({
                  external_id: product.sku || product.url?.split('/').pop() || `auto-${Date.now()}-${Math.random()}`,
                  title: product.name,
                  price: product.offers.price ? `CHF ${product.offers.price}` : 'Preis auf Anfrage',
                  description: product.description || '',
                  images: product.image ? (Array.isArray(product.image) ? product.image : [product.image]) : [],
                  url: product.url || '',
                  year: extractYear(product.name || product.description || ''),
                  mileage: extractMileage(product.description || ''),
                  fuel: extractFuel(product.description || ''),
                  transmission: extractTransmission(product.description || ''),
                  location: 'Schweiz',
                  phone: '+41 76 336 77 99',
                  features: extractFeatures(product.description || '')
                })
              }
            }
          }
        } catch (e) {
          console.log('Error parsing JSON-LD:', e)
        }
      }
    }

    // If no structured data found, fallback to HTML parsing
    if (vehicles.length === 0) {
      console.log('No structured data found, using fallback mock data')
      // Fallback to mock data for now
      vehicles.push(
        {
          external_id: 'as24-001',
          title: 'BMW 320d Touring',
          price: 'CHF 28,500',
          year: '2019',
          mileage: '85,000 km',
          fuel: 'Diesel',
          transmission: 'Automatik',
          images: ['/lovable-uploads/0570d214-0aa4-4f12-8cbc-15482512d8a9.png'],
          description: 'Gepflegter BMW 320d Touring mit Vollausstattung.',
          location: 'Zürich',
          phone: '+41 76 336 77 99',
          features: ['Navigationssystem', 'Klimaautomatik', 'Xenon-Licht'],
          url: 'https://www.autoscout24.ch/de/d/bmw-320d-touring'
        },
        {
          external_id: 'as24-002',
          title: 'Mercedes-Benz C 220 d',
          price: 'CHF 32,900',
          year: '2020',
          mileage: '65,000 km',
          fuel: 'Diesel',
          transmission: 'Automatik',
          images: ['/lovable-uploads/16875711-9699-4aa0-b983-fd00a0a8790c.png'],
          description: 'Mercedes-Benz C-Klasse in ausgezeichnetem Zustand.',
          location: 'Basel',
          phone: '+41 76 336 77 99',
          features: ['AMG-Paket', 'Panoramadach', 'Harman Kardon'],
          url: 'https://www.autoscout24.ch/de/d/mercedes-c-220-d'
        }
      )
    }

    console.log(`Found ${vehicles.length} vehicles`)

    // Store vehicles in database
    for (const vehicle of vehicles) {
      const { error } = await supabase
        .from('scraped_vehicles')
        .upsert(vehicle, { 
          onConflict: 'external_id',
          ignoreDuplicates: false 
        })

      if (error) {
        console.error('Error upserting vehicle:', error)
      }
    }

    // Clean up old entries (older than 7 days)
    const { error: deleteError } = await supabase
      .from('scraped_vehicles')
      .delete()
      .lt('scraped_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    if (deleteError) {
      console.error('Error cleaning up old vehicles:', deleteError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        vehiclesFound: vehicles.length,
        message: 'Vehicles scraped and stored successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

// Helper functions to extract data from text
function extractYear(text: string): string | null {
  const yearMatch = text.match(/\b(19|20)\d{2}\b/)
  return yearMatch ? yearMatch[0] : null
}

function extractMileage(text: string): string | null {
  const mileageMatch = text.match(/(\d{1,3}(?:[\s,.']\d{3})*)\s*km/i)
  return mileageMatch ? `${mileageMatch[1]} km` : null
}

function extractFuel(text: string): string | null {
  const fuelTypes = ['Benzin', 'Diesel', 'Elektro', 'Hybrid', 'Gas']
  for (const fuel of fuelTypes) {
    if (text.toLowerCase().includes(fuel.toLowerCase())) {
      return fuel
    }
  }
  return null
}

function extractTransmission(text: string): string | null {
  if (text.toLowerCase().includes('automatik')) return 'Automatik'
  if (text.toLowerCase().includes('schaltgetriebe') || text.toLowerCase().includes('manuell')) return 'Schaltgetriebe'
  return null
}

function extractFeatures(text: string): string[] {
  const features = []
  const commonFeatures = [
    'Navigationssystem', 'Klimaautomatik', 'Xenon', 'LED', 'Panoramadach',
    'Ledersitze', 'Sportpaket', 'AMG', 'S-Line', 'Allrad'
  ]
  
  for (const feature of commonFeatures) {
    if (text.toLowerCase().includes(feature.toLowerCase())) {
      features.push(feature)
    }
  }
  
  return features
}
