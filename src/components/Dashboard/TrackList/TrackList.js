import React from 'react';
import TrackItem from '../TrackItem/TrackItem';

export default function TrackList (props) {
    const { users, tracks, who, userId, searchTerm } = props;
    
    const publicTracks = [];
    const privateTracks = [];

    tracks.forEach(track => {
        const trackUserId =  track.user_id
        if (track.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            if (who !== 'private') {
                if (track.visible === true) {
                    const trackUser = users.find(user => user.id === trackUserId).username;
                    publicTracks.push(
                        <TrackItem 
                            // key={uuid()}
                            key={track.id}
                            who={who}
                            user={trackUser} 
                            track={track}
                        />
                    );
                }
            }
            if (track.user_id === userId) {
                
                privateTracks.push(
                    <TrackItem 
                    // key={uuid()}
                    key={track.id}
                    who={who}
                    track={track}
                    onChange={e => props.onChange(e)}
                    // onClickDelete={props.onClickDelete}
                    onClickDelete={(trackId) => props.onClickDelete(trackId)}
                    />
                );
            }
        }
    })
    
    const dashboardDisplay = 
        (who !== 'private')
                ? publicTracks
                : privateTracks

    return (
        <ul className="track-list">
            {dashboardDisplay}
        </ul>
    )
}

TrackList.defaultProps = {
    tracks: []
}