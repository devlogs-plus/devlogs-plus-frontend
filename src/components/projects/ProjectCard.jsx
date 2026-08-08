import {Link} from "react-router-dom";
import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import styles from "./ProjectCard.module.css"

export function ProjectCard({ project }) {
    if (!project) {
        return null
    }

    const {
        name,
        short_description: shortDescription,
        demo_url: demoUrl,
        repo_url: repoUrl,
        id
    } = project;

    return (
        <div className={styles.card}>
            <Link to={`/projects/${id}`}>
                <h3 className={styles.name}>{name}</h3>
                <MarkdownRenderer content={shortDescription}/>
                <p className={styles.url}>Demo Url: {demoUrl}</p>
                <p className={styles.url}>Repo Url: {repoUrl}</p>
            </Link>
        </div>
    );
}
export default ProjectCard