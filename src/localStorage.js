
/**
 * Set the value of an item in browsers local storage
 * @param {string} name - Name of item to fetch from storage
 * @return {boolean}      Returns success of setting item
 */
export function setLocalStorage(name, value) {
    const supportsLocalStorage = 'localStorage' in window
    if (supportsLocalStorage) {
        localStorage.setItem(name, JSON.stringify(value))
        return true
    }
    return false
}

/**
 * Get an item from browsers local storage
 * @param {string} name - Name of item to fetch from storage
 * @return {object}       The recovered object or null if not found
 */
export function getLocalStorage(name) {
    const supportsLocalStorage = 'localStorage' in window
    if (supportsLocalStorage) {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name)
        }
    }
    return null
}