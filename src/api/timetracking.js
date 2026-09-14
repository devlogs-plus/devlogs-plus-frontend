import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE

export function connectWaka() {
    window.location.href = `${API_BASE}/auth/wakatime/connect`
}

export function connectHacka() {
    window.location.href = `${API_BASE}/auth/hackatime/connect`
}

export function disconnectWaka() {
    window.location.href = `${API_BASE}/auth/wakatime/disconnect`
}

export function disconnectHacka() {
    window.location.href = `${API_BASE}/auth/hackatime/disconnect`
}

export async function doesWakaExist() {
    try {
        await axios.get(`${API_BASE}/auth/wakatime/exists`, {withCredentials: true})
        return true
    } catch (e) {
        if (e.response?.status === 404) {
            return false
        }
        throw e
    }
}

export async function doesHackaExist() {
    try {
        await axios.get(`${API_BASE}/auth/hackatime/exists`, {withCredentials: true})
        return true
    } catch (e) {
        if (e.response?.status === 404) {
            return false
        }
        throw e
    }
}