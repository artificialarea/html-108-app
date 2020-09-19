import React from 'react';
import DrumMachine from '../DrumMachine/DrumMachine';

export default class AddTrack extends React.Component {

    static defaultProps = {
        id: '',
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
    }

    constructor(props) {
        super(props)
        this.state = {
            editable: true,     // Conditional logic concerning functionality. In <ViewTrack /> will be set to `false`.
            id: '',
            user_id: '', 
            title: '',
            date_modified: '',
            visible: true,
            tempo: null,
            sequence_length: '',
            audio_sequence: [],
            step_sequence: [],
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


    render () {
        const { ...props } = this.state;
        return (
            <div className="track-edit">
                <DrumMachine track={props} />
            </div>
        )
    }
}