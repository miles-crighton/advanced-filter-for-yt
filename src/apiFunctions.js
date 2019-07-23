const API_KEY = 'AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4'

//Converts a YT username to an ID number
export async function getID(username, ids) {
    console.log('Getting ID...')

    if (ids[username] !== undefined) {
        let id = ids[username]
        console.log(`Found cached id: ${id} for ${username}`)
        return ids[username]
    }

    let resp = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=' + username + '&key=' + API_KEY)
    let json = await resp.json()

    if (json.items.length === 0) {
        throw Error("Unable to convert username to ID");
    }

    let id = json.items[0].id
    console.log(`Id for ${username} fetched: ${id}`)
    return id
}