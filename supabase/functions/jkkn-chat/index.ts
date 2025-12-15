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

// Check if the message is asking for image generation
function isImageGenerationRequest(text: string): boolean {
  const lowerText = text.toLowerCase();
  const imageKeywords = [
    "generate an image", "create an image", "create image", "generate image",
    "draw", "make a picture", "make an image", "create a picture",
    "show me an image", "show me a picture", "visualize", "illustrate",
    "படம் உருவாக்கு", "படம் வரை", "image of", "picture of"
  ];
  return imageKeywords.some(keyword => lowerText.includes(keyword));
}

// Extract the image prompt from the user message
function extractImagePrompt(text: string): string {
  const lowerText = text.toLowerCase();
  const patterns = [
    /generate (?:an )?image (?:of |about |showing )?(.+)/i,
    /create (?:an )?image (?:of |about |showing )?(.+)/i,
    /draw (?:an? )?(.+)/i,
    /make (?:a |an )?(?:picture|image) (?:of |about |showing )?(.+)/i,
    /show me (?:an? )?(?:picture|image) (?:of |about )?(.+)/i,
    /visualize (.+)/i,
    /illustrate (.+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // If no pattern matches, use the whole text as prompt
  return text;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, generateImage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.content || "";
    
    // Check if this is an image generation request
    if (generateImage || isImageGenerationRequest(userText)) {
      const imagePrompt = extractImagePrompt(userText);
      console.log("Generating image with prompt:", imagePrompt);
      
      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: `Generate a high-quality, professional image: ${imagePrompt}. Make it visually appealing and suitable for educational or career-related context.`
            }
          ],
          modalities: ["image", "text"]
        }),
      });

      if (!imageResponse.ok) {
        const errorText = await imageResponse.text();
        console.error("Image generation error:", imageResponse.status, errorText);
        
        return new Response(
          JSON.stringify({ 
            error: "Failed to generate image. Please try again.",
            type: "text",
            content: "I apologize, but I couldn't generate the image right now. Please try again with a different prompt."
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const imageData = await imageResponse.json();
      console.log("Image generation response received");
      
      const imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      const textContent = imageData.choices?.[0]?.message?.content || "Here's the image you requested!";
      
      return new Response(
        JSON.stringify({ 
          type: "image",
          content: textContent,
          imageUrl: imageUrl
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Regular chat request
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
