import React from 'react';
import styles from './Footer.module.css'
import GitHubIcon from './GithubIcon'

export default function Footer (props) {
    return (
        <footer className={styles.root}>
            <a href="https://github.com/artificialarea/html-108-app"><GitHubIcon/></a>
            <p>blood, sweat and tears</p>
        </footer>
    )
}