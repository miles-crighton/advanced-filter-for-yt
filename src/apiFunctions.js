import { getLocalStorage, setLocalStorage } from './localStorage'

const API_KEY = 'AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4'

//Converts a YT username to an ID number
export async function getID(username) {
    console.log('Getting ID...')

    let ids = JSON.parse(getLocalStorage('ytUserIDs'))
    if (ids === null) { ids = {} }

    if (ids[username] !== undefined) {
        let id = ids[username]
        console.log(`Found cached id: ${id} for ${username}`)
        return ids[username]
    }

    const url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=' + username + '&key=' + API_KEY
    let resp = await fetch(url)
    let json = await resp.json()

    if (json.items.length === 0) {
        throw Error("Unable to convert username to ID");
    }

    let id = json.items[0].id
    console.log(`Id for ${username} fetched: ${id}`)

    //Set local storage
    ids[username] = id
    setLocalStorage('ytUserIDs', ids)
    console.log('IDs stored: ', getLocalStorage('ytUserIDs'))

    return id
}