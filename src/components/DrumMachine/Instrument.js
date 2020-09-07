import React from 'react';
import uuid from 'react-uuid';
import Beat from './Beat';
import InstrumentSound from './InstrumentSound'

export default function Instrument (props) {
    
    let key = Object.keys(props.steps)
    let stepSequence = props.steps[key];
    let beatArr = [];
    stepSequence.forEach(step => {
        beatArr.push(
            <Beat 
                key={uuid()}
                beat={stepSequence[step]}
            />
        )
    })

    return (
        <div className="instrument">
            <InstrumentSound type={key} />
            <ul>
                {beatArr}
            </ul>
        </div>
    )
}
