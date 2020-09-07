import React from 'react';

export default function UserControls (props) {
    return (
        <div className="user-controls">
            <input type="radio" name="composition-1" value="private"/>Private
            <input type="radio" name="composition-1" value="public"/>Public
            <br />
            <button>Delete Track</button>
        </div>
    )
}