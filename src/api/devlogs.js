import {apiFetch} from "./client.js";

export async function getDevlogsByProject(projectId) {
    return apiFetch(`/projects/${projectId}/devlogs`)
}

export async function createDevlog(devlog){
    return apiFetch(`/projects/${devlog.project_id}/devlogs`, {
        method: 'POST',
        body: JSON.stringify(devlog)
    })
}

export async function publishDevlog(projectId, devlogId) {
    return apiFetch(`/projects/${projectId}/devlogs/${devlogId}/publish`, {
        method: 'POST',
        body: JSON.stringify({})
    })
}

export async function getUnpublishedDevlogsByUser() {
    return apiFetch(`/users/devlogs/unpublished`)
}

export async function getSingleDevlog(projectId, devlogId) {
    return apiFetch(`/projects/${projectId}/devlogs/${devlogId}`)
}

export async function updateDevlog(projectId, devlogId, devlog) {
    return apiFetch(`/projects/${projectId}/devlogs/${devlogId}`, {
        method: `PATCH`,
        body: JSON.stringify(devlog)
    })
}

export async function unpublishDevlog(projectId, devlogId) {
    return apiFetch(`/projects/${projectId}/devlogs/${devlogId}/unpublish`, {
        method: 'POST',
        body: JSON.stringify({})
    })
}

export async function getFeed({page=1, per_page=10} ={}) {
    const qs = new URLSearchParams({page, per_page}).toString()
    return apiFetch(`/feed${qs}`)
}