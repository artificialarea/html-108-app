import React from "react";
import styles from "./CreateButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateButton = props => (
    <div 
        className={styles.root} 
        onClick={props.onCreate} 
        onKeyPress={props.onCreate} 
        tabIndex="0" 
        aria-label="save track">
        <span className={styles.label}>
            {!props.processing
                ? <FontAwesomeIcon icon="save" />
                : <FontAwesomeIcon icon="cog" spin/>
            }
        </span>
    </div>
);

export default CreateButton;