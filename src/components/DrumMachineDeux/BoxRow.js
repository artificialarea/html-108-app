import React from "react";
import styles from "./BoxRow.module.css";
import PitchSelect from "./PitchSelect";
import Box from "./Box";

const BoxRow = props => (
    <div className={styles.root}>
        <PitchSelect
            editable={props.editable}
            onPitchSelect={props.onPitchSelect}
            notes={props.notes}
            row={props.row}
        />
        <Box
            editable={props.editable}
            checked={props.checked}
            row={props.row}
            isActive={props.isActive}
            onToggle={props.onToggle}
        />
    </div>
);

export default BoxRow;
