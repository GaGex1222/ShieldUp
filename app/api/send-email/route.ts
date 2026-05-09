import { NextResponse } from 'next/server'
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { fullName, email, phone } = data

    // Basic validation
    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'ShieldUp Pro <galdadon@galdadon.com>',
      to: ['gald12123434@gmail.com', 'Avraon200@gmail.com'],
      subject: `מבצעי: ליד חדש מ-${fullName}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8">
          <style>
            body { background-color: #010103; color: #ffffff; font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #0a0a0c; border: 1px solid #1f1f23; border-radius: 16px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%); padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 900; color: #ffffff; text-transform: uppercase; letter-spacing: 2px; }
            .content { padding: 40px 30px; }
            .badge { display: inline-block; background-color: rgba(124, 58, 237, 0.1); color: #a78bfa; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: bold; margin-bottom: 10px; border: 1px solid rgba(124, 58, 237, 0.2); }
            .title { color: #7c3aed; font-size: 20px; margin-bottom: 20px; border-bottom: 1px solid #1f1f23; padding-bottom: 10px; font-weight: bold; }
            .data-row { margin-bottom: 25px; }
            .label { display: block; font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: bold; margin-bottom: 4px; letter-spacing: 1px; }
            .value { font-size: 18px; color: #e5e7eb; }
            .footer { padding: 20px; text-align: center; background-color: #050507; color: #374151; font-size: 11px; border-top: 1px solid #1f1f23; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>SHIELDUP PRO</h1>
            </div>
            <div class="content">
              <div class="badge">חדירה לשוק: ליד חדש</div>
              <div class="title">פרטי התקשרות מבצעיים</div>
              
              <div class="data-row">
                <span class="label">שם מלא / חברה</span>
                <div class="value">${fullName}</div>
              </div>
              
              <div class="data-row">
                <span class="label">מספר טלפון ישיר</span>
                <div class="value" dir="ltr" style="text-align: right;">${phone}</div>
              </div>
              
              <div class="data-row">
                <span class="label">כתובת אימייל</span>
                <div class="value" dir="ltr" style="text-align: right;">${email}</div>
              </div>
            </div>
            <div class="footer">
              © 2026 ShieldUp Pro | Intelligence-Driven Marketing | Swiper Engine
            </div>
          </div>
        </body>
        </html>
      `
    });

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("Error occurred when tried sending email: ", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}