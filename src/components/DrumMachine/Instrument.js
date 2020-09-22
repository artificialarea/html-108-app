import React from 'react';
import Beat from './Beat';
import InstrumentSound from './InstrumentSound'

export default function Instrument (props) {
    const { track, steps, sound, sequence, editable, toggleBeat } = props;

    // const stepSequence = props.steps;
    const beatArr = [];
    // had an issue with stepSequence.forEach() method,
    // so resorting to old faithful
    for (let i = 0; i < steps.length; i++ ) {
        beatArr.push(
            <Beat 
                // key={`${track.id} ${sound} ${i} ${steps[i]}`}
                // id={`${track.id} ${sound} ${i} ${steps[i]}`}
                key={`${sequence} ${i} ${steps[i]}`}
                id={`${sequence} ${i} ${steps[i]}`}
                beat={steps[i]}
                editable={editable}
                toggleBeat={e => toggleBeat(e)}
            />
        )
    }

    return (
        <div className="instrument" id={props.id}>
            {editable 
                ? <InstrumentSound type={sound} />
                : null
            }
            <ul>
                {beatArr}
            </ul>
        </div>
    )
}
