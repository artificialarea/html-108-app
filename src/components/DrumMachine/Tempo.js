import React from 'react';
import PlayButton from './PlayButton';
import TempoDisplay from './TempoDisplay';
import TempoControl from './TempoControl';


export default function Tempo (props) {
    // console.log(props.track)
    return (
        <div className="tempo__controls">
            <PlayButton />
            {(props.track.id === 0 || props.track.user_id === props.userId) &&
                <>
                <TempoDisplay 
                    track={props.track} 
                    onChange={e => props.onChange(e)}
                />
                <TempoControl 
                    track={props.track} 
                    onChange={e => props.onChange(e)}
                />
                </>
            }   
        </div>
    )
}
