import React, { useState } from 'react'

export default function InputFields(props) {
    const [username, setUsername] = useState('yogawithadriene')

    function handleSubmit(e) {
        e.preventDefault()
        props.submit(username)
    }

    return (
        <form onSubmit={handleSubmit}>
            <span>Channel Name: </span>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
            <button onClick={handleSubmit}>Execute</button>
        </form>
    );
}