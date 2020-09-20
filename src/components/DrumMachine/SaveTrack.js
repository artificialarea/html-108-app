import React from 'react';

export default function SaveTrack (props) {

    const { submitNewTrack } = props;

    return (
        <>
            <button 
                type="submit"
                onClick={(e) => submitNewTrack(e)} >
                Save Track
            </button>
        </>
    )
}