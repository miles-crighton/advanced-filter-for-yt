import { getLocalStorage, setLocalStorage } from './localStorage'
import { convertVideoDuration } from './helperFunctions'

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

/**
 * Request video durations from YT API if not found locally
 * @param {Array} videoIDs - List of strings for video ids
 * @return {object}          Map of all ids to their durations
 */
export async function getVideoDurations(videoIDs) {
    console.log('Getting video durations...')
    
    let durations = JSON.parse(getLocalStorage('ytVideoDurations'))
    if (durations === null) { durations = {} }

    let videoString = ''
    for (let i = 0; i < videoIDs.length; i++) {
        let id = videoIDs[i]
        if (durations[id] === undefined) {
            videoString += id
            if ( i !== videoIDs.length - 1) { 
                videoString += '%2C'
            }
        }
    }

    let baseURL = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails'
    let fullURL = baseURL + '&id=' + videoString + '&key=' + API_KEY 
    let resp = await fetch(fullURL)
    let json = await resp.json()
    let items = await json.items

    for (let item of items) {
        durations[item.id] = convertVideoDuration(item.contentDetails.duration)
    }

    setLocalStorage('ytUserIDs', durations)
    console.log('Durations stored: ', getLocalStorage('ytVideoDurations'))

    //Return only requested IDs - Or all currently mapped?
    return durations
}