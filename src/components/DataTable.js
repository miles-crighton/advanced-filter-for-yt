import React from 'react'

export default function DataTable(props) {
    return (
        <ul>
            {props.items.map((item, idx) => {
                return (
                    <li key={idx}>
                        <span>{item.snippet.title} - </span>
                        <span>{item.duration.minutes} minutes - </span>
                        <a href={'https://www.youtube.com/watch?v=' + item.id.videoId} target='_blank' rel="noopener noreferrer">Link</a>
                    </li>
                )
            })}
        </ul>
    )
}
