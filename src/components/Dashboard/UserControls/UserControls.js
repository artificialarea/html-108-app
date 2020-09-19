import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//     faRedoAlt, 
//     faTrashAlt, 
//     faCloudDownloadAlt, 
//   } from '@fortawesome/free-solid-svg-icons';

export default function UserControls (props) {
    const { track } = props;

    return (
        <div className="user-controls">
            <label>
                <input 
                    type="radio" 
                    // name={`track-${track.id}`} 
                    name={track.id} 
                    value="private"
                    checked={!track.visible}
                    onChange={e => props.onChange(e)}

                />
                Private
            </label>
            <label>
                <input 
                    type="radio" 
                    name={track.id}  
                    value="public"
                    checked={track.visible}
                    onChange={e => props.onChange(e)}
                />
                Public
            </label>
            <br />
            <button
                type="button"
                onClick={() => props.onClickDelete(track.id)}
            >
                Delete Track
            </button>
            {/* <FontAwesomeIcon 
                icon={faTrashAlt}
                type="button"
                onClick={() => props.onClickDelete(track.id)}
            /> */}
        </div>
    )
}