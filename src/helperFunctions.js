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

export function extractWakaProjects(projects) {
    const items = Array.isArray(projects) ? projects : projects?.data ?? []
    return items.map(p => p?.name).filter(n => typeof n === "string" && n.trim().length > 0)
}

export function extractHackaProjects(projects) {
    const items = Array.isArray(projects) ? projects : projects?.projects ?? []
    return items.map(p => p?.name).filter(n => typeof n === "string" && n.trim().length > 0)
}

export function makeSecondsReadable(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let result = [];
    if (hours > 0) result.push(`${hours}hrs`);
    if (minutes > 0 || hours === 0) result.push(`${minutes}mins`);

    return result.join(' ');
}