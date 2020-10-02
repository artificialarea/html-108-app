import React from 'react';
import ApiContext from '../../ApiContext';
import DrumMachine from '../DrumMachine/DrumMachine';


export default class ViewTrack extends React.Component {

    static defaultProps = {
        match: {
            params: {}
        },
        track: {},
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
            </div>
        )
    }
}