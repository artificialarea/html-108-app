import React from 'react';

export default function Beat (props) {
    const { id, beat, editable, toggleBeat } = props;

    let item;
    let itemChecked;
    if (editable) {
        item = <li id={id} onClick={e => toggleBeat(e)}></li>
        itemChecked = <li className="checked" id={id} onClick={e => toggleBeat(e)}></li>
    } else {
        item = <li className="inert" id={id}></li>
        itemChecked = <li className="inert checked" id={id}></li>
    }

    return (
        <> 
            {beat
                ?   itemChecked
                :   item
            }
        </>
    )
}
