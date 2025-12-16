import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const COLLEGE_CATEGORIES = [
  'arts_science',
  'medical',
  'dental',
  'allied_health',
  'pharmacy',
  'nursing',
  'engineering',
  'agricultural',
  'education',
  'law',
  'hotel_management',
  'management',
  'fine_arts',
  'physical_education',
  'polytechnic',
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { district } = await req.json();

    if (!district) {
      return new Response(
        JSON.stringify({ error: 'District is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Fetching colleges for district: ${district}`);

    const systemPrompt = `You are an expert database of educational institutions in Tamil Nadu, India. You have comprehensive knowledge of ALL colleges in every district including:
- Government colleges
- Government-aided colleges
- Private colleges
- Autonomous institutions
- Deemed universities
- Affiliated colleges under various universities

Your knowledge includes newly established colleges, accreditation status, courses offered, and contact details.`;

    const userPrompt = `List ALL colleges in ${district} district, Tamil Nadu, India. 

For each college, provide:
1. Official college name
2. Type: government, government-aided, private, or autonomous
3. Category: arts_science, medical, dental, allied_health, pharmacy, nursing, engineering, agricultural, education, law, hotel_management, management, fine_arts, physical_education, or polytechnic
4. NAAC Grade (if available, e.g., A++, A+, A, B++, B+, B, C)
5. Established year (if known)
6. Main courses offered (brief summary)
7. Contact phone (if known)
8. Website (if known)
9. Approximate fee range (if known)
10. Accreditation/Affiliations (AICTE, PCI, DCI, INC, NCTE, etc.)

IMPORTANT: 
- Include EVERY college, do not miss any
- Include colleges under all universities (Anna University, Madras University, Bharathiar University, etc.)
- Include deemed universities and their constituent colleges
- Include polytechnics and ITIs

Return the response as a valid JSON array with this structure:
{
  "colleges": [
    {
      "id": "unique_id",
      "name": "College Name",
      "type": "government|government-aided|private|autonomous",
      "category": "one of the 15 categories",
      "naacGrade": "A+",
      "establishedYear": 1990,
      "courses": "B.Sc, M.Sc, etc.",
      "contact": "phone number",
      "website": "website url",
      "feeRange": "₹X - ₹Y per year",
      "accreditation": "AICTE Approved"
    }
  ]
}

Provide at least 20-50 colleges if they exist in this district. Be as comprehensive as possible.`;

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
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('AI Response received, parsing...');

    // Extract JSON from the response
    let colleges = [];
    try {
      // Try to find JSON in the response
      const jsonMatch = content.match(/\{[\s\S]*"colleges"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        colleges = parsed.colleges || [];
      } else {
        // Try parsing the entire content as JSON
        const parsed = JSON.parse(content);
        colleges = parsed.colleges || parsed || [];
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Return empty array if parsing fails
      colleges = [];
    }

    // Validate and clean up the data
    colleges = colleges.map((college: any, index: number) => ({
      id: college.id || `${district.toLowerCase().replace(/\s/g, '_')}_${index}`,
      name: college.name || 'Unknown College',
      type: ['government', 'government-aided', 'private', 'autonomous'].includes(college.type) 
        ? college.type 
        : 'private',
      category: COLLEGE_CATEGORIES.includes(college.category) 
        ? college.category 
        : 'arts_science',
      naacGrade: college.naacGrade || null,
      establishedYear: college.establishedYear || null,
      courses: college.courses || 'Various courses available',
      contact: college.contact || null,
      website: college.website || null,
      feeRange: college.feeRange || null,
      accreditation: college.accreditation || null,
      isJKKN: false,
    }));

    console.log(`Found ${colleges.length} colleges in ${district}`);

    return new Response(
      JSON.stringify({ colleges }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in college-search:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        colleges: []
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
