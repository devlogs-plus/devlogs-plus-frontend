import {getSingleProject} from "./api/projects.js";
import useCollaborators from "./hooks/useCollaborators.js";

export function addIfNotEmpty(obj, key, value) {
    if (value?.trim()) {
        obj[key] = value
    }
}

export async function getProjectOwnerId(projectId) {
    try {
        const project = await getSingleProject(projectId)
        return project?.owner_user_id || null
    } catch (err) {
        return null
    }
}

export async function getProjectName(projectId) {
    try {
        const project = await getSingleProject(projectId)
        return project?.title || null
    } catch (err) {
        return null
    }
}

export function getCollabUserIds(projectId) {
    const {data: collaboratorIds} = useCollaborators(projectId, {
        select: (res) => res?.collaborator_user_ids ?? res
    })
    return collaboratorIds
}