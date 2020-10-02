import React from 'react';
import DrumMachine from '../DrumMachine/DrumMachine';


export default class EditTrack extends React.Component {

    static defaultProps = {
        history: {
            push: () => {}
        },
        authUser: {},
        track: {},
    }

    constructor(props) {
        super(props)
        this.state = {
            editable: true, 
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
                    editable={editable}
                />
            </div>
        )
    }
}