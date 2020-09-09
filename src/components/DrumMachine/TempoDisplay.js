import React from 'react';

export default function TempoDisplay (props) {
    return (
        <>
            <label>
                BPM
                <input 
                    type="number"
                    name="textTempo"
                    id="textTempo"
                    value={props.bpm}
                    onChange={e => props.onChange(e)}
                />
            </label>
        </>
    )
}