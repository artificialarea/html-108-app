import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ErrorBoundary from '../../ErrorBoundary';

import styles from './TrackItem.module.css';

export default function TrackItem (props) {
    const { track } = props;

    return (
        <Link to={`/tracks/${track.id}`} className={styles.link}>
            <li className={styles.root}>
                <h2>{track.title}</h2>
                <ErrorBoundary>
                    <p>
                        <span className={styles.date}>{format(Date.parse(track.date_modified), 'yyyy MMM do')}</span>
                        <span className={styles.time}>{format(Date.parse(track.date_modified), 'p')}</span>
                    </p>
                </ErrorBoundary>
            </li>
        </Link>
    )
}

TrackItem.defaultProps = {
    track: {
        date_modified: '2029-01-22T16:28:32.615Z',
    },
    
}