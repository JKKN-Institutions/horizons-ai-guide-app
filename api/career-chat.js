export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  if (!CLAUDE_API_KEY) {
    return res.status(500).json({ error: 'AI not configured. Add CLAUDE_API_KEY in Vercel settings.' });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';

    // Detect image generation requests using flexible regex patterns
    const imagePatterns = [
      /\b(create|generate|make|draw|paint|sketch|design)\b.*\b(image|images|picture|pictures|photo|poster|logo|banner|art|diagram|infographic|illustration)s?\b/,
      /\b(image|images|picture|pictures|photo|poster|logo|banner|illustration)s?\b.*\b(of|for|about|showing)\b/,
      /\b(draw|paint|sketch|visualize|imagine)\b.*\b(me|a|an|the)\b/,
      /\bshow\s+me\s+(a\s+)?(image|picture|photo)/,
    ];

    const isImageRequest = imagePatterns.some(pattern => pattern.test(lastUserMsg));

    if (isImageRequest) {
      const userMessage = messages[messages.length - 1]?.content || '';
      
      // Use Claude to create a career-themed image prompt AND career tips
      let imagePrompt = userMessage;
      let careerTips = '';
      try {
        const promptResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            messages: [{
              role: 'user',
              content: `The user wants to generate an image of: "${userMessage}"

You must do TWO things. Respond in this EXACT format with the separator ---TIPS---:

1. First, write a detailed image generation prompt that transforms the user's request into a CAREER MOTIVATION themed image. Connect the subject (tree, dog, ball, temple, etc.) to career growth, success, education, or motivation. Make it inspirational and professional looking. Include words like: motivational, professional, inspirational poster style, clean modern design. Return ONLY the image prompt, no explanation.

---TIPS---

2. Then, write 3-4 career reflection tips or motivational insights that connect the subject (${userMessage}) to career/life success. Use emojis and bold formatting with **. Make each tip 1-2 lines. Connect the metaphor naturally.

Example for "tree":
Image prompt: A majestic growing tree with branches forming career paths and opportunities, roots representing education and knowledge, leaves glowing with golden light, inspirational motivational poster style, professional clean modern design

---TIPS---
🌳 **Like a tree, your career grows stronger with deep roots of education and patience.**
📚 **Every branch represents a new skill — keep learning, keep growing!**
💪 **Storms make trees take deeper roots — challenges make you stronger in your career.**
🎯 **Plant your career seed today, nurture it with hard work, and watch it become mighty.**`
            }],
          }),
        });

        if (promptResponse.ok) {
          const promptData = await promptResponse.json();
          const fullResponse = promptData.content?.[0]?.text || '';
          const parts = fullResponse.split('---TIPS---');
          imagePrompt = (parts[0] || userMessage).trim();
          careerTips = (parts[1] || '').trim();
        }
      } catch (e) {
        // Use original message as prompt
      }

      // Generate image using Pollinations.ai (free, no API key needed)
      const encodedPrompt = encodeURIComponent(imagePrompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=${Date.now()}`;

      const tipsText = careerTips || `🎯 **Every image tells a career story — find your path and keep moving forward!**\n💡 **Success comes to those who stay focused and never stop learning.**`;

      return res.status(200).json({
        type: 'image',
        imageUrl: imageUrl,
        content: `🎨 **Career Reflection Image Generated!**\n\n👇 Your image is loading below (takes 5-10 seconds)\n\n---\n\n**🌟 Career Reflection:**\n\n${tipsText}\n\n---\n\n💡 *Ask me to generate more career reflection images with any topic!*`
      });
    }

    // Regular chat - use Claude API with streaming
    const systemPrompt = `You are VAZHIKAATTI AI Career Counselor — an expert career guidance assistant built by JKKN Educational Institutions, Tamil Nadu, India.

YOUR CAPABILITIES:
- Career guidance for Indian students (10th, 12th, UG, PG levels)
- Exam preparation advice (JEE, NEET, TNEA, UPSC, TNPSC, CAT, GATE, etc.)
- College & university recommendations across India and abroad
- Course comparisons and career path planning
- Job market insights, salary information, and industry trends
- Scholarship and financial aid guidance
- Skill development and placement preparation
- Current affairs related to education, jobs, and careers in India
- Government job preparation (SSC, Banking, Railways, TNPSC)
- Study abroad guidance (USA, UK, Canada, Australia, Germany)

YOUR PERSONALITY:
- Friendly, encouraging, and supportive
- Use emojis naturally to make responses engaging
- Give structured, actionable advice
- When relevant, mention Tamil Nadu specific opportunities
- Be honest about career prospects — don't overpromise
- For salary info, give realistic Indian market ranges
- Use simple English that Indian students can understand

FORMATTING:
- Use **bold** for important terms
- Use bullet points for lists
- Structure with clear headings using **Header:**
- Keep responses focused and practical
- For long topics, break into clear sections

IMPORTANT RULES:
- Always give specific, actionable advice — not vague suggestions
- Include real exam names, college names, salary ranges when relevant
- If asked about current affairs or recent events, share what you know and mention your knowledge may not include very recent events
- If asked something outside career/education, still try to help but gently steer back to career guidance
- Never refuse to answer — always provide the best guidance possible
- For Tamil Nadu students, mention TNEA, Anna University, state board specific info when relevant

JKKN CONTEXT:
JKKN Educational Institutions (J.K.K. Nattraja Educational Institutions) is located in Komarapalayam, Namakkal District, Tamil Nadu. It offers Engineering, Pharmacy, Arts & Science, Dental, Nursing, and Polytechnic programs.`;

    const apiMessages = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: systemPrompt,
        stream: true,
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      return res.status(500).json({ error: 'AI service temporarily unavailable' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            res.write('data: [DONE]\n\n');
            continue;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              res.write(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`);
            }
            if (parsed.type === 'message_stop') {
              res.write('data: [DONE]\n\n');
            }
          } catch (e) {}
        }
      }
    }

    res.end();
  } catch (error) {
    console.error('Career chat error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
