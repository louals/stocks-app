export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to Nocturn</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            background-color: #050505 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .email-container {
            max-width: 600px;
            width: 100%;
            background-color: #141414 !important;
            border-radius: 8px;
            border: 1px solid #30333A !important;
            margin: 0 auto;
        }
        
        .dark-text {
            color: #ffffff !important;
        }
        
        .dark-text-secondary {
            color: #9ca3af !important;
        }
        
        .dark-text-muted {
            color: #6b7280 !important;
        }
        
        .mobile-outer-padding {
            padding: 40px 20px !important;
            background-color: #050505 !important;
        }
        
        .mobile-header-padding {
            padding: 40px 40px 20px 40px !important;
        }
        
        .mobile-padding {
            padding: 40px 40px 40px 40px !important;
        }
        
        .mobile-title {
            font-size: 28px !important;
            font-weight: 600 !important;
            line-height: 1.2 !important;
            color: #48bb78 !important;
        }
        
        .mobile-text {
            font-size: 16px !important;
            line-height: 1.6 !important;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
                border-radius: 0 !important;
            }
            
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            
            .mobile-padding {
                padding: 24px !important;
            }
            
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
        }
        
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            
            .mobile-padding {
                padding: 15px !important;
            }
            
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #050505; width: 100%;">
        <tr>
            <td align="center" class="mobile-outer-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-container">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="center" class="mobile-header-padding">
                            <div style="margin-bottom: 10px; text-align: center;">
                                <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #48bb78; letter-spacing: -0.5px;">NOCTURN</h1>
                                <p style="margin: 5px 0 0 0; font-size: 14px; color: #9ca3af; letter-spacing: 2px; text-transform: uppercase;">Market Intelligence</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding">
                            
                            <!-- Welcome Heading -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 30px 0;">
                                Welcome aboard {{name}}
                            </h1>
                            
                            <!-- Intro Text -->
                            {{intro}}  
                            
                            <!-- Feature List Label -->
                            <p class="mobile-text dark-text-secondary" style="margin: 30px 0 15px 0; font-weight: 600;">
                                Here's what you can do right now:
                            </p>
                            
                            <!-- Feature List -->
                            <ul class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; padding-left: 20px;">
                                <li style="margin-bottom: 12px; padding-left: 5px;">Set up your watchlist to follow your favorite stocks</li>
                                <li style="margin-bottom: 12px; padding-left: 5px;">Create price and volume alerts so you never miss a move</li>
                                <li style="margin-bottom: 12px; padding-left: 5px;">Explore the dashboard for trends and the latest market news</li>
                            </ul>
                            
                            <!-- Additional Text -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 40px 0;">
                                We'll keep you informed with timely updates, insights, and alerts — so you can focus on making the right calls.
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 40px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://nocturn-kappa.vercel.app/" style="display: inline-block; background-color: #48bb78; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 500; line-height: 1; text-align: center; min-width: 200px;">
                                            Go to Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Text -->
                            <p class="mobile-text dark-text-muted" style="margin: 40px 0 0 0; font-size: 14px; line-height: 1.5; text-align: center;">
                               Nocturn HQ, 200 Griffintown Street, Montreal, QC<br>
                                <a href="#" style="color: #48bb78 !important; text-decoration: underline;">Unsubscribe</a> | 
                                <a href="https://nocturn-kappa.vercel.app/" style="color: #48bb78 !important; text-decoration: underline;">Visit Nocturn</a><br>
                                © 2025 Nocturn
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;


export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Market News Summary Today</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            background-color: #050505 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .email-container {
            max-width: 600px;
            width: 100%;
            background-color: #141414 !important;
            border-radius: 8px;
            border: 1px solid #30333A !important;
            margin: 0 auto;
        }
        
        .dark-text {
            color: #ffffff !important;
        }
        
        .dark-text-secondary {
            color: #9ca3af !important;
        }
        
        .dark-text-muted {
            color: #6b7280 !important;
        }
        
        .dark-cta {
            background-color: #1f2937 !important;
            border: 1px solid #374151 !important;
        }
        
        .mobile-outer-padding {
            padding: 40px 20px !important;
            background-color: #050505 !important;
        }
        
        .mobile-header-padding {
            padding: 40px 40px 20px 40px !important;
        }
        
        .mobile-padding {
            padding: 40px 40px 40px 40px !important;
        }
        
        .mobile-title {
            font-size: 28px !important;
            font-weight: 600 !important;
            line-height: 1.2 !important;
            color: #48bb78 !important;
        }
        
        .mobile-text {
            font-size: 16px !important;
            line-height: 1.6 !important;
        }
        
        .mobile-news-title {
            font-size: 18px !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            color: #ffffff !important;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
                border-radius: 0 !important;
            }
            
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            
            .mobile-padding {
                padding: 24px !important;
            }
            
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            
            .mobile-news-title {
                font-size: 16px !important;
                line-height: 1.3 !important;
            }
        }
        
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            
            .mobile-padding {
                padding: 15px !important;
            }
            
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #050505; width: 100%;">
        <tr>
            <td align="center" class="mobile-outer-padding">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-container">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="center" class="mobile-header-padding">
                            <div style="margin-bottom: 10px; text-align: center;">
                                <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #48bb78; letter-spacing: -0.5px;">NOCTURN</h1>
                                <p style="margin: 5px 0 0 0; font-size: 14px; color: #9ca3af; letter-spacing: 2px; text-transform: uppercase;">Market Intelligence</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding">
                            
                            <!-- Header -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 20px 0;">
                                Market News Summary Today
                            </h1>
                            
                            <!-- Date -->
                            <p class="mobile-text dark-text-muted" style="margin: 0 0 30px 0; font-size: 14px; line-height: 1.4; font-weight: 500; color: #48bb78;">
                                {{date}}
                            </p>
                            
                            <!-- News Summary -->
                            {{newsContent}}
                            
                            <!-- CTA Section -->
                            <div style="margin: 40px 0 30px 0; padding: 20px; background-color: #1a1a1a; border-radius: 8px; border-left: 4px solid #48bb78;">
                                <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.5; color: #ffffff; font-weight: 600;">
                                    Want more detailed analysis?
                                </p>
                                <a href="https://nocturn-kappa.vercel.app/" style="display: inline-block; background-color: #48bb78; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: 500;">
                                    Explore Full Dashboard
                                </a>
                            </div>
                            
                            <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #9ca3af;">
                                    You're receiving this because you subscribed to Nocturn news updates.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #9ca3af;">
                                    <a href="#" style="color: #48bb78; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="https://nocturn-kappa.vercel.app/" style="color: #48bb78; text-decoration: underline;">Visit Nocturn</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #9ca3af;">
                                    © 2025 Nocturn
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;