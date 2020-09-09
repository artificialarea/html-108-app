import React from 'react';

export default function UserControls (props) {
    return (
        <div className="user-controls">
            <label>
                <input 
                    type="radio" 
                    // name={`composition-${props.track.id}`} 
                    name={props.track.id} 
                    value="private"
                    checked={!props.track.public}
                    // onChange={e => props.onChange(e.target)}
                    onChange={props.onChange}

                />
                Private
            </label>
            <label>
                <input 
                    type="radio" 
                    name={props.track.id}  
                    value="public"
                    checked={props.track.public}
                    // onChange={e => props.onChange(e.target)}
                    onChange={props.onChange}
                />
                Public
            </label>
            <br />
            <button>Delete Track</button>
        </div>
    )
}