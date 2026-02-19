export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured');
      return res.status(200).json({ success: true, message: 'Email not configured' });
    }

    const { fullName, email, phone, school, board, stream, expectedYear } = req.body;

    if (!email) {
      return res.status(200).json({ success: true, message: 'No email provided' });
    }

    console.log('Sending registration confirmation to:', email);

    const boardDisplay = (board || '').toUpperCase();
    const streamDisplay = stream ? stream.charAt(0).toUpperCase() + stream.slice(1) : '';

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'VAZHIKATTI - JKKN <onboarding@resend.dev>',
        to: [email],
        subject: `🎓 Welcome to VAZHIKATTI, ${fullName}! Registration Successful`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f0fdf4;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #166534 0%, #15803d 50%, #ca8a04 100%); color: white; padding: 35px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 1px; margin-bottom: 15px;">JKKN INSTITUTIONS</div>
                <h1 style="margin: 0; font-size: 26px; font-weight: 700;">✅ Registration Successful!</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Welcome to VAZHIKATTI — Your AI Career Guide</p>
              </div>
              
              <!-- Content -->
              <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
                <div style="text-align: center;">
                  <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
                  <h2 style="color: #166534; margin: 0;">Congratulations, ${fullName}!</h2>
                  <p style="color: #6b7280; font-size: 14px;">You have successfully registered on VAZHIKATTI. Your career journey begins now!</p>
                </div>
                
                <!-- Details Card -->
                <div style="background: linear-gradient(135deg, #f0fdf4, #fefce8); padding: 20px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 20px 0;">
                  <h3 style="margin: 0 0 12px 0; color: #166534; font-size: 15px;">📋 Your Registration Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #d1fae5;">
                      <td style="padding: 8px 0; font-weight: 600; color: #166534; width: 140px; font-size: 13px;">👤 Name</td>
                      <td style="padding: 8px 0; font-size: 13px;">${fullName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #d1fae5;">
                      <td style="padding: 8px 0; font-weight: 600; color: #166534; font-size: 13px;">📞 Phone</td>
                      <td style="padding: 8px 0; font-size: 13px;">${phone}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #d1fae5;">
                      <td style="padding: 8px 0; font-weight: 600; color: #166534; font-size: 13px;">✉️ Email</td>
                      <td style="padding: 8px 0; font-size: 13px;">${email}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #d1fae5;">
                      <td style="padding: 8px 0; font-weight: 600; color: #166534; font-size: 13px;">🏫 School</td>
                      <td style="padding: 8px 0; font-size: 13px;">${school}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #d1fae5;">
                      <td style="padding: 8px 0; font-weight: 600; color: #166534; font-size: 13px;">📚 Board</td>
                      <td style="padding: 8px 0; font-size: 13px;">${boardDisplay}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #d1fae5;">
                      <td style="padding: 8px 0; font-weight: 600; color: #166534; font-size: 13px;">🎯 Stream</td>
                      <td style="padding: 8px 0; font-size: 13px;">${streamDisplay}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #166534; font-size: 13px;">📅 Passing Year</td>
                      <td style="padding: 8px 0; font-size: 13px;">${expectedYear}</td>
                    </tr>
                  </table>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center;">
                  <a href="https://horizons-ai-guide-app.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #166534, #15803d); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; margin: 20px 0;">🚀 Open VAZHIKATTI App</a>
                </div>

                <!-- Features Grid -->
                <table style="width: 100%; margin: 20px 0;">
                  <tr>
                    <td style="background: #f9fafb; padding: 12px; border-radius: 8px; font-size: 13px; text-align: center; width: 50%;">🤖 AI Career Guidance</td>
                    <td style="width: 12px;"></td>
                    <td style="background: #f9fafb; padding: 12px; border-radius: 8px; font-size: 13px; text-align: center; width: 50%;">📊 Career Assessment</td>
                  </tr>
                  <tr><td colspan="3" style="height: 12px;"></td></tr>
                  <tr>
                    <td style="background: #f9fafb; padding: 12px; border-radius: 8px; font-size: 13px; text-align: center;">🏛 Govt Exam Prep</td>
                    <td style="width: 12px;"></td>
                    <td style="background: #f9fafb; padding: 12px; border-radius: 8px; font-size: 13px; text-align: center;">💼 Job Portal</td>
                  </tr>
                </table>

                <p style="color: #6b7280; font-size: 13px; text-align: center; margin-top: 20px;">
                  If you have any questions, reach out to us at <a href="mailto:info@jkkn.ac.in" style="color: #166534;">info@jkkn.ac.in</a>
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background: #1f2937; color: #9ca3af; padding: 25px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
                <p style="margin: 0 0 8px 0;"><strong style="color: white;">VAZHIKATTI</strong> — AI Career Guide by JKKN Institutions</p>
                <p style="margin: 0;"><a href="https://horizons-ai-guide-app.vercel.app" style="color: #fbbf24; text-decoration: none;">horizons-ai-guide-app.vercel.app</a></p>
                <p style="margin: 8px 0 0 0; font-size: 11px;">© 2026 JKKN Institutions. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log('Registration email response:', emailData);

    if (!emailResponse.ok) {
      console.error('Resend error:', emailData);
      return res.status(500).json({ error: 'Failed to send email', details: emailData });
    }

    return res.status(200).json({ success: true, emailId: emailData.id });
  } catch (error) {
    console.error('Error sending registration email:', error);
    return res.status(500).json({ error: error.message });
  }
}
