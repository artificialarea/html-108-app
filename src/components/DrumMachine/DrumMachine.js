import React from 'react';
import './DrumMachine.css';
import Header from './Header';
import Tempo from './Tempo';
import StepSequencer from './StepSequencer';

export default function DrumMachine (props) {
    // console.log('props.tracks: ', props.tracks)
    // console.log(props.match.params.trackId)
    // const track = props.tracks.find(track => track.id === props.match.params.trackId)
    console.log('props.track: ', props.track)
    return (
        <div className="component drum-machine">
            <Header track={props.track} />
            <Tempo 
                track={props.track} 
                userId={props.userId}
                onChange={e => props.onChange(e)}
            />
            <StepSequencer 
                track={props.track} 
                userId={props.userId}   
                users={props.users}
                onClick={e => props.onClick(e)}
            />
        </div>
    )
}
