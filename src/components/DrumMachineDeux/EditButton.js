import React from "react";
import { Link } from 'react-router-dom';
import styles from "./EditButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton = props => (
    <div className={styles.root} onClick={props.onEdit}>
        <span className={styles.label}>
            <Link className={styles.link} to={`/edit/${props.trackId}`}>
                <FontAwesomeIcon icon="pencil-alt" />
            </Link>
        </span>
    </div>

    // Disable for now b/c ReactRouter Redirect not working
    // <div className={styles.root} onClick={props.onEdit}>
    //     <span className={styles.label}>
    //         <FontAwesomeIcon icon="pencil-alt" />
    //     </span>
    // </div>
);

export default EditButton;