import React from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import TrackList from './TrackList/TrackList';


export default function Dashboard (props) {
    const { who, users, tracks, userId } = props;

    return (
        <div className="component dashboard">
            <DashboardHeader 
                who={who}
                userId={userId}
                users={users}
            />
            <TrackList 
                who={who}
                userId={userId}
                users={users}
                tracks={tracks}
                onChange={e => props.onChange(e)}
                // onClickDelete={props.onClickDelete}
                onClickDelete={(trackId) => props.onClickDelete(trackId)}
            />
        </div>
    )
}
