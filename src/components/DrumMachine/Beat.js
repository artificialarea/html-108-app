import React from 'react';

export default function Beat (props) {
    // console.log(props.beat)

    let item;
    let itemChecked;
    if (props.track.id === 0 || props.track.user_id === props.userId) {
        item = <li id={props.id} onClick={e => props.onClick(e)}></li>
        itemChecked = <li className="checked" id={props.id} onClick={e => props.onClick(e)}></li>
    } else {
        item = <li id={props.id}></li>
        itemChecked = <li className="checked" id={props.id}></li>
    }

    return (
        <> 
            {props.beat
                ?   itemChecked
                :   item
            }
            {/* {props.beat
                ?   <li 
                        className="checked" 
                        id={props.id}
                        onClick={e => props.onClick(e)}
                            
                    >
                            {props.beat}
                    </li>
                :   <li 
                        id={props.id}
                        onClick={e => props.onClick(e)}
                    >
                            {props.beat}
                    </li>
            } */}
        </>
    )
}
