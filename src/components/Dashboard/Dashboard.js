import React from 'react';
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
                who={props.who}
                userId={props.userId}
                users={props.users}
                tracks={props.tracks}
                onChange={e => props.onChange(e)}
            />
        </div>
    )
}
