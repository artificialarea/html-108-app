import React from 'react';

export default function TempoDisplay (props) {
    return (
        <>
            <label>
                BPM
                <input 
                    type="number"
                    // id={props.track.id}
                    name={props.track.id}
                    value={props.track.tempo}
                    onChange={e => props.onChange(e)}
                />
            </label>
        </>
    )
}