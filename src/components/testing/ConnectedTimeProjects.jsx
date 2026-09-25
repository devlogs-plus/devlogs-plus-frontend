import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getSingleProject} from "../../api/projects.js";
import {useAuth} from "../../context/AuthContext.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import {Button} from "../common/Button.jsx";

export default function ConnectedTimeProjects({projectId: projectIdProp}) {
    const {projectId: routeProjectId, id} = useParams()
    const projectId = projectIdProp ?? routeProjectId ?? id
    const {user} = useAuth()

    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!projectId) {
            setLoading(false)
            setError(new Error("Missing project id"))
            return
        }

        let mounted = true

        async function loadProject() {
            try {
                setLoading(true)
                setError(null)

                const data = await getSingleProject(projectId)

                if (!mounted) return
                setProject(data)
            } catch (err) {
                if (!mounted) return
                setError(err)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        loadProject()

        return () => {
            mounted = false
        }
    }, [projectId])

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message}/>

    const connectedProjects = project?.time_tracking_projects ?? []
    const isOwner = user && String(user.id) === String(project?.owner_user_id)

    return (
        <div className="connectedTimeProjects">
            <h3>Connected Time Tracking Projects</h3>

            {connectedProjects.length === 0 ? (
                <p>No Hackatime/Wakatime projects are connected yet.</p>
            ) : (
                <ul>
                    {connectedProjects.map((timeProject, index) => {
                        const name = typeof timeProject === "string"
                            ? timeProject
                            : timeProject.name

                        const provider = typeof timeProject === "object"
                            ? timeProject.provider
                            : null

                        return (
                            <li key={`${name}-${index}`}>
                                {name}
                                {provider && <> <span>({provider})</span></>}
                            </li>
                        )
                    })}
                </ul>
            )}

            {isOwner && (
                <Link to={`/projects/${projectId}/timetracking`}>
                    <Button>Edit Connected Projects</Button>
                </Link>
            )}
        </div>
    )
}