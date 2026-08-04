import {useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import useEditDevlog from "../../hooks/useEditDevlog.js";
import {getSingleDevlog} from "../../api/devlogs.js";
import {addIfNotEmpty} from "../../helperFunctions.js";
import {parseApiError} from "../../api/client.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";

export function DevlogEditForm({onUpdated}) {
    const {projectId, devlogId} = useParams()
    const {user} = useAuth()
    const currentUserId = user?.id
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(Boolean(devlogId))
    const [ownerId, setOwnerId] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        body_markdown: ""
    })
    const updateMutation = useEditDevlog()

    useEffect(() => {
        if (!devlogId) {
            setLoading(false)
            return
        }
        let mounted = true
        getSingleDevlog(projectId, devlogId)
            .then((devlog) => {
                if (!mounted) return
                setFormData({
                    title: devlog.title ?? "",
                    body_markdown: devlog.body_markdown ?? ""
                })
                setOwnerId(devlog.author_user_id)
                setLoading(false)
            })
            .catch((err) => {
                if (!mounted) return
                setGeneralError(String(err?.message ?? err))
                setLoading(false)
            })
        return () => {mounted = false}
    }, [devlogId, projectId]);

    async function editDevlog() {
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setIsSubmitting(true)

        const devlogObject = {}
        addIfNotEmpty(devlogObject, "title", formData.title)
        addIfNotEmpty(devlogObject, "body_markdown", formData.body_markdown)

        try {
            const updated = await updateMutation.mutateAsync({projectId, devlogId, devlog: devlogObject})
            setSuccessMessage("Project update")
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
        <div className="devlogEditForm">
            <h2>Edit Devlog</h2>
            {generalError && <p className="error">{generalError}</p> }
            {successMessage && <p className="success">{successMessage}</p> }

            <p>Title</p>
            <input name="title" value={formData.title} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
            {fieldErrors.title && <p className="error">{fieldErrors.title}</p>}

            <p>Body</p>
            <textarea name="title" value={formData.body_markdown} onChange={(e) => setFormData({...formData, body_markdown: e.target.value})}/>
            {fieldErrors.body_markdown && <p className="error">{fieldErrors.body_markdown}</p> }

            <button id="editDevlogButton" onClick={editDevlog} disabled={isSubmitting}>{isSubmitting ? "Saving.." : "Save"}</button>
        </div>
    )
}

export default DevlogEditForm