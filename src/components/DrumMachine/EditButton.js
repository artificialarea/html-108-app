import React from "react";
import { Link } from 'react-router-dom';
import styles from "./EditButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton = props => (
    <div className={styles.root} onClick={props.onEdit} tabindex="0" area-label="edit track">
        <span className={styles.label}>
            <Link className={styles.link} to={`/edit/${props.trackId}`}>
                <FontAwesomeIcon icon="pencil-alt" />
            </Link>
        </span>
    </div>
);

export default EditButton;