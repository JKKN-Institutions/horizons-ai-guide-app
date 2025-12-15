import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are JKKN AI Assistant - a helpful, knowledgeable AI that can answer ANY question. 

PRIMARY FOCUS - Career Guidance & JKKN Information:
- Information about all 9 JKKN institutions (JKKN College of Engineering & Technology, JKKN College of Arts & Science, JKKN College of Pharmacy, JKKN Dental College, JKKN College of Allied Health Sciences, JKKN Nataraja Dental College, JKKN Group of Institutions, JKKNATC, JKKN Educational Trust)
- Career options after 10th and 12th standard
- Job search tips, resume writing, and interview preparation
- Skill development and professional growth
- Admission process, requirements, campus facilities, and placement statistics

SECONDARY - Education Support:
- Exam preparation tips and study techniques
- Scholarship information and college admission guidance
- Academic subject explanations

GENERAL KNOWLEDGE:
- Answer questions on Science, Technology, Health, Business, Arts, Current Affairs
- Help with calculations and explanations
- Translation and language assistance
- Creative writing and general information

BEHAVIOR GUIDELINES:
- Be friendly, respectful, and encouraging
- Respond in Tamil if the user asks in Tamil (தமிழில் பதில் அளிக்கவும்)
- Provide step-by-step explanations when needed
- If unsure about something, say so honestly
- Keep responses concise but informative
- Always aim to help students achieve their educational and career goals`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response from AI Gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
