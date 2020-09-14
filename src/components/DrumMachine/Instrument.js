import React from 'react';
import Beat from './Beat';
import InstrumentSound from './InstrumentSound'

export default function Instrument (props) {
    const { userId, track, steps, sound } = props;

    // const stepSequence = props.steps;
    const beatArr = [];
    // had an issue with stepSequence.forEach() method,
    // so resorting to old faithful
    for (let i = 0; i < steps.length; i++ ) {
        beatArr.push(
            <Beat 
                // key={uuid()}
                key={`${track.id} ${sound} ${i} ${steps[i]}`}
                id={`${track.id} ${sound} ${i} ${steps[i]}`}
                userId={userId}
                track={track}
                beat={steps[i]}
                onClick={e => props.onClick(e)}
            />
        )
    }

    return (
        <div className="instrument" id={props.id}>
            <InstrumentSound type={sound} />
            <ul>
                {beatArr}
            </ul>
        </div>
    )
}
