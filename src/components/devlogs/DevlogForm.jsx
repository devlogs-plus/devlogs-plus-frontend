import {useRef, useState} from "react";
import {parseApiError} from "../../api/client.js";
import useCreateDevlog from "../../hooks/useCreateDevlog.js";
import usePublishDevlog from "../../hooks/usePublishDevlog.js";

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

    async function createDevlog(e) {
        e.preventDefault()
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setIsSubmitting(true)

        const devlogObject = {
            "title": titleRef.current.value,
            "body_markdown": bodyRef.current.value,
            "project_id": projectIdRef.current.value
        }

        try {
            const created = await createMutation.mutateAsync(devlogObject)
            setSuccessMessage("Devlog created successfully")
            if (typeof onCreated === "function") onCreated(created)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message || "An error happened")
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
        setIsSubmitting(true)

        const devlogObject = {
            "title": titleRef.current.value,
            "body_markdown": bodyRef.current.value,
            "project_id": projectIdRef.current.value
        }

        try {
            // First create the devlog
            const created = await createMutation.mutateAsync(devlogObject)
            console.log("Created devlog:", created)  // Debug: verify id and project_id exist

            // Then publish it (created already has both id and project_id from backend)
            const published = await publishMutation.mutateAsync({
                projectId: created.project_id,
                devlogId: created.id
            })
            setSuccessMessage("Devlog published successfully")
            if (typeof onCreated === "function") onCreated(published)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message || "An error happened")
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="projectForm">
            <h2>Create Devlog</h2>
            {generalError && <p className="error">{generalError}</p> }
            {successMessage && <p className="success">{successMessage}</p> }

            <p>Title</p>
            <input name="name" ref={titleRef}/>
            {fieldErrors.name && <p className="error">{fieldErrors.title}</p>}

            <p>Body</p>
            <input name="shortDescription" ref={bodyRef}/>
            {fieldErrors.short_description && <p className="error">{fieldErrors.body_markdown}</p>}

            <p>Project ID</p>
            <input name="repoUrl" ref={projectIdRef}/>
            {fieldErrors.repo_url && <p className="error">{fieldErrors.project_id}</p>}

            <button id="createProjectButton" onClick={createDevlog} disabled={isSubmitting}>{isSubmitting ? "Creating Draft.." : "Create Draft"}</button>
            <button id="createProjectButton" onClick={publishDevlog} disabled={isSubmitting}>{isSubmitting ? "Publishing.." : "Publish Devlog"}</button>
        </div>
    )
}

export default DevlogForm