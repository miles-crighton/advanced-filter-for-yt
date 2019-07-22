import React from 'react';
import './App.css';
import InputFields from './components/InputFields'
import DataTable from './components/DataTable'

const API_KEY = 'AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4' 

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.getID = this.getID.bind(this)
    this.getVideos = this.getVideos.bind(this)
  }

  //Converts a YT username to an ID number
  async getID(username) {
    console.log('Getting ID...')
    let resp = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=' + username + '&key=AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4')
    let json = await resp.json()

    if (json.items.length === 0){
      throw Error("Unable to convert username to ID");
    }

    let id = json.items[0].id
    console.log(`Id for ${username} fetched: ${id}`)
    return id
  }

  async getVideos(username) {
    try {
      let id = await this.getID(username)
      let data = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=back&channelId=' + id + '&key=AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4')
      let json = await data.json()
      let items = await json.items
      console.log(items)
      this.setState({ items })
      let durations = await this.getVideoDurations(items)
      let newItems = items.map(item => {
        return Object.assign(item, {duration: durations[item.id.videoId]})
      })
      console.log(newItems)
    } catch (error) {
      console.log(error)
    }
  }

  async getVideoDurations(videos) {
    let videoString = ''
    for (let video of videos) {
      videoString += video.id.videoId + '%2C'
    }
    videoString = videoString.slice(0, videoString.length - 3) //Remove last %2C
    let full_url = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + videoString + '&key=' + API_KEY
    let resp = await fetch(full_url)
    let json = await resp.json()
    let items = await json.items
    let durations = {}
    for (let item of items) {
      durations[item.id] = this.convertVideoDuration(item.contentDetails.duration)
    }
    console.log(durations)
    return durations
  }

  convertVideoDuration(duration) {
    //Input must be string
    let hoursRegex = /\d+H/
    let hours = duration.match(hoursRegex)

    let minutesRegex = /\d+M/
    let minutes = duration.match(minutesRegex)

    let secondsRegex = /\d+S/
    let seconds = duration.match(secondsRegex)

    let durationFormatted = {
      hours: hours === null ? undefined : hours[0],
      minutes: minutes === null ? undefined : minutes[0],
      seconds: seconds === null ? undefined : seconds[0]
    }
    
    return durationFormatted
  }

  render() {
    return (
      <div>
        <h1>YouTube Advanced Filter</h1>
        <InputFields submit={this.getVideos} />
        <DataTable items={this.state.items} />
      </div>
    );
  }
}

export default App;
