import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are VAZHIKATTI AI Assistant - a helpful, knowledgeable AI career counselor specializing in helping Tamil Nadu students.

🎯 CRITICAL LANGUAGE INSTRUCTION:
- By default, respond ONLY in English
- If the user explicitly asks for Tamil translation or asks in Tamil, respond ONLY in Tamil
- NEVER mix both languages in the same response
- Keep responses clear, well-organized, and easy to read

PRIMARY FOCUS - Career Guidance & JKKN Information:
- Information about all 9 JKKN institutions (JKKN College of Engineering & Technology, JKKN College of Arts & Science, JKKN College of Pharmacy, JKKN Dental College, JKKN College of Allied Health Sciences, JKKN Nataraja Dental College, JKKN Group of Institutions, JKKNATC, JKKN Educational Trust)
- Career options after 10th and 12th standard
- Job search tips, resume writing, and interview preparation
- Skill development and professional growth
- Admission process, requirements, campus facilities, and placement statistics

SECONDARY - Education Support:
- Exam preparation tips and study techniques for JEE, NEET, TNEA, and other entrance exams
- Scholarship information and college admission guidance
- Academic subject explanations

GENERAL KNOWLEDGE:
- Answer questions on Science, Technology, Health, Business, Arts, Current Affairs
- Help with calculations and explanations
- Creative writing and general information

BEHAVIOR GUIDELINES:
- Be friendly, respectful, and encouraging
- Use simple, clear language that students can understand
- Provide step-by-step explanations when needed
- If unsure about something, say so honestly
- Keep responses well-organized with clear sections
- Use emojis sparingly to make responses engaging
- Always aim to help students achieve their educational and career goals

FORMATTING:
- Use **bold** for important points
- Use bullet points for lists
- Keep paragraphs short and readable`;

// Rate limiting constants
const HOURLY_LIMIT = 50;
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 1000000; // Increased for user satisfaction

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

// Check rate limit for a user
async function checkRateLimit(userId: string): Promise<{ allowed: boolean; resetAt?: Date; remaining?: number }> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  const hourAgo = new Date(Date.now() - 3600000);
  
  const { data: recentRequests, error } = await supabase
    .from('chat_rate_limits')
    .select('id')
    .eq('user_id', userId)
    .gte('created_at', hourAgo.toISOString());
  
  if (error) {
    console.error('Rate limit check error:', error);
    // Allow request if rate limit check fails to avoid blocking users
    return { allowed: true };
  }
  
  const requestCount = recentRequests?.length || 0;
  
  if (requestCount >= HOURLY_LIMIT) {
    return { 
      allowed: false, 
      resetAt: new Date(Date.now() + 3600000),
      remaining: 0
    };
  }
  
  // Log this request
  await supabase.from('chat_rate_limits').insert({ user_id: userId });
  
  return { 
    allowed: true,
    remaining: HOURLY_LIMIT - requestCount - 1
  };
}

// Validate message array
function validateMessages(messages: unknown): { valid: boolean; error?: string } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: 'Messages must be an array' };
  }
  
  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Too many messages (max ${MAX_MESSAGES})` };
  }
  
  for (const msg of messages) {
    if (typeof msg !== 'object' || msg === null) {
      return { valid: false, error: 'Invalid message format' };
    }
    
    const typedMsg = msg as { content?: unknown; role?: unknown };
    
    if (typeof typedMsg.content !== 'string') {
      return { valid: false, error: 'Message content must be a string' };
    }
    
    if (typedMsg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message too long (max ${MAX_MESSAGE_LENGTH} chars)` };
    }
    
    if (typedMsg.role !== 'user' && typedMsg.role !== 'assistant' && typedMsg.role !== 'system') {
      return { valid: false, error: 'Invalid message role' };
    }
  }
  
  return { valid: true };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Verify user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required. Please sign in to use the chat.' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { 
        global: { 
          headers: { Authorization: authHeader } 
        } 
      }
    );

    // Verify the JWT and get user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token. Please sign in again.' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Authenticated user: ${user.id}`);

    // 2. Check rate limit
    const rateLimit = await checkRateLimit(user.id);
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for user: ${user.id}`);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          resetAt: rateLimit.resetAt?.toISOString()
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Parse and validate input
    const body = await req.json();
    const { messages, generateImage } = body;
    
    const validation = validateMessages(messages);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.content || "";
    
    // Check if this is an image generation request
    if (generateImage || isImageGenerationRequest(userText)) {
      const imagePrompt = extractImagePrompt(userText);
      console.log(`User ${user.id} generating image with prompt:`, imagePrompt);
      
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
      console.log(`Image generation response received for user: ${user.id}`);
      
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
    console.log(`User ${user.id} processing chat request with ${messages.length} messages`);

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
          JSON.stringify({ error: "AI service rate limit exceeded. Please try again in a moment." }),
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

    console.log(`Streaming response from AI Gateway for user: ${user.id}`);
    
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
