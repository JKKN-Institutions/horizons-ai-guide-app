export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  if (!CLAUDE_API_KEY) {
    return res.status(200).json({ 
      reply: '⚠️ AI Mentor is not connected yet. To activate:\n\n1. Go to console.anthropic.com and get an API key\n2. Go to Vercel → Settings → Environment Variables\n3. Add CLAUDE_API_KEY = your key\n4. Redeploy\n\nThe UI is fully working — just needs the AI backend!',
      error: 'CLAUDE_API_KEY not configured'
    });
  }

  try {
    const { action, data } = req.body;
    let systemPrompt = '';
    let userMessage = '';

    switch (action) {
      case 'onboarding_chat': {
        systemPrompt = `You are a friendly startup mentor AI for students at JKKN Institutions. You help students discover their entrepreneurial potential.

When starting onboarding, ask these 4 questions ONE AT A TIME in a conversational, encouraging way:
1) Field of interest — offer these options: Healthcare, Automotive, Agriculture, Food, Fashion, Education, Finance, Construction, Technology, Environment
2) Specific sub-domain within that field (ask them to be specific)
3) Their city and region in India
4) Their experience level (Beginner / Some Knowledge / Experienced)

After collecting ALL 4 answers, respond with your congratulatory message AND include this exact JSON block at the end wrapped in <PROFILE_JSON> tags:
<PROFILE_JSON>{"field":"...","subDomain":"...","location":"...","experience":"..."}</PROFILE_JSON>

If the user hasn't answered all 4 questions yet, ask the next question. Be warm, use emojis, and make them feel excited about their startup journey.

For general mentoring after onboarding, provide helpful startup advice specific to their field and location. Be practical, specific, and encouraging. Reference real Indian programs, local resources, and specific actionable steps.`;
        userMessage = data.message;
        
        const messages = data.history || [];
        messages.push({ role: 'user', content: userMessage });

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1500,
            system: systemPrompt,
            messages: messages,
          }),
        });
        const result = await response.json();
        const reply = result.content?.[0]?.text || 'Sorry, I could not process that.';
        return res.status(200).json({ reply });
      }

      case 'generate_tasks': {
        systemPrompt = `Generate 7 daily observation tasks for a student in the field of ${data.field}, sub-domain ${data.subDomain}, located in ${data.location}. 

Tasks should make them:
- Talk to real people (shopkeepers, professionals, customers)
- Visit real places in their city
- Observe real problems
- Take notes and reflect

Each task should be HYPER-LOCAL and SPECIFIC to their city "${data.location}" and field "${data.field}".

Return ONLY a JSON array with no other text: 
[{"day":1,"taskTitle":"...","taskDescription":"...","goal":"..."},...]`;

        const taskResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            system: 'You are a task generator. Return ONLY valid JSON arrays. No markdown, no explanation.',
            messages: [{ role: 'user', content: systemPrompt }],
          }),
        });
        const taskResult = await taskResponse.json();
        const taskText = taskResult.content?.[0]?.text || '[]';
        try {
          const cleaned = taskText.replace(/```json\n?|```\n?/g, '').trim();
          const tasks = JSON.parse(cleaned);
          return res.status(200).json({ tasks });
        } catch {
          return res.status(200).json({ tasks: [], raw: taskText });
        }
      }

      case 'detect_problem': {
        systemPrompt = `Analyze these 7 daily reflections from a student in ${data.field} (${data.subDomain}) located in ${data.location}:

${data.reflections.map((r, i) => `Day ${i + 1}: ${r}`).join('\n')}

Identify the STRONGEST real-world problem they observed. Be specific and practical.

Return ONLY this JSON with no other text:
{"problemStatement":"...","painScore":8,"targetCustomer":"...","marketSize":65,"uniqueness":70,"existingGaps":60,"validated":true}`;

        const problemResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: 'You are a problem detection AI. Return ONLY valid JSON. No markdown.',
            messages: [{ role: 'user', content: systemPrompt }],
          }),
        });
        const problemResult = await problemResponse.json();
        const problemText = problemResult.content?.[0]?.text || '{}';
        try {
          const cleaned = problemText.replace(/```json\n?|```\n?/g, '').trim();
          return res.status(200).json({ problem: JSON.parse(cleaned) });
        } catch {
          return res.status(200).json({ problem: null, raw: problemText });
        }
      }

      case 'generate_survey': {
        systemPrompt = `Generate 8 survey questions to validate this startup problem:
Problem: ${data.problemStatement}
Target Customer: ${data.targetCustomer}

Mix of multiple choice (5-6 questions) and short answer (2-3 questions).
Questions should help validate if this is a REAL problem people face and would pay to solve.

Return ONLY this JSON array:
[{"questionNumber":1,"questionText":"...","type":"mcq","options":["...","...","...","..."]},{"questionNumber":2,"questionText":"...","type":"text","options":[]}]`;

        const surveyResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            system: 'You are a survey generator. Return ONLY valid JSON arrays. No markdown.',
            messages: [{ role: 'user', content: systemPrompt }],
          }),
        });
        const surveyResult = await surveyResponse.json();
        const surveyText = surveyResult.content?.[0]?.text || '[]';
        try {
          const cleaned = surveyText.replace(/```json\n?|```\n?/g, '').trim();
          return res.status(200).json({ questions: JSON.parse(cleaned) });
        } catch {
          return res.status(200).json({ questions: [], raw: surveyText });
        }
      }

      case 'generate_roadmap': {
        systemPrompt = `Based on this validated startup problem and survey data, generate a product roadmap:

Problem: ${data.problemStatement}
Target Customer: ${data.targetCustomer}
Field: ${data.field}
Location: ${data.location}
Survey Summary: ${data.surveySummary || 'Survey validation complete with positive responses.'}

Return ONLY this JSON:
{
  "mvpTitle":"...",
  "mvpDescription":"...",
  "buildTool":"...",
  "businessModel":"...",
  "weeklySteps":[{"week":1,"title":"...","actions":["...","..."]}],
  "recommendedTools":[{"name":"...","purpose":"..."}]
}`;

        const roadmapResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2500,
            system: 'You are a startup product roadmap generator for Indian students. Return ONLY valid JSON. No markdown. Be practical and specific.',
            messages: [{ role: 'user', content: systemPrompt }],
          }),
        });
        const roadmapResult = await roadmapResponse.json();
        const roadmapText = roadmapResult.content?.[0]?.text || '{}';
        try {
          const cleaned = roadmapText.replace(/```json\n?|```\n?/g, '').trim();
          return res.status(200).json({ roadmap: JSON.parse(cleaned) });
        } catch {
          return res.status(200).json({ roadmap: null, raw: roadmapText });
        }
      }

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
