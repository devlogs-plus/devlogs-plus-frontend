import {apiFetch} from "./client.js";

export function getProjects() {
    return apiFetch('/projects')
}