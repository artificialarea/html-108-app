import React from 'react';
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';

export default function DrumMachine (props) {
    const { 
        authUser,
        track, 
        editable,
        titleChange,
        tempoChange,
        toggleBeat,
        resetTrack,
        submitNewTrack, 
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
                tempoChange={e => tempoChange(e)}
            />
            <StepSequencer 
                authUser={authUser}
                track={track} 
                editable={editable}
                toggleBeat={e => toggleBeat(e)}
                resetTrack={e => resetTrack(e)}
                submitNewTrack={e => submitNewTrack(e)}
            />
        </div>
    )
}
