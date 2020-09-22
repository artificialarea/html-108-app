import React from 'react';

export default function ResetTrack (props) {

    const { resetTrack } = props;

    return (
        <>
            <button 
                type="submit"
                onClick={(e) => resetTrack(e)} >
                RESET
            </button>
        </>
    )
}