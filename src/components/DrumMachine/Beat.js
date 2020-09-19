import React from 'react';

export default function Beat (props) {
    const { id, beat, editable, toggleBeat } = props;

    let item;
    let itemChecked;
    if (editable) {
        item = <li id={id} onClick={e => toggleBeat(e)}></li>
        itemChecked = <li className="checked" id={id} onClick={e => toggleBeat(e)}></li>
    } else {
        item = <li id={id}></li>
        itemChecked = <li className="checked" id={id}></li>
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
