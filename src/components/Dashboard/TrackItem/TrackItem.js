import React from 'react';
import { Link } from 'react-router-dom';
import UserControls from '../UserControls/UserControls';

export default function TrackItem (props) {
    const { track, user, who } = props;
    // console.log('TrackItem props: ', props)

    return (
        <li className="composition track-item">
            <h2>{track.title}</h2>
            { who !== 'private' 
                ? <p className="public-user">by {user}</p> 
                : null }
            <p>3 Sept 2020</p>
            
            { who === 'private' && 
                <UserControls 
                    track={track}
                    onChange={e => props.onChange(e)}
                    // onClickDelete={props.onClickDelete}
                    onClickDelete={(trackId) => props.onClickDelete(trackId)}
                />
            }
            
            <Link to={`/track/${track.id}`}>See Drum Machine Configuration</Link>

            {/* <button>Listen to Audio Sample</button> // revisit once dealing with sound */}
            
        </li>
    )
}