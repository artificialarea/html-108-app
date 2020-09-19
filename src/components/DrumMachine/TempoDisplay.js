import React from 'react';

export default function TempoDisplay (props) {
    const { track, tempoChange } = props;

    return (
        <>
            <label>
                BPM
                <input 
                    type="number"
                    // id={track.id}
                    name={track.id}
                    value={track.tempo}
                    onChange={e => tempoChange(e)}
                />
            </label>
        </>
    )
}