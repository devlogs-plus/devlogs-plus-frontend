import {useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import useModifyTimeProjects from "../../hooks/timetracking/useModifyTimeProjects.js";
import usePageTitle from "../../hooks/other/usePageTitle.js";
import {getSingleProject} from "../../api/projects.js";
import {getArrayOfAllProjects, getHackaProjects, getWakaProjects} from "../../api/timetracking.js";
import {extractHackaProjects, extractWakaProjects} from "../../helperFunctions.js";
import {parseApiError} from "../../api/client.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";
import BackButton from "../common/BackButton.jsx";
import ProjectSelector from "../common/ProjectSelector.jsx";
import {Button} from "../common/Button.jsx";

export default function HackatimeEdit({onUpdated}) {
    const {projectId} = useParams()
    const {user} = useAuth()
    const currentUserId = user?.id
    const [wakaProjects, setWakaProjects] = useState(null)
    const [hackaProjects, setHackaProjects] = useState(null)
    const [allProjects, setAllProjects] = useState(null)
    const [request, setRequest] = useState({time_tracking_projects: []})
    const [projectName, setProjectName] = useState(null)
    const [ownerId, setOwnerId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const modifyTimeProjectsMutation = useModifyTimeProjects()
    usePageTitle(projectName ? `Edit time projects for ${projectName}` : "Edit time projects")

    useEffect(() => {
        if (!projectId) {
            setLoading(false)
            return
        }
        let mounted = true

        async function loadData() {
            try {
                setLoading(true)
                setGeneralError(null)

                const [project, waka, hacka, allProjectsList] = await Promise.all([
                    getSingleProject(projectId),
                    getWakaProjects(),
                    getHackaProjects(),
                    getArrayOfAllProjects()
                ])
                if (!mounted) return

                setProjectName(project.name ?? "")
                setOwnerId(project.owner_user_id)
                setRequest({
                    time_tracking_projects: project.time_tracking_projects?? []
                })
                setWakaProjects(extractWakaProjects(waka))
                setHackaProjects(extractHackaProjects(hacka))
                setAllProjects(allProjectsList)
            } catch (err) {
                if (!mounted) return
                setGeneralError(String(err.message ?? err))
            } finally {
                if (mounted) setLoading(false)
            }
        }
        loadData()
        return () => {
            mounted = false
        }
    }, [projectId]);

    async function editTimeProjects() {
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setIsSubmitting(true)

        try {
            const updated = await modifyTimeProjectsMutation.mutateAsync({projectId, projects: request})
            setSuccessMessage('Connect projects updated.')
            if (typeof onUpdated === "function") onUpdated(updated)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message)
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return <LoadingSpinner/>
    if (ownerId !== currentUserId) return <UnauthorizedRoute/>

    return (
        <div>
            <BackButton/>
            <h2>Edit Connected Time Tracking Projects</h2>
            {projectName && <p>Editing linked Hackatime/Wakatime projects for {projectName}</p>}

            {generalError && <p className="error">{generalError}</p> }
            {successMessage && <p className="success">{successMessage}</p>}

            <h3>Select one or more projects</h3>
            <ProjectSelector
                allProjects={allProjects}
                hackaProjects={hackaProjects}
                wakaProjects={wakaProjects}
                onRequestChange={setRequest}
            />
            {fieldErrors.time_tracking_projects && (
                <p className="error">{fieldErrors.time_tracking_projects}</p>
            )}

            <Button id="editTimeProjectsButton" onClick={editTimeProjects} disabled={isSubmitting}>
                {isSubmitting ? "Saving.." : "Save"}
            </Button>
        </div>
    )
}