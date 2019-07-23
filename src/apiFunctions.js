import { getLocalStorage, setLocalStorage } from './localStorage'
import { convertVideoDuration } from './helperFunctions'

const API_KEY = 'AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4'

//Converts a YT username to an ID number
export async function getID(username) {
    console.log('Getting ID...')

    //Retrieve browser cached Ids
    let ids = JSON.parse(getLocalStorage('ytUserIDs'))
    if (ids === null) { ids = {} }

    //If requested username is cached, return it
    if (ids[username] !== undefined) {
        let id = ids[username]
        console.log(`Found cached id: ${id} for ${username}`)
        return ids[username]
    }

    //Request ID from YT API
    const baseURL = 'https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername='
    const fullURL = baseURL + username + '&key=' + API_KEY
    let resp = await fetch(fullURL)
    let json = await resp.json()

    //If not found - throw error
    if (json.items.length === 0) {
        throw Error("Unable to convert username to ID");
    }

    //Set ID from requested data
    let id = json.items[0].id
    console.log(`Id for ${username} fetched: ${id}`)

    //Store updated id map in browser
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
    
    //Retrieve browser cached durations
    let durations = JSON.parse(getLocalStorage('ytVideoDurations'))
    if (durations === null) { durations = {} }

    //Generate string of video IDs that need to be requested
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

    //Fetch durations from YT API
    let baseURL = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails'
    let fullURL = baseURL + '&id=' + videoString + '&key=' + API_KEY 
    let resp = await fetch(fullURL)
    let json = await resp.json()
    let items = await json.items

    //Add new durations to map
    for (let item of items) {
        durations[item.id] = convertVideoDuration(item.contentDetails.duration)
    }

    //Store durations in browser
    setLocalStorage('ytUserIDs', durations)
    console.log('Durations stored: ', getLocalStorage('ytVideoDurations'))

    //Return only requested IDs - Or all currently mapped?
    return durations
}