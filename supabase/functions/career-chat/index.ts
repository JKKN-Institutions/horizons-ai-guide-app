import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, learnerProfile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context from learner profile if available
    let profileContext = "";
    if (learnerProfile) {
      profileContext = `
The learner's profile:
- Name: ${learnerProfile.name || "Not provided"}
- College: ${learnerProfile.college || "Not provided"}
- Branch: ${learnerProfile.branch || "Not provided"}
- Year of Study: ${learnerProfile.yearOfStudy || "Not provided"}
- Skills: ${learnerProfile.skills?.join(", ") || "Not provided"}
- Career Interest: ${learnerProfile.careerInterest || "Not provided"}

Use this information to provide personalized advice.`;
    }

    const systemPrompt = `You are "JKKN Career Advisor", a friendly and knowledgeable AI career counselor for JKKN college students in Tamil Nadu, India. Your role is to help students with:

1. **Interview Preparation**: Mock interview questions, tips for common questions, body language advice, and industry-specific preparation strategies.

2. **Resume Building**: Help craft compelling resumes, suggest improvements, format tips, and highlight relevant skills for specific roles.

3. **Career Guidance**: Suggest career paths based on skills and interests, industry trends, required certifications, and skill development roadmaps.

4. **Job Search Tips**: Where to find opportunities, networking strategies, how to approach companies, and application best practices.

5. **Skill Development**: Recommend courses, projects, and certifications to improve employability.

${profileContext}

Guidelines:
- Be encouraging and supportive, understanding that students may be nervous about their careers
- Provide specific, actionable advice rather than generic suggestions
- Use examples relevant to the Indian job market (TCS, Infosys, Wipro, startups, etc.)
- For technical roles, suggest relevant technologies and projects
- Keep responses concise but helpful (2-3 paragraphs max unless detailed explanation needed)
- Use emojis sparingly to keep the conversation friendly
- If asked about topics outside career advice, politely redirect to career-related topics`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Career chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});