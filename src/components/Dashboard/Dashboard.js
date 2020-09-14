import React from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import TrackList from './TrackList/TrackList';
import SearchBox from './SearchBox/SearchBox';


export default function Dashboard (props) {
    const { who, users, tracks, userId, searchTerm } = props;

    return (
        <div className="component dashboard">
            <DashboardHeader 
                who={who}
                userId={userId}
                users={users}
            />
            <SearchBox 
                handleUpdate={props.handleUpdate}
            />
            <TrackList 
                who={who}
                userId={userId}
                users={users}
                tracks={tracks}
                onChange={e => props.onChange(e)}
                // onClickDelete={props.onClickDelete}
                onClickDelete={(trackId) => props.onClickDelete(trackId)}
                searchTerm={searchTerm}
            />
        </div>
    )
}
