import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import {Link} from "react-router-dom";

export function DevlogsCard({devlog}) {
    const {
        title,
        body_markdown: bodyMarkdown,
        id,
        project_id: projectId
    } = devlog

    return (
        <Link to={`/projects/${projectId}/devlogs/${id}`}>
            <div className="devlogCard">
                <p>------------------</p>
                <h3>{title}</h3>
                <p>id: {id}</p>
                <MarkdownRenderer content={bodyMarkdown}/>
                <p>------------------</p>
            </div>
        </Link>
    )
}