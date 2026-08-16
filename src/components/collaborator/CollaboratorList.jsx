import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProjectName, getProjectOwnerId} from "../../helperFunctions.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import useCollaborators from "../../hooks/useCollaborators.js";
import usePageTitle from "../../hooks/usePageTitle.js";

export function CollaboratorList() {
    const {projectId} = useParams()
    const [ownerId, setOwnerId] = useState(undefined)
    const [projectTitle, setProjectTitle] = useState(undefined)
    const {data: collaboratorIds} = useCollaborators(projectId, {
        select: (res) => res?.collaborator_user_id ?? res
    })
    const [isLoadingOwner, setIsLoadingOwner] = useState(true)
    const [isLoadingTitle, setIsLoadingTitle] = useState(true)
    usePageTitle("View collaborator")

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
        getProjectName(projectId)
            .then(title => {
                if (!mounted) return
                setProjectTitle(title)
            })
            .catch(() => {
                if (!mounted) return
                setProjectTitle(null)
            })
            .finally(() => {
                if (!mounted) return
                setIsLoadingTitle(false)
            })
        return () => {mounted = false}
    }, [projectId]);

    if (isLoadingOwner || isLoadingTitle) return <LoadingSpinner/>

    return (
        <div className="collaboratorList">
            <h2>Collaborators for {projectTitle}</h2>
            <h4>Project Owner</h4>
            <p>User id: {ownerId}</p>
            <h4>Project Collaborators</h4>
            {Array.isArray(collaboratorIds) && collaboratorIds.length > 0 ? (
                <div>
                    {collaboratorIds.map(n => <p key={n}>{n}</p>)}
                </div>
            ) : (
                <p>No collaborators for this project</p>
            )}
        </div>
    )
}