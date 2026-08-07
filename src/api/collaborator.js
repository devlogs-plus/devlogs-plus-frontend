import {apiFetch} from "./client.js";

export function addCollaborator({projectId, userId}) {
    return apiFetch(`/projects/${projectId}/collaborators`, {
        method: 'POST',
        body: JSON.stringify({
            'user_id': userId
        })
    })
}

export function viewCollaborators(projectId) {
    return apiFetch(`/projects/${projectId}/collaborators`)
}

export function deleteCollaborator({projectId, userId}) {
    return apiFetch(`/projects/${projectId}/collaborators/${userId}`, {
        method: 'DELETE'
    })
}