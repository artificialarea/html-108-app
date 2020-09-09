import React from 'react';

export default function TempoControl (props) {

    return (
        <>
            <input 
                type="range"
                name="rangeTempo"
                min="30"
                max="300"
                value={props.bpm}
                onChange={e => props.onChange(e)}
            />
        </>
    )
}