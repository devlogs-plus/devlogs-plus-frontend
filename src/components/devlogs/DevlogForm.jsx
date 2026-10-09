import {useRef, useState, useMemo} from "react";
import {parseApiError} from "../../api/client.js";
import useCreateDevlog from "../../hooks/devlogs/useCreateDevlog.js";
import usePublishDevlog from "../../hooks/devlogs/usePublishDevlog.js";
import {Input} from "../common/Input.jsx";
import {TextArea} from "../common/TextArea.jsx";
import {Button} from "../common/Button.jsx";
import usePageTitle from "../../hooks/other/usePageTitle.js";
import {useCurrentUser} from "../../hooks/auth/useAuth.js";
import useUsersProjects from "../../hooks/projects/useUsersProjects.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {Select} from "../common/Select.jsx";
import useTimeSinceLastDevlog from "../../hooks/timetracking/useTimeSinceLastDevlog.js";
import {makeSecondsReadable} from "../../helperFunctions.js";

// helper to extract a numeric total from various API response shapes
function extractTotal(d) {
    if (!d) return null
    if (typeof d === 'number') return d
    if (typeof d === 'object') {
        if (typeof d.total_time === 'number') return d.total_time
        if (typeof d.total_time === 'string' && /^\d+$/.test(d.total_time)) return Number(d.total_time)
        if (typeof d.total_seconds === 'number') return d.total_seconds
        if (typeof d.seconds === 'number') return d.seconds
        if (d.data) return extractTotal(d.data)
        const nums = Object.values(d).filter(v => typeof v === 'number' || (typeof v === 'string' && /^\d+$/.test(v)))
        if (nums.length === 1) return Number(nums[0])
    }
    return null
}

export function DevlogForm({ onCreated }) {
    const titleRef = useRef(null)
    const bodyRef = useRef(null)
    const [projectId, setProjectId] = useState("")
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const createMutation = useCreateDevlog()
    const publishMutation = usePublishDevlog()
    const {data: currentUser, isLoading: isUserLoading} = useCurrentUser()
    const {
        projects,
        loading: projectsLoading,
        error: projectsError
    } = useUsersProjects({}, currentUser?.id)
    const {timeSince, isLoading: isTimeSpentLoading, error: timeSpentError, data: timeSinceData} = useTimeSinceLastDevlog(projectId)
    const devlogTimeSeconds = useMemo(() => {
        const total = extractTotal(timeSinceData ?? timeSince)
        return total != null ? Number(total) : null
    }, [timeSinceData, timeSince])
    usePageTitle('Create a Devlog')

    async function createDevlog(e) {
        e.preventDefault()
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)

        const title = titleRef.current?.value?.trim() || ""
        const body = bodyRef.current?.value?.trim() || ""
        const selectedProjectId = projectId

        const errors = {}
        if (!title) errors.title = "Title is required"
        if (!body) errors.body_markdown = "Body is required"
        if (!selectedProjectId) {
            errors.project_id = "Please select a project"
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        setIsSubmitting(true)

        const devlogObject = {
            title,
            body_markdown: body,
            project_id: projectId
        }
        if (devlogTimeSeconds != null) {
            devlogObject.seconds_spent = Number(devlogTimeSeconds)
        }

        try {
            const created = await createMutation.mutateAsync(devlogObject)
            setSuccessMessage("Devlog created successfully")
            if (typeof onCreated === "function") onCreated(created)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message || "ERROROROROROR!!!!")
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    async function publishDevlog(e) {
        e.preventDefault()
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)

        const title = titleRef.current?.value?.trim() || "";
        const body = bodyRef.current?.value?.trim() || "";
        const selectedProjectId = projectId

        const errors = {}
        if (!title) errors.title = "Title is required"
        if (!body) errors.body_markdown = "Body is required"
        if (!selectedProjectId) {
            errors.project_id = "Please select a project"
        }
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        setIsSubmitting(true)
        try {
            const createPayload = {
                title,
                body_markdown: body,
                project_id: projectId
            }
            if (devlogTimeSeconds != null) createPayload.seconds_spent = Number(devlogTimeSeconds)
            const created = await createMutation.mutateAsync(createPayload)
            const published = await publishMutation.mutateAsync({
                projectId: created.project_id,
                devlogId: created.id
            })
            setSuccessMessage("Devlog published successfully")
            if (typeof onCreated === "function") onCreated(published)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message || "ERROROROROROR!!!!")
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    const isLoadingProjects = isUserLoading || projectsLoading
    if (isLoadingProjects || isTimeSpentLoading) return <LoadingSpinner/>
    const hasNoProjects = !isLoadingProjects && projects.length === 0

    return (
        <div className="projectForm">
            <h2>Create Devlog</h2>
            {generalError && <p className="error">{generalError}</p> }
            {projectsError && <p className="error">{projectsError.message || "Error loading Projects"}</p>}
            {timeSpentError && <p className="error">{timeSpentError.message || "Error loading time spent"}</p> }
            {successMessage && <p className="success">{successMessage}</p> }
            {devlogTimeSeconds != null && (
                <p>Time that will be added to this devlog: {makeSecondsReadable(Number(devlogTimeSeconds) || 0)}</p>
            )}

            <p>Title</p>
            <Input name="title" ref={titleRef}/>
            {fieldErrors.title && <p className="error">{fieldErrors.title}</p>}

            <p>Body</p>
            <TextArea name="body_markdown" ref={bodyRef}/>
            {fieldErrors.body_markdown && <p className="error">{fieldErrors.body_markdown}</p>}

            <p>Project</p>
            <Select name="project_id" value={projectId} onChange={(e) => setProjectId(e.target.value)} disabled={isLoadingProjects || hasNoProjects || isSubmitting}>
                <option value="" disabled>
                    {isLoadingProjects
                    ? "Loading projects.."
                    : hasNoProjects
                        ? "No projects found"
                        : "Select a project"}
                </option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </Select>
            {fieldErrors.project_id && <p className="error">{fieldErrors.project_id}</p>}

            <Button id="createProjectButton" onClick={createDevlog} disabled={isSubmitting}>{isSubmitting ? "Creating Draft.." : "Create Draft"}</Button>
            <Button id="publishProjectButton" onClick={publishDevlog} disabled={isSubmitting}>{isSubmitting ? "Publishing.." : "Publish Devlog"}</Button>
        </div>
    )
}

export default DevlogForm