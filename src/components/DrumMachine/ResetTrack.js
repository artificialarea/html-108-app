import React from 'react';

export default function ResetTrack (props) {

    const { track } = props
    return (
        <>
            <button 
                type="submit"
                // onClick={e => props.onClickReset(e)}
                onClick={() => props.onClickReset(track.id)}

            >
                Reset Track
            </button>
        </>
    )
}