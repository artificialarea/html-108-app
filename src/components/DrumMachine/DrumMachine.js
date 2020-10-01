import React from 'react';
import { Redirect } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import config from '../../config';
import * as Tone from 'tone';   // NOTE: using older version (^13.8.25), not the latest typescript (^14.7.39) b/c incompatiblity issues yet to be resolved.
import _ from 'lodash'; 
import StartAudioContext from 'startaudiocontext'; 
import Header from './Header'
import Buttons from "./Buttons";
import StepSequence from "./StepSequence";
import styles from './DrumMachine.module.css';

function toggleBox(priorChecked, i, row) {
    const checked = [...priorChecked];
    checked[row][i] = !checked[row][i];
    return checked;
}

export default class DrumMachine extends React.Component {
    _isMounted = false; // per: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component

    // static defaultProps = {
    //     history: {
    //         push: () => {}
    //     },
    //     authUser: {},
    //     editable: '',

    //     id: 0,
    //     user_id: '', 
    //     title: '',
    //     date_modified: '',
    //     visible: true,
    //     tempo: 120,
    //     sequence_length: 8,
    //     notes: [ "G5", "Eb5", "C5", "G4"],
    //     checked: [
    //         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    //         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    //         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    //         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    //     ],
    //     isPlaying: false,
    //     maxTempo: 300,
    //     isActive: [ 
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     ], 
    //     renderedNotes: [],
    //     partContainer: [], 
    //     velocity: 0.1,

    // }

    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            editable: this.props.editable, 
            processing: false,
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
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
            ],
            isPlaying: false,
            maxTempo: 300,
            isActive: [ // used for highlighting during step-sequence visualization
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ], 
            renderedNotes: [],
            partContainer: [], // store Part object for future removal
            velocity: 0.1,
            defaults: {
                tempo: 120,
                sequence_length: 8,
                isPlaying: false,
                checked: [
                    [false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false],
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

        this.synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
        this.toneContext = new AudioContext();
    }

   
    componentDidMount = () => {
        // console.log('COMPONENT DID MOUNT')
        // console.log('componentDidMount, this.state: ', this.state)
        this._isMounted = true;

        const id = window.location.pathname.split('/')[2];
        if (id) {
            this.fetchTrack(id);
        } else {
            // this.onReset();
            // this.generateMetronome();
        }

        this.generateMetronome();

        // starts both audio contexts on mounting
        // StartAudioContext(Tone.context);
        StartAudioContext(this.toneContext);

        // event listener for spacebar to play/pause 
        // TODO: disabled until I figure out logic when title input active
        // window.addEventListener("keydown", e => {
        //     if (e.keyCode === 32) {
        //         try {
        //             e.preventDefault();
        //             this.onTogglePlay();
        //         } catch (e) {
        //             console.log(e);
        //         }
        //     } 
        // });

    }

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
            // id,
            // user_id,
            // title,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        } = this.state;

        this.setState({
            processing: true
        })

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
                this.setState({
                    processing: false
                })
                window.location = `/tracks/${track.id}`;
            })
            .catch(error => {
                console.error({ error });
                this.setState({
                    error
                });
            })
    }

    handleUpdateTrack = () => {
        const {
            id,
            user_id,
            // title,
            // date_modified,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        } = this.state;

        this.setState({
            processing: true
        })

        const date_modified = new Date()

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
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .then(() => {
                this.context.updateTrack(newTrack)
                this.setState({
                    processing: false
                })
            })
            .catch(error => {
                console.error({ error });
                this.setState({
                    error
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
        // console.log('redirect')
        // redirect doesn't work...
        return <Redirect to={`/edit/${this.state.id}`} />
    }
    
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
                    this.setState({ isActive: [[], [], [], []] });
                } else {
                    // configure looping for step sequencer
                    Tone.Transport.loop = true;
                    Tone.Transport.loopStart = 0;
                    Tone.Transport.loopEnd =
                        (this.state.sequence_length * 30) / this.state.tempo;
                    Tone.Transport.start("+0.0");
                    // console.log("playing");
                    // console.log(this.state)
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
                // console.log("playing restarted");
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
        // console.log("force stopped");
    };

    resetTempo = () => {
        Tone.Transport.bpm.value = this.state.defaults.tempo;
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
        // I don't quite understand what you do,
        // but without you 
        // the audio gets progressively worse after each iteration.
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
        // console.log('new Tone.Part', part)
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
        // console.log('COMPONENT WILL UNMOUNT')
        this._isMounted = false;
        this.forceStop();
        this.toneContext.close();

        // *CRUCIAL!*
        // this method effectively disgards the Path(s) to reset the step sequencer
        // src: https://groups.google.com/g/tonejs/c/yAffQUjKVAE/m/npeWscc2BgAJ
        Tone.Transport.cancel();

    }


    render() {
        // console.log('DrumMachine state: ', this.state)
        // console.log('_isMounted? ', this._isMounted)
        const { 
            processing,
            error,
            id,
            isPlaying,
            sequence_length,
            tempo,
            checked,
            notes,
            isActive,
        } = this.state;

        const {
            authUser,
            editable,
        } = this.props;

        return (
            <div className="App">
                <div className="App--container">
                    <Header
                        editable={editable}
                        track={this.state}
                        titleChange={this.handleTitleChange}
                    />
                    <Buttons
                        processing={processing}
                        authUser={authUser}
                        editable={editable}
                        track={this.state}
                        trackId={id}
                        isPlaying={isPlaying}
                        sequence_length={sequence_length}
                        tempo={tempo}
                        onTogglePlay={this.onTogglePlay}
                        onLengthChange={this.onLengthChange}
                        onTempoChange={this.onTempoChange}
                        onReset={this.onReset}
                        onCreate={this.handleCreateTrack}
                        onUpdate={this.handleUpdateTrack}
                        onDelete={this.handleDeleteTrack}
                        onEdit={this.onEdit} // React Router Redirect not working, tho
                        />

                    <div className={styles.error} role='alert'>
                        {error && <p>{error.error.message}</p>}
                    </div>

                    <StepSequence
                        editable={editable}
                        sequence_length={sequence_length}
                        checked={checked}
                        notes={notes}
                        isActive={isActive}
                        onToggle={this.onToggleBox}
                        onPitchSelect={this.onPitchSelect}
                        />
                    </div>
            </div>
        )
    }
}