import {getSingleProject} from "../../api/projects.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NotFoundPage from "../common/NotFoundPage.jsx";

export function ProjectView() {
    const { id: projectId} = useParams()
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
    if (!project) return <div>Project not found</div>

    const {name, short_description, repo_url, demo_url, created_at} = project

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
        </>
    )
}

export default ProjectView