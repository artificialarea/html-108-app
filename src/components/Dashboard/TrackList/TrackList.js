import React from 'react';
import uuid from 'react-uuid';
import TrackItem from '../TrackItem/TrackItem';

export default function TrackList (props) {

    const publicTracks = [];
    const privateTracks = [];

    const obj = props.tracks;
    // console.log('Object.keys(obj): ', Object.keys(obj))
    Object.keys(obj).forEach(key => {
        // console.log(key, obj[key])
        if (props.who !== 'private') {
            if (obj[key].public === true) {
                const trackUser = props.users[props.userId]
                publicTracks.push(
                    <TrackItem 
                        key={uuid()}
                        who={props.who}
                        user={trackUser} 
                        track={obj[key]}
                    />
                );
            }
        }
        if (obj[key].user_id === props.userId) {
            privateTracks.push(
                <TrackItem 
                    key={uuid()}
                    who={props.who}
                    track={obj[key]}
                    onChange={e => props.onChange(e)}
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