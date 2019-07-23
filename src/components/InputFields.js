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
            <table>
                <tbody>
                    <tr>
                        <td>Channel Name: </td>
                        <td>
                            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Search Term: </td>
                        <td>
                            <input type='text' value={searchTerm} onChange={e => setSearchterm(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Duration: </td>
                        <td>
                            <InputNum type='number' value={lowerDuration} onChange={e => setLowerDuration(e.target.value)} min="0" />
                            <span>to</span>
                            <InputNum type='number' value={upperDuration} onChange={e => setUpperDuration(e.target.value)} min="0" />
                            <span>Minutes</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSubmit}>Search</button>
        </form>
    );
}