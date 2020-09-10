import React from 'react';

export default function TempoControl (props) {

    return (
        <>
            <input 
                type="range"
                // id={props.track.id}
                name={props.track.id}
                min="30"
                max="300"
                value={props.track.tempo}
                onChange={e => props.onChange(e)}
            />
        </>
    )
}