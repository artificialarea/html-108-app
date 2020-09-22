import React from 'react';

export default function UpdateTrack (props) {

    const { label, updateTrack } = props;

    return (
        <>
            <button 
                type="submit"
                onClick={(e) => updateTrack(e)} >
                {label}
            </button>
        </>
    )
}