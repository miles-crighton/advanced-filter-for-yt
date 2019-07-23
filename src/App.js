import React from 'react';
import './App.css';
import logo from './logo.svg'
import InputFields from './components/InputFields'
import DataTable from './components/DataTable'
import styled from 'styled-components'

const AppStyled = styled.div`
  display: flex;
  justify-content: center;
`

const Logo = styled.img`
  width: 120px;
  margin-right: 10px;
`

const Title = styled.div`
  display: flex;
`

const Container = styled.div`
  background-color: lightgrey;
  padding: 30px;
  height: 100%;
`

const API_KEY = 'AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ids: {}
    }
    this.getID = this.getID.bind(this)
    this.getVideos = this.getVideos.bind(this)
  }

  //Converts a YT username to an ID number
  async getID(username) {
    console.log('Getting ID...')

    if (this.state.ids[username] !== undefined) {
      let id = this.state.ids[username]
      console.log(`Found cached id: ${id} for ${username}`)
      return this.state.ids[username]
    }
    
    let resp = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=' + username + '&key=' + API_KEY)
    let json = await resp.json()

    if (json.items.length === 0){
      throw Error("Unable to convert username to ID");
    }

    let id = json.items[0].id
    this.setState((prevState) => {
      return { ids: Object.assign({}, this.state.ids, { [username]: id }) }
    })
    console.log(`Id for ${username} fetched: ${id}`)
    return id
  }

  async getVideos(username, searchTerm, lowerDuration, upperDuration) {
    try {
      let id = await this.getID(username)
      let data = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + searchTerm + '&channelId=' + id + '&key=' + API_KEY)
      let json = await data.json()
      let items = await json.items
      let durations = await this.getVideoDurations(items)
  
      await items.forEach(item => {
        return Object.assign(item, {duration: durations[item.id.videoId]})
      })
      let newItems = await items.filter(item => {
        //TODO: Improve this catch for missing duration from API request
        if (item.duration !== undefined) {
          return lowerDuration < item.duration.minutes && item.duration.minutes < upperDuration
        }
        return false
      })
      console.log(newItems)
      this.setState({ items: newItems })
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
    console.log(items)
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
    let hoursString = duration.match(hoursRegex)
    let hours = hoursString === null ? 0 : parseInt(hoursString[0].slice(0, hoursString[0].length - 1))

    let minutesRegex = /\d+M/
    let minutesString = duration.match(minutesRegex)
    let minutes = minutesString === null ? 0 : parseInt(minutesString[0].slice(0, minutesString[0].length - 1))

    let secondsRegex = /\d+S/
    let secondsString = duration.match(secondsRegex)
    let seconds = secondsString === null ? 0 : parseInt(secondsString[0].slice(0, secondsString[0].length - 1))

    let durationFormatted = {
      hours,
      minutes,
      seconds
    }
    
    return durationFormatted
  }

  render() {
    return (
      <AppStyled>
        <Container>
          <Title>
            <Logo src={logo} alt='logo'></Logo>
            <h1>Advanced Filter</h1>
          </Title>

          
          <InputFields submit={this.getVideos} />
          <DataTable items={this.state.items} />
        </Container>
      </AppStyled>
    );
  }
}

export default App;
