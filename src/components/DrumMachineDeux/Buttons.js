import React from "react";
import PlayButton from "./PlayButton";
import TimeSignature from "./TimeSignature";
import TempoSlider from "./TempoSlider";
import TempoDisplay from "./TempoDisplay";
// import TapTempo from "./TapTempo";
import ResetButton from "./ResetButton";
import DeleteButton from "./DeleteButton";
import CreateButton from "./CreateButton";
import UpdateButton from "./UpdateButton";
import EditButton from "./EditButton";
import styles from "./Buttons.module.css";

const Buttons = props => {
    const { 
        authUser, 
        editable, 
        track 
    } = props;
    // console.log('editable?: ', editable)

    return (
        <div id="buttons" className={styles.root}>
            {editable 
                ?
                    <>
                    <div className={styles.wrapperTop}>
                        <PlayButton
                            isPlaying={props.isPlaying}
                            onTogglePlay={props.onTogglePlay}
                            />
                        <TimeSignature
                            sequence_length={props.sequence_length}
                            onLengthChange={props.onLengthChange}
                            />
                        <ResetButton onReset={props.onReset} />
                        {track.id === 0
                            ?   <CreateButton onCreate={props.onCreate} />
                            :   <>
                                    <UpdateButton onUpdate={props.onUpdate} />
                                    <DeleteButton onDelete={props.onDelete} />
                                </>
                        }
                    </div>
                    <div className={styles.wrapperBottom}>
                        <TempoDisplay tempo={props.tempo} />
                        <TempoSlider tempo={props.tempo} onTempoChange={props.onTempoChange} />
                    </div>
                    </>
                :

                    <div className={styles.wrapperTop}>
                        <PlayButton
                            isPlaying={props.isPlaying}
                            onTogglePlay={props.onTogglePlay}
                            />
                        <EditButton onEdit={props.onEdit} trackId={props.trackId} />
                    </div>
            }   
        </div>
    )
};

export default Buttons;
