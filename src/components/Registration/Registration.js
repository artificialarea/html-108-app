import React from 'react';
import { Link } from 'react-router-dom';

export default function Registration (props) {
    return (
        <div className="component registration">
            <header role="banner">
                <h1>Registration</h1>
            </header>
            <div className="error">
                <p>Password must be at least 8 characters, with a at least one lowercase, one uppercase, and one special character.</p>
            </div>
            <form className="registration-form">
                <div>
                    <label>
                        Username
                        <input 
                            type="text"
                            name="registration-username"
                            id="registration-username"
                            placeholder="Username" />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input 
                            type="text"
                            name="registration-password"
                            id="registration-password"
                            placeholder="Password" />
                    </label>
                </div>
                <div>
                    <label>
                        Email (optional)
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            placeholder="" />
                    </label>
                </div>
                <button type="submit">Sign Up</button>
                <button>Cancel</button>

            </form>

            <div>
                <p>Already registered and need to <Link to="/login">login?</Link></p>
            </div>

        </div>
    )
}