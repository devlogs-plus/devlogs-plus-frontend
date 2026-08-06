import {getSingleProject} from "./api/projects.js";

export function addIfNotEmpty(obj, key, value) {
    if (value?.trim()) {
        obj[key] = value
    }
}

export async function getProjectOwnerId(projectId) {
    try {
        const project = await getSingleProject(projectId)
        return project?.owner_id || null
    } catch (err) {
        return null
    }
}