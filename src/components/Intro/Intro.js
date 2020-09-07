import React from 'react';
import { Link } from 'react-router-dom';

export default function Intro (props) {

    return (
        <div className="component intro">
            <header role="banner">
                <h1>HTML-108</h1>
                <p> The HTML-108 is a minimal beat machine in the browser.</p>
                <p>A nostalgic nod to the seminal Roland TR-808 analog synthesizer drum machine of the 1980s that ushered in several genres of electronic music.</p>
                </header>
            <Link to='/track'>Start!</Link>
            {' '}
            <Link to='/dashboard'>Checkout beats that others have made...</Link>
        </div>
    )
}