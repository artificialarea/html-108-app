import React from 'react';

export default function TempoControl (props) {
    const { track, tempoChange } = props;

    return (
        <>
            <input 
                type="range"
                // id={track.id}
                name={track.id}
                min="30"
                max="300"
                value={track.tempo}
                onChange={e => tempoChange(e)}
            />
        </>
    )
}