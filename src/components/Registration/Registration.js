import React from 'react';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
        }
    }

    inputChanged = (target) => {
        this.setState({
            [target.name]: target.value
        });
    }

    render () {
        console.log(this.state);
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
                    <div>
                        <label>
                            Email (optional)
                            <input 
                                type="text"
                                name="email"
                                id="email" 
                                value={this.state.email}
                                onChange={e => this.inputChanged(e.target)}/>
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
}