import React from 'react';
import { Link } from 'react-router-dom';

export default function Header (props) {
    const { who, users, userId } = props;

    let displayView;
    let user;

    if (who !== 'private') {
        displayView = 'Community Dashboard'
    } else {
        user = users.find(user => user.id === userId).username;
        displayView = `${user}'s Dashboard`;
    }

    return (
        <header role="banner">
            <h1>{displayView}</h1>
            {who !== 'public' ? <Link to='/profile'>Edit Profile</Link> : null}
        </header>
    )
}