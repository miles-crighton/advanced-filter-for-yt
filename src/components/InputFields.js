import React, { useState } from 'react'
import styled from 'styled-components'

import PresetHandler from './PresetHandler'

import { setLocalStorage, getLocalStorage } from '../localStorage'

const InputNum = styled.input`
    max-width: 30px;
`
const QueryInputs = styled.div`
    border: 1px solid grey;
    table {
        width: 100%;
    }
    button {
        display: block;
        width: 50%;
        margin: auto;
    }
`
const InputsContainer = styled.div`
    display: flex;





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

    function savePreset(name) {
        console.log(`Saving preset: ${name}`)

        //Retrieve presets from local storage
        let presets = JSON.parse(getLocalStorage('presets'))
        if (presets === null) { presets = {} }

        if (Object.keys(presets).length >= 10) {
            alert('Max presets reached - try deleting some.')
            return
        }

        //If Override, alert to confirm with user
        if (presets[name] !== undefined) {
            let override = window.confirm('Do you want to override preset?');
            if (!override) {
                console.log('Aborting preset save')
                return 
            }
        }

        //Store name with current hook values
        presets[name] = { username, searchTerm, lowerDuration, upperDuration }

        setLocalStorage('presets', presets)
        console.log('Presets stored: ', getLocalStorage('presets'))
    }

    function loadPreset(name) {
        console.log(`Loading preset: ${name}`)
        //Retrieve presets from local storage
        let presets = JSON.parse(getLocalStorage('presets'))
        if (presets === null) { presets = {} }

        //Check to see if it exists (it should as being passed to list selection as props)
        let preset = presets[name]
        if (preset === undefined) {
            console.log('Preset not found')
            return
        }

        //Set hook values based on preset values
        setUsername(preset.username)
        setSearchterm(preset.searchTerm)
        setUpperDuration(preset.upperDuration)
        setLowerDuration(preset.lowerDuration)

        console.log(`Finished loading preset: ${name}`)
    }

    function deletePreset(name) {
        console.log(`Deleting preset: ${name}`)

        //Retrieve presets from local storage
        let presets = JSON.parse(getLocalStorage('presets'))
        if (presets === null) { presets = {} }

        //Remove named preset
        if (presets[name] !== undefined) {
            delete presets[name]
        }

        //Save back to local storage
        setLocalStorage('presets', presets)
        console.log('Presets stored: ', getLocalStorage('presets'))
    }

    return (
        <InputsContainer>
            <QueryInputs>
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
                                    <InputNum type='number' value={lowerDuration} onChange={e => setLowerDuration(e.target.value)} min="0" max="60" />
                                    <span> to </span>
                                    <InputNum type='number' value={upperDuration} onChange={e => setUpperDuration(e.target.value)} min="0" max="60" />
                                    <span> minutes</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={handleSubmit}>Search</button>
                </form>
            </QueryInputs>
            <PresetHandler 
                savePreset={savePreset} 
                loadPreset={loadPreset} 
                deletePreset={deletePreset} 
            />
        </InputsContainer>
    );
}

