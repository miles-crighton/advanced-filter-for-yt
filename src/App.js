import React from 'react';
import styled from 'styled-components'

import logo from './logo.svg'
import InputFields from './components/InputFields'
import DataTable from './components/DataTable'
import StatusDisplay from './components/StatusDisplay'

import { convertVideoDuration, getVideoDurations } from './helperFunctions'
import { getID } from './apiFunctions'

const AppStyled = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  height: 100%;
`

const Logo = styled.img`
  width: 120px;
  margin-right: 10px;
`

const Title = styled.div`
  display: flex;
  width: 100%;
`

const OuterContainer = styled.div`
  background-color: lightgrey;
  min-width: 460px;
  height: 100%;

  footer {
    background: grey;
    width: 100%;
    padding: 5px 0px 5px 0px;
    color: white;
    text-align: center
  }
  p {
    margin: 5px;
  }
`

const InnerContainer = styled.div`
    margin: 0px 30px 0px 30px;
`

const API_KEY = 'AIzaSyD6ba4mKmnnU0EVfg_hy_jNI3B8eJchAo4'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ids: {},
      durations: {},
      status: 'initial',
    }
    this.getVideos = this.getVideos.bind(this)
    this.sortItems = this.sortItems.bind(this)
  }

  async getVideos(username, searchTerm, lowerDuration, upperDuration) {
    this.setState({ status: 'fetching' })
    try {
      let id = await getID(username)
      // let data = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + searchTerm + '&channelId=' + id + '&key=' + API_KEY)
      // let json = await data.json()
      // let items = await json.items
      // console.log(json)

      // if (items.length === 0) {
      //   this.setState({ status: 'noresults' })
      // } else {
      //   let durations = await getVideoDurations(items)
      //   await items.forEach(item => {
      //     return Object.assign(item, { duration: durations[item.id.videoId] })
      //   })
      //   let newItems = await items.filter(item => {
      //     //TODO: Improve this catch for missing duration from API request
      //     if (item.duration !== undefined) {
      //       return lowerDuration < item.duration.minutes && item.duration.minutes < upperDuration
      //     }
      //     return false
      //   })
      //   this.setState({ items: newItems, status: 'fetched' })
      // }
    } catch (error) {
      console.log(error)
      this.setState({ status: 'error' })
    }
  }



  sortItems(ascending = false) {
    console.log('Sorting items...')
    let items = [...this.state.items]
    let itemsSorted = items.sort((a, b) => {
      return ascending ? 
        b.duration.minutes - a.duration.minutes :
        a.duration.minutes - b.duration.minutes
    });
    this.setState({ items: itemsSorted })
  }

  render() {
    return (
      <AppStyled>
        <OuterContainer>
          <InnerContainer>
            <Title>
              <Logo src={logo} alt='logo'></Logo>
              <h1>Advanced Filter</h1>
            </Title>
            <InputFields submit={this.getVideos} />
            <StatusDisplay status={this.state.status} />
            {this.state.status === 'fetched' ? <DataTable items={this.state.items} sortItems={this.sortItems} /> : null}
          </InnerContainer>
          <footer>
            <p>Assests & Data property of YouTube ©</p>
          </footer>
        </OuterContainer>

      </AppStyled>
    );
  }
}

export default App;
