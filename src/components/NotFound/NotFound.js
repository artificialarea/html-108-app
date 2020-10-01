import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'

export default function NotFound (props) {
    return (
        <div className={styles.root}>
            <header role="banner">
                <h1>Ooops. 404.</h1>
            </header>
            <p>Sorry, but nothing exists here.</p>
            <p><Link to='/' className={styles.link}>Shall we go back to the beginning?</Link></p>
        </div>
    )
}