import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  board: string;
  stream: string;
  expectedYear: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured, skipping email");
      return new Response(
        JSON.stringify({ success: true, message: "Email not configured" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { fullName, email, phone, school, board, stream, expectedYear }: RegistrationEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: true, message: "No email provided" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending registration confirmation to:", email);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "VAZHIKATTI - JKKN <onboarding@resend.dev>",
        to: [email],
        subject: `🎓 Welcome to VAZHIKATTI, ${fullName}! Registration Successful`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f0fdf4; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #166534 0%, #15803d 50%, #ca8a04 100%); color: white; padding: 35px 30px; border-radius: 16px 16px 0 0; text-align: center; }
              .header h1 { margin: 0; font-size: 26px; font-weight: 700; }
              .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
              .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 1px; margin-bottom: 15px; }
              .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
              .success-icon { font-size: 48px; margin-bottom: 10px; }
              .details-card { background: linear-gradient(135deg, #f0fdf4, #fefce8); padding: 20px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 20px 0; }
              .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #d1fae5; }
              .detail-row:last-child { border-bottom: none; }
              .detail-label { font-weight: 600; color: #166534; width: 140px; font-size: 13px; }
              .detail-value { color: #333; font-size: 13px; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #166534, #15803d); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; margin: 20px 0; }
              .features { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
              .feature { background: #f9fafb; padding: 12px; border-radius: 8px; font-size: 13px; text-align: center; }
              .footer { background: #1f2937; color: #9ca3af; padding: 25px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px; }
              .footer a { color: #fbbf24; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="badge">JKKN INSTITUTIONS</div>
                <h1>✅ Registration Successful!</h1>
                <p>Welcome to VAZHIKATTI — Your AI Career Guide</p>
              </div>
              <div class="content">
                <div style="text-align: center;">
                  <div class="success-icon">🎉</div>
                  <h2 style="color: #166534; margin: 0;">Congratulations, ${fullName}!</h2>
                  <p style="color: #6b7280; font-size: 14px;">You have successfully registered on VAZHIKATTI. Your career journey begins now!</p>
                </div>
                
                <div class="details-card">
                  <h3 style="margin: 0 0 12px 0; color: #166534; font-size: 15px;">📋 Your Registration Details</h3>
                  <div class="detail-row">
                    <span class="detail-label">👤 Name</span>
                    <span class="detail-value">${fullName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">📞 Phone</span>
                    <span class="detail-value">${phone}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">✉️ Email</span>
                    <span class="detail-value">${email}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">🏫 School</span>
                    <span class="detail-value">${school}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">📚 Board</span>
                    <span class="detail-value">${board.toUpperCase()}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">🎯 Stream</span>
                    <span class="detail-value">${stream.charAt(0).toUpperCase() + stream.slice(1)}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">📅 Passing Year</span>
                    <span class="detail-value">${expectedYear}</span>
                  </div>
                </div>

                <div style="text-align: center;">
                  <a href="https://horizons-ai-guide-app.vercel.app" class="cta-button">🚀 Open VAZHIKATTI App</a>
                </div>

                <div class="features">
                  <div class="feature">🤖 AI Career Guidance</div>
                  <div class="feature">📊 Career Assessment</div>
                  <div class="feature">🏛 Govt Exam Prep</div>
                  <div class="feature">💼 Job Portal</div>
                </div>

                <p style="color: #6b7280; font-size: 13px; text-align: center; margin-top: 20px;">
                  If you have any questions, reach out to us at <a href="mailto:info@jkkn.ac.in" style="color: #166534;">info@jkkn.ac.in</a>
                </p>
              </div>
              <div class="footer">
                <p style="margin: 0 0 8px 0;"><strong>VAZHIKATTI</strong> — AI Career Guide by JKKN Institutions</p>
                <p style="margin: 0;"><a href="https://horizons-ai-guide-app.vercel.app">horizons-ai-guide-app.vercel.app</a></p>
                <p style="margin: 8px 0 0 0; font-size: 11px;">© 2025 JKKN Institutions. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Registration email sent:", emailData);

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending registration email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
