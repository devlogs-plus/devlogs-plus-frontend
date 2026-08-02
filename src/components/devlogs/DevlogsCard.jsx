import MarkdownRenderer from "../common/MarkdownRenderer.jsx";

export function DevlogsCard({devlog}) {
    const {
        title,
        body_markdown: bodyMarkdown
    } = devlog

    return (
        <div className="devlogCard">
            <p>------------------</p>
            <h3>{title}</h3>
            <MarkdownRenderer content={bodyMarkdown}/>
            <p>------------------</p>
        </div>
    )
}