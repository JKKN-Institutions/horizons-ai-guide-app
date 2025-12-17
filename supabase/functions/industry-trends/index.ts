import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an expert job market analyst specializing in the Indian job market, particularly focused on Tamil Nadu. 
Generate accurate, realistic, and current job market data based on real trends as of 2025.

You must respond ONLY with a valid JSON object (no markdown, no explanation, no code blocks) with this exact structure:
{
  "lastUpdated": "ISO date string",
  "keyMetrics": {
    "totalJobOpenings": "string like 2.5M+",
    "jobOpeningsChange": "string like +12% YoY",
    "companiesHiring": "string like 45,000+",
    "companiesChange": "string like +8% QoQ",
    "avgFresherSalary": "string like ₹6.2 LPA",
    "salaryChange": "string like +15% YoY",
    "placementRate": "string like 94%"
  },
  "trendingIndustries": [
    {
      "name": "Industry Name",
      "growth": number (percentage),
      "salaryRange": "string like ₹8-35 LPA",
      "openings": "string like 125,000+",
      "demand": "Very High" | "High" | "Medium",
      "topSkills": ["skill1", "skill2", "skill3", "skill4"],
      "topRecruiters": ["company1", "company2", "company3", "company4", "company5"]
    }
  ],
  "topJobs": [
    {
      "rank": number,
      "role": "string",
      "salaryRange": "string like ₹8-35 LPA",
      "openings": "string like 45,000+",
      "demand": "Very High" | "High" | "Medium"
    }
  ],
  "technicalSkills": [
    { "name": "skill name", "status": "Hot" | "Rising" | "Stable" }
  ],
  "futurePredictions": {
    "rising": [{ "career": "string", "growth": "string like 50%+" }],
    "stable": [{ "career": "string", "note": "string" }],
    "declining": [{ "career": "string", "risk": "string" }]
  },
  "tamilNaduData": {
    "cities": [{ "name": "city name", "openings": "string like 150,000+" }],
    "industries": [{ "name": "industry name", "percentage": number }]
  }
}

Include at least:
- 7 trending industries (AI/ML, Cloud, Healthcare, Cybersecurity, Data Science, FinTech, Renewable Energy, etc.)
- 10 top jobs
- 10 technical skills
- 5 rising careers, 4 stable careers, 3 declining careers
- 5 Tamil Nadu cities
- 5 industry percentages for TN

Base your data on current 2025 job market trends in India. Make numbers realistic and consistent with actual market conditions.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Fetching industry trends data...");

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
          { 
            role: "user", 
            content: "Generate the latest Indian job market data for 2025 with focus on Tamil Nadu. Include current trends, salary data, and job openings. Return ONLY the JSON object, no other text." 
          },
        ],
        temperature: 0.3,
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
      
      return new Response(
        JSON.stringify({ error: "Failed to fetch job market data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("Raw AI response received, parsing...");
    
    // Clean the response - remove any markdown code blocks if present
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith("```json")) {
      cleanedContent = cleanedContent.slice(7);
    } else if (cleanedContent.startsWith("```")) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith("```")) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();
    
    // Parse the JSON
    let marketData;
    try {
      marketData = JSON.parse(cleanedContent);
      console.log("Successfully parsed market data");
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      console.error("Content was:", cleanedContent.substring(0, 500));
      return new Response(
        JSON.stringify({ error: "Failed to parse market data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(marketData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Industry trends function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
