import React from 'react';
import PlayButton from './PlayButton';
import TempoDisplay from './TempoDisplay';
import TempoControl from './TempoControl';


export default function Tempo (props) {
    return (
        <div className="tempo__controls">
            <PlayButton />
            <TempoDisplay 
                bpm={props.track.tempo} 
                onChange={e => props.onChange(e)}
            />
            <TempoControl 
                bpm={props.track.tempo} 
                onChange={e => props.onChange(e)}
            />
        </div>
    )
}
