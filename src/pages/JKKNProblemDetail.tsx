import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink, Lightbulb, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

export default function JKKNProblemDetail() {
  const { id } = useParams<{ id: string }>();
  const [hintsOpen, setHintsOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const { data: problem, isLoading } = useQuery({
    queryKey: ['jkkn-problem', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coding_problems')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] p-4">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Problem Not Found</h1>
          <Link to="/jkkn?tab=practice">
            <Button variant="outline">Back to Practice</Button>
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  }[problem.difficulty] || 'bg-gray-100 text-gray-700';

  const examples = (problem.examples as any[]) || [];
  const hints = (problem.hints as string[]) || [];
  const solutions = (problem.solution_approaches as any[]) || [];
  const externalLinks = (problem.external_links as any[]) || [];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#2E7D32] text-white sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/jkkn?tab=practice">
            <button className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold">Problem</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Title Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <Badge className={difficultyColor}>{problem.difficulty}</Badge>
            <Badge variant="outline">{problem.category}</Badge>
          </div>
          <h2 className="text-xl font-bold text-[#1E293B]">{problem.title}</h2>
        </div>

        {/* Description */}
        {problem.description && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Problem Statement</h3>
            <p className="text-[#64748B] text-sm whitespace-pre-line">{problem.description}</p>
          </div>
        )}

        {/* Examples */}
        {examples.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Examples</h3>
            <div className="space-y-4">
              {examples.map((example, i) => (
                <div key={i} className="bg-[#F5F5F5] rounded-xl p-4">
                  <p className="text-sm font-medium text-[#1E293B] mb-1">Example {i + 1}:</p>
                  <div className="font-mono text-sm text-[#64748B] space-y-1">
                    <p><span className="text-[#2E7D32]">Input:</span> {example.input}</p>
                    <p><span className="text-[#2E7D32]">Output:</span> {example.output}</p>
                    {example.explanation && (
                      <p className="text-xs mt-2"><span className="text-[#2E7D32]">Explanation:</span> {example.explanation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Constraints</h3>
            <p className="text-[#64748B] text-sm font-mono">{problem.constraints}</p>
          </div>
        )}

        {/* Hints */}
        {hints.length > 0 && (
          <Collapsible open={hintsOpen} onOpenChange={setHintsOpen}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#FFD54F]" />
                  <h3 className="font-semibold text-[#1E293B]">Hints ({hints.length})</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#64748B] transition-transform ${hintsOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <div className="space-y-2">
                  {hints.map((hint, i) => (
                    <p key={i} className="text-sm text-[#64748B] p-3 bg-[#FFF8E1] rounded-lg">
                      💡 {hint}
                    </p>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* Solution Approaches */}
        {solutions.length > 0 && (
          <Collapsible open={solutionOpen} onOpenChange={setSolutionOpen}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between">
                <h3 className="font-semibold text-[#1E293B]">Solution Approaches</h3>
                <ChevronDown className={`w-5 h-5 text-[#64748B] transition-transform ${solutionOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <div className="space-y-4">
                  {solutions.map((sol, i) => (
                    <div key={i} className="p-4 bg-[#E8F5E9] rounded-xl">
                      <p className="font-medium text-[#2E7D32] mb-2">{sol.name}</p>
                      <p className="text-sm text-[#64748B]">{sol.description}</p>
                      {sol.complexity && (
                        <p className="text-xs text-[#2E7D32] mt-2 font-mono">Complexity: {sol.complexity}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* External Links */}
        {externalLinks.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Practice On</h3>
            <div className="flex flex-wrap gap-2">
              {externalLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    {link.platform}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
