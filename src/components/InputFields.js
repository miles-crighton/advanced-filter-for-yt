import React, { useState } from 'react'
import styled from 'styled-components'

const InputNum = styled.input`
    max-width: 30px;
`

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
            <div>
                <span>Channel Name: </span>
                <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <span>Search Term: </span>
                <input type='text' value={searchTerm} onChange={e => setSearchterm(e.target.value)} />
            </div>
            <div>
                <span>Duration: </span>
                <InputNum type='number' value={lowerDuration} onChange={e => setLowerDuration(e.target.value)} />
                <span>to</span>
                <InputNum type='number' value={upperDuration} onChange={e => setUpperDuration(e.target.value)} />
                <span>Minutes</span>
            </div>
            <button onClick={handleSubmit}>Execute</button>
        </form>
    );
}