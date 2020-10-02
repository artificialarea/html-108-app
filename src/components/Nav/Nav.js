import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css'

export default function Nav (props) {
    return (
        <nav className={styles.root}>
            <Link to='/' className={styles.link}>Intro</Link>
            {' '}
            <Link to='/add-track' className={styles.link}>New Track</Link>
            {' '}
            <Link to='/dashboard' className={styles.link}>Dashboard</Link>
            {' '}
        </nav>
    )
}