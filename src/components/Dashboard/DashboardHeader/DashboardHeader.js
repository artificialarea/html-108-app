import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardHeader (props) {

    let displayView;
    let user;

    if (props.who !== 'private') {
        displayView = 'Community Dashboard'
    } else {
        user = props.users.find(user => user.id === props.userId).username;
        displayView = `${user}'s Dashboard`;
    }

    return (
        <header role="banner">
            <h1>{displayView}</h1>
            {props.who !== 'public' ? <Link to='/profile'>Edit Profile</Link> : null}
        </header>
    )
}