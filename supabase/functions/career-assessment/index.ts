import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const assessmentConfigs = {
  psychometric: {
    name: 'Psychometric Assessment',
    totalQuestions: 60,
    focus: 'personality traits, values, work preferences, decision-making styles, and cognitive patterns',
    traits: ['Analytical Thinking', 'Leadership', 'Creativity', 'Empathy', 'Resilience', 'Collaboration', 'Adaptability', 'Detail Orientation']
  },
  career_interest: {
    name: 'Career Interest Inventory',
    totalQuestions: 40,
    focus: 'career interests, job role preferences, industry inclinations, and professional aspirations',
    traits: ['Technical Interest', 'Creative Interest', 'Social Interest', 'Enterprising Interest', 'Investigative Interest', 'Conventional Interest']
  },
  emotional_intelligence: {
    name: 'Emotional Intelligence Assessment',
    totalQuestions: 35,
    focus: 'self-awareness, self-regulation, motivation, empathy, and social skills',
    traits: ['Self-Awareness', 'Self-Regulation', 'Motivation', 'Empathy', 'Social Skills', 'Emotional Resilience']
  },
  skill_gap: {
    name: 'Skill Gap Analysis',
    totalQuestions: 50,
    focus: 'current skills vs industry requirements, technical competencies, soft skills, and areas for improvement',
    traits: ['Technical Skills', 'Communication', 'Problem Solving', 'Time Management', 'Digital Literacy', 'Industry Knowledge']
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, assessmentType, previousQuestions, questionNumber, userName, answers, userProfile } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const config = assessmentConfigs[assessmentType as keyof typeof assessmentConfigs];
    if (!config) {
      throw new Error('Invalid assessment type');
    }

    if (action === 'generate_question') {
      const previousQuestionsText = previousQuestions?.length > 0 
        ? `\n\nIMPORTANT: The user has already seen these questions in previous attempts. Generate a COMPLETELY DIFFERENT question:\n${previousQuestions.join('\n')}`
        : '';

      const systemPrompt = `You are an expert career psychologist creating scenario-based assessment questions for college students in India. 
      
Your task is to generate engaging, realistic workplace/college scenario questions that reveal ${config.focus}.

Each question must be:
1. A narrative story (3-4 sentences) featuring an Indian name and realistic situation
2. Present a dilemma or decision point
3. Have 4 options (A, B, C, D) that each represent different personality traits or approaches
4. Be culturally appropriate for Indian college students
5. NOT repeat any scenario themes from previous questions

Format your response as JSON:
{
  "scenario": "The full narrative scenario story",
  "options": [
    {"label": "A", "text": "Option A text", "trait": "trait_name"},
    {"label": "B", "text": "Option B text", "trait": "trait_name"},
    {"label": "C", "text": "Option C text", "trait": "trait_name"},
    {"label": "D", "text": "Option D text", "trait": "trait_name"}
  ],
  "transition": "A brief encouraging transition phrase for after they answer"
}`;

      const userPrompt = `Generate question ${questionNumber} of ${config.totalQuestions} for the ${config.name}.

Focus on assessing these traits: ${config.traits.join(', ')}

For this question, focus particularly on revealing: ${config.traits[questionNumber % config.traits.length]}
${previousQuestionsText}

Create a unique, engaging scenario that the user hasn't seen before.`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API error:', response.status, errorText);
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        throw new Error('Failed to generate question');
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      let question;
      try {
        question = JSON.parse(content);
      } catch {
        console.error('Failed to parse question JSON:', content);
        throw new Error('Failed to parse question');
      }

      return new Response(JSON.stringify({ question }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'generate_results') {
      const systemPrompt = `You are a career counselor creating a personalized, narrative-style career assessment report for an Indian college student.

Create an inspiring, story-based report that feels personal and actionable. Write in second person ("You are...").

Format your response as JSON:
{
  "careerStory": "3-4 paragraphs telling their career story based on their personality type. Start with 'Meet ${userName || 'our explorer'} - The [Archetype Title].' Make it engaging and personal.",
  "archetype": "A 2-3 word archetype title like 'Analytical Innovator' or 'Creative Leader'",
  "superpowers": [
    {"title": "Strength Name", "icon": "emoji", "description": "2-3 sentences explaining this strength as a superpower story"}
  ],
  "careerPaths": [
    {"title": "Career Title", "match": 90, "description": "2-3 sentences explaining why this career fits them", "nextSteps": ["Step 1", "Step 2"]}
  ],
  "growthAreas": [
    {"title": "Area Name", "description": "1-2 sentences framed positively as growth opportunity"}
  ],
  "actionPlan": {
    "chapter1": {"title": "Days 1-30: [Theme]", "tasks": ["Task 1", "Task 2", "Task 3"]},
    "chapter2": {"title": "Days 31-60: [Theme]", "tasks": ["Task 1", "Task 2", "Task 3"]},
    "chapter3": {"title": "Days 61-90: [Theme]", "tasks": ["Task 1", "Task 2", "Task 3"]}
  },
  "overallScore": 75,
  "readinessLevel": "Career Ready" or "Emerging Professional" or "Discovery Phase"
}`;

      const traitSummary = answers.reduce((acc: Record<string, number>, answer: any) => {
        if (answer.trait) {
          acc[answer.trait] = (acc[answer.trait] || 0) + 1;
        }
        return acc;
      }, {});

      const userPrompt = `Generate a comprehensive career assessment report for ${userName || 'the student'}.

Assessment Type: ${config.name}
Trait Analysis from ${answers.length} questions:
${Object.entries(traitSummary).map(([trait, count]) => `- ${trait}: ${count} responses`).join('\n')}

User Profile (if available): ${JSON.stringify(userProfile || {})}

Create an inspiring, personalized report that helps them understand their career potential.
Include 5 superpowers, 3 career paths with match percentages (70-95%), 3 growth areas, and a detailed 90-day action plan.`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API error:', response.status, errorText);
        throw new Error('Failed to generate results');
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      let results;
      try {
        results = JSON.parse(content);
      } catch {
        console.error('Failed to parse results JSON:', content);
        throw new Error('Failed to parse results');
      }

      return new Response(JSON.stringify({ results }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');
  } catch (error) {
    console.error('Career assessment error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
