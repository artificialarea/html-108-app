import React from 'react';
import DrumMachine from '../DrumMachine/DrumMachine';


export default class EditTrack extends React.Component {

    static defaultProps = {
        history: {
            push: () => {}
        },
        // match: {
        //     params: {}
        // },
        authUser: {},
        track: {},
    }

    constructor(props) {
        super(props)
        this.state = {
            editable: true, 
            // error: null,
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

    render () {
        const { authUser, track } = this.props;
        const { editable } = this.state;

        return (
            <div className="track-edit">
                <DrumMachine 
                    authUser={authUser}
                    track={track} 
                    routeType={'edit'}
                    editable={editable}
                />
            </div>
        )
    }
}