import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { setLocalStorage, getLocalStorage } from '../localStorage'

const InputNum = styled.input`
    max-width: 30px;
`

const InputFieldsContainer = styled.div`
    border: 1px solid grey;
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
        //If Override, alert to confirm with user
        //Store name with current hook values
    }

    function loadPreset(name) {
        console.log(`Loading preset: ${name}`)
        //Retrieve preset lists from local storage
        //Check to see if it exists (it should as being passed to list selection as props)
        //Set hook values based on preset values
    }

    function deletePreset(name) {
        console.log(`Deleting preset: ${name}`)
        //Retrieve preset list
        //Remove named preset
        //Save back to local storage
    }

    return (
        <InputFieldsContainer>
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
            <PresetHandler 
                savePreset={savePreset} 
                loadPreset={loadPreset} 
                deletePreset={deletePreset} 
            />
        </InputFieldsContainer>
    );
}

const presets = ['preset1', 'preset2', 'preset3']

function PresetHandler(props) {
    const [presetName, setPresetName] = useState('')

    //Use effect to load presets for use in datalist?
    useEffect(() => {
        //Load in list of preset names
        console.log('Heyo')
    });

    function handleSubmit(e) {
        //Change submit behaviour based on presetName exists?
        //Load if exists, save otherwise
        e.preventDefault()
        console.log(`Saving Preset: ${presetName}`)
        props.savePreset(presetName)
    }



    return (
        <div>
            <div>Presets</div>
            <input list="presets" value={presetName} onChange={e => setPresetName(e.target.value)} name="presets" />
            <datalist id="presets">
                {presets.map((item, idx) => {
                    return <option value={item} key={idx} />
                })}
            </datalist>
            <div>
                <button onClick={() => props.loadPreset(presetName)}>Load</button>
                <button onClick={() => props.savePreset(presetName)}>Save</button>
                <button onClick={() => props.deletePreset(presetName)}>Delete</button>
            </div>
        </div>
    )
}