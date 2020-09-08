import React from 'react';

export default function Beat (props) {
    // console.log(props.beat)
    return (
        <> 
            {props.beat
                ? <li className="checked" key={props.id} id={props.id}>{props.beat}</li>
                : <li>{props.beat}</li>
            }
        </>
    )
}
