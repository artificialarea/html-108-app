import React from 'react';
import { NavLink } from 'react-router-dom';
import PlayButton from './PlayButton';
import SaveTrack from './SaveTrack';
import ResetTrack from './ResetTrack';
import DeleteTrack from './DeleteTrack';
// import DownloadTrack from './DownloadTrack';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faCloudUploadAlt
// } from '@fortawesome/free-solid-svg-icons';


export default function UberControls (props) {
    const { 
        authUser = {}, 
        track, 
        editable, 
        submitTrack, 
        resetTrack,
        deleteTrack, 
    } = props;

    let conditionalSaveButton;
    let conditionalResetButton;
    let conditionalDeleteButton;

    if (editable) {
        if (track.id === 0) {
            conditionalSaveButton = <SaveTrack label={'SAVE'} submitTrack={e => submitTrack(e)}/>
        } else if (track.user_id === authUser.id) {
            conditionalSaveButton = <SaveTrack label={'UPDATE'} submitTrack={e => submitTrack(e)}/>
        }
        conditionalResetButton = <ResetTrack resetTrack={e => resetTrack(e)} />
        conditionalDeleteButton = <DeleteTrack deleteTrack={e => deleteTrack(e)} />
    } else {
        conditionalSaveButton = null
        conditionalResetButton = null
    }

    return (
        <div className="uber-controls">
            <PlayButton />
            {conditionalSaveButton}
            {conditionalResetButton}
            {conditionalDeleteButton}
            {!editable
                ? <NavLink to={`/edit/${track.id}`}><button>EDIT</button></NavLink>
                : null
            }

            {/* <DownloadTrack /> */}
            {/* <FontAwesomeIcon icon={faCloudDownloadAlt}/> */}
        </div>
    )
}
