import React from 'react';
import uuid from 'react-uuid';
import TrackItem from '../TrackItem/TrackItem';

export default function TrackList (props) {

    const publicTracks = [];
    const privateTracks = [];

    props.tracks.forEach(track => {
        if (props.who !== 'private') {
            if (track.public === true) {
                const trackUser = props.users.find(user => user.id === track.user_id ).username
                publicTracks.push(
                    <TrackItem 
                        key={uuid()}
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
                    key={uuid()}
                    who={props.who}
                    track={track}
                    // onChange={e => props.onChange(e.target)}
                    onChange={props.onChange}
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