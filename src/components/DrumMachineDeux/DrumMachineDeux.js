import React from 'react';
import { Redirect } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import config from '../../config';
import * as Tone from 'tone';   // NOTE: using older version (^13.4.9), not the latest (^14.7.39) b/c incompatiblity issues yet to be resolved.
import _ from 'lodash'; 
import StartAudioContext from 'startaudiocontext'; 
// import Title from "./Title";
import Header from '../DrumMachine/Header'
import UberControls from '../DrumMachine/UberControls'
import Buttons from "./Buttons";
import StepSequence from "./StepSequence";
import './DrumMachineDeux.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPlay,
    faStop,
    faRecycle,
    faInfoCircle,
    faTrashAlt,
    faSave,
    faCloudUploadAlt,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

function toggleBox(priorChecked, i, row) {
    const checked = [...priorChecked];
    checked[row][i] = !checked[row][i];
    return checked;
}

// fontawesome library setup
library.add(faPlay);
library.add(faStop);
library.add(faRecycle);
library.add(faInfoCircle);
library.add(faTrashAlt);
library.add(faSave);
library.add(faCloudUploadAlt);
library.add(faPencilAlt);


export default class DrumMachine extends React.Component {
    _isMounted = false; // per: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component

    static defaultProps = {
        history: {
            push: () => {}
        },
        // match: {
        //     params: {}
        // },
        authUser: {},
        editable: '',

        id: 0,
        user_id: '', 
        title: '',
        date_modified: '',
        visible: true,
        tempo: 120,
        sequence_length: 8,
        notes: [ "G5", "Eb5", "C5", "G4"],
        checked: [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        ],
        // ADDITIONALLY /////////////////////////
        isPlaying: false,
        // sequenceLength: 8, // Reminder to change all references to this key to 'sequence_length'
        maxTempo: 300,
        isActive: [ // used for highlighting during step-sequence visualization
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ], 
        renderedNotes: [],
        partContainer: [], // store Part object for future removal
        timeContainer: [], // tap tempo array
        landscape: false,
        velocity: 0.1,

    }

    static contextType = ApiContext;

    constructor(props) {
        super(props)

        const {
            editable,
        } = this.props;

        this.state = {
            editable: editable, 
            error: null,
            id: 0,
            user_id: '', 
            title: '',
            date_modified: '',
            visible: true,
            tempo: 120,
            sequence_length: 8,
            notes: [ "G5", "Eb5", "C5", "G4"],
            checked: [
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            ],
            // ADDITIONALLY /////////////////////////
            isPlaying: false,
            // sequenceLength: 8, // Reminder to change all references to this key to 'sequence_length'
            maxTempo: 300,
            isActive: [ // used for highlighting during step-sequence visualization
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ], 
            renderedNotes: [],
            partContainer: [], // store Part object for future removal
            timeContainer: [], // tap tempo array
            landscape: false,
            velocity: 0.1,
            defaults: {
                tempo: 120,
                sequence_length: 8,
                isPlaying: false,
                elapsedTime: 0,
                numberOfTaps: 0,
                averageBPM: 0,
                checked: [
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                ],
                notes: [ "G5", "Eb5", "C5", "G4"],
                isActive: [ 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ], 
            },
        };

        // moved these into constructor, so no more test fail
        // although still get the warning
        // console.warn node_modules/tone/build/Tone.js:7 => This browser does not support Tone.js
        this.synth = new Tone.PolySynth(2, Tone.Synth).toMaster(); // if Tone v14.7 => Error: DEPRECATED: The polyphony count is no longer the first argument. toMaster DEPRECATED, too.
        this.context = new AudioContext();
    }

   
    componentDidMount = () => {
        this._isMounted = true;
        // FETCH API ////////////////////////////////////////////////////
        // 'BACKDOOR' HACK TO DETERMINE VIEW
        // to determine what current URL :trackId is if accessed directly -- not from Router via App user flow -- using window.location.pathname to make a fetch call for /tracks/:track
        // BUT by doing so I have created a seperate issue,
        // if from t/here goto route='/add-track' via Nav, this component does not remount and so retains data from the :trackId of the previous view >_<
        // Putting this on hold for now, but...
        // TODO: Figure out a way to detect route change, but not using componentDidMount or deprecated componentWill____
        const fullpath = window.location.pathname;
        const splitPathArr = fullpath.split('/');
        const id = window.location.pathname.split('/')[2];
        // console.log('window.location.path: ', window.location.pathname)
        // console.log('split path:', splitPathArr);
        // console.log('id:', window.location.pathname.split('/')[2]);
        // console.log(typeof id == 'string')
        if (id) {
            this.fetchTrack(id);
        } else {
            // by deduction we are in /add-track view, 
            // so leave this.state as is (for new track)  

            // this.handleResetTrack()
            this.onReset();
        }

        // TONE WEB AUDIO API ////////////////////////////////////////////
        this.generateMetronome();

        // starts both audio contexts on mounting
        StartAudioContext(Tone.context);
        // StartAudioContext(this.context);

        // event listener for space, enter and 't'
        window.addEventListener("keydown", e => {
            if (e.keyCode === 32 || e.keyCode === 13) {
                try {
                    e.preventDefault(); // prevents space bar from triggering selected checkboxes
                    this.onTogglePlay();
                } catch (e) {
                    console.log(e);
                }
            } 
            // else if (e.keyCode === 84) {
            //     try {
            //         e.preventDefault(); 
            //         this.handleTap();
            //     } catch (e) {
            //         console.log(e);
            //     }
            // }
        });

        // check for orientation, add event listener
        if (
            window.screen.orientation &&
            Math.abs(window.screen.orientation.angle) === 90 &&
            window.screen.height < 500
        )
            this.setState({ landscape: true });
        window.addEventListener("orientationchange", () => {
            if (Math.abs(window.screen.orientation.angle) !== 90) {
                this.setState({ landscape: false });
            } else if (window.screen.height < 500) {
                this.setState({ landscape: true });
            }
        });
    }

    // API EVENT HANDLERS ////////////////////////////////////////////

    fetchTrack(id) {
        fetch(`${config.API_ENDPOINT}/api/tracks/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => Promise.reject(err))
                }
                return res.json();
            })
            .then(resTrack => {
                this.setState(
                    prior => ({
                        ...this.state,
                        id: resTrack.id,
                        user_id: resTrack.user_id, 
                        title: resTrack.title,
                        date_modified: resTrack.date_modified,
                        visible: resTrack.visible,
                        tempo: resTrack.tempo,
                        sequence_length: resTrack.sequence_length,
                        notes: resTrack.notes,
                        checked: resTrack.checked,
                     }),
                    () => {
                        // this ensures audio plays without having to interact
                        this.generateMetronome();
                    }
                )
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            })
    }

    handleCreateTrack = () => {
        const {
            // user_id,
            // title,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        } = this.state;

        const user_id = this.props.authUser.id; 

        let { title } = this.state;
        if (title.length === 0) {
            title = 'Untitled'
        }
        
        const newTrack = {
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        };
        console.log('new track pre POSST', newTrack)

        fetch(`${config.API_ENDPOINT}/api/tracks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(newTrack)
        })
            .then(res => {
                if (!res.ok) {
                    // throw new Error(res.statusText);
                    return res.json().then(err => Promise.reject(err))
                }
                return res.json();
            })
            .then(track => {
                this.context.addTrack(track)
                window.location = `/tracks/${track.id}`;
            })
            .catch(err => {
                console.error({ err });
                this.setState({
                    error: `Error: ${err}`
                });
            })
    }

    handleUpdateTrack = () => {
        console.log('handleUpdateTrack')
        const {
            id,
            user_id,
            // title,
            date_modified,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        } = this.state;

        // const user_id = this.props.authUser.id; 

        let { title } = this.state;
        if (title.length === 0) {
            title = 'Untitled'
        }

        const newTrack = {
            id,
            user_id,
            title,
            date_modified,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        };

        fetch(`${config.API_ENDPOINT}/api/tracks/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(newTrack)
        })
            .then(res => {
                if (!res.ok) {
                    // throw new Error(res.statusText);
                    return res.json().then(err => Promise.reject(err))
                }
            })
            .then(() => {
                this.context.updateTrack(newTrack)
                window.location = `/tracks/${newTrack.id}`;
            })
            .catch(err => {
                console.error({ err });
                this.setState({
                    error: `Error: ${err}`
                });
            })
    }

    handleDeleteTrack = () => {
        const { id } = this.state;

        fetch(`${config.API_ENDPOINT}/api/tracks/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    // throw new Error(res.statusText);
                    return res.json().then(err => Promise.reject(err))
                }
            })
            .then(() => {
                this.context.deleteTrack(id)
                window.location = `/dashboard`;
            })
            .catch(err => {
                console.error({ err });
                this.setState({
                    error: `Error: ${err}`
                });
            })
    }

    // DM1 EVENT HANDLERS ///////////////////////////////

    handleResetTrack = (changeEvent) => {
        const newState = this.state;
        const { checked, ...arr } = newState;
        this.setState({
            ...arr,
            checked: [
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            ],
        })
    }

    handleTitleChange = (changeEvent) => {
        const newState = this.state;
        newState.title = changeEvent.target.value;
        this.setState({
            // [f1]
            // newState
        })
    }

    onEdit = () => {
        console.log('redirect')
        return <Redirect to={`/edit/${this.state.id}`} />
    }
 

    // DM2 with AUDIO EVENT HANDLERS ///////////////////////////////

    
    onToggleBox = (i, row) => {
        this.setState(
            prior => ({
                checked: toggleBox(prior.checked, i, row)
            }),
            () => {
                this.generateMetronome();
            }
        );
    };

    onTogglePlay = () => {
        this.setState(
            prior => ({
                isPlaying: !prior.isPlaying
            }),
            () => {
                if (!this.state.isPlaying) {
                    //stop transport, turn off looping - prevents collision with measure sequence loop
                    Tone.Transport.stop();
                    Tone.Transport.loop = false;
                    Tone.Transport.loopEnd = 0;
                    // isActive array zeroed out
                    this.setState({ isActive: [[], [], [], []] }, () => console.log("stopped"));
                } else {
                    // configure looping for step sequencer
                    Tone.Transport.loop = true;
                    Tone.Transport.loopStart = 0;
                    Tone.Transport.loopEnd =
                        (this.state.sequence_length * 30) / this.state.tempo;
                    Tone.Transport.start("+0.0");
                    console.log("playing");
                }
            }
        );
    };

    restartPlaying = () => {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: this.state.isPlaying }, () => {
                Tone.Transport.stop();
                Tone.Transport.loopStart = 0;
                Tone.Transport.loopEnd =
                    (this.state.sequence_length * 30) / this.state.tempo;
                Tone.Transport.loop = true;
                Tone.Transport.start("+0.0");
                console.log("playing restarted");
            });
        } else {
            console.error("restartPlaying called while not playing");
        }
    };

    onLengthChange = sequence_length => {
        // create a new checked array
        const checked = [[], [], [], []];
        for (let i = 0; i < sequence_length; i++) {
            checked[0].push(false);
            checked[1].push(false);
            checked[2].push(false);
            checked[3].push(false);
        }
        this.setState(
            () => ({
                sequence_length,
                checked
            }),
            () => {
                Tone.Transport.loopEnd = (sequence_length * 30) / this.state.tempo;
                this.generateMetronome();
            }
        );
    };

    onTempoChange = tempo => {
        this.setState(
            {
                tempo
            },
            () => {
                Tone.Transport.bpm.value = tempo;
            }
        );
    };

    onReset = () => {
        this.setState(
            prior => ({
                tempo: prior.defaults.tempo,
                sequence_length: prior.defaults.sequence_length,
                isPlaying: prior.defaults.isPlaying,
                checked: prior.defaults.checked,
                notes: prior.defaults.notes,
                isActive: prior.defaults.isActive
            }),
            () => {
                this.resetTempo();
                this.forceStop();
                this.onLengthChange(this.state.sequence_length);
                this.onPitchSelect(this.state.notes[0], 0);
                this.onPitchSelect(this.state.notes[1], 1);
                this.onPitchSelect(this.state.notes[2], 2);
                this.onPitchSelect(this.state.notes[3], 3);
            }
        );
    };

    forceStop = () => {
        Tone.Transport.stop();
        Tone.Transport.loop = false;
        Tone.Transport.loopEnd = 0;
        console.log("force stopped");
    };

    resetTempo = () => {
        Tone.Transport.bpm.value = this.state.defaults.tempo;
    };

    handleTap = () => {
        // timeContainer maintenance - shift and push
        const timeContainer = this.state.timeContainer;
        if (timeContainer.length > 2) timeContainer.shift();
        timeContainer.push(this.context.currentTime.toFixed(3));

        // calculate tempo
        const tempo = Math.round(
            60 /
            (timeContainer
                .slice(1)
                .map((time, i) => time - timeContainer[i])
                .reduce((a, b) => a + b, 0) /
                (timeContainer.length - 1))
        );

        // make sure tempo is within acceptable bounds
        if (tempo > 40 && tempo < 301) {
            this.setState({ tempo }, () => this.onTempoChange(tempo));
        } else if (tempo > 300) {
            this.setState({ tempo: this.state.maxTempo }, () =>
                this.onTempoChange(this.state.tempo)
            );
        }
    };

    onPitchSelect = (note, row) => {
        let newNotes = this.state.notes;
        newNotes.splice(row, 1, note);

        this.setState(
            {
                notes: newNotes
            },
            () => {
                this.generateMetronome();
            }
        );
    };

    generateMetronome = () => {
        // erase or stop all previous parts
        const partContainer = this.state.partContainer;
        // console.log('this.state.partContainer: ', partContainer)
        partContainer.forEach(part => part.removeAll());  

        // metronome vitals
        const [note1, note2, note3, note4] = this.state.notes,
            seqLength = this.state.sequence_length,
            matrix = this.state.checked,
            velocity = this.state.velocity;

        // new renderedNotes array, populate
        const renderedNotes = [];
        for (let i = 0; i < seqLength; i++) {
            const time = i / 2;
            if (matrix[0][i]) {
                renderedNotes.push({
                    note: note1,
                    time: `0:${time}`,
                    velocity: velocity,
                    index: i
                });
            } 
            if (!matrix[0][i]) {
                renderedNotes.push({
                    note: note1,
                    time: `0:${time}`,
                    velocity: 0,
                    index: i
                });
            } 
            if (matrix[1][i]) {
                renderedNotes.push({
                    note: note2,
                    time: `0:${time}`,
                    velocity: velocity,
                    index: i
                });
            } else if (!matrix[1][i]) {
                renderedNotes.push({
                    note: note2,
                    time: `0:${time}`,
                    velocity: 0,
                    index: i
                });
            } 
            if (matrix[2][i]) {
                renderedNotes.push({
                    note: note3,
                    time: `0:${time}`,
                    velocity: velocity,
                    index: i
                });
            } else if (!matrix[2][i]) {
                renderedNotes.push({
                    note: note3,
                    time: `0:${time}`,
                    velocity: 0,
                    index: i
                });
            } 
            if (matrix[3][i]) {
                renderedNotes.push({
                    note: note4,
                    time: `0:${time}`,
                    velocity: velocity,
                    index: i
                });
            } else if (!matrix[3][i]) {
                renderedNotes.push({
                    note: note4,
                    time: `0:${time}`,
                    velocity: 0,
                    index: i
                });
            } 
           
        }

        // create new Part, start Part, push Part to container
        const part = new Tone.Part((time, value) => {
            this.triggerVisualize(value.index);
            this.synth.triggerAttackRelease(value.note, 0.05, time, value.velocity);
        }, renderedNotes).start(0);
        partContainer.push(part);

        if (this._isMounted) {
            this.setState({
                renderedNotes,
                partContainer
            });
        }
    };

    triggerVisualize = index => {
        // generate array of 0's
        const length = this.state.sequence_length;
        const isActive = [_.fill(Array(length), 0), _.fill(Array(length), 0), _.fill(Array(length), 0), _.fill(Array(length), 0)];

        // set particular index as active
        isActive[0][index] = 1;
        isActive[1][index] = 1;
        isActive[2][index] = 1;
        isActive[3][index] = 1;
        this.setState({ isActive });
    };

    componentWillUnmount() {
        this._isMounted = false;
        this.forceStop();
    }


    render() {
        // console.log('DrumMachine state: ', this.state)
        console.log('_isMounted? ', this._isMounted)
        const { 
            // track,
            id,
            user_id,
            title,
            tempo,
            sequence_length,
            notes,
            checked,
        } = this.state;

        const {
            authUser,
            editable,
        } = this.props;

        return (
            // DM2
            <div className="App">
                <header className="App-header">
                    {/* <Title landscape={this.state.landscape} /> */}
                    <Header
                        track={this.state}
                        editable={editable}
                        titleChange={this.handleTitleChange}
                    />
                    <Buttons
                        authUser={this.props.authUser}
                        editable={this.state.editable}
                        track={this.state}
                        isPlaying={this.state.isPlaying}
                        onTogglePlay={this.onTogglePlay}
                        sequence_length={this.state.sequence_length}
                        onLengthChange={this.onLengthChange}
                        tempo={this.state.tempo}
                        onTempoChange={this.onTempoChange}
                        onReset={this.onReset}
                        onCreate={this.handleCreateTrack}
                        onUpdate={this.handleUpdateTrack}
                        onDelete={this.handleDeleteTrack}
                        onEdit={this.onEdit} // React Router Redirect not working
                        trackId={this.state.id}
                        // handleTap={this.handleTap}
                        />
                    <StepSequence
                        editable={editable}
                        checked={this.state.checked}
                        onToggle={this.onToggleBox}
                        sequence_length={this.state.sequence_length}
                        onPitchSelect={this.onPitchSelect}
                        notes={this.state.notes}
                        isActive={this.state.isActive}
                        />
                </header>

            </div>
        )
    }
}