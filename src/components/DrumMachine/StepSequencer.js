import React from 'react';
import uuid from 'react-uuid';
import Instrument from './Instrument';
import InstrumentSelector from './InstrumentSelector';
import DownloadTrack from './DownloadTrack';
import SaveTrack from './SaveTrack';

export default function StepSequencer (props) {

    const instrumentArr = [];
    
    props.track.step_sequence.forEach(sequence => 
        instrumentArr.push(
            <Instrument
                id={uuid()}
                steps={sequence}
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
