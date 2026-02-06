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
    const body = await req.json();
    const { type } = body;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";
    let tools = [];
    let toolChoice = {};

    if (type === "skills") {
      const { career } = body;
      systemPrompt = `You are a career skill advisor for Tamil Nadu 12th-standard students (Class of 2026). Analyze skill requirements for the given career and provide actionable recommendations with current skill levels and learning resources relevant to Indian students.`;

      userPrompt = `For a career as a ${career || "Software Developer"}, provide skill gap analysis with 4-5 key skills needed. Include free/affordable Indian learning resources.`;

      tools = [{
        type: "function",
        function: {
          name: "provide_skill_analysis",
          description: "Provide skill gap analysis for a career",
          parameters: {
            type: "object",
            properties: {
              skills: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    skill: { type: "string" },
                    importance: { type: "number", description: "Importance score 1-10" },
                    currentLevel: { type: "number", description: "Estimated current level for a 12th student 1-10" },
                    resources: {
                      type: "array",
                      items: { type: "string" },
                      description: "2-3 learning resources"
                    }
                  },
                  required: ["skill", "importance", "currentLevel", "resources"]
                }
              }
            },
            required: ["skills"]
          }
        }
      }];
      toolChoice = { type: "function", function: { name: "provide_skill_analysis" } };
    } else {
      // Full career prediction using all 7-step assessment data
      const {
        interests, workPreference, workStyle,
        budget, location, duration, percentage, examReadiness,
        skillRatings, strongestSubject, weakestSubject, entranceScore
      } = body;

      systemPrompt = `You are an expert career counselor specializing in Tamil Nadu 12th-standard students (Class of 2026). Your job is to recommend SPECIFIC, REALISTIC career paths that a 12th student in Tamil Nadu can actually pursue.

IMPORTANT RULES:
- Recommend careers that are DIRECTLY accessible after 12th standard through proper UG courses (B.E/B.Tech, MBBS, B.Sc, BBA, B.Com, BA, BCA, etc.)
- Career titles should be the END GOAL profession, not vague roles
- Examples of GOOD career titles: "Software Engineer", "Doctor (MBBS)", "Chartered Accountant", "Civil Engineer", "Data Scientist", "Mechanical Engineer", "Pharmacist", "Lawyer", "IAS Officer", "Architect"
- Examples of BAD career titles: "EdTech Product Manager", "Curriculum Developer for E-learning", "International Education Consultant" — these are too niche and not relevant for a 12th student
- Match scores should reflect how well the student's profile fits, ranging 70-95%
- Salary ranges must be realistic for India (in LPA format)
- Growth rates should reflect current Indian job market trends
- Consider the student's group subjects, budget, location preference, and exam readiness when recommending`;

      userPrompt = `STUDENT ASSESSMENT DATA:

📚 12th Group & Subjects: ${interests || "Not specified"}
🎯 Top Interests: ${workPreference || "Not specified"}
📊 Career Priorities (ranked): ${workStyle || "Not specified"}

💰 Family Budget: ${budget || "Not specified"}
📍 Preferred Location: ${location || "Not specified"}
⏰ Course Duration Preference: ${duration || "Not specified"}
🎯 Exam Readiness: ${examReadiness || "Not specified"}

📈 Expected Percentage: ${percentage || "Not specified"}
📗 Strongest Subject: ${strongestSubject || "Not specified"}
📕 Weakest Subject: ${weakestSubject || "Not specified"}
${entranceScore ? `🏆 Entrance Exam Score: ${entranceScore}` : ""}

Self-rated Skills: ${skillRatings ? JSON.stringify(skillRatings) : "Not provided"}

Based on ALL of the above data, provide the TOP 5 most suitable career paths for this student. Each career must be a realistic, well-known profession achievable through standard Indian education pathways.`;

      tools = [{
        type: "function",
        function: {
          name: "provide_career_predictions",
          description: "Provide career predictions based on student assessment",
          parameters: {
            type: "object",
            properties: {
              predictions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    career: { type: "string", description: "Specific career title (e.g. Software Engineer, Doctor, CA)" },
                    matchScore: { type: "number", description: "Match percentage 70-95" },
                    icon: { type: "string", description: "Single emoji for the career" },
                    color: { type: "string", description: "Tailwind gradient like 'from-blue-500 to-indigo-600'" },
                    description: { type: "string", description: "One sentence about why this suits the student" },
                    avgSalary: { type: "string", description: "Salary range like '₹8-25 LPA'" },
                    growthRate: { type: "string", description: "Growth rate like '+35%'" }
                  },
                  required: ["career", "matchScore", "icon", "color", "description", "avgSalary", "growthRate"]
                }
              }
            },
            required: ["predictions"]
          }
        }
      }];
      toolChoice = { type: "function", function: { name: "provide_career_predictions" } };
    }

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
        tools,
        tool_choice: toolChoice
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const content = data.choices?.[0]?.message?.content;
    if (content) {
      try {
        const parsed = JSON.parse(content);
        return new Response(
          JSON.stringify(parsed),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch {
        return new Response(
          JSON.stringify({ message: content }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    throw new Error("No valid response from AI");
  } catch (error) {
    console.error("Career predictor error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
