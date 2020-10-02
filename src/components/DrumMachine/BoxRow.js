import React from "react";
import styles from "./BoxRow.module.css";
import Box from "./Box";

const BoxRow = props => (
    <div className={styles.root}>
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
