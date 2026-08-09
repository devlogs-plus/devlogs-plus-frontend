import {getSingleProject} from "./api/projects.js";

export function addIfNotEmpty(obj, key, value) {
    if (value?.trim()) {
        obj[key] = value
    }
}

export async function getProjectOwnerId(projectId) {
    try {
        const project = await getSingleProject(projectId)
        return Number(project?.owner_user_id) || null
    } catch (err) {
        return null
    }
}

export async function getProjectName(projectId) {
    try {
        const project = await getSingleProject(projectId)
        return project?.name || null
    } catch (err) {
        return null
    }
}

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isNumbersOnly(value) {
    return /^\d+$/.test(String(value).trim())
}