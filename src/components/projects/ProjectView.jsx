import {getSingleProject} from "../../api/projects.js";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NotFoundPage from "../common/NotFoundPage.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import ViewDevlogs from "../devlogs/ViewDevlogs.jsx";
import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import {Button} from "../common/Button.jsx";
import {UserCard} from "../auth/UserCard.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";

export function ProjectView() {
    const { id: projectId} = useParams()
    const {user} = useAuth()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    usePageTitle(project ? project.name : "Loading..")

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

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message}/>
    if (!project) return <NotFoundPage/>

    const {name, short_description, repo_url, demo_url, created_at, owner_user_id: ownerId} = project
    const isOwner = user && user.id === ownerId

    return (
        <>
            <h1>{name}</h1>
            <div className="projectDescription">
                <MarkdownRenderer content={short_description}/>
            </div>
            <p>Git Repo: {repo_url}</p>
            <p>Demo: {demo_url}</p>
            <p>Created: {created_at}</p>
            <p>the project id is {projectId}</p>
            <UserCard userId={ownerId}/>
            <Link to={`/projects/${projectId}/collaborators`}><Button>View Collaborators</Button></Link>
            {isOwner && (
                <>
                    <Link to={`/projects/edit/${projectId}`}>
                        <Button>Edit Project</Button>
                    </Link>
                    <Link to={`/projects/delete/${projectId}`}>
                        <Button>Delete Project</Button>
                    </Link>
                    <Link to={`/projects/${projectId}/collaborators/add`}>
                        <Button>Add Collaborator</Button>
                    </Link>
                    <Link to={`/projects/${projectId}/collaborators/remove`}>
                        <Button>Remove Collaborator</Button>
                    </Link>
                </>
            )}
            <h2>Devlogs</h2>
            <ViewDevlogs projectId={projectId}/>
        </>
    )
}

export default ProjectView