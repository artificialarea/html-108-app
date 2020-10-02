import React from "react";
import styles from "./UpdateButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateButton = props => (
    <div 
        className={styles.root} 
        onClick={props.onUpdate} 
        onKeyPress={props.onUpdate} 
        tabIndex="0" 
        aria-label="update track">
        <span className={styles.label}>
            {!props.processing
                ? <FontAwesomeIcon icon="cloud-upload-alt" />
                : <FontAwesomeIcon icon="cog" spin/>
            }
        </span>
    </div>
);

export default UpdateButton;