import React from 'react';
import DrumMachine from '../DrumMachine/DrumMachine';
import ApiContext from '../../ApiContext';
import config from '../../config';

export default class AddTrack extends React.Component {

    static defaultProps = {
        history: {
            push: () => {}
        },
        authUser: {}
    }
    static contextType = ApiContext;

    // OPEN QUESTION RE: STATE
    // App level? This level? DrumMachine level?... attempting the latter
    constructor(props) {
        super(props)
        this.state = {
            editable: true, 
            error: null,
            track: {
                id: 0,
                user_id: this.props.authUser.id, 
                title: '',
                // date_modified: new Date(),
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

    handleSubmitNewTrack = (changeEvent) => {
        
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

        console.log("pre-fetch body: ", newTrack)

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
                this.props.history.push(`/edit/${track.id}`)
            })
            .catch(err => {
                this.setState({
                    error: `Error: ${err}`
                });
            })
    }

    // TODO: Refactor so DRY
    // Since these eventhandler are required in EditTrack component, too
    // Should either: 
    //// [a] have this in DrumMachine; or 
    //// [b] use context or service object

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


    render () {
        const { authUser } = this.props;
        const { editable, track } = this.state;
        console.log(track)
        return (
            <div className="track-add">
                <DrumMachine 
                    authUser={authUser}
                    track={track} 
                    editable={editable}
                    toggleBeat={this.handleBeatChange}
                    titleChange={this.handleTitleChange}
                    tempoChange={this.handleTempoChange}
                    resetTrack={this.handleResetTrack}
                    submitNewTrack={this.handleSubmitNewTrack}
                />
            </div>
        )
    }
}