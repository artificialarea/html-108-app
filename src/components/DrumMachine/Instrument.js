import React from 'react';
import uuid from 'react-uuid';
import Beat from './Beat';
import InstrumentSound from './InstrumentSound'

export default function Instrument (props) {
    
    const key = Object.keys(props.steps)
    const stepSequence = props.steps[key];
    const beatArr = [];
    // had an issue with stepSequence.forEach() method,
    // so resorting to old faithful
    for (let i = 0; i < stepSequence.length; i++ ) {
        beatArr.push(
            <Beat 
                id={uuid()}
                beat={stepSequence[i]}
            />
        )
    }

    return (
        <div className="instrument" key={props.id} id={props.id}>
            <InstrumentSound type={key} />
            <ul>
                {beatArr}
            </ul>
        </div>
    )
}
