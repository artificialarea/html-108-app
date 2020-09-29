import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Intro.module.css';
import logo from '../../assets/logo.png'

export default function Intro (props) {

    return (
        <div className={styles.root}>
            <header role="banner">
                <img src={logo} alt="logo"/>
                <h1>HTML-108</h1>    
            </header>
            <div className={styles.content}>
                <p> a minimal browser-based step synthesizer</p>
                <Link to='/add-track' className={styles.button}>Start!</Link>
                {' '}
                <Link to='/dashboard' className={styles.button}>Community Dashboard</Link>
            </div>
        </div>
    )
}