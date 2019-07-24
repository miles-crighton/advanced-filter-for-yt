import React from 'react';
import styled from 'styled-components'

import developedYoutube from './youtube.png'
import InputFields from './components/InputFields'
import DataTable from './components/DataTable'
import StatusDisplay from './components/StatusDisplay'

import { getVideoList } from './apiFunctions'

const AppStyled = styled.div`
    margin: 0;
    display: flex;
    justify-content: center;
    height: 100%;
`
const DevelopedYoutube = styled.img`
    width: 200px;
`
const Title = styled.div`
    display: flex;
    justify-content: center;
    vertical-align: bottom;
    width: 100%;
    h1 {
        margin: 5px;
    }
    h3 {
        margin-left: 5px;
        margin-right: 0px;
    }
`
const OuterContainer = styled.div`
    background-color: lightgrey;
    min-width: 460px;
    height: 100%;

    footer {
        display: flex;
        justify-content: center;
        vertical-align: middle; 
        background: grey;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
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
        this.setState({ items: [], status: 'fetching' })
        const { items, status } = await getVideoList(username, searchTerm, lowerDuration, upperDuration)
        this.setState( { items, status } )
    }

    sortItems(ascending = false) {
        console.log('Sorting items...')
        let items = [...this.state.items]
        let itemsSorted = items.sort((a, b) => {
            return ascending ? 
                b.duration.minutes - a.duration.minutes || b.duration.seconds - a.duration.seconds :
                a.duration.minutes - b.duration.minutes || a.duration.seconds - b.duration.seconds
        });
        this.setState({ items: itemsSorted })
    }

    render() {
        return (
            <AppStyled>
                <OuterContainer>
                    <InnerContainer>
                        <Title>
                            <h1>Advanced Filter</h1>
                            <h3>for</h3>
                            <h1>YouTube</h1>

                        </Title>
                        <InputFields submit={this.getVideos} />
                        <StatusDisplay status={this.state.status} />
                        {this.state.status === 'fetched' ? <DataTable items={this.state.items} sortItems={this.sortItems} /> : null}
                    </InnerContainer>
                    <footer>
                        <DevelopedYoutube src={developedYoutube} alt={'Developed with YouTube'}/>
                    </footer>
                </OuterContainer>
            </AppStyled>
        );
    }
}

export default App;
