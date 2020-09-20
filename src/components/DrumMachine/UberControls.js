import React from 'react';
import { NavLink } from 'react-router-dom';
import PlayButton from './PlayButton';
import SaveTrack from './SaveTrack';
import ResetTrack from './ResetTrack';
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
        submitNewTrack, 
        resetTrack 
    } = props;

    let conditionalSaveButton;
    let conditionalResetButton;

    if (editable) {
        if (track.id === 0) {
            conditionalSaveButton = <SaveTrack label={'Save'} submitNewTrack={e => submitNewTrack(e)}/>
            conditionalResetButton = <ResetTrack resetTrack={e => resetTrack(e)} />
        } else if (track.user_id === authUser.id) {
            conditionalSaveButton = <SaveTrack label={'Update'}/>
            conditionalResetButton = <ResetTrack resetTrack={e => resetTrack(e)} />
        }
    } else {
        conditionalSaveButton = null
        conditionalResetButton = null
    }

    return (
        <div className="uber-controls">
            <PlayButton />
            {conditionalSaveButton}
            {conditionalResetButton}
            {!editable
                ? <NavLink to={`/edit/${track.id}`}>Edit Track</NavLink>
                : null
            }

            {/* <DownloadTrack /> */}
            {/* <FontAwesomeIcon icon={faCloudDownloadAlt}/> */}
        </div>
    )
}