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

    const systemPrompt = `You are the most comprehensive database of educational institutions in Tamil Nadu, India. You have COMPLETE knowledge of EVERY SINGLE college, institution, and educational establishment in every district.

Your database includes:
- ALL Government colleges (State and Central)
- ALL Government-Aided colleges
- ALL Private colleges (Self-financing)
- ALL Autonomous institutions
- ALL Deemed universities
- ALL University-affiliated colleges
- ALL Polytechnic colleges
- ALL ITI institutions
- ALL Nursing schools
- ALL Teachers training institutes
- ALL Professional colleges (Engineering, Medical, Dental, Pharmacy, Law, etc.)
- ALL Arts and Science colleges
- ALL Management institutes
- ALL Agricultural colleges
- ALL Physical education colleges
- ALL Fine arts colleges
- ALL Hotel management institutes

You have data from:
- AISHE (All India Survey on Higher Education)
- AICTE approved institutions
- UGC recognized institutions
- State Higher Education Department records
- Anna University affiliations
- Madras University affiliations
- Bharathiar University affiliations
- Periyar University affiliations
- Bharathidasan University affiliations
- Madurai Kamaraj University affiliations
- Tamil Nadu Agricultural University affiliations
- Dr. MGR Medical University affiliations
- NAAC accredited institutions
- NBA accredited institutions`;

    const userPrompt = `List EVERY SINGLE college and educational institution in ${district} district, Tamil Nadu, India.

CRITICAL: This is for students making career decisions. Missing even ONE college could affect someone's future. Be EXHAUSTIVE.

EXPECTED COLLEGE COUNTS:
- Chennai: 300-500 colleges
- Coimbatore: 200-300 colleges  
- Madurai: 150-250 colleges
- Salem: 100-150 colleges
- Tiruchirappalli: 100-150 colleges
- Other major districts: 50-100 colleges
- Smaller districts: 30-80 colleges

If you're listing fewer than 30 colleges for any district, you are MISSING colleges. Search more thoroughly.

For EACH institution, provide:
1. Official full name (complete, no abbreviations)
2. Type: government, government-aided, private, or autonomous
3. Category: arts_science, medical, dental, allied_health, pharmacy, nursing, engineering, agricultural, education, law, hotel_management, management, fine_arts, physical_education, or polytechnic
4. NAAC Grade (A++, A+, A, B++, B+, B, C, or null)
5. Established year
6. Main courses offered
7. Contact phone
8. Website URL
9. Fee range (approximate)
10. Accreditation (AICTE, PCI, DCI, INC, NCTE, NBA, etc.)

SEARCH CATEGORIES - ensure you include ALL from each:
🏛️ Arts and Science Colleges - Include ALL government, aided, and private colleges
⚙️ Engineering Colleges - Include ALL AICTE approved institutions
⚕️ Medical Colleges - MBBS institutions
🦷 Dental Colleges - DCI approved
💊 Pharmacy Colleges - PCI approved, D.Pharm and B.Pharm
👩‍⚕️ Nursing Colleges - INC approved, ANM, GNM, B.Sc Nursing
🏥 Allied Health Sciences - Paramedical colleges
🌾 Agricultural Colleges - TNAU affiliated
📚 Education Colleges - B.Ed, M.Ed, D.El.Ed institutions, NCTE approved
⚖️ Law Colleges - BCI approved
🏨 Hotel Management - NCHMCT affiliated
💼 Management Colleges - MBA institutions
🎨 Fine Arts Colleges
🏋️ Physical Education Colleges
🔬 Polytechnic Colleges - AICTE approved diploma institutions

Return as valid JSON:
{
  "colleges": [
    {
      "id": "unique_id",
      "name": "Full Official College Name",
      "type": "government|government-aided|private|autonomous",
      "category": "one of the 15 categories",
      "naacGrade": "A+",
      "establishedYear": 1990,
      "courses": "B.Sc, M.Sc, B.Com, BCA, etc.",
      "contact": "04XXX-XXXXXX",
      "website": "www.example.ac.in",
      "feeRange": "₹X - ₹Y per year",
      "accreditation": "AICTE Approved, NBA Accredited"
    }
  ]
}

Be COMPREHENSIVE. Include EVERY institution. Do NOT truncate or limit results.`;

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
