import React, { useState } from 'react'

export default function InputFields(props) {
    const [username, setUsername] = useState('yogawithadriene')
    const [searchterm, setSearchterm] = useState('Back')

    function handleSubmit(e) {
        e.preventDefault()
        props.submit(username, searchterm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <span>Channel Name: </span>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
            <span>Key words: </span>
            <input type='text' value={searchterm} onChange={e => setSearchterm(e.target.value)} />
            <button onClick={handleSubmit}>Execute</button>
        </form>
    );
}