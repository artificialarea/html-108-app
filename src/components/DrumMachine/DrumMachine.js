import React from 'react';


export default class DrumMachine extends React.Component {

    // TODO: make input range slider work
    // https://stackoverflow.com/questions/36122034/jsx-react-html5-input-slider-doesnt-work

    render() {
        return (
            <div className="component drum-machine">
                <header role="banner">
                    <h1>:Track-Title</h1>
                </header>

                <div className="container">
                    <div className="controls-tempo">
                        <button className="togglePlay">Start/Stop</button> 
                        <label>
                            BPM
                            <input 
                                type="number"
                                name="textTempo"
                                id="textTempo"
                                // value="120"
                            />
                        </label>
                        <input 
                            type="range"
                            min="30"
                            max="300"
                            // value="120"
                            name="rangeTempo"
                            // onChange={this.handleChange}
                        />
                    </div>
                    <div className="controls-beats">
                        
                        <InstrumentSelector />

                        <Instrument type='HiHat' />
                        <Instrument type='Clap' />
                        <Instrument type='Trap' />
                        <Instrument type='Bass' />
                        
                        <div className="controls-file">
                            <button type="submit">Download Track</button> <button type="submit">Save Track</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

function Instrument (props) {

    let sequence_length = 16;
    let beatArray = [];

    return (
        <div className="instrument">
            <InstrumentSound type={props.type} />
            <input type="checkbox" id="beat-1" name="beat-1" />
            <input type="checkbox" id="beat-2" name="beat-2" />
            <input type="checkbox" id="beat-3" name="beat-3" />
            <input type="checkbox" id="beat-4" name="beat-4" />
            <input type="checkbox" id="beat-5" name="beat-5" />
            <input type="checkbox" id="beat-6" name="beat-6" />
            <input type="checkbox" id="beat-7" name="beat-7" />
            <input type="checkbox" id="beat-8" name="beat-8" />
            <input type="checkbox" id="beat-9" name="beat-9" />
            <input type="checkbox" id="beat-10" name="beat-10" />
            <input type="checkbox" id="beat-11" name="beat-11" />
            <input type="checkbox" id="beat-12" name="beat-12" />
            <input type="checkbox" id="beat-13" name="beat-13" />
            <input type="checkbox" id="beat-14" name="beat-14" />
            <input type="checkbox" id="beat-15" name="beat-15" />
            <input type="checkbox" id="beat-16" name="beat-16" />
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
        <input type="checkbox" id="beat-1" name="beat-1" />
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

