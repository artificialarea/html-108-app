import React from 'react';
import DrumMachine from '../DrumMachine/DrumMachine';
import ApiContext from '../../ApiContext';
import config from '../../config';

export default class EditTrack extends React.Component {

    static defaultProps = {
        history: {
            push: () => {}
        },
        track: {},
        // match: {
        //     params: {}
        // },
        authUser: {}
    }
    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            editable: true, 
            error: null,
            track: {
                id: '',
                user_id: '', 
                title: '',
                date_modified: '',
                visible: true,
                tempo: '',
                sequence_length: '',
                audio_sequence: [],
                step_sequence: [],
            }
        }
    }

    resettrack () {
        const { step_sequence, ...arr } = this.state;
        this.setState({
            ...arr,
            step_sequence: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ],
        })
    }

    componentDidMount () {
        const { id } = this.props.track;

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
    }


    render () {
        const { authUser } = this.props;
        const { editable, track } = this.state;

        return (
            <div className="track-edit">
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