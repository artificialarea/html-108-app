import React from "react";
import styles from "./UpdateButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateButton = props => (
    <div className={styles.root} onClick={props.onUpdate}>
        <span className={styles.label}>
            <FontAwesomeIcon icon="cloud-upload-alt" />
        </span>
    </div>
);

export default UpdateButton;