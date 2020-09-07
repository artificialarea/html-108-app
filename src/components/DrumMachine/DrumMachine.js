import React from 'react';
import uuid from 'react-uuid';
import './DrumMachine.css';

export default function DrumMachine (props) {

    return (
        <div className="component drum-machine">
            <Header track={props.track} />
            <Tempo track={props.track} />
            <StepSequencer track={props.track} />
        </div>
    )

}

function Header (props) {
    return (
        <header role="banner">
            {!!props.track.title.length &&
                <h1>{props.track.title}</h1>}
        </header>
    )
}

function Tempo (props) {
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

function StepSequencer (props) {

    const instrumentArr = [];

    props.track.step_sequence.forEach(sequence => 
        instrumentArr.push(
            <Instrument steps={sequence}/>
        )
        
    )
    return (
        <div className="step-sequencer">
                        
            <InstrumentSelector />

            {instrumentArr}
            
            <div className="controls-file">
                <DownloadTrack />
                <SaveTrack />
            </div>
            
        </div>

    )
}

function Instrument (props) {
    
    let key = Object.keys(props.steps)
    let stepSequence = props.steps[key];

    let beatArr = [];

    stepSequence.forEach(step => {
        beatArr.push(
            <Beat 
                key={uuid()}
                beat={stepSequence[step]}
            />
        )
    })

    console.log(`${key}`);
    console.log(beatArr)

    return (
        <div className="instrument">
            <InstrumentSound type={key} />
            <ul>
                {beatArr}
            </ul>
            
        </div>
    )
}

function InstrumentSound (props) {
    return (
        <button>{props.type}</button>
    )
}

function Beat (props) {
    return (
        <> 
            {/* {props.beat === 1
                ? <input type="checkbox" id="beat-1" name="beat-1" checked/>
                : <input type="checkbox" id="beat-1" name="beat-1" />
            } */}

            {props.beat === 1
                ? <li className="checked"></li>
                : <li></li>
            }
            
        </>
    )
}

function InstrumentSelector (props) {
    return (
        <div className="instrument-selector">
            <label>
                Display:
                <select id="instrument-selector">
                    <option value="hahat">HiHat</option>
                    <option value="clap">Clap</option>
                    <option value="trap">Trap</option>
                    <option value="bass">Bass</option>
                </select>
            </label>
        </div>
    )
}

function DownloadTrack (props) {
    return (
        <>
            <button type="submit">Download Track</button>
        </>
    )
}

function SaveTrack (props) {
    return (
        <>
            <button type="submit">Save Track</button>
        </>
    )
}

