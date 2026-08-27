import {useRef, useState} from "react";
import {parseApiError} from "../../api/client.js";
import useCreateDevlog from "../../hooks/useCreateDevlog.js";
import usePublishDevlog from "../../hooks/usePublishDevlog.js";
import {Input} from "../common/Input.jsx";
import {TextArea} from "../common/TextArea.jsx";
import {Button} from "../common/Button.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";
import {useCurrentUser} from "../../hooks/useAuth.js";
import useUsersProjects from "../../hooks/useUsersProjects.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {Select} from "../common/Select.jsx";

export function DevlogForm() {
    const titleRef = useRef(null)
    const bodyRef = useRef(null)
    const projectIdRef = useRef(null)
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
    usePageTitle('Create a Devlog')

    async function createDevlog(e) {
        e.preventDefault()
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)

        const title = titleRef.current?.value?.trim() || ""
        const body = bodyRef.current?.value?.trim() || ""
        const projectId = projectIdRef.current?.value?.trim() || ""

        const errors = {}
        if (!title) errors.title = "Title is required"
        if (!body) errors.body_markdown = "Body is required"
        if (!projectId) {
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
        const projectId = projectIdRef.current?.value?.trim() || ""

        const errors = {}
        if (!title) errors.title = "Title is required"
        if (!body) errors.body_markdown = "Body is required"
        if (!projectId) {
            errors.project_id = "Please select a project"
        }
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        setIsSubmitting(true)
        try {
            const created = await createMutation.mutateAsync({
                title,
                body_markdown: body,
                project_id: projectId
            })
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
    if (isLoadingProjects) return <LoadingSpinner/>
    const hasNoProjects = !isLoadingProjects && projects.length === 0

    return (
        <div className="projectForm">
            <h2>Create Devlog</h2>
            {generalError && <p className="error">{generalError}</p> }
            {projectsError && <p className="error">{projectsError.message || "Error loading Projects"}</p>}
            {successMessage && <p className="success">{successMessage}</p> }

            <p>Title</p>
            <Input name="title" ref={titleRef}/>
            {fieldErrors.title && <p className="error">{fieldErrors.title}</p>}

            <p>Body</p>
            <TextArea name="body_markdown" ref={bodyRef}/>
            {fieldErrors.body_markdown && <p className="error">{fieldErrors.body_markdown}</p>}

            <p>Project</p>
            <Select name="project_id" ref={projectIdRef} disabled={isLoadingProjects || hasNoProjects || isSubmitting} defaultValue="">
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