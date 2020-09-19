import React from 'react';
import ApiContext from '../../ApiContext';
import DrumMachine from '../DrumMachine/DrumMachine';

export default class AddTrack extends React.Component {

    static defaultProps = {
        match: {
            params: {}
        }
    }
    
    static contextType = ApiContext;

    render () {
        const { tracks=[] } = this.context;
        const { trackId } = this.props.match.params;
        const track = tracks.find(track => track.id === parseInt(trackId))

        return (
            <div className="track-view">
                <DrumMachine track={track} />
            </div>
        )
    }
}