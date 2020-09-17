import React from 'react';

export default function Header (props) {
    const { track, titleChange } = props;
    console.log('track.id: ', track.id)
    return (
        <header role="banner">
            {/* {!!track.title.length &&
                <h1>{track.title}</h1>} */}

            {(track.id !== 0)
                ? 
                <h1>{track.title}</h1>
                :
                // TODO: Enable for all /track/:trackId's owned by signed-in user
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