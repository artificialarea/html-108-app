import React from 'react';

export default function DeleteTrack (props) {

    const { deleteTrack } = props;

    return (
        <>
            <button 
                type="submit"
                onClick={(e) => deleteTrack(e)} >
                DELETE
            </button>
        </>
    )
}