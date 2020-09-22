import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    inputChanged = (target) => {
        this.setState({
            [target.name]: target.value
        })
    }

    render () {

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
                                name="username"
                                id="username"
                                placeholder="Username" 
                                value={this.state.username}
                                onChange={e => this.inputChanged(e.target)}/>
                        </label>
                    </div>
                    <div>
                        <label> 
                            Password
                            <input 
                                type="text"
                                name="password"
                                id="password"
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={e => this.inputChanged(e.target)}/>
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
}