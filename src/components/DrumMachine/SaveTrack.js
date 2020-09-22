import React from 'react';

export default function SaveTrack (props) {

    const { label, submitTrack } = props;

    return (
        <>
            <button 
                type="submit"
                onClick={(e) => submitTrack(e)} >
                {label}
            </button>
        </>
    )
}