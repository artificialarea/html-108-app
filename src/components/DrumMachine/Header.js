import React from 'react';

export default function Header (props) {
    const { track, editable, titleChange } = props;

    return (
        <header role="banner">
            {/* {!!track.title.length &&
                <h1>{track.title}</h1>} */}
            {!editable
                ? 
                <h1>{track.title}</h1>
                :
                <form className="title-form">
                    <div>
                        <label>
                            Track Title
                            <input 
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Untitled" 
                                value={track.title}
                                onChange={e => titleChange(e, track.id)}/>
                        </label>
                    </div>
                </form>
            }

        </header>
    )
}