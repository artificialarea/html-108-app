import React from 'react';

export default function UserControls (props) {

    // function testing(trackId) {
    //     console.log(trackId)
    // }

    return (
        <div className="user-controls">
            <label>
                <input 
                    type="radio" 
                    // name={`composition-${props.track.id}`} 
                    name={props.track.id} 
                    value="private"
                    checked={!props.track.public}
                    onChange={e => props.onChange(e)}

                />
                Private
            </label>
            <label>
                <input 
                    type="radio" 
                    name={props.track.id}  
                    value="public"
                    checked={props.track.public}
                    onChange={e => props.onChange(e)}
                />
                Public
            </label>
            <br />
            <button
                type="button"
                onClick={() => props.onClickDelete(props.track.id)}
                // onClick={() => testing(props.track.id)}
            >
                Delete Track
            </button>
        </div>
    )
}