import React from "react";
import styles from "./BoxRow.module.css";
// import PitchSelect from "./PitchSelect";     // Disabled for now
import Box from "./Box";

const BoxRow = props => (
    <div className={styles.root}>
        {/* // Simplifying by removing ability to select pitch */}
        {/* <PitchSelect
            editable={props.editable}
            onPitchSelect={props.onPitchSelect}
            notes={props.notes}
            row={props.row}
        /> */}
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
