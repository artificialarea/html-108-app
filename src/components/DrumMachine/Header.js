import React from 'react';

export default function Header (props) {
    return (
        <header role="banner">
            {!!props.track.title.length &&
                <h1>{props.track.title}</h1>}
        </header>
    )
}