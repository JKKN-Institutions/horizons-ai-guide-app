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
    const { topCareers, language } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const careerList = topCareers.map((c: { name: string; percentage: number }, i: number) => 
      `${i + 1}. ${c.name} (${c.percentage}% match)`
    ).join("\n");

    const systemPrompt = language === 'ta' 
      ? `நீங்கள் ஒரு தொழில் ஆலோசகர். மாணவர்களுக்கு அவர்களின் தொழில் மதிப்பீட்டு முடிவுகளின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட, செயல்படக்கூடிய தொழில் குறிப்புகளை வழங்குங்கள். தமிழில் பதிலளிக்கவும். JSON வடிவத்தில் மட்டும் பதிலளிக்கவும்.`
      : `You are a career counselor. Provide personalized, actionable career tips for students based on their career assessment results. Respond ONLY in valid JSON format.`;

    const userPrompt = language === 'ta'
      ? `மாணவரின் சிறந்த தொழில் பொருத்தங்கள்:\n${careerList}\n\nஇந்த முடிவுகளின் அடிப்படையில், 4 தனிப்பயனாக்கப்பட்ட தொழில் குறிப்புகளை வழங்கவும். ஒவ்வொரு குறிப்பிலும் ஒரு emoji, title, மற்றும் description இருக்க வேண்டும். JSON வடிவம்: {"tips": [{"emoji": "🎯", "title": "குறிப்பு", "description": "விளக்கம்"}]}`
      : `Student's top career matches:\n${careerList}\n\nBased on these results, provide 4 personalized career tips. Each tip should have an emoji, title, and description. JSON format: {"tips": [{"emoji": "🎯", "title": "Tip Title", "description": "Brief actionable description"}]}`;

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
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Extract JSON from the response
    let tips = [];
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        tips = parsed.tips || [];
      }
    } catch (parseError) {
      console.error("Failed to parse tips JSON:", parseError);
      // Provide fallback tips
      tips = language === 'ta' ? [
        { emoji: "📚", title: "தொடர்ந்து கற்றுக்கொள்ளுங்கள்", description: "உங்கள் துறையில் புதிய திறன்களை வளர்க்கவும்" },
        { emoji: "🤝", title: "நெட்வொர்க் செய்யுங்கள்", description: "தொழில் வல்லுநர்களுடன் தொடர்பில் இருங்கள்" },
        { emoji: "🎯", title: "இலக்குகளை அமைக்கவும்", description: "குறுகிய மற்றும் நீண்ட கால இலக்குகளை வரையறுக்கவும்" },
        { emoji: "💡", title: "பயிற்சி பெறுங்கள்", description: "இன்டர்ன்ஷிப் மற்றும் திட்டங்களில் பங்கேற்கவும்" }
      ] : [
        { emoji: "📚", title: "Keep Learning", description: "Develop new skills relevant to your field" },
        { emoji: "🤝", title: "Build Your Network", description: "Connect with professionals in your target industry" },
        { emoji: "🎯", title: "Set Clear Goals", description: "Define short and long-term career objectives" },
        { emoji: "💡", title: "Gain Experience", description: "Participate in internships and projects" }
      ];
    }

    return new Response(JSON.stringify({ tips }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Career tips error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
