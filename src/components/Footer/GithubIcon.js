import React from "react";
import styles from "./GithubIcon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GitHubIcon = props => (
    <div className={styles.root}>
        <FontAwesomeIcon icon={["fab", "github"]} title="github icon"/>
    </div>
);

export default GitHubIcon;
