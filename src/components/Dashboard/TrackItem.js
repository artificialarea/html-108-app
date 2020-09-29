import React from 'react';
import { Link } from 'react-router-dom';
import UserControls from './UserControls';
import styles from './TrackItem.module.css';

export default function TrackItem (props) {
    const { track, user, who } = props;

    return (
        // <Link to={`/tracks/${track.id}`} className={styles.link}>    // bypassing ViewTrack view
        <Link to={`/edit/${track.id}`} className={styles.link}>
        <li className={styles.root}>
            <h2>{track.title}</h2>
            {/* { who !== 'private' 
                ? <p className="public-user">by {user}</p> 
                : null } */}
            <p><span className={styles.date}>{track.date_modified}</span></p>
            
            { who === 'private' && 
                <UserControls 
                    track={track}
                    onChange={e => props.onChange(e)}
                    // onClickDelete={props.onClickDelete}
                    onClickDelete={(trackId) => props.onClickDelete(trackId)}
                />
            }
            
            {/* <Link to={`/tracks/${track.id}`}>See Drum Machine Configuration</Link> */}

            {/* <button>Listen to Audio Sample</button> // revisit once dealing with sound */}
            
        </li>
        </Link>
    )
}