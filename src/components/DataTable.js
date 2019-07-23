import React from 'react'
import styled from 'styled-components'

let Table = styled.table`
    th {
        text-align: left;
    }
    td {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`

export default function DataTable(props) {
    return (
        <Table>
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Link</th>
                </tr>
                {props.items.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.snippet.title}</td>
                            <td>{item.duration.minutes} minutes</td>
                            <td><a href={'https://www.youtube.com/watch?v=' + item.id.videoId} target='_blank' rel="noopener noreferrer">Link</a></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
