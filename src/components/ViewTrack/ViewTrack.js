import React from 'react';
import ApiContext from '../../ApiContext';
import DrumMachineDeux from '../DrumMachineDeux/DrumMachineDeux';


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

        // WORKS AS IT SHOULD
        // console.log('tracks (via context): ', tracks)
        // console.log('trackId (via match.params): ', trackId)
        // console.log('track to view: ', track)

        return (
            <div className="track-view">
                <DrumMachineDeux 
                    track={track} 
                    editable={editable}
                />
            </div>
        )
    }
}