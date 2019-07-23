export function setLocalStorage(object) {
    const supportsLocalStorage = 'localStorage' in window
    if (supportsLocalStorage) {
        localStorage.setItem('metrics', JSON.stringify(object))
        return true
    }
    return false
}

export function getLocalStorage(object) {
    const supportsLocalStorage = 'localStorage' in window
    if (supportsLocalStorage) {
        if (localStorage.getItem(object)) {
            return localStorage.getItem(object)
        }
    }
    return false
}