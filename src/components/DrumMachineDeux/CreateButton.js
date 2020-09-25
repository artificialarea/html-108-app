import React from "react";
import styles from "./CreateButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateButton = props => (
    <div className={styles.root} onClick={props.onCreate}>
        <span className={styles.label}>
            <FontAwesomeIcon icon="save" />
        </span>
    </div>
);

export default CreateButton;