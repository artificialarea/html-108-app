import React from 'react';
import DrumMachineDeux from '../DrumMachineDeux/DrumMachineDeux';


export default class AddTrack extends React.Component {

    static defaultProps = {
        history: {
            push: () => {}
        },
        // match: {
        //     params: {}
        // },
        authUser: {},
        track: { id: 0 },
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
            <div className="track-add">
                <DrumMachineDeux 
                    authUser={authUser}
                    track={track} 
                    editable={editable}
                />
            </div>
        )
    }
}