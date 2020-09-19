import React from 'react';
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';

export default function DrumMachine (props) {
    const { 
        // users, 
        // userId, 
        track, 
        titleChange,
        onChange,
        onClick,
        onClickReset,
        onClickSubmitNewTrack, 
    } = props;

    return (
        <div className="component drum-machine">
            <Header 
                track={track} 
                titleChange={e => titleChange(e, track.id)}
            />
            <Tempo 
                track={track} 
                // userId={userId}
                onChange={e => onChange(e)}
            />
            <StepSequencer 
                track={track} 
                // userId={userId}   
                // users={users}
                onClick={e => onClick(e)}
                onClickReset={e => onClickReset(e)}
                onClickSubmitNewTrack={e => onClickSubmitNewTrack(e)}
            />
        </div>
    )
}
