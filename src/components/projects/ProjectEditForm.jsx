import {useEffect, useRef, useState, useCallback} from "react";
import {parseApiError} from "../../api/client.js";
import {addIfNotEmpty} from "../../helperFunctions.js";
import {useParams} from "react-router-dom";
import useEditProject from "../../hooks/useEditProject.js";
import {getSingleProject} from "../../api/projects.js";

export function ProjectEditForm({onUpdated}) {
    const { id: projectId} = useParams()
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(Boolean(projectId))
    const [formData, setFormData] = useState({
        name: "",
        short_description: "",
        repo_url: "",
        demo_url: ""
    })
    const updateMutation = useEditProject()

    useEffect(() => {
        if (!projectId) {
            setLoading(false)
            return
        }

        let mounted = true
        getSingleProject(projectId)
            .then((project) => {
                if (!mounted) return
                console.log("Project loaded:", project)

                setFormData({
                    name: project.name ?? "",
                    short_description: project.short_description ?? "",
                    repo_url: project.repo_url ?? "",
                    demo_url: project.demo_url ?? ""
                })
                setLoading(false)
            })
            .catch((err) => {
                if (!mounted) return
                console.error("Error loading project:", err)
                setGeneralError(String(err?.message ?? err))
                setLoading(false)
            })
        return () => {mounted = false}
    }, [projectId])

    async function editProject() {
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setIsSubmitting(true)

        const projectObject = {}
        addIfNotEmpty(projectObject, "name", formData.name)
        addIfNotEmpty(projectObject, "short_description", formData.short_description)
        addIfNotEmpty(projectObject, "demo_url", formData.demo_url)
        addIfNotEmpty(projectObject, "repo_url", formData.repo_url)

        try {
            const updated = await updateMutation.mutateAsync({projectId, project: projectObject})
            setSuccessMessage("Project updated")

            if (typeof onUpdated === "function") onUpdated(updated)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message)
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return <div>Loading project..</div>

    return (
        <div className="projectEditForm">
            <h2>Edit Project</h2>
            {generalError && <p className="error">{generalError}</p> }
            {successMessage && <p className="success">{successMessage}</p> }

            <p>Name</p>
            <input name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
            {fieldErrors.name && <p className="error">{fieldErrors.name}</p>}

            <p>Short Description</p>
            <input name="shortDescription" value={formData.short_description} onChange={(e) => setFormData({...formData, short_description: e.target.value})}/>
            {fieldErrors.short_description && <p className="error">{fieldErrors.short_description}</p>}

            <p>Repo Url</p>
            <input name="repoUrl" value={formData.repo_url} onChange={(e) => setFormData({...formData, repo_url: e.target.value})}/>
            {fieldErrors.repo_url && <p className="error">{fieldErrors.repo_url}</p>}

            <p>Demo Url</p>
            <input name="demoUrl" value={formData.demo_url} onChange={(e) => setFormData({...formData, demo_url: e.target.value})}/>
            {fieldErrors.demo_url && <p className="error">{fieldErrors.demo_url}</p>}

            <button id="editProjectButton" onClick={editProject} disabled={isSubmitting}>{isSubmitting ? "Saving.." : "Save"}</button>
        </div>
    )
}

export default ProjectEditForm