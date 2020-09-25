import React from 'react';
import { NavLink } from 'react-router-dom';
import PlayButton from './PlayButton';
import SaveTrack from './SaveTrack';
import UpdateTrack from './UpdateTrack';
import ResetTrack from './ResetTrack';
import DeleteTrack from './DeleteTrack';


export default function UberControls (props) {
    const { 
        authUser = {}, 
        track, 
        editable, 
        createTrack, 
        updateTrack, 
        resetTrack,
        deleteTrack, 
    } = props;

    let conditionalSaveButton;
    let conditionalResetButton;
    let conditionalDeleteButton;

    if (editable) {
        if (track.id === 0) {
            conditionalSaveButton = <SaveTrack label={'SAVE'} createTrack={e => createTrack(e)}/>
        } else if (track.user_id === authUser.id) {
            conditionalSaveButton = <UpdateTrack label={'UPDATE'} updateTrack={e => updateTrack(e)}/>
        }
        conditionalResetButton = <ResetTrack resetTrack={e => resetTrack(e)} />
        conditionalDeleteButton = <DeleteTrack deleteTrack={e => deleteTrack(e)} />
    } else {
        conditionalSaveButton = null
        conditionalResetButton = null
    }

    return (
        <div className="uber-controls">
            {/* <PlayButton /> */}
            {conditionalSaveButton}
            {conditionalResetButton}
            {conditionalDeleteButton}
            {!editable
                ? <NavLink to={`/edit/${track.id}`}><button>EDIT</button></NavLink>
                : null
            }

        </div>
    )
}
