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
    const { track, authUser, editable, toggleBeat } = props;

    const instrumentArr = [];

    const obj = track.step_sequence;
    // console.log('step_sequence: ', obj)
    
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
    if (track.id === 0 && editable) {
        conditionalSaveButton = <SaveTrack label={'Save'} onClickSubmitNewTrack={e => props.onClickSubmitNewTrack(e)}/>
        conditionalResetButton = <ResetTrack track={track} onClickReset={e => props.onClickReset(e)} />

    } else if (track.user_id === authUser && editable) {
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
