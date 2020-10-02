import React from 'react';
import styles from "./Header.module.css";


export default function Header (props) {
    const { track, editable, titleChange } = props;

    return (
        <header role="banner" className={styles.root}>
            {!editable
                ? 
                <h1>{track.title}</h1>
                :
                <form className={styles.form}>
                    <div>
                        <label htmlFor="title" className={styles.screenreadertext}>Title</label>
                            <input className={styles.input}
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Untitled" 
                                value={track.title}
                                onChange={e => titleChange(e)}/>
                        
                    </div>
                </form>
            }

        </header>
    )
}

Header.defaultProps = {
    track: {},
}