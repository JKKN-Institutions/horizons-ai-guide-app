import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const streamConfigs: Record<string, { name: string; subjects: string; context: string }> = {
  pcm: {
    name: "Science (PCM)",
    subjects: "Physics, Chemistry, Mathematics",
    context: "engineering, technology, computer science, data science, architecture, defense, aviation"
  },
  pcb: {
    name: "Science (PCB)",
    subjects: "Physics, Chemistry, Biology",
    context: "medicine, healthcare, nursing, pharmacy, biotechnology, agriculture, life sciences"
  },
  pcmb: {
    name: "Science (PCMB)",
    subjects: "Physics, Chemistry, Mathematics, Biology",
    context: "biomedical engineering, bioinformatics, pharmaceutical engineering, environmental science, any engineering or medical field"
  },
  commerce: {
    name: "Commerce",
    subjects: "Accountancy, Business Studies, Economics",
    context: "business, finance, accounting, banking, management, entrepreneurship, law, economics"
  },
  arts: {
    name: "Arts/Humanities",
    subjects: "History, Geography, Languages, Psychology, Sociology",
    context: "literature, journalism, law, psychology, social work, design, performing arts, education, civil services"
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, stream, previousQuestions, questionNumber, marksRange, interests, answers } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const streamConfig = streamConfigs[stream] || streamConfigs.pcm;

    if (action === 'generate_question') {
      const previousQuestionsText = previousQuestions && previousQuestions.length > 0
        ? `\n\nIMPORTANT: Generate a COMPLETELY NEW question. The user has already answered these questions (DO NOT repeat any of these or similar scenarios):\n${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}`
        : '';

      const systemPrompt = `You are an expert career counselor specializing in guiding 12th standard students to choose the right course for their future. 
      
      The student is from ${streamConfig.name} stream (${streamConfig.subjects}). Generate questions related to ${streamConfig.context} career paths.
      
      ${marksRange ? `Student's marks range: ${marksRange}` : ''}
      ${interests && interests.length > 0 ? `Student's specific interests: ${interests.join(', ')}` : ''}
      
      Generate scenario-based questions that help identify the student's personality, interests, aptitudes, and career preferences.
      
      Each question should be a REAL-WORLD SCENARIO that a student might face, testing their decision-making and preferences.`;

      const userPrompt = `Generate question #${questionNumber} for the 12th student career assessment.
      ${previousQuestionsText}
      
      Create a scenario-based question that helps identify which course would suit this ${streamConfig.name} student.
      
      The scenario should involve situations like:
      - Choosing between different types of activities
      - Responding to challenges or opportunities
      - Working style preferences
      - Subject-related interests
      - Future career considerations
      
      IMPORTANT: Make the scenario relatable to a 12th standard student in India.
      
      Return a JSON object with this exact structure:
      {
        "scenario": "A detailed 2-3 sentence story/scenario",
        "question": "What would you do in this situation?",
        "options": [
          {"label": "A", "text": "First option", "traits": ["trait1", "trait2"]},
          {"label": "B", "text": "Second option", "traits": ["trait1", "trait2"]},
          {"label": "C", "text": "Third option", "traits": ["trait1", "trait2"]},
          {"label": "D", "text": "Fourth option", "traits": ["trait1", "trait2"]}
        ]
      }`;

      console.log('Generating question for stream:', stream, 'Question number:', questionNumber);

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
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API error:', response.status, errorText);
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;
      
      // Clean up the response
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const questionData = JSON.parse(content);

      return new Response(JSON.stringify(questionData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (action === 'generate_results') {
      const systemPrompt = `You are an expert career counselor analyzing a 12th standard ${streamConfig.name} student's assessment results.
      
      Based on their answers, recommend the TOP courses from the available options for their stream.
      
      Stream: ${streamConfig.name} (${streamConfig.subjects})
      Context: ${streamConfig.context}
      ${marksRange ? `Marks range: ${marksRange}` : ''}
      ${interests && interests.length > 0 ? `Interests: ${interests.join(', ')}` : ''}`;

      const answersText = answers && answers.length > 0
        ? answers.map((a: { question: string; answer: string; traits: string[] }, i: number) => 
            `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}\nTraits: ${a.traits?.join(', ') || 'N/A'}`
          ).join('\n\n')
        : '';

      const userPrompt = `Based on this student's assessment answers, generate personalized course recommendations.
      
      Student's Answers:
      ${answersText}
      
      Generate a comprehensive report with:
      1. Student's personality profile
      2. Top 10 matching courses with match percentage (each course should include: name, match percentage, career options, salary range)
      3. Why these courses suit them
      4. Action plan for next 3 months
      
      Return a JSON object:
      {
        "profile": {
          "title": "Student archetype title",
          "description": "2-3 paragraphs about the student's personality and aptitudes"
        },
        "topCourses": [
          {
            "rank": 1,
            "name": "Course Name",
            "matchPercentage": 95,
            "careers": ["Career 1", "Career 2", "Career 3"],
            "salaryRange": "₹X-Y LPA",
            "whyMatch": "Brief explanation why this matches the student"
          }
        ],
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "growthAreas": ["Area 1", "Area 2"],
        "actionPlan": [
          {"month": 1, "title": "Month 1 Title", "tasks": ["Task 1", "Task 2"]},
          {"month": 2, "title": "Month 2 Title", "tasks": ["Task 1", "Task 2"]},
          {"month": 3, "title": "Month 3 Title", "tasks": ["Task 1", "Task 2"]}
        ]
      }`;

      console.log('Generating results for stream:', stream);

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
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API error:', response.status, errorText);
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const results = JSON.parse(content);

      return new Response(JSON.stringify(results), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');

  } catch (error) {
    console.error('Error in student-assessment function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
