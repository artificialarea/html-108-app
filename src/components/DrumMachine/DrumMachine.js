import React from 'react';
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';
import UberControls from './UberControls';


export default function DrumMachine (props) {
    const { 
        authUser,
        track, 
        editable,
        titleChange,
        tempoChange,
        toggleBeat,
        resetTrack,
        submitTrack, 
        deleteTrack,
    } = props;
    // console.log('DrumMachine track: ', track)
    return (
        <div className="component drum-machine">
            <Header 
                track={track} 
                editable={editable}
                titleChange={e => titleChange(e)}
            />
            <UberControls 
                authUser={authUser}
                track={track}
                editable={editable}
                resetTrack={e => resetTrack(e)}
                submitTrack={e => submitTrack(e)}
                deleteTrack={e => deleteTrack(e)}
            />
            <Tempo 
                track={track} 
                editable={editable}
                tempoChange={e => tempoChange(e)}
            />
            <StepSequencer 
                track={track} 
                editable={editable}
                toggleBeat={e => toggleBeat(e)}
            />
        </div>
    )
}
