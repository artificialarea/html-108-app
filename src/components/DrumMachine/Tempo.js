import React from 'react';
import PlayButton from './PlayButton';
import TempoDisplay from './TempoDisplay';
import TempoControl from './TempoControl';



export default function Tempo (props) {
    const { track, userId } = props;
    // console.log(track)
    return (
        <div className="tempo__controls">
            <PlayButton />
            {(track.id === 0 || track.user_id === userId) &&
                <>
                <TempoDisplay 
                    track={track} 
                    onChange={e => props.onChange(e)}
                />
                <TempoControl 
                    track={track} 
                    onChange={e => props.onChange(e)}
                />
                </>
            }   
        </div>
    )
}
