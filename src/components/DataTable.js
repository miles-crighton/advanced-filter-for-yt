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
        max-width: 200px;
    }
`

let TdTitle = styled.td`
        width: 300px;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
`

export default function DataTable(props) {
    return (
        <Table>
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Duration 
                        <button onClick={() => props.sortItems(true)}>^</button>
                        <button onClick={() => props.sortItems(false)}>\/</button>
                    </th>
                    <th>Link</th>
                </tr>
                {props.items.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <TdTitle>{item.snippet.title}</TdTitle>
                            <td>{item.duration.minutes}m {item.duration.seconds}s</td>
                            <td><a href={'https://www.youtube.com/watch?v=' + item.id.videoId} target='_blank' rel="noopener noreferrer">Link</a></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
