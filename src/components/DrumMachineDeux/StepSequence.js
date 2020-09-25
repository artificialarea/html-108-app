import React from "react";
import BoxRow from "./BoxRow";
import styles from "./StepSequence.module.css";

const StepSequence = props => (
    <div id="step-sequence" className={styles.root}>
        <BoxRow
            editable={props.editable}
            checked={props.checked}
            onToggle={props.onToggle}
            sequence_length={props.sequence_length}
            onPitchSelect={props.onPitchSelect}
            notes={props.notes}
            isActive={props.isActive}
            row="0"
        />
        <BoxRow
            editable={props.editable}
            checked={props.checked}
            onToggle={props.onToggle}
            sequence_length={props.sequence_length}
            onPitchSelect={props.onPitchSelect}
            notes={props.notes}
            isActive={props.isActive}
            row="1"
        />
        <BoxRow
            editable={props.editable}
            checked={props.checked}
            onToggle={props.onToggle}
            sequence_length={props.sequence_length}
            onPitchSelect={props.onPitchSelect}
            notes={props.notes}
            isActive={props.isActive}
            row="2"
        />
        <BoxRow
            editable={props.editable}
            checked={props.checked}
            onToggle={props.onToggle}
            sequence_length={props.sequence_length}
            onPitchSelect={props.onPitchSelect}
            notes={props.notes}
            isActive={props.isActive}
            row="3"
        />
    </div>
);

export default StepSequence;
