import React from 'react';
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';

export default function DrumMachine (props) {
    const { users, userId, track } = props;
    // console.log('props.tracks: ', props.tracks)
    // console.log(props.match.params.trackId)
    // const track = props.tracks.find(track => track.id === props.match.params.trackId)
    // console.log('props.track: ', props.track)
    return (
        <div className="component drum-machine">
            <Header track={track} />
            <Tempo 
                track={track} 
                userId={userId}
                onChange={e => props.onChange(e)}
            />
            <StepSequencer 
                track={track} 
                userId={userId}   
                users={users}
                onClick={e => props.onClick(e)}
                onClickReset={e => props.onClickReset(e)}
                onClickSubmitNewTrack={e => props.onClickSubmitNewTrack(e)}
            />
        </div>
    )
}
