export function addIfNotEmpty(obj, key, value) {
    if (value?.trim()) {
        obj[key] = value
    }
}