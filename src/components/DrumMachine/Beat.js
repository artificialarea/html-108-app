import React from 'react';

export default function Beat (props) {
    return (
        <> 
            {props.beat
                ? <li className="checked"></li>
                : <li></li>
            }
        </>
    )
}
