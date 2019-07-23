import React from 'react'

export default function DataTable(props) {
    return (
        <table>
            <tbody>
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
        </table>
    )
}
