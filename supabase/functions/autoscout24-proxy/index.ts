
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Fetching AutoScout24 content via proxy...')
    
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]

    let response = null
    
    for (const userAgent of userAgents) {
      try {
        response = await fetch('https://www.autoscout24.ch/de/s/seller-68160', {
          headers: {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
          }
        })

        if (response.ok) {
          console.log('Successfully fetched AutoScout24 page')
          break
        }
      } catch (error) {
        console.log(`Fetch attempt failed:`, error.message)
        continue
      }
    }

    if (!response || !response.ok) {
      throw new Error('Failed to fetch AutoScout24 content')
    }

    let html = await response.text()
    
    // Modify the HTML to work in our context
    html = html.replace(/https:\/\/www\.autoscout24\.ch/g, 'https://www.autoscout24.ch')
    html = html.replace(/http:\/\/www\.autoscout24\.ch/g, 'https://www.autoscout24.ch')
    
    // Add base tag to handle relative URLs
    html = html.replace('<head>', '<head><base href="https://www.autoscout24.ch/">')
    
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
      }
    })

  } catch (error) {
    console.error('Proxy error:', error)
    
    // Return fallback HTML content
    const fallbackHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AutoScout24 - Fahrzeuge nicht verfügbar</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
          .container { max-width: 600px; margin: 0 auto; }
          .button { background: #84cc16; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>AutoScout24 Fahrzeuge</h2>
          <p>Die Fahrzeuge können momentan nicht direkt eingebettet werden.</p>
          <a href="https://www.autoscout24.ch/de/s/seller-68160" target="_blank" class="button">
            Direkt zu AutoScout24
          </a>
        </div>
      </body>
      </html>
    `
    
    return new Response(fallbackHtml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
      }
    })
  }
})
