import React from 'react';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';


export default function Dashboard (props) {

    return (
        <div className="component dashboard">
            <DashboardHeader 
                who={props.who}
                userId={props.userId}
                users={props.users}
            />
            <TrackList 
                id={uuid()}  // TEMP until set up Routes
                who={props.who}
                userId={props.userId}
                users={props.users}
                tracks={props.tracks}
            />
        </div>
    )
}

function DashboardHeader (props) {

    let displayView;
    let usernameTitle;

    if (props.who !== 'private') {
        displayView = 'Community Dashboard'
    } else {
        usernameTitle = props.users.find(user => user.id === props.userId).username;
        displayView = `${usernameTitle}'s Dashboard`;
    }

    return (
        <header role="banner">
            <h1>{displayView}</h1>
            {props.who !== 'public' ? <Link to='/profile'>Edit Profile</Link> : null}
        </header>
    )
}

function TrackList (props) {

    const publicTracks = [];
    const privateTracks = [];

    props.tracks.forEach(track => {
        if (props.who !== 'private') {
            if (track.public === true) {
                const trackUser = props.users.find(user => user.id === track.user_id ).username
                publicTracks.push(
                    <TrackItem 
                        id={uuid()}
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
                    id={uuid()}
                    who={props.who}
                    track={track}
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

function TrackItem (props) {

    return (
        <li className="composition track-item" key={props.id}>
            <h2>{props.track.title}</h2>
            { props.who !== 'private' 
                ? <p className="public-user">by {props.user}</p> 
                : null }
            <p>3 Sept 2020</p>
            
            { props.who === 'private' && 
                <UserControls />
            }
            
            <button>Listen to Audio Sample</button> <button>See Drum Machine Configuration</button>
        </li>

    )
}

function UserControls (props) {
    return (
        <div className="user-controls">
            <input type="radio" name="composition-1" value="private"/>Private
            <input type="radio" name="composition-1" value="public"/>Public
            <br />
            <button>Delete Track</button>
        </div>
    )
}