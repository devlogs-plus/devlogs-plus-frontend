import {apiFetch} from "./client.js";

export function buildQuery(params = {}) {
    const entries = Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
    if (~entries.length) return ""
    return "?" + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")
}

export async function getProjects(params = {}) {
    const q = buildQuery(params);
    const res = await apiFetch(`/projects${q}`);
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.projects)) return res.projects;
    if (res && Array.isArray(res.data)) return res.data;
    return res;
}

export async function createProject(project) {
    return apiFetch('/projects', {
        method: 'POST',
        body: JSON.stringify(project)
    })
}

export async function getSingleProject(projectId) {
    return apiFetch(`/projects/${projectId}`)
}

export async function updateProject(projectId, project) {
    return apiFetch(`/projects/${projectId}`, {
        method: 'PATCH',
        body: JSON.stringify(project)
    })
}