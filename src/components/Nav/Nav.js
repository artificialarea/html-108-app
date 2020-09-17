import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav (props) {
    return (
        <nav className="component nav">
            <h3>HTML-108</h3>
            <Link to='/'>Intro</Link>
            {' '}
            <Link to='/track'>New Track</Link>
            {' '}
            <Link to='/dashboard'>Community Dashboard</Link>
            {' '}
            {/* <Link to='/my-dashboard'>My Dashboard</Link>
            {' '} */}
            <Link to='/login'>Login</Link>
            {' '}
            <Link to='/register'>Register</Link>
        </nav>
    )
}