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
    const { interests, workPreference, workStyle, type, career } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";
    let tools = [];
    let toolChoice = {};

    if (type === "skills") {
      // Skill gap analysis
      systemPrompt = `You are a career skill advisor for Indian students. Analyze skill requirements for the given career and provide actionable recommendations with current skill levels and learning resources.`;
      
      userPrompt = `For a career as a ${career || "Software Developer"}, provide skill gap analysis with 4 key skills needed.`;
      
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
                    skill: { type: "string", description: "Name of the skill" },
                    importance: { type: "number", description: "Importance score 0-100" },
                    currentLevel: { type: "number", description: "Estimated current level for a beginner 0-100" },
                    resources: { 
                      type: "array", 
                      items: { type: "string" },
                      description: "2 learning resources for this skill"
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
      // Career prediction
      systemPrompt = `You are an expert career counselor for Indian students. Based on the user's interests, work preferences, and style, predict the top 3 career matches with realistic match scores, descriptions, salary ranges (in Indian Rupees LPA), and growth rates for the Indian job market.`;
      
      userPrompt = `User Profile:
- Interests: ${interests || "General interest in technology and problem-solving"}
- Work Preference: ${workPreference || "Not specified"} (tech/healthcare/design/business)
- Work Style: ${workStyle || "Not specified"} (team/solo/hybrid/lead)

Provide 3 career predictions with match scores between 70-95%.`;

      tools = [{
        type: "function",
        function: {
          name: "provide_career_predictions",
          description: "Provide career predictions based on user profile",
          parameters: {
            type: "object",
            properties: {
              predictions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    career: { type: "string", description: "Career title" },
                    matchScore: { type: "number", description: "Match percentage 70-95" },
                    icon: { type: "string", description: "Single emoji representing the career" },
                    color: { type: "string", description: "Tailwind gradient like 'from-blue-500 to-indigo-600'" },
                    description: { type: "string", description: "One sentence description of the career" },
                    avgSalary: { type: "string", description: "Salary range in format like '₹8-25 LPA'" },
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
    
    // Extract tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fallback to message content if no tool call
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
