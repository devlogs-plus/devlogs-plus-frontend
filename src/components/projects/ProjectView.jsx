import {getSingleProject} from "../../api/projects.js";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NotFoundPage from "../common/NotFoundPage.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

export function ProjectView() {
    const { id: projectId} = useParams()
    const {user} = useAuth()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getSingleProject(projectId)
                setProject(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [projectId])

    if (loading) return <div>Loading..</div>
    if (error) return <div>Error: {error.message}</div>
    if (!project) return <NotFoundPage/>

    const {name, short_description, repo_url, demo_url, created_at, owner_user_id: ownerId} = project
    const isOwner = user && user.id === ownerId

    return (
        <>
            <h1>{name}</h1>
            <div className="projectDescription">
                {short_description}
            </div>
            <p>Git Repo: {repo_url}</p>
            <p>Demo: {demo_url}</p>
            <p>Created: {created_at}</p>
            <p>the project id is {projectId}</p>
            {isOwner && (
                <Link to={`/projects/edit/${projectId}`}>
                    <button>Edit Project</button>
                </Link>
            )}
        </>
    )
}

export default ProjectView