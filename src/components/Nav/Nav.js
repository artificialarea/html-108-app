import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css'

export default function Nav (props) {
    return (
        <nav className={styles.root}>
            <Link to='/' className={styles.link} alt="intro">Intro</Link>
            {' '}
            <Link to='/add-track' className={styles.link} alt="new track">New Track</Link>
            {' '}
            <Link to='/dashboard' className={styles.link} alt="dashboard">Dashboard</Link>
            {' '}
        </nav>
    )
}