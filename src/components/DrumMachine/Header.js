import React from 'react';

export default function Header (props) {
    const { track } = props;
    return (
        <header role="banner">
            {!!track.title.length &&
                <h1>{track.title}</h1>}
        </header>
    )
}