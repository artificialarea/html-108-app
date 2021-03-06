import React from "react";
import styles from "./PlayButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayButton = props => (
    <div 
        className={styles.root} 
        onClick={props.onTogglePlay} 
        onKeyPress={props.onTogglePlay} 
        tabIndex="0" 
        aria-label="start stop sequence">
        <span className={styles.label}>
            {props.isPlaying 
                ? <FontAwesomeIcon icon="stop" />
                : <FontAwesomeIcon icon="play" />
            }
        </span>
    </div>
);

export default PlayButton;
