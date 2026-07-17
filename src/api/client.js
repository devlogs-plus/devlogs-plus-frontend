const BASE_URL = import.meta.env.BASE_URL

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: 'include',
        headers: {'Content-Type': 'application/json', ...options.headers},
        ...options
    })
    if (!res.ok) throw new Error(await res.text())
    if (res.status === 204) return null
    return res.json()
}