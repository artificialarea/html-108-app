import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardHeader (props) {

    let displayView;
    let usernameTitle;

    if (props.who !== 'private') {
        displayView = 'Community Dashboard'
    } else {
        usernameTitle = props.users[props.userId].username;
        displayView = `${usernameTitle}'s Dashboard`;
    }

    return (
        <header role="banner">
            <h1>{displayView}</h1>
            {props.who !== 'public' ? <Link to='/profile'>Edit Profile</Link> : null}
        </header>
    )
}