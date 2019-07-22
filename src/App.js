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
      this.getVideoTimes(items)
    } catch (error) {
      console.log(error)
    }
    //'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=[YOUR_API_KEY]'
  }

  async getVideoTimes(videos) {
    let videoString = ''
    for (let video of videos) {
      videoString += video.id.videoId + '%2C'
    }
    videoString = videoString.slice(0, videoString.length - 3)
    console.log(videoString)
    let full_url = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + videoString + '&key=' + API_KEY
    console.log(full_url)
    let resp = await fetch(full_url)
    let json = await resp.json()
    console.log(json)
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
