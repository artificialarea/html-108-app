import React from 'react';
import { Link } from 'react-router-dom';
import UserControls from '../UserControls/UserControls';

export default function TrackItem (props) {

    return (
        <li className="composition track-item">
            <h2>{props.track.title}</h2>
            { props.who !== 'private' 
                ? <p className="public-user">by {props.user}</p> 
                : null }
            <p>3 Sept 2020</p>
            
            { props.who === 'private' && 
                <UserControls 
                    track={props.track}
                    onChange={e => props.onChange(e)}
                />
            }
            
            <Link to={`/track/${props.track.id}`}>See Drum Machine Configuration</Link>

            {/* <button>Listen to Audio Sample</button> // revisit once dealing with sound */}
            
        </li>
    )
}