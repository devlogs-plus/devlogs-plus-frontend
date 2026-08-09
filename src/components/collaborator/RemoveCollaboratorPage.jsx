import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useRef, useState} from "react";
import useDeleteCollaborator from "../../hooks/useDeleteCollaborator.js";
import {getProjectOwnerId} from "../../helperFunctions.js";
import {parseApiError} from "../../api/client.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";
import {Button} from "../common/Button.jsx";

export default function RemoveCollaboratorPage() {
    const {projectId} = useParams()
    console.log('RemoveCollaboratorPage - projectId:', projectId)
    const {user} = useAuth()
    const [removing, setRemoving] = useState(false)
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(false)
    const removeMutation = useDeleteCollaborator()
    const currentUserId = user?.id
    const [ownerId, setOwnerId] = useState(undefined)
    const [isLoadingOwner, setIsLoadingOwner] = useState(true)
    const userIdRef = useRef(null)

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

    async function removeCollaborator() {
        const userId = userIdRef.current.value

        console.log('Attempting to remove collaborator:', {projectId, userId})

        if (!userId || !userId.trim()) {
            setGeneralError("Please enter a User ID")
            return
        }

        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setRemoving(true)

        try {
            const removed = await removeMutation.mutateAsync({projectId: projectId, userId: userId})
            setSuccessMessage("Collaborator removed successfully")
            if (typeof onCreated === "function") onCreated(removed)
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message)
            setFieldErrors(parsed.fields || {})
        } finally {
            setRemoving(false)
        }
    }

    if (isLoadingOwner || removing) return <LoadingSpinner/>
    if (ownerId !== currentUserId) return <UnauthorizedRoute/>

    return (
        <div className="removeCollabForm">
            <h2>Remove Collaborator</h2>
            {generalError && <p className="error">{generalError}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <p>User Id</p>
            <input name="userid" ref={userIdRef}/>
            {fieldErrors.user_id && <p className="error">{fieldErrors.user_id}</p>}

            <Button id="removeCollaborator" onClick={removeCollaborator} disabled={removing}>{removing ? "Removing.." : "Remove Collaborator"}</Button>
        </div>
    )
}