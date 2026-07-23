import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {deleteProject, getSingleProject} from "../../api/projects.js";
import {parseApiError} from "../../api/client.js";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";

export function ProjectDeletePage() {
    const { id: projectId} = useParams()
    const navigate = useNavigate()
    const {user} = useAuth()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState(null)
    const [ownerId, setOwnerId] = useState(null)

    useEffect(() => {
        let mounted = true
        getSingleProject(projectId)
            .then((project) => {
                if (!mounted) return
                setProject(project)
                setOwnerId(project.owner_user_id)
                setLoading(false)
            })
            .catch((err) => {
                if (!mounted) return
                setError(err.message)
                setLoading(false)
            })
        return () => {mounted = false}
    }, [projectId])

    async function handleDelete() {
        if (!window.confirm(`Are you sure you want to delete "${project.name}"? This cannot be undone`)) {
            return
        }
        setDeleting(true)
        setError(null)

        try {
            await deleteProject(projectId)
            navigate('/projects')
        } catch (err) {
            const parsed = parseApiError(err)
            setError(parsed.message)
            setDeleting(false)
        }
    }

    const currentUserId = user?.id

    if (loading) return <div>Loading</div>
    if (error && !project) return <div>Error: {error}</div>
    if (ownerId !== currentUserId) return <UnauthorizedRoute/>

    return (
        <div className="projectDeletePage">
            <h2>Delete Project</h2>
            {error && <p className="error">{error}</p>}

            <div className="deleteWarning">
                <p>Project: {project?.name}</p>
                <p>Warning!! This action is permanent</p>
            </div>

            <button onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting.." : "Delete Project"}
            </button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    )
}

export default ProjectDeletePage