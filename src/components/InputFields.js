import React, { useState } from 'react'

export default function InputFields(props) {
    const [username, setUsername] = useState('yogawithadriene')
    const [searchTerm, setSearchterm] = useState('Back')
    const [lowerDuration, setLowerDuration] = useState(0)
    const [upperDuration, setUpperDuration] = useState(30)

    function handleSubmit(e) {
        e.preventDefault()
        props.submit(username, searchTerm, lowerDuration, upperDuration)
    }

    return (
        <form onSubmit={handleSubmit}>
            <span>Channel Name: </span>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
            <span>Search Term: </span>
            <input type='text' value={searchTerm} onChange={e => setSearchterm(e.target.value)} />
            <span>Duration: </span>
            <input type='number' value={lowerDuration} onChange={e => setLowerDuration(e.target.value)} />
            <span>to</span>
            <input type='number' value={upperDuration} onChange={e => setUpperDuration(e.target.value)} />
            <button onClick={handleSubmit}>Execute</button>
        </form>
    );
}