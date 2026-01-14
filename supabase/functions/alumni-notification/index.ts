import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AlumniNotificationRequest {
  alumniId: string;
  senderName: string;
  senderEmail: string;
  messagePreview: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured, skipping email notification");
      return new Response(
        JSON.stringify({ success: true, message: "Email notifications not configured" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { alumniId, senderName, senderEmail, messagePreview }: AlumniNotificationRequest = await req.json();

    console.log("Processing notification for alumni:", alumniId);

    // Fetch alumni details
    const { data: alumni, error: alumniError } = await supabase
      .from("abroad_alumni")
      .select("name, email")
      .eq("id", alumniId)
      .single();

    if (alumniError || !alumni) {
      console.error("Alumni not found:", alumniError);
      return new Response(
        JSON.stringify({ error: "Alumni not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending notification to:", alumni.email);

    // Send email using Resend API directly via fetch
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Horizons AI Guide <onboarding@resend.dev>",
        to: [alumni.email],
        subject: `New message from ${senderName} - Study Abroad Query`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
              .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1; margin: 20px 0; }
              .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
              .sender-info { background: #eef2ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">🎓 New Study Abroad Query</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">A student is seeking your guidance</p>
              </div>
              <div class="content">
                <p>Hi ${alumni.name},</p>
                <p>You have received a new message from a student interested in studying abroad. They're looking for insights from someone with your experience!</p>
                
                <div class="sender-info">
                  <strong>From:</strong> ${senderName}<br>
                  <strong>Email:</strong> ${senderEmail}
                </div>
                
                <div class="message-box">
                  <strong>Message Preview:</strong>
                  <p style="margin: 10px 0 0 0;">${messagePreview.substring(0, 200)}${messagePreview.length > 200 ? '...' : ''}</p>
                </div>
                
                <p>Please log in to your Alumni Inbox to view the full message and respond.</p>
                
                <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
                  Your guidance can make a significant difference in their journey. Thank you for being a mentor! 🙏
                </p>
              </div>
              <div class="footer">
                <p>Horizons AI Guide - Empowering Career Decisions</p>
                <p>You're receiving this because you registered as a Study Abroad Alumni Mentor</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in alumni-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
