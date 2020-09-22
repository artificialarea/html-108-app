import React from 'react';

export default function SaveTrack (props) {

    const { label, createTrack } = props;

    return (
        <>
            <button 
                type="submit"
                onClick={(e) => createTrack(e)} >
                {label}
            </button>
        </>
    )
}