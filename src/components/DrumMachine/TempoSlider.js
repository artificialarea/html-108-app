import React from "react";
import styles from "./TempoSlider.module.css";

const TempoSlider = props => (
    <div className={styles.root}>



            <input
                type="range"
                id="tempo"
                name="tempo"
                min="30"
                max="300"
                value={props.tempo}
                className={styles.slider}
                onChange={e => {
                    props.onTempoChange(e.target.value);
                }}
            />
        <label for="tempo" className={styles.screenreadertext}>Tempo</label>


    </div>
);

export default TempoSlider;
