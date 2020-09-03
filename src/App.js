import React from 'react';
import * as Tone from 'tone';
import StartAudioContext from 'startaudiocontext'; // may not be required as apparently tone.js has integrates it's own: https://tonejs.github.io/#audiocontext
import './App.css';
import ToneTestOne from './components/tone/tone-01'
import StepSequence from './components/StepSequence/StepSequence';


// global synth and context 
// QUESTION/TODO: localize later?
const synth = new Tone.PolySynth().toDestination();
synth.set({
	envelope: {
		attack: 0.25
	}
});
synth.triggerAttackRelease("Bb3", '8n'); // frequency, duration
const context = new AudioContext();




export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            tempo: 120,
            sequenceLength: 16,
            Instrument1: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            Instrument2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        }

    }

    componentDidMount = () => {
        // event listener for [spacebar]
        window.addEventListener("keydown", event => {
            if (event.keyCode === 32) {
                try {
                    event.preventDefault();
                    this.onTogglePlay();
                } catch (err) {
                    console.log(err);
                }
            }
        });
    }

    onTogglePlay = () => {
        // rationale for: setState(updater, [callback])
        // https://reactjs.org/docs/react-component.html#setstate
        // https://stackoverflow.com/questions/50837670/reactjs-setstate-previous-state-is-the-first-argument-props-as-the-second-argum

        this.setState(
            // request state object update
            // also, notable syntax: params => ({foo: bar}) ... Parenthesize the body of a function to return an object literal expression
            prior => ({
                isPlaying: !prior.isPlaying
            }),
            // once request/promise fulfilled, then init callback
            () => {
                if (!this.state.isPlaying) {
                    Tone.Transport.stop();
                    Tone.Transport.loop = false;
                    Tone.Transport.loopEnd = 0;
                    console.log("Tone.Transport.stop()");
                } else {
                    // configure looping for step sequencer
                    Tone.Transport.loop = true;
                    Tone.Transport.loopStart = 0;
                    Tone.Transport.loopEnd = 
                        (this.state.sequenceLength * 30) / this.state.tempo; // 30 HUH?
                    Tone.Transport.start();
                    console.log("Tone.Transport.start()")
                }
            }
        );
    }

    generateMetronome = () => {

    }

    render() {

        return (
            <div className="App">

                <ToneTestOne />

                <StepSequence 
                    // sequenceLength={this.state.sequenceLength}
                />

            </div>
        );
    }
}
