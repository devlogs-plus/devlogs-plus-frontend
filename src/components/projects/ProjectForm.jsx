import {useRef, useState} from "react";
import useCreateProject from "../../hooks/useCreateProject.js";
import {parseApiError} from "../../api/client.js";

export function ProjectForm() {
    const nameRef = useRef(null)
    const descRef = useRef(null)
    const repoRef = useRef(null)
    const demoRef = useRef(null)
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const createMutation = useCreateProject()

    async function createProject() {
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setIsSubmitting(true)

        const projectObject = {
            "name": nameRef.current.value,
            "short_description": descRef.current.value,
            "demo_url": descRef.current.value,
            "repo_url": repoRef.current.value
        }

        try {
            const created = await createMutation.mutateAsync(projectObject)
            setSuccessMessage("Project created successfully.")

            if (typeof onCreated === "function") onCreated(created)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message)
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="projectForm">
            <h2>Create Project</h2>
            {generalError && <p className="error">{generalError}</p> }
            {successMessage && <p className="success">{successMessage}</p> }

            <p>Name</p>
            <input name="name" ref={nameRef}/>
            {fieldErrors.name && <p className="error">{fieldErrors.name}</p>}

            <p>Short Description</p>
            <input name="shortDescription" ref={descRef}/>
            {fieldErrors.short_description && <p className="error">{fieldErrors.short_description}</p>}

            <p>Repo Url</p>
            <input name="repoUrl" ref={repoRef}/>
            {fieldErrors.repo_url && <p className="error">{fieldErrors.repo_url}</p>}

            <p>Demo Url</p>
            <input name="demoUrl" ref={demoRef}/>
            {fieldErrors.demo_url && <p className="error">{fieldErrors.demo_url}</p>}

            <button id="createProjectButton" onClick={createProject} disabled={isSubmitting}>{isSubmitting ? "Creating.." : "Create"}</button>
        </div>
    )
}

export default ProjectForm