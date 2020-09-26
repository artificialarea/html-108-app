import React from "react";
import styles from "./TimeSignature.module.css";

const TimeSignature = props => {

    return (
        <div className={styles.root}>
            <select
                name="length"
                id="row-length"
                className={styles.length}
                value={props.sequence_length}
                onChange={e => {
                    props.onLengthChange(e.target.value);
                }}
            >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
            </select>
        </div>
    )
};

export default TimeSignature;
