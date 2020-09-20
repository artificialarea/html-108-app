import React from 'react';

export default function SaveTrack (props) {

    const { label, submitNewTrack } = props;

    return (
        <>
            <button 
                type="submit"
                onClick={(e) => submitNewTrack(e)} >
                {label} Track
            </button>
        </>
    )
}