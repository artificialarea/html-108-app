import React from 'react';

export default function EditTitle (props) {
    return (
        <div className="component edit-title">
            <header role="banner">
                <h3>Edit Track Title</h3>
            </header>
            <form className="login-form">
                <div>
                    <label>
                        Title
                        <input 
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Krautrocka" />
                    </label>
                </div>
                
                <button type="submit">Sign Up</button>
                <button>Cancel</button>

            </form>
        </div>
    )
}