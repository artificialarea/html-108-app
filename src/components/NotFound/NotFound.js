import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound (props) {
    return (
        <div className="component not-found">
            <header role="banner">
                <h1>Ooops. 404.</h1>
            </header>
            <p>Sorry, but nothing exists here.</p>
            <p>Shall we <Link to='/'>go back?</Link></p>
        </div>
    )
}