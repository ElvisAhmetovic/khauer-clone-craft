
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
    console.log('Fetching AutoScout24 content via enhanced proxy...')
    
    // Try multiple strategies to bypass detection
    const strategies = [
      // Strategy 1: Mobile user agent with Swiss IP simulation
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Cache-Control': 'max-age=0',
          'DNT': '1',
        }
      },
      // Strategy 2: Standard browser with referrer
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Referer': 'https://www.google.ch/',
          'Upgrade-Insecure-Requests': '1',
        }
      },
      // Strategy 3: Simple request
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      }
    ]

    let response = null
    let lastError = null
    
    for (let i = 0; i < strategies.length; i++) {
      const strategy = strategies[i]
      console.log(`Trying strategy ${i + 1}...`)
      
      try {
        // Add random delay to avoid rate limiting
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))
        }
        
        response = await fetch('https://www.autoscout24.ch/de/s/seller-68160', {
          headers: strategy.headers,
          redirect: 'follow'
        })

        console.log(`Strategy ${i + 1} response status:`, response.status)
        
        if (response.ok) {
          console.log(`Strategy ${i + 1} successful!`)
          break
        } else {
          console.log(`Strategy ${i + 1} failed with status:`, response.status)
          lastError = `HTTP ${response.status}`
        }
      } catch (error) {
        console.log(`Strategy ${i + 1} error:`, error.message)
        lastError = error.message
        continue
      }
    }

    if (!response || !response.ok) {
      console.log('All strategies failed, creating enhanced fallback...')
      
      // Enhanced fallback with more information and better styling
      const fallbackHtml = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AutoScout24 - Fahrzeuge ansehen</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .container { 
              background: white;
              border-radius: 16px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              padding: 40px;
              text-align: center;
              max-width: 600px;
              width: 100%;
            }
            .logo {
              width: 80px;
              height: 80px;
              background: #84cc16;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              font-size: 32px;
              color: white;
            }
            h1 { 
              color: #1f2937; 
              font-size: 32px; 
              font-weight: 700; 
              margin-bottom: 16px; 
            }
            .subtitle {
              color: #6b7280;
              font-size: 18px;
              margin-bottom: 32px;
              line-height: 1.5;
            }
            .info-box {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 24px;
              margin: 24px 0;
              text-align: left;
            }
            .info-title {
              font-weight: 600;
              color: #374151;
              font-size: 16px;
              margin-bottom: 12px;
            }
            .info-list {
              list-style: none;
              color: #6b7280;
              font-size: 14px;
              line-height: 1.6;
            }
            .info-list li {
              margin-bottom: 8px;
              padding-left: 20px;
              position: relative;
            }
            .info-list li:before {
              content: "•";
              color: #84cc16;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            .button { 
              background: linear-gradient(45deg, #84cc16, #a3d143);
              color: white; 
              padding: 16px 32px; 
              text-decoration: none; 
              border-radius: 12px; 
              display: inline-flex; 
              align-items: center; 
              gap: 8px;
              font-weight: 600;
              font-size: 16px;
              transition: all 0.3s ease;
              box-shadow: 0 4px 12px rgba(132, 204, 22, 0.3);
            }
            .button:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 20px rgba(132, 204, 22, 0.4);
            }
            .contact-info {
              margin-top: 32px;
              padding-top: 32px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .contact-info strong {
              color: #374151;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">🚗</div>
            <h1>Unsere AutoScout24 Fahrzeuge</h1>
            <p class="subtitle">
              Aufgrund von Sicherheitsrichtlinien kann die AutoScout24-Seite nicht direkt eingebettet werden.
              Besuchen Sie unseren offiziellen AutoScout24-Händlerbereich für alle verfügbaren Fahrzeuge.
            </p>
            
            <div class="info-box">
              <div class="info-title">Was Sie auf unserer AutoScout24-Seite finden:</div>
              <ul class="info-list">
                <li>Alle aktuell verfügbaren Fahrzeuge</li>
                <li>Detaillierte Fahrzeugbeschreibungen und Bilder</li>
                <li>Preise und Finanzierungsoptionen</li>
                <li>Direkter Kontakt für Besichtigungen</li>
                <li>Fahrzeughistorie und Ausstattungsdetails</li>
              </ul>
            </div>
            
            <a href="https://www.autoscout24.ch/de/s/seller-68160" target="_blank" class="button">
              <span>🔗</span>
              Jetzt zu AutoScout24
            </a>
            
            <div class="contact-info">
              <strong>Haben Sie Fragen?</strong><br>
              Rufen Sie uns an: <strong>+41 76 336 77 99</strong><br>
              oder schreiben Sie uns: <strong>kurdocar@bluewin.ch</strong>
            </div>
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

    let html = await response.text()
    console.log('Fetched HTML length:', html.length)
    
    // Enhanced HTML modification to bypass frame restrictions
    html = html.replace(/X-Frame-Options/gi, 'X-Frame-Options-Disabled')
    html = html.replace(/frame-ancestors[^;]*;?/gi, '')
    html = html.replace(/SAMEORIGIN/gi, '*')
    html = html.replace(/DENY/gi, '*')
    
    // Remove any script tags that might interfere
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    
    // Add base tag and meta tags for better compatibility
    html = html.replace('<head>', `<head>
      <base href="https://www.autoscout24.ch/">
      <meta http-equiv="X-Frame-Options" content="ALLOWALL">
      <meta http-equiv="Content-Security-Policy" content="frame-ancestors *;">`)
    
    // Fix relative URLs
    html = html.replace(/href="\//g, 'href="https://www.autoscout24.ch/')
    html = html.replace(/src="\//g, 'src="https://www.autoscout24.ch/')
    html = html.replace(/url\(\//g, 'url(https://www.autoscout24.ch/')
    
    console.log('Successfully processed and modified HTML')
    
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': 'frame-ancestors *;'
      }
    })

  } catch (error) {
    console.error('Proxy error:', error)
    
    // Enhanced error fallback
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AutoScout24 - Fahrzeuge</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: #f8fafc;
            padding: 40px 20px; 
            text-align: center;
            color: #374151;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          }
          .error-icon {
            font-size: 48px;
            margin-bottom: 20px;
          }
          h2 { 
            color: #1f2937;
            margin-bottom: 16px;
            font-size: 24px;
          }
          p {
            margin-bottom: 24px;
            line-height: 1.6;
            color: #6b7280;
          }
          .button { 
            background: linear-gradient(45deg, #84cc16, #a3d143);
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: translateY(-2px);
          }
          .error-details {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            font-size: 14px;
            color: #991b1b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">⚠️</div>
          <h2>Verbindung nicht möglich</h2>
          <p>AutoScout24 blockiert derzeit externe Zugriffe. Dies ist eine Sicherheitsmaßnahme der Plattform.</p>
          
          <div class="error-details">
            <strong>Technische Details:</strong><br>
            ${error.message || 'Verbindung wurde verweigert'}
          </div>
          
          <p>Besuchen Sie bitte direkt unsere AutoScout24-Seite für alle verfügbaren Fahrzeuge:</p>
          
          <a href="https://www.autoscout24.ch/de/s/seller-68160" target="_blank" class="button">
            <span>🔗</span>
            Direkt zu AutoScout24
          </a>
        </div>
      </body>
      </html>
    `
    
    return new Response(errorHtml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
      }
    })
  }
})
