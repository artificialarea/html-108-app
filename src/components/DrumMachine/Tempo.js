import React from 'react';
import TempoDisplay from './TempoDisplay';
import TempoControl from './TempoControl';


export default function Tempo (props) {
    const { track, editable, tempoChange } = props;
    return (
        <div className="tempo__controls">
            { editable &&
                <>
                    <TempoDisplay 
                        track={track} 
                        tempoChange={e => tempoChange(e)}
                    />
                    <TempoControl 
                        track={track} 
                        tempoChange={e => tempoChange(e)}
                    />
                </>
            }   
        </div>
    )
}
