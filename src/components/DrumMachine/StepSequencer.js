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
    const { track, userId } = props;

    const instrumentArr = [];

    const obj = track.step_sequence;
    // console.log('step_sequence: ', obj)
    
    // surprised this still works as in db step_sequence is an array 
    // but looks like react somehow converts them into sequentially numbered objects
    // so I'll persist with this for now
    Object.keys(obj).forEach(key => 
        instrumentArr.push(
            <Instrument
                key={key}
                id={key}
                userId={userId}
                track={track}
                sound={key}
                steps={obj[key]}
                onClick={e => props.onClick(e)}
            />
        )
    )

    // thought I would need to switch to this
    // track.step_sequence.map(item => 
    //     instrumentArr.push(
    //         <Instrument
    //             key={item}
    //             id={item}
    //             userId={userId}
    //             track={track}
    //             sound={item}
    //             steps={item}
    //             onClick={e => props.onClick(e)}
    //         />
    //     )
    // )


    
    let conditionalSaveButton;
    let conditionalResetButton;
    if (track.id === 0) {
        conditionalSaveButton = <SaveTrack label={'Save'} onClickSubmitNewTrack={e => props.onClickSubmitNewTrack(e)}/>
        // conditionalSaveButton = <FontAwesomeIcon icon={faCloudUploadAlt}/>
        conditionalResetButton = <ResetTrack track={track} onClickReset={e => props.onClickReset(e)} />

    } else if (track.user_id === userId) {
        conditionalSaveButton = <SaveTrack label={'Update'}/>
        // conditionalSaveButton = <FontAwesomeIcon icon={faCloudUploadAlt}/>
        conditionalResetButton = null
    } else {
        // Because a user can't save another user's track at present.
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
