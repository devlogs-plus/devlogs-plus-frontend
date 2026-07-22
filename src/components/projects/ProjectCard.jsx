import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

export function ProjectCard({ project }) {
    const {user} = useAuth()

    if (!project) {
        return null
    }

    const {
        name,
        short_description: shortDescription,
        demo_url: demoUrl,
        repo_url: repoUrl,
        id,
        owner_user_id: ownerId
    } = project;

    const isOwner = user && user.id === ownerId

    return (
        <div className="projectCard">
            <Link to={`/projects/${id}`}>
                <p>-----------------------</p>
                <h3>{name}</h3>
                <p>{shortDescription}</p>
                <p>Demo Url: {demoUrl}</p>
                <p>Repo Url: {repoUrl}</p>
            </Link>
            {isOwner && (
                <Link to={`/projects/edit/${id}`}>
                    <button>Edit Project</button>
                </Link>
            )}
            <Link to={`/projects/${id}`}>
                <p>-----------------------</p>
            </Link>
        </div>
    );
}
export default ProjectCard