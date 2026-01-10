import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const categoryPrompts: Record<string, string> = {
  defence: `Generate unique questions about Indian Defence, Armed Forces, NDA, CDS, military history, defence current affairs, and paramilitary forces.`,
  railway: `Generate unique questions about Indian Railways, railway zones, railway history, train types, railway recruitment, and railway infrastructure.`,
  ssc: `Generate unique questions covering SSC exam topics: Indian Constitution, Polity, General Science, Geography, History, and Current Affairs.`,
  banking: `Generate unique questions about Banking, RBI, IBPS, financial terms, banking regulations, insurance, and economic concepts.`,
  state: `Generate unique questions about Tamil Nadu state government, TNPSC, Tamil Nadu history, geography, culture, and state administration.`,
  central: `Generate unique questions about Central Government jobs, UPSC, Indian administrative system, ministries, and public sector undertakings.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, count = 10 } = await req.json();
    
    if (!category || !categoryPrompts[category]) {
      return new Response(
        JSON.stringify({ error: "Invalid category provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert question generator for Indian Government competitive exams. Generate ${count} unique multiple choice questions.

IMPORTANT RULES:
1. Each question must have exactly 4 options
2. Provide both English and Tamil versions
3. Include difficulty level (easy, medium, hard) - distribute evenly
4. Categorize by subject (General Knowledge, Mathematics, Reasoning, English, Physics, Chemistry, Biology, Polity, Geography, History, Banking, Economics)
5. Provide clear explanations in both languages
6. Questions must be factually accurate and exam-relevant
7. Avoid repeating common questions - be creative and current

${categoryPrompts[category]}`;

    const userPrompt = `Generate ${count} unique MCQ questions for ${category} category government exams in India.

Return a JSON array with this exact structure:
[
  {
    "id": "unique_id_string",
    "question": "Question in English",
    "questionTamil": "Question in Tamil",
    "options": [
      { "en": "Option A in English", "ta": "Option A in Tamil" },
      { "en": "Option B in English", "ta": "Option B in Tamil" },
      { "en": "Option C in English", "ta": "Option C in Tamil" },
      { "en": "Option D in English", "ta": "Option D in Tamil" }
    ],
    "correctAnswer": 0,
    "explanation": "Explanation in English",
    "explanationTamil": "Explanation in Tamil",
    "subject": "Subject category",
    "difficulty": "easy|medium|hard"
  }
]

ONLY return the JSON array, no other text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the response
    let questions;
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      questions = JSON.parse(cleanContent);
      
      // Validate structure
      if (!Array.isArray(questions)) {
        throw new Error("Response is not an array");
      }
      
      // Add unique IDs if missing and validate each question
      questions = questions.map((q, index) => ({
        id: q.id || `${category}_ai_${Date.now()}_${index}`,
        question: q.question || "Question not available",
        questionTamil: q.questionTamil || q.question || "கேள்வி கிடைக்கவில்லை",
        options: q.options || [
          { en: "Option A", ta: "விருப்பம் A" },
          { en: "Option B", ta: "விருப்பம் B" },
          { en: "Option C", ta: "விருப்பம் C" },
          { en: "Option D", ta: "விருப்பம் D" },
        ],
        correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
        explanation: q.explanation || "Explanation not available",
        explanationTamil: q.explanationTamil || q.explanation || "விளக்கம் கிடைக்கவில்லை",
        subject: q.subject || "General Knowledge",
        difficulty: ["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "medium",
      }));
      
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    return new Response(
      JSON.stringify({ questions, category, generated: questions.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-govt-questions:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});