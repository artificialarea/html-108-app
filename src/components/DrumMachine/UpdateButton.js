import React from "react";
import styles from "./UpdateButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateButton = props => (
    <div className={styles.root} onClick={props.onUpdate}>
        <span className={styles.label}>
            {!props.processing
                ? <FontAwesomeIcon icon="cloud-upload-alt" />
                : <FontAwesomeIcon icon="cog" spin/>
            }
        </span>
    </div>
);

export default UpdateButton;