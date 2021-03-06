import React from 'react';
import TrackItem from './TrackItem';
import styles from './TrackList.module.css'

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
                        key={track.id}
                        who={who}
                        track={track}
                        onChange={e => props.onChange(e)}
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
            <ul className={styles.root}>
                {dashboardDisplay}
            </ul>
    )
}

TrackList.defaultProps = {
    tracks: []
}