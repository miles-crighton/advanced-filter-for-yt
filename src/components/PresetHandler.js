import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { getLocalStorage } from '../localStorage'

const PresetsContainer = styled.div`
    border: 1px solid grey;

    h4 {
        text-align: center;
        margin: 0px;
    }
`

export default function PresetHandler(props) {
    const [presetName, setPresetName] = useState('')
    const [presetList, setPresetList] = useState([])

    //Use effect to load preset names for use in datalist
    useEffect(() => {
        //Retrieve presets from local storage
        let presets = JSON.parse(getLocalStorage('presets'))
        if (presets === null) { presets = {} }

        //Set preset names to local hook
        setPresetList(Object.keys(presets))
    }, [presetList]);

    return (
        <PresetsContainer>
            <h4>Presets</h4>
            <input autoComplete="off" list="presets" value={presetName} onChange={e => setPresetName(e.target.value)} name="presets" />
            <datalist id="presets">
                {presetList.map((item, idx) => {
                    return <option value={item} key={idx} />
                })}
            </datalist>
            <div>
                <button onClick={() => props.loadPreset(presetName)}>Load</button>
                <button onClick={() => props.savePreset(presetName)}>Save</button>
                <button onClick={() => props.deletePreset(presetName)}>Delete</button>
            </div>
        </PresetsContainer>
    )
}