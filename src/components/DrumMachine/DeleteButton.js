import React from "react";
import styles from "./DeleteButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteButton = props => (
    <div className={styles.root} onClick={props.onDelete}>
        <span className={styles.label}>
            <FontAwesomeIcon icon="trash-alt" />
        </span>
    </div>
);

export default DeleteButton;