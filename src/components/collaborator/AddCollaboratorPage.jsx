import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import useAddCollaborator from "../../hooks/useAddCollaborator.js";
import {parseApiError} from "../../api/client.js";
import {useAuth} from "../../context/AuthContext.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {getProjectOwnerId, isValidEmail} from "../../helperFunctions.js";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";
import BackButton from "../common/BackButton.jsx";
import useUserFromEmail from "../../hooks/useUserFromEmail.js";

export function AddCollaboratorPage() {
    const emailRef = useRef(null)
    const {projectId} = useParams()
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [emailToLookup, setEmailToLookup] = useState(null)
    const addMutation = useAddCollaborator()
    const {user} = useAuth()
    const currentUserId = user?.id
    const [ownerId, setOwnerId] = useState(undefined)
    const [isLoadingOwner, setIsLoadingOwner] = useState(true)
    const navigate = useNavigate()
    const {user: collaboratorUser, isLoading: isLoadingUser, error: userLookupError} = useUserFromEmail(emailToLookup)
    usePageTitle("Add collaborator");

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

        async function addResolvedCollaborator() {
            const resolvedUserId = collaboratorUser?.id || collaboratorUser?.user_id

            if (!resolvedUserId) {
                setGeneralError("Could not find a user for that email.")
                setEmailToLookup(null)
                setIsSubmitting(false)
                return
            }

            try {
                await addMutation.mutateAsync({projectId, userId: resolvedUserId})
                setSuccessMessage("Collaborator added successfully.")
                navigate(`/projects/${projectId}/collaborators`, {replace: true})
            } catch (e) {
                const parsed = parseApiError(e)
                setGeneralError(parsed.message)
                setFieldErrors(parsed.fields || {})
                setEmailToLookup(null)
                setIsSubmitting(false)
            }
        }

        addResolvedCollaborator()
    }, [collaboratorUser, emailToLookup, isLoadingUser, navigate, projectId]);


    useEffect(() => {
        if (!userLookupError) return
        
        const parsed = parseApiError(userLookupError)
        setGeneralError(parsed.message)
        setFieldErrors(parsed.fields || {})
        setIsSubmitting(false)
    }, [userLookupError]);

    async function addCollaborator() {
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)

        const email = emailRef.current?.value?.trim() || ""
        if (!email) {
            setFieldErrors({email: "Email is required"})
            return
        }
        if (!isValidEmail(email)) {
            setFieldErrors({email: "Enter a valid email address"})
            return
        }

        setIsSubmitting(true)
        setEmailToLookup(email)
    }

    if (isLoadingOwner || isSubmitting || isLoadingUser) return <LoadingSpinner/>
    if (Number(ownerId) !== Number(currentUserId)) return <UnauthorizedRoute/>

    return (
        <div className="projectForm">
            <BackButton/>
            <h2>Add Collaborator</h2>
            {generalError && <p className="error">{generalError}</p> }
            {successMessage && <p className="success">{successMessage}</p> }

            <p>User Email</p>
            <Input name="email" type="email" ref={emailRef}/>
            {fieldErrors.email && <p className="error">{fieldErrors.email}</p> }

            <Button id="addCollaborator" onClick={addCollaborator} disabled={isSubmitting}>{isSubmitting ? "Adding..":"Add Collaborator"}</Button>
        </div>
    )
}

export default AddCollaboratorPage