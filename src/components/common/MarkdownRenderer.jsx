import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import styles from "./MarkdownRenderer.module.css"

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
                    h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
                    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
                    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                    a: ({ href, children }) => <a href={href} className={styles.a} target="_blank" rel="noopener noreferrer">{children}</a>,
                    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
                    table: ({ children }) => <table className={styles.table}>{children}</table>,
                    th: ({ children }) => <th className={styles.th}>{children}</th>,
                    td: ({ children }) => <td className={styles.td}>{children}</td>,
                    ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
                    ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}