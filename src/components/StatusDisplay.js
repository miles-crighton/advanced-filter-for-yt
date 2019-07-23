import React from 'react'
import styled from 'styled-components'

const StatusContainer = styled.div`
  width: 100%;
  padding: 5px;
  text-align: center;
`

export default function StatusDisplay(props) {
    switch (props.status) {
        case 'initial':
            return <StatusContainer />
        case 'fetching':
            return <StatusContainer>Fetching Results...</StatusContainer>
        case 'noresults':
            return <StatusContainer>No results found</StatusContainer>
        case 'error':
            return <StatusContainer>Error</StatusContainer>
        case 'fetched':
            return ''
        default:
            return <StatusContainer></StatusContainer>
    }
}