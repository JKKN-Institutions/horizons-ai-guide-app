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
          // Headings with professional styling
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-gray-900 mt-4 mb-3 pb-2 border-b border-gray-200 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-gray-800 mt-3 mb-2 first:mt-0">
              {children}
            </h3>
          ),
          
          // Paragraphs with optimized typography
          p: ({ children }) => (
            <p className="text-[15px] leading-[1.75] tracking-[0.01em] text-gray-700 mb-3 last:mb-0">
              {children}
            </p>
          ),
          
          // Bold text stands out
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          
          // Italic for emphasis
          em: ({ children }) => (
            <em className="italic text-gray-700">{children}</em>
          ),
          
          // Professional unordered lists
          ul: ({ children }) => (
            <ul className="my-3 space-y-2 pl-0 list-none">{children}</ul>
          ),
          
          // Professional ordered lists
          ol: ({ children }) => (
            <ol className="my-3 space-y-2 pl-0 list-none counter-reset-item">{children}</ol>
          ),
          
          // List items with custom bullets
          li: ({ children, ...props }) => {
            // Check if parent is ordered list by looking for ordered prop
            const isOrdered = props.node?.position?.start?.offset !== undefined && 
              content.slice(0, props.node.position.start.offset).match(/\d+\.\s*$/);
            
            return (
              <li className="flex items-start gap-2 text-[15px] leading-[1.7] text-gray-700">
                <span className="flex-shrink-0 mt-1.5">
                  {isOrdered ? (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                      •
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
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
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-emerald-700 text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block p-3 rounded-lg bg-gray-900 text-gray-100 text-sm font-mono overflow-x-auto my-3">
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
            <blockquote className="my-3 pl-4 border-l-4 border-amber-400 bg-amber-50/50 py-2 pr-3 rounded-r-lg text-gray-700 italic">
              {children}
            </blockquote>
          ),
          
          // Links styled professionally
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 decoration-emerald-300 hover:decoration-emerald-500 transition-colors"
            >
              {children}
            </a>
          ),
          
          // Horizontal rules
          hr: () => (
            <hr className="my-4 border-t border-gray-200" />
          ),
          
          // Tables for structured data
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-100 bg-white">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr>{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-sm text-gray-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
