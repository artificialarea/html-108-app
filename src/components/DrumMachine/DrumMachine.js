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
            audio_sequence: [ 'hihat', 'clap', 'trap', 'bass'],
            step_sequence: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ],
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
                user_id: this.props.authUser.id, 
                title: '',
                date_modified: '',
                visible: true,
                tempo: 120,
                sequence_length: 16,
                audio_sequence: [ 'hihat', 'clap', 'trap', 'bass'],
                step_sequence: [
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                ],
            }
        }
    }

   
    componentDidMount = () => {
        const { id } = this.props.track;
        // const { id } = this.state;

        if (id) {
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
                .then(track => {
                    this.setState({
                        track
                    })
                })
                .catch(error => {
                    console.error(error);
                    this.setState({ error });
                })
        } else {
            // by deduction we are in /add-track view, 
            // so leave this.state as is (for new track)  
        }
    }

    handleCreateTrack = (changeEvent) => {
        const {
            user_id,
            // title,
            visible,
            tempo,
            sequence_length,
            audio_sequence,
            step_sequence,
        } = this.state.track;

        // const user_id = this.props.authUser.id; 

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
            audio_sequence,
            step_sequence,
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
                // console.log('this.props.history:', this.props.history)
                // this.props.history.push(`/edit/${track.id}`)
                this.props.history.push(`/`)
            })
            .catch(err => {
                console.error({ err });
                this.setState({
                    error: `Error: ${err}`
                });
            })
    }


    handleUpdateTrack = (changeEvent) => {

        const {
            id,
            user_id,
            // title,
            date_modified,
            visible,
            tempo,
            sequence_length,
            audio_sequence,
            step_sequence,
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
            audio_sequence,
            step_sequence,
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
                // console.log('this.props.history:', this.props.history)
                // this.props.history.push(`/edit/${track.id}`)
                this.props.history.push(`/tracks/${newTrack.id}`)
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
                // console.log('this.props.history:', this.props.history)
                // this.props.history.push(`/edit/${track.id}`)
                this.props.history.push(`/`)
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

        beatBoolean == 1        // fails if strict equality (===)
            ? beatBoolean = 0
            : beatBoolean = 1;

        const newTrack = {...track};
        newTrack.step_sequence[instrumentSequence][beatIndex] = beatBoolean;
        this.setState({
            // [f1]
            // track: newTrack
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
        const { track } = this.state;
        const { step_sequence, ...arr } = track;
        this.setState({
            track: {
                ...arr,
                step_sequence: [
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
