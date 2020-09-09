import React from 'react';
import uuid from 'react-uuid';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import TrackList from './TrackList/TrackList';


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
                // onChange={e => props.onChange(e.target)}
                onChange={props.onChange}
            />
        </div>
    )
}
