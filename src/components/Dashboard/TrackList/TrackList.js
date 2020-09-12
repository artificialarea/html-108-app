import React from 'react';
import uuid from 'react-uuid';
import TrackItem from '../TrackItem/TrackItem';

export default function TrackList (props) {

    const publicTracks = [];
    const privateTracks = [];
    // console.log('props.tracks: ', props.tracks)

    props.tracks.forEach(track => {
        const userId =  track.user_id
        if (props.who !== 'private') {
            if (track.public === true) {
                const trackUser = props.users.find(user => user.id === userId).username;
                publicTracks.push(
                    <TrackItem 
                        // key={uuid()}
                        key={track.id}
                        who={props.who}
                        user={trackUser} 
                        track={track}
                    />
                );
            }
        }
        if (track.user_id === props.userId) {
            privateTracks.push(
                <TrackItem 
                    // key={uuid()}
                    key={track.id}
                    who={props.who}
                    track={track}
                    onChange={e => props.onChange(e)}
                    // onClickDelete={props.onClickDelete}
                    onClickDelete={(trackId) => props.onClickDelete(trackId)}
                />
            );
        }
    })
    
    const dashboardDisplay = 
        (props.who !== 'private')
                ? publicTracks
                : privateTracks

    return (
        <ul className="track-list" key={props.id}>
            {dashboardDisplay}
        </ul>
    )
}

TrackList.defaultProps = {
    tracks: []
}