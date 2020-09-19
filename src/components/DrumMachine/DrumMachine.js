import React from 'react';
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';

export default function DrumMachine (props) {
    const { 
        // users, 
        // userId, 
        authUser,
        track, 
        editable,
        titleChange,
        onChange,
        toggleBeat,
        onClickReset,
        onClickSubmitNewTrack, 
    } = props;

    return (
        <div className="component drum-machine">
            <Header 
                track={track} 
                editable={editable}
                titleChange={e => titleChange(e)}
            />
            <Tempo 
                track={track} 
                editable={editable}
                // userId={userId}
                onChange={e => onChange(e)}
            />
            <StepSequencer 
                // userId={userId}   
                // users={users}
                authUser={authUser}
                track={track} 
                editable={editable}
                toggleBeat={e => toggleBeat(e)}
                onClickReset={e => onClickReset(e)}
                onClickSubmitNewTrack={e => onClickSubmitNewTrack(e)}
            />
        </div>
    )
}
