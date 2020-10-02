import React from 'react';
import Header from './Header';
import TrackList from './TrackList';
// import SearchBox from './SearchBox';
import styles from './Dashboard.module.css';


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

        const { who, users, tracks, userId, onChange, onClickDelete, } = this.props;
        const { searchTerm } = this.state;
        
        return (
            <div className={styles.root}>
                <Header 
                    who={who}
                    userId={userId}
                    users={users}
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
