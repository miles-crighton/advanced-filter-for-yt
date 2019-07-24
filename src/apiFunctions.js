import { getLocalStorage, setLocalStorage } from './localStorage'
import { convertVideoDuration } from './helperFunctions'

const API_KEY = process.env.REACT_APP_API_KEY

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

    //Fetch uncached durations from YT API
    if (videoString !== '') {
        let baseURL = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails'
        let fullURL = baseURL + '&id=' + videoString + '&key=' + API_KEY
        let resp = await fetch(fullURL)
        let json = await resp.json()
        let items = json.items

        //Add new durations to map
        for (let item of items) {
            durations[item.id] = convertVideoDuration(item.contentDetails.duration)
        }

        //Store durations in browser
        setLocalStorage('ytVideoDurations', durations)
        console.log('Durations stored: ', getLocalStorage('ytVideoDurations'))
    }

    //Compile requested durations from videoIDs
    let requestedDurations = {}
    for (let id of videoIDs) {
        requestedDurations[id] = durations[id]
    }

    return requestedDurations
}

/**
 * Request videos that match argument criteria from YT API
 * @param {String} username - Requested username for search query
 * @param {String} searchTerm - Requested search term
 * @param {Number} lowerDuration - Lower bound for video durations
 * @param {Number} upperDuration - Upper bound for video durations
 * @return {object}          Returns items and status to react { status, items }
 */
export async function getVideoList(username, searchTerm, lowerDuration, upperDuration) {
    try {
        //Retrieve the ID for the requested username
        let id = await getID(username)

        //Request search query data from YT API
        const MAX_RESULTS = 5
        const baseURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet'
        const fullURL = baseURL + '&maxResults=' + MAX_RESULTS + '&q=' + searchTerm + ' &channelId=' + id + ' &key=' + API_KEY
        let data = await fetch(fullURL)
        let json = await data.json()
        let items = json.items

        //Check if above search query returned results
        if (items.length === 0) {
            return { items: [], status: 'noresults'}
        }

        //Get durations of videos from above search query
        let videoIDs = items.map(item => {
            return item.id.videoId
        })
        let durations = await getVideoDurations(videoIDs)

        //Handle filtering based on video durations
        items.forEach(item => {
            return Object.assign(item, { duration: durations[item.id.videoId] })
        })
        let newItems = items.filter(item => {
            //TODO: Improve this catch for missing duration from API request
            if (item.duration !== undefined) {
                return lowerDuration < item.duration.minutes && item.duration.minutes < upperDuration
            }
            return false
        })

        return { items: newItems, status: 'fetched' }
    } catch (error) {
        console.log(error)
        return ({ items: [], status: 'error' })
    }
}