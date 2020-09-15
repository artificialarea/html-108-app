import React from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import TrackList from './TrackList/TrackList';
import SearchBox from './SearchBox/SearchBox';


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
        }
    }

    updateSearchTerm (term) {
        this.setState({
            searchTerm: term,
        })
    }

    render () {

        const { who, users, tracks, userId, onChange, onClickDelete, onClickFetch } = this.props;
        const { searchTerm } = this.state;
        
        return (
            <div className="component dashboard">
            <button
                type="button"
                onClick={(e) => onClickFetch(e)}
            >
                Fetch Tracks
            </button>
            <DashboardHeader 
                who={who}
                userId={userId}
                users={users}
                />
            <SearchBox 
                handleUpdate={term => this.updateSearchTerm(term)}
                />
            <TrackList 
                who={who}
                userId={userId}
                users={users}
                tracks={tracks}
                onChange={e => onChange(e)}
                onClickDelete={(trackId) => onClickDelete(trackId)}
                searchTerm={searchTerm}
                />
            </div>
        )
    }
}
