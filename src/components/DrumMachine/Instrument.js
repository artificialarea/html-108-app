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
                // key={uuid()}
                key={`${props.track.id} ${props.sound} ${i} ${stepSequence[i]}`}
                id={`${props.track.id} ${props.sound} ${i} ${stepSequence[i]}`}
                userId={props.userId}
                track={props.track}
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
