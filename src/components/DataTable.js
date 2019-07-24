import React from 'react'
import styled from 'styled-components'

let Table = styled.table`
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 400px;
    th {
        text-align: left;
    }
    td {
        max-width: 250px;
    }
`
const ThDuration = styled.th`
    display: flex;
    width: 120px;
`

let TdTitle = styled.td`
    width: 300px;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const CircleButton = styled.button`
    background: white;
    color: black;
    border-radius: 20px;
    padding: 2px;
    width: 20px;
    outline: none;
`
const ButtonHolder = styled.div`
    margin-left: 2px;
`

export default function DataTable(props) {
    return (
        <Table>
            <tbody>
                <tr>
                    <th>Title</th>
                    <ThDuration>
                        <div>Duration</div>
                        <ButtonHolder>
                            <CircleButton onClick={() => props.sortItems(true)}>↑</CircleButton>
                            <CircleButton onClick={() => props.sortItems(false)}>↓</CircleButton>
                        </ButtonHolder>
                    </ThDuration>
                    <th>Link</th>
                </tr>
                {props.items.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <TdTitle>{item.snippet.title}</TdTitle>
                            <td style={{textAlign: 'center'}}>{item.duration.minutes}m {item.duration.seconds}s</td>
                            <td><a href={'https://www.youtube.com/watch?v=' + item.id.videoId} target='_blank' rel="noopener noreferrer">Link</a></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
