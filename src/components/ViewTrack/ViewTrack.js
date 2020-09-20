import React from 'react';
import ApiContext from '../../ApiContext';
import { NavLink, navLink } from 'react-router-dom';
import DrumMachine from '../DrumMachine/DrumMachine';

export default class AddTrack extends React.Component {

    static defaultProps = {
        match: {
            params: {}
        }
    }

    state = {
        editable: false
    }
    
    static contextType = ApiContext;

    render () {
        const { editable } = this.state;
        const { tracks=[] } = this.context;
        const { trackId } = this.props.match.params;
        const track = tracks.find(track => track.id == trackId)

        return (
            <div className="track-view">
                <DrumMachine 
                    track={track} 
                    editable={editable}
                />
                {/* <NavLink to={`/edit/${trackId}`}>Edit Track</NavLink> */}
            </div>
        )
    }
}