import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface AIMessageRendererProps {
  content: string;
  className?: string;
}

export const AIMessageRenderer = ({ content, className }: AIMessageRendererProps) => {
  return (
    <div className={cn("prose prose-sm max-w-none", className)}>
      <ReactMarkdown
        components={{
          // Headings with professional styling - underlined and numbered appearance
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-foreground mt-5 mb-3 pb-2 border-b-2 border-primary first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-foreground mt-5 mb-3 pb-1.5 border-b border-primary/40 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border/60 first:mt-0">
              {children}
            </h3>
          ),
          
          // Paragraphs with optimized typography
          p: ({ children }) => (
            <p className="text-[15px] leading-[1.75] tracking-[0.01em] text-foreground/80 mb-3 last:mb-0">
              {children}
            </p>
          ),
          
          // Bold text stands out
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          
          // Italic for emphasis
          em: ({ children }) => (
            <em className="italic text-foreground/80">{children}</em>
          ),
          
          // Professional unordered lists
          ul: ({ children }) => (
            <ul className="my-4 space-y-3 pl-0 list-none">{children}</ul>
          ),
          
          // Professional ordered lists with counter
          ol: ({ children }) => (
            <ol className="my-4 space-y-3 pl-0 list-none [counter-reset:list-counter]">{children}</ol>
          ),
          
          // List items with styled bullets
          li: ({ children }) => {
            return (
              <li className="flex items-start gap-3 text-[15px] leading-[1.75] text-foreground/80">
                <span className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>
                </span>
                <span className="flex-1">{children}</span>
              </li>
            );
          },
          
          // Code blocks with syntax highlighting style
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block p-3 rounded-lg bg-muted text-foreground text-sm font-mono overflow-x-auto my-3">
                {children}
              </code>
            );
          },
          
          // Pre blocks for code
          pre: ({ children }) => (
            <pre className="my-3 rounded-lg overflow-hidden">{children}</pre>
          ),
          
          // Blockquotes for important notes
          blockquote: ({ children }) => (
            <blockquote className="my-3 pl-4 border-l-4 border-accent bg-accent/20 py-2 pr-3 rounded-r-lg text-foreground/80 italic">
              {children}
            </blockquote>
          ),
          
          // Links styled professionally
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/50 hover:decoration-primary transition-colors"
            >
              {children}
            </a>
          ),
          
          // Horizontal rules
          hr: () => (
            <hr className="my-4 border-t border-border" />
          ),
          
          // Tables for structured data
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-lg border border-border">
              <table className="min-w-full divide-y divide-border">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border bg-background">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr>{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-sm text-foreground/80">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
