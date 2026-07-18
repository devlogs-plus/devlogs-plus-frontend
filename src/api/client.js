const API_BASE = import.meta.env.VITE_API_BASE

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        headers: {'Content-Type': 'application/json', ...options.headers},
        ...options
    })
    if (!res.ok) throw new Error(await res.text())
    if (res.status === 204) return null
    return res.json()
}