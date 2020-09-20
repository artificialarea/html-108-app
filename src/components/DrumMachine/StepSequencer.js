import React from 'react';
import Instrument from './Instrument';
import InstrumentSelector from './InstrumentSelector';
import SaveTrack from './SaveTrack';
import ResetTrack from './ResetTrack';
// import DownloadTrack from './DownloadTrack';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faCloudUploadAlt
// } from '@fortawesome/free-solid-svg-icons';


export default function StepSequencer (props) {
    const { 
        track, 
        authUser, 
        editable, 
        toggleBeat, 
        resetTrack,
        submitNewTrack, 
    } = props;

    const instrumentArr = [];

    const obj = track.step_sequence;
    
    // surprised this still works as in db step_sequence is an array 
    // but looks like react somehow converts them into sequentially numbered objects
    // so I'll persist with this for now
    Object.keys(obj).forEach((key, index) => 
        instrumentArr.push(
            <Instrument
                key={key}
                id={key}
                track={track}
                editable={editable}
                sound={track.audio_sequence[index]}
                sequence={key}
                steps={obj[key]}
                toggleBeat={e => toggleBeat(e)}
            />
        )
    )
    
    let conditionalSaveButton;
    let conditionalResetButton;
    if (track.id === 0 && editable) {
        conditionalSaveButton = <SaveTrack label={'Save'} submitNewTrack={e => submitNewTrack(e)}/>
        conditionalResetButton = <ResetTrack resetTrack={e => resetTrack(e)} />

    } else if (track.user_id === authUser.id && editable) {
        conditionalSaveButton = <SaveTrack label={'Update'}/>
        conditionalResetButton = null
    } else {
        conditionalSaveButton = null
        conditionalResetButton = null
    }
    
    return (
        <div className="step-sequencer">
                        
            <InstrumentSelector />

            {instrumentArr}
            
            <div className="controls-file">
                {conditionalSaveButton}
                {conditionalResetButton}
                
                {/* <DownloadTrack /> */}
                {/* <FontAwesomeIcon icon={faCloudDownloadAlt}/> */}
            </div>


        </div>

    )
}

StepSequencer.defaultProps = {
    authUser: {},
}
