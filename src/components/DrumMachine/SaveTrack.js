import React from 'react';

export default function SaveTrack (props) {
    return (
        <>
            <button 
                type="submit"
                onClick={e => props.onClickSubmitNewTrack(e)}
                // onClick={() => props.onClickReset(track.id)}
            >
                {props.label} Track
            </button>
        </>
    )
}