import React from 'react';
import uuid from 'react-uuid';
import Instrument from './Instrument';
import InstrumentSelector from './InstrumentSelector';
import DownloadTrack from './DownloadTrack';
import SaveTrack from './SaveTrack';

export default function StepSequencer (props) {

    const instrumentArr = [];

    const obj = props.track.step_sequence;
    
    Object.keys(obj).forEach(key => 
        instrumentArr.push(
            <Instrument
                key={uuid()}
                id={uuid()}
                track={props.track}
                sound={key}
                steps={obj[key]}
                onClick={e => props.onClick(e)}
            />
        )
    )

    return (
        <div className="step-sequencer">
                        
            <InstrumentSelector />

            {instrumentArr}
            
            <div className="controls-file">
                <DownloadTrack />
                <SaveTrack />
            </div>
            
        </div>

    )
}
