import React from 'react';

export default function UserControls (props) {
    const { track } = props;

    return (
        <div className="user-controls">
            <label>
                <input 
                    type="radio" 
                    // name={`composition-${track.id}`} 
                    name={track.id} 
                    value="private"
                    checked={!track.public}
                    onChange={e => props.onChange(e)}

                />
                Private
            </label>
            <label>
                <input 
                    type="radio" 
                    name={track.id}  
                    value="public"
                    checked={track.public}
                    onChange={e => props.onChange(e)}
                />
                Public
            </label>
            <br />
            <button
                type="button"
                onClick={() => props.onClickDelete(track.id)}
                // onClick={() => testing(track.id)}
            >
                Delete Track
            </button>
        </div>
    )
}