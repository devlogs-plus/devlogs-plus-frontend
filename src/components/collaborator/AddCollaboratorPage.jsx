import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import useAddCollaborator from "../../hooks/useAddCollaborator.js";
import {parseApiError} from "../../api/client.js";
import {useAuth} from "../../context/AuthContext.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {getProjectOwnerId} from "../../helperFunctions.js";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";

export function AddCollaboratorPage() {
    const userIdRef = useRef(null)
    const {projectId} = useParams()
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const addMutation = useAddCollaborator()
    const {user} = useAuth()
    const currentUserId = user?.id
    const [ownerId, setOwnerId] = useState(undefined)
    const [isLoadingOwner, setIsLoadingOwner] = useState(true)

    useEffect(() => {
        let mounted = true
        setIsLoadingOwner(true)
        getProjectOwnerId(projectId)
            .then(id => {
                if (!mounted) return
                setOwnerId(id)
            })
            .catch(() => {
                if (!mounted) return
                setOwnerId(null)
            })
            .finally(() => {
                if (!mounted) return
                setIsLoadingOwner(false)
            })
        return () => {mounted = false}
    }, [projectId]);

    async function addCollaborator() {
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setIsSubmitting(true)

        const userIdValue = userIdRef.current?.value?.trim() || ""
        if (!userIdValue) {
            setFieldErrors({user_id: "User Id is required"})
            setIsSubmitting(false)
            return
        }
        if (!/^\d+$/.test(userIdValue)) {
            setFieldErrors({ user_id: "User id must contain only digits" })
            setIsSubmitting(false)
            return
        }

        try {
            const added = await addMutation.mutateAsync({projectId: projectId, userId: userIdValue})
            setSuccessMessage("Collaborator added successfully.")
            if (typeof onCreated === "function") onCreated(added)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message)
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoadingOwner || isSubmitting) return <LoadingSpinner/>
    if (Number(ownerId) !== Number(currentUserId)) return <UnauthorizedRoute/>

    return (
        <div className="projectForm">
            <h2>Add Collaborator</h2>
            {generalError && <p className="error">{generalError}</p> }
            {successMessage && <p className="success">{successMessage}</p> }

            <p>User Id</p>
            <Input name="userid" ref={userIdRef}/>
            {fieldErrors.user_id && <p className="error">{fieldErrors.user_id}</p> }

            <Button id="addCollaborator" onClick={addCollaborator} disabled={isSubmitting}>{isSubmitting ? "Adding..":"Add Collaborator"}</Button>
        </div>
    )
}

export default AddCollaboratorPage