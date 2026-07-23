import {Link} from "react-router-dom";

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
        <div className="projectCard">
            <Link to={`/projects/${id}`}>
                <p>-----------------------</p>
                <h3>{name}</h3>
                <p>{shortDescription}</p>
                <p>Demo Url: {demoUrl}</p>
                <p>Repo Url: {repoUrl}</p>
                <p>-----------------------</p>
            </Link>
        </div>
    );
}
export default ProjectCard