import React from 'react';
import Instrument from './Instrument';
import InstrumentSelector from './InstrumentSelector';


export default function StepSequencer (props) {
    const { 
        track, 
        editable, 
        toggleBeat, 
    } = props;

    const instrumentArr = [];
    const obj = track.step_sequence;

    Object.keys(obj).forEach((key, index) => 
        instrumentArr.push(
            <Instrument
                key={key}
                id={key}
                track={track}
                editable={editable}
                sound={track.audio_sequence[index]}
                sequence={key}
                steps={obj[key]}
                toggleBeat={e => toggleBeat(e)}
            />
        )
    )
    
    return (
        <div className="step-sequencer">
                        
            <InstrumentSelector />

            {instrumentArr}

        </div>

    )
}

StepSequencer.defaultProps = {
    authUser: {},
}
