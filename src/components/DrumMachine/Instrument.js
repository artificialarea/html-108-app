import React from 'react';
import uuid from 'react-uuid';
import Beat from './Beat';
import InstrumentSound from './InstrumentSound'

export default function Instrument (props) {

    const stepSequence = props.steps;
    const beatArr = [];
    // had an issue with stepSequence.forEach() method,
    // so resorting to old faithful
    for (let i = 0; i < stepSequence.length; i++ ) {
        beatArr.push(
            <Beat 
                key={uuid()}
                id={`${props.sound} ${i} ${stepSequence[i]}`}
                beat={stepSequence[i]}
                onClick={e => props.onClick(e)}
            />
        )
    }

    return (
        <div className="instrument" id={props.id}>
            <InstrumentSound type={props.sound} />
            <ul>
                {beatArr}
            </ul>
        </div>
    )
}
