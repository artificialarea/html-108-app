import React from 'react';

export default function Tempo (props) {
    return (
        <div className="tempo__controls">
            <PlayButton />
            <TempoDisplay bpm={props.track.tempo} />
            <TempoControl bpm={props.track.tempo} />
        </div>
    )
}

function PlayButton (props) {
    return (
        <>
            <button className="togglePlay">Start/Stop</button> 
        </>
    )
}

function TempoDisplay (props) {
    return (
        <>
            <label>
                BPM
                <input 
                    type="number"
                    name="textTempo"
                    id="textTempo"
                    value={props.bpm}
                />
            </label>
        </>
    )
}
function TempoControl (props) {

    // TODO: make input range slider work
    // https://stackoverflow.com/questions/36122034/jsx-react-html5-input-slider-doesnt-work

    return (
        <>
            <input 
                type="range"
                min="30"
                max="300"
                value={props.bpm}
                name="rangeTempo"
                // onChange={this.handleChange}
            />
        </>
    )
}
