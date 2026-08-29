import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useRef, useState} from "react";
import useDeleteCollaborator from "../../hooks/useDeleteCollaborator.js";
import {getProjectOwnerId, isValidEmail} from "../../helperFunctions.js";
import {parseApiError} from "../../api/client.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";
import {Button} from "../common/Button.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";
import {Input} from "../common/Input.jsx";
import BackButton from "../common/BackButton.jsx";
import useUserFromEmail from "../../hooks/useUserFromEmail.js";

export default function RemoveCollaboratorPage() {
    const emailRef = useRef(null)
    const {projectId} = useParams()
    const {user} = useAuth()
    const [removing, setRemoving] = useState(false)
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(false)
    const [emailToLookup, setEmailToLookup] = useState(null)
    const removeMutation = useDeleteCollaborator()
    const currentUserId = user?.id
    const [ownerId, setOwnerId] = useState(undefined)
    const [isLoadingOwner, setIsLoadingOwner] = useState(true)
    const navigate = useNavigate()
    const {user: collaboratorUser, isLoading: isLoadingUser, error: userLookupError} = useUserFromEmail(emailToLookup)
    usePageTitle("Remove collaborator")

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

    useEffect(() => {
        if (!emailToLookup || isLoadingUser || !collaboratorUser) return

        async function removeResolvedCollaborator() {
            const resolvedUserId = collaboratorUser?.id || collaboratorUser?.user_id

            if (!resolvedUserId) {
                setGeneralError("Could not find a user for that email.")
                setEmailToLookup(null)
                setRemoving(false)
                return
            }

            try {
                await removeMutation.mutateAsync({projectId, userId: resolvedUserId})
                setSuccessMessage("Collaborator removed successfully")
                setEmailToLookup(null)
                navigate(`/projects/${projectId}/collaborators`, {replace: true})
            } catch (err) {
                const parsed = parseApiError(err)
                setGeneralError(parsed.message)
                setFieldErrors(parsed.fields || {})
                setEmailToLookup(null)
                setRemoving(false)
            }
        }

        removeResolvedCollaborator()
    }, [collaboratorUser, emailToLookup, isLoadingUser, navigate, projectId])

    useEffect(() => {
        if (!userLookupError) return

        const parsed = parseApiError(userLookupError)
        setGeneralError(parsed.message)
        setFieldErrors(parsed.fields || {})
        setEmailToLookup(null)
        setRemoving(false)
    }, [userLookupError])

    async function removeCollaborator() {
        const email = emailRef.current?.value?.trim() || ""

        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)

        if (!email) {
            setFieldErrors({email: "Email is required"})
            return
        }

        if (!isValidEmail(email)) {
            setFieldErrors({email: "Enter a valid email address"})
            return
        }

        setRemoving(true)
        setEmailToLookup(email)
    }


    if (isLoadingOwner || removing || isLoadingUser) return <LoadingSpinner/>
    if (ownerId !== currentUserId) return <UnauthorizedRoute/>

    return (
        <div className="removeCollabForm">
            <BackButton/>
            <h2>Remove Collaborator</h2>
            {generalError && <p className="error">{generalError}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <p>User Email</p>
            <Input name="email" type="email" ref={emailRef}/>
            {fieldErrors.email && <p className="error">{fieldErrors.email}</p>}
            {fieldErrors.user_id && <p className="error">{fieldErrors.user_id}</p>}

            <Button id="removeCollaborator" onClick={removeCollaborator} disabled={removing}>{removing ? "Removing.." : "Remove Collaborator"}</Button>
        </div>
    )
}