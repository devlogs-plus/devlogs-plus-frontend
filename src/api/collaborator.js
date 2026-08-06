import {apiFetch} from "./client.js";

export function addCollaborator({projectId, userId}) {
    return apiFetch(`/projects/${projectId}/collaborators`, {
        method: 'POST',
        body: JSON.stringify({
            'user_id': userId
        })
    })
}