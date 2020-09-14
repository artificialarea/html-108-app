import React from 'react';
import uuid from 'react-uuid';
import Instrument from './Instrument';
import InstrumentSelector from './InstrumentSelector';
import DownloadTrack from './DownloadTrack';
import SaveTrack from './SaveTrack';

export default function StepSequencer (props) {
    const { track, userId } = props;

    const instrumentArr = [];

    const obj = track.step_sequence;
    
    Object.keys(obj).forEach(key => 
        instrumentArr.push(
            <Instrument
                // key={uuid()}
                // id={uuid()}
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
    
    let conditionalSaveButton;
    if (track.id === 0) {
        conditionalSaveButton = <SaveTrack label={'Save'}/>
    } else if (track.user_id === userId) {
        conditionalSaveButton = <SaveTrack label={'Update'}/>
    } else {
        // Because a user can't save another user's track at present.
        conditionalSaveButton = null
    }
    
    return (
        <div className="step-sequencer">
                        
            <InstrumentSelector />

            {instrumentArr}
            
            <div className="controls-file">
                {conditionalSaveButton}
                {/* <DownloadTrack /> */}
            </div>


        </div>

    )
}
