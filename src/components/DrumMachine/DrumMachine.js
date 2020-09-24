import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';
import * as Tone from 'tone';
import _ from 'lodash'; 
import StartAudioContext from 'startaudiocontext'; 
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';
import UberControls from './UberControls';

// what are correct places for these?
// creates a global synth and context
// const synth = new Tone.PolySynth(2, Tone.Synth).toMaster(); // Error: DEPRECATED: The polyphony count is no longer the first argument. toMaster DEPRECATED, too.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); 
const context = new AudioContext();

export default class DrumMachine extends React.Component {

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
        sequence_length: 16,
        notes: [ "G5", "Eb5", "C5", "G4"],
        checked: [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        ],
        // ADDITIONALLY /////////////////////////
        isPlaying: false,
        // sequenceLength: 16, // Reminder to change all references to this key to 'sequence_length'
        maxTempo: 300,
        isActive: [ // used for highlighting during step-sequence visualization
            [1, 0, 0, 0, 0, 0, 0, 0], 
            [1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
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
            // track: {
                id: 0,
                user_id: '', 
                title: '',
                date_modified: '',
                visible: true,
                tempo: 120,
                sequence_length: 16,
                notes: [ "G5", "Eb5", "C5", "G4"],
                checked: [
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                ],
                // ADDITIONALLY /////////////////////////
                isPlaying: false,
                // sequenceLength: 16, // Reminder to change all references to this key to 'sequence_length'
                maxTempo: 300,
                isActive: [ // used for highlighting during step-sequence visualization
                    [1, 0, 0, 0, 0, 0, 0, 0], 
                    [1, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0],
                ], 
                renderedNotes: [],
                partContainer: [], // store Part object for future removal
                timeContainer: [], // tap tempo array
                landscape: false,
                velocity: 0.1,
                defaults: {
                    tempo: 120,
                    sequenceLength: 16,
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
                        [1, 0, 0, 0, 0, 0, 0, 0], 
                        [1, 0, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0, 0],
                    ], 
                },
            // },
        }
    }

   
    componentDidMount = () => {
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
            this.handleResetTrack()
        }

        // TONE WEB AUDIO API ////////////////////////////////////////////
        this.generateMetronome();

        // starts both audio contexts on mounting
        StartAudioContext(Tone.context);
        StartAudioContext(context);

        // event listener for space, enter and 't'
        window.addEventListener("keydown", e => {
            if (e.keyCode === 32 || e.keyCode === 13) {
                try {
                    e.preventDefault(); // prevents space bar from triggering selected checkboxes
                    this.onTogglePlay();
                } catch (e) {
                    console.log(e);
                }
            } else if (e.keyCode === 84) {
                try {
                    e.preventDefault(); // prevents space bar from triggering selected checkboxes
                    this.handleTap();
                } catch (e) {
                    console.log(e);
                }
            }
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
                this.setState({
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
                })
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            })
    }

    handleCreateTrack = (changeEvent) => {
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

    handleUpdateTrack = (changeEvent) => {
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

    handleDeleteTrack = (changeEvent) => {
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

    // v1 DRUM EVENT HANDLERS ///////////////////////////////////////

    handleBeatChange = (changeEvent) => {
        // const { track } = this.state;
        // REFACTOR? 
        // Extract target tag id information from string into array
        // "instrumentSequence beatIndex beatBoolean" 
        // e.g. "2 5 0" // => [2, 5, 0]
        const targets = changeEvent.target.id.split(' ');
        const instrumentSequence = targets[0];
        const beatIndex = targets[1];
        let beatBoolean = targets[2]; 

        beatBoolean === "true"
            ? beatBoolean = false
            : beatBoolean = true;

        const newState = this.state;
        newState.checked[instrumentSequence][beatIndex] = beatBoolean;

        this.setState({
            // [f1]
            // newState
        })
    }

    handleTempoChange = (changeEvent) => {
        console.log('handleTempoChange')
        console.log(changeEvent.target.value)
        const newState = this.state;
        newState.tempo = parseInt(changeEvent.target.value);
        console.log('newState: ', newState)
        this.setState({
            // [f1]
            // newState
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

    // v2 DRUM + AUDIO EVENT HANDLERS ///////////////////////////////

    generateMetronome = () => {
        // erase or stop all previous parts
        const partContainer = this.state.partContainer;
        // console.log('this.state.partContainer: ', partContainer)
        partContainer.forEach(part => part.removeAll());

        // metronome vitals
        const [note1, note2] = this.state.notes,
            seqLength = this.state.sequenceLength,
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
            } else if (!matrix[1][i]) {
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
            }
        }

        // create new Part, start Part, push Part to container
        const part = new Tone.Part((time, value) => {
            this.triggerVisualize(value.index);
            synth.triggerAttackRelease(value.note, 0.05, time, value.velocity);
        }, renderedNotes).start(0);
        partContainer.push(part);

        this.setState({
            renderedNotes,
            partContainer
        });
    };


    render() {
        // console.log('DrumMachine state: ', this.state)
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
            <div className="component drum-machine">
                <Header
                    // track={track}
                    track={this.state}
                    editable={editable}
                    titleChange={this.handleTitleChange}
                />
                <UberControls
                    authUser={authUser}
                    // track={track}
                    track={this.state}
                    editable={editable}
                    resetTrack={this.handleResetTrack}
                    createTrack={this.handleCreateTrack}
                    updateTrack={this.handleUpdateTrack}
                    deleteTrack={this.handleDeleteTrack}
                />
                <Tempo
                    // track={track}
                    track={this.state}
                    editable={editable}
                    tempoChange={this.handleTempoChange}
                />
                <StepSequencer
                    // track={track}
                    track={this.state}
                    editable={editable}
                    toggleBeat={this.handleBeatChange}
                />
            </div>
        )
    }
}
