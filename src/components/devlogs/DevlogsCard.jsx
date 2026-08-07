import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import {Link} from "react-router-dom";
import styles from './DevlogsCard.module.css'

export function DevlogsCard({devlog}) {
    const {
        title,
        body_markdown: bodyMarkdown,
        id,
        project_id: projectId
    } = devlog

    return (
        <Link to={`/projects/${projectId}/devlogs/${id}`} className={styles.card}>
                <p className={styles.divider}>------------------</p>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.id}>id: {id}</p>
                <MarkdownRenderer content={bodyMarkdown}/>
                <p className={styles.divider}>------------------</p>
        </Link>
    )
}