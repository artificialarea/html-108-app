import React from 'react';

export default function Beat (props) {
    const { track, id, userId, beat } = props;

    let item;
    let itemChecked;
    if (track.id === 0 || track.user_id === userId) {
        item = <li id={id} onClick={e => props.onClick(e)}></li>
        itemChecked = <li className="checked" id={id} onClick={e => props.onClick(e)}></li>
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
            {/* {beat
                ?   <li 
                        className="checked" 
                        id={id}
                        onClick={e => props.onClick(e)}
                            
                    >
                            {beat}
                    </li>
                :   <li 
                        id={id}
                        onClick={e => props.onClick(e)}
                    >
                            {beat}
                    </li>
            } */}
        </>
    )
}
