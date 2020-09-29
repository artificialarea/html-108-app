import React from 'react';
import styles from "./Header.module.css";


export default function Header (props) {
    const { track, editable, titleChange } = props;

    return (
        <header role="banner" className={styles.root}>
            {/* {!!track.title.length &&
                <h1>{track.title}</h1>} */}
            {!editable
                ? 
                <h1>{track.title}</h1>
                :
                <form className={styles.form}>
                    <div>
                        <label>
                            Track Title
                            <input 
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Untitled" 
                                value={track.title}
                                onChange={e => titleChange(e)}/>
                        </label>
                    </div>
                </form>
            }

        </header>
    )
}