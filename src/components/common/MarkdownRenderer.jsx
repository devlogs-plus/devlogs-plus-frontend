import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ content }) {
    return (
        <div style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ inline, className, children }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : 'text';

                        return !inline ? (
                            <SyntaxHighlighter style={tomorrow} language={language} PreTag="div">
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>
                                {children}
                            </code>
                        );
                    },
                    h1: ({ children }) => <h1 style={{ marginTop: '0.5em', marginBottom: '0.3em' }}>{children}</h1>,
                    h2: ({ children }) => <h2 style={{ marginTop: '0.4em', marginBottom: '0.25em' }}>{children}</h2>,
                    h3: ({ children }) => <h3 style={{ marginTop: '0.3em', marginBottom: '0.2em' }}>{children}</h3>,
                    a: ({ href, children }) => <a href={href} style={{ color: '#0066cc', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{children}</a>,
                    blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #ddd', paddingLeft: '1em', marginLeft: 0, color: '#666' }}>{children}</blockquote>,
                    table: ({ children }) => <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '1em' }}>{children}</table>,
                    th: ({ children }) => <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f5f5f5' }}>{children}</th>,
                    td: ({ children }) => <td style={{ border: '1px solid #ddd', padding: '8px' }}>{children}</td>,
                    ul: ({ children }) => <ul style={{ paddingLeft: '1.5em' }}>{children}</ul>,
                    ol: ({ children }) => <ol style={{ paddingLeft: '1.5em' }}>{children}</ol>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}