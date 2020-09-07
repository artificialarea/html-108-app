import React from 'react';
import { Link } from 'react-router-dom';

export default function Login (props) {
    return (
        <div className="component login">
            <header role="banner">
                <h1>Login</h1>
            </header>
            <div className="error">
                <p>Password is not valid.</p>
            </div>
            <form className="login-form">
                <div>
                    <label>
                        Username
                        <input 
                            type="text"
                            name="login-username"
                            id="login-username"
                            placeholder="Username" />
                    </label>
                </div>
                <div>
                    <label> 
                        Password
                        <input 
                            type="text"
                            name="login-password"
                            id="login-password"
                            placeholder="Password" />
                    </label>
                </div>
                
                <button type="submit">Sign Up</button>
                <button>Cancel</button>

            </form>

            <div>
                <p>Need to <Link to="/register">register?</Link></p>
            </div>
        </div>
    )
}