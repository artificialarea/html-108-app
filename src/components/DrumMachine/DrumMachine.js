import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';
// import Tone from 'tone';
// import _ from 'lodash'; 
// import StartAudioContext from 'startaudiocontext'; 
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';
import UberControls from './UberControls';


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
        track: {
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
            // // ADDITIONALLY /////////////////////////
            // isPlaying: false,
            // // sequenceLength: 16, // Reminder to change all references to this key to 'sequence_length'
            // maxTempo: 300,
            // isActive: [ // used for highlighting during step-sequence visualization
            //     [1, 0, 0, 0, 0, 0, 0, 0], 
            //     [1, 0, 0, 0, 0, 0, 0, 0],
            //     [1, 0, 0, 0, 0, 0, 0, 0],
            //     [1, 0, 0, 0, 0, 0, 0, 0],
            // ], 
            // renderedNotes: [],
            // partContainer: [], // store Part object for future removal
            // timeContainer: [], // tap tempo array
            // landscape: false,
            // velocity: 0.1,
        },
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
            track: {
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
            },
        }
    }

   
    componentDidMount = () => {
        // const { id } = this.props.track;
        // const { id } = this.state;

        // 'BACKDOOR' HACK
        // to determine what current URL :trackId is if accessed directly, not from Router via App
        // Resolved my issue of loading URL route /track/:trackId or /edit/:trackId
        // BUT by doing so I have created a seperate issue,
        // if from t/here goto route='/add-track' via Nav, this component does not remount 
        // and so retains data from the :trackId  of the previous view >_<
        // Putting this on hold for now, but...
        // TODO: Figure out a way to detect route change, but not using componentDidMount or deprecated componentWill____
        const fullpath = window.location.pathname;
        const splitPathArr = fullpath.split('/');
        const id = window.location.pathname.split('/')[2];
        console.log('window.location.path: ', window.location.pathname)
        console.log('split path:', splitPathArr);
        console.log('id:', window.location.pathname.split('/')[2]);
        // console.log(typeof id == 'string')
        if (id) {
            this.fetchTrack(id);
        } else {
            // by deduction we are in /add-track view, 
            // so leave this.state as is (for new track)  
            this.handleResetTrack()
        }
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
                console.log('resTrack via fetch')
                this.setState({
                    track: {
                        ...this.state.track,
                        id: resTrack.id,
                        user_id: resTrack.user_id, 
                        title: resTrack.title,
                        date_modified: resTrack.date_modified,
                        visible: resTrack.visible,
                        tempo: resTrack.tempo,
                        sequence_length: resTrack.sequence_length,
                        notes: resTrack.notes,
                        checked: resTrack.checked,
                    }
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
        } = this.state.track;

        const user_id = this.props.authUser.id; 

        let { title } = this.state.track;
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
        } = this.state.track;

        // const user_id = this.props.authUser.id; 

        let { title } = this.state.track;
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
        const { id } = this.state.track;

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

    handleBeatChange = (changeEvent) => {
        const { track } = this.state;
        // REFACTOR? 
        // Extract target tag id information from string into array
        // "instrumentSequence beatIndex beatBoolean" 
        // e.g. "2 5 0" // => [2, 5, 0]
        const targets = changeEvent.target.id.split(' ');
        const instrumentSequence = targets[0];
        const beatIndex = targets[1];
        let beatBoolean = targets[2]; 
        console.log('beatBoolean (pre): ', beatBoolean)
        beatBoolean === "true"
            ? beatBoolean = false
            : beatBoolean = true;

        const newTrack = {...track};
        newTrack.checked[instrumentSequence][beatIndex] = beatBoolean;
        console.log(newTrack.checked[0])
        this.setState({
            // [f1]
            track: newTrack
        })
    }

    handleTempoChange = (changeEvent) => {
        const { track } = this.state;
        const newTrack = {...track};
        newTrack.tempo = changeEvent.target.value;

        this.setState({
            track: newTrack
        })
    }

    handleTitleChange = (changeEvent) => {
        const { track } = this.state;
        const newTrack = {...track};
        newTrack.title = changeEvent.target.value;

        this.setState({
            track: newTrack
        })
    }

    handleResetTrack = (changeEvent) => {
        console.log('reset')
        const { track } = this.state;
        const { checked, ...arr } = track;
        this.setState({
            track: {
                ...arr,
                checked: [
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                ],
            }
        })
    }


    render() {
        console.log('DrumMachine state: ', this.state)

        const { 
            track,
        } = this.state;

        const {
            authUser,
            // track,
            editable,
            // titleChange,
            // tempoChange,
            // toggleBeat,
            // resetTrack,
            // submitTrack,
            // deleteTrack,
        } = this.props;

        return (
            <div className="component drum-machine">
                <Header
                    track={track}
                    editable={editable}
                    titleChange={this.handleTitleChange}
                />
                <UberControls
                    authUser={authUser}
                    track={track}
                    editable={editable}
                    resetTrack={this.handleResetTrack}
                    createTrack={this.handleCreateTrack}
                    updateTrack={this.handleUpdateTrack}
                    deleteTrack={this.handleDeleteTrack}
                />
                <Tempo
                    track={track}
                    editable={editable}
                    tempoChange={this.handleTempoChange}
                />
                <StepSequencer
                    track={track}
                    editable={editable}
                    toggleBeat={this.handleBeatChange}
                />
            </div>
        )
    }
}
