import {apiFetch} from "./client.js";

export async function getDevlogsByProject(projectId) {
    return apiFetch(`/projects/${projectId}/devlogs`)
}