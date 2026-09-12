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