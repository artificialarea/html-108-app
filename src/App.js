import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import './App.css';
import store from './STORE'; // temporary faux-db


function Intro (props) {
    return (
        <div className="component intro">
            <header role="banner">
                <h1>HTML-108</h1>
                <p> The HTML-108 is a minimal beat machine in the browser.</p>
                <p>A nostalgic nod to the seminal Roland TR-808 analog synthesizer drum machine of the 1980s that ushered in several genres of electronic music.</p>
                </header>
            <button>Start!</button> 
            {' '}
            <button>Checkout beats that others have made...</button>
        </div>
    )
}


////////////////////////////////////////////////////////////////////////////////////
// DRUM MACHINE COMPONENTS /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

class DrumMachine extends React.Component {

    // TODO: make input range slider work
    // https://stackoverflow.com/questions/36122034/jsx-react-html5-input-slider-doesnt-work

    render() {
        return (
            <div className="component drum-machine">
                <header role="banner">
                    <h1>:Track-Title</h1>
                </header>

                <div className="container">
                    <div className="controls-tempo">
                        <button className="togglePlay">Start/Stop</button> 
                        <label>
                            BPM
                            <input 
                                type="number"
                                name="textTempo"
                                id="textTempo"
                                // value="120"
                            />
                        </label>
                        <input 
                            type="range"
                            min="30"
                            max="300"
                            // value="120"
                            name="rangeTempo"
                            // onChange={this.handleChange}
                        />
                    </div>
                    <div className="controls-beats">
                        
                        <InstrumentSelector />

                        <Instrument type='HiHat' />
                        <Instrument type='Clap' />
                        <Instrument type='Trap' />
                        <Instrument type='Bass' />
                        
                        <div className="controls-file">
                            <button type="submit">Download Track</button> <button type="submit">Save Track</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

function Instrument (props) {

    let sequence_length = 16;
    let beatArray = [];

    return (
        <div className="instrument">
            <InstrumentSound type={props.type} />
            <input type="checkbox" id="beat-1" name="beat-1" />
            <input type="checkbox" id="beat-2" name="beat-2" />
            <input type="checkbox" id="beat-3" name="beat-3" />
            <input type="checkbox" id="beat-4" name="beat-4" />
            <input type="checkbox" id="beat-5" name="beat-5" />
            <input type="checkbox" id="beat-6" name="beat-6" />
            <input type="checkbox" id="beat-7" name="beat-7" />
            <input type="checkbox" id="beat-8" name="beat-8" />
            <input type="checkbox" id="beat-9" name="beat-9" />
            <input type="checkbox" id="beat-10" name="beat-10" />
            <input type="checkbox" id="beat-11" name="beat-11" />
            <input type="checkbox" id="beat-12" name="beat-12" />
            <input type="checkbox" id="beat-13" name="beat-13" />
            <input type="checkbox" id="beat-14" name="beat-14" />
            <input type="checkbox" id="beat-15" name="beat-15" />
            <input type="checkbox" id="beat-16" name="beat-16" />
        </div>
    )
}

function InstrumentSound (props) {
    return (
        <button>{props.type}</button>
    )
}

function Beat (props) {
    return (
        <input type="checkbox" id="beat-1" name="beat-1" />
    )
}

function InstrumentSelector (props) {
    return (
        <div className="instrument-selector">
            <label>
                Display:
                <select id="instrument-selector">
                    <option value="hahat">HiHat</option>
                    <option value="clap">Clap</option>
                    <option value="trap">Trap</option>
                    <option value="bass">Bass</option>
                </select>
            </label>
        </div>
    )
}

// end DRUM MACHINE COMPONENTS //////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
// DASHBOARD COMPONENTS /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function Dashboard (props) {

    console.log('props.userId: ', props.userId)


    return (
        <div className="component dashboard">
            <DashboardHeader 
                who={props.who}
                userId={props.userId}
                users={props.users}
            />
            <TrackList 
                id={uuid()}  // TEMP until set up Routes
                who={props.who}
                userId={props.userId}
                users={props.users}
                tracks={props.tracks}
            />
        </div>
    )
}

function DashboardHeader (props) {

    let displayView;
    let usernameTitle;

    if (props.who !== 'private') {
        displayView = 'Community Dashboard'
    } else {
        usernameTitle = props.users.find(user => user.id === props.userId).username;
        displayView = `${usernameTitle}'s Dashboard`;
    }

    return (
        <header role="banner">
            <h1>{displayView}</h1>
        </header>
    )
}

function TrackList (props) {

    const publicTracks = [];
    const privateTracks = [];

    props.tracks.forEach(track => {
        if (props.who !== 'private') {
            if (track.public === true) {
                const trackUser = props.users.find(user => user.id === track.user_id ).username
                publicTracks.push(
                    <TrackItem 
                        id={uuid()}
                        who={props.who}
                        user={trackUser} 
                        track={track}
                    />
                );
            }
        }
        if (track.user_id === props.userId) {
            console.log('show Private tracks')
            privateTracks.push(
                <TrackItem 
                    id={uuid()}
                    who={props.who}
                    track={track}
                />
            );
        }
    })
    
    const dashboardDisplay = 
        (props.who !== 'private')
                ? publicTracks
                : privateTracks


    console.log('dashboardDisplay: ', dashboardDisplay)

    return (
        <ul className="track-list" key={props.id}>
            {dashboardDisplay}
        </ul>
    )
}

function TrackItem (props) {

    console.log('props.track.id: ', props.track.id)

    return (
        <li className="composition track-item" key={props.id}>
            <h2>{props.track.title}</h2>
            { props.who !== 'private' 
                ? <p className="public-user">by {props.user}</p> 
                : null }
            <p>3 Sept 2020</p>
            
            { props.who === 'private' && 
                <UserControls />
            }
            
            <button>Listen to Audio Sample</button> <button>See Drum Machine Configuration</button>
        </li>

    )
}

function UserControls (props) {
    return (
        <div className="user-controls">
            <input type="radio" name="composition-1" value="private"/>Private
            <input type="radio" name="composition-1" value="public"/>Public
            <br />
            <button>Delete Track</button>
        </div>
    )
}

// end DASHBOARD COMPONENTS /////////////////////////////////////////////////////////


function Login (props) {
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

function Registration (props) {
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

function EditTitle (props) {
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


function Nav (props) {
    return (
        <nav className="component nav">
            <h3>Nav</h3>
        </nav>
    )
}

function Footer (props) {
    return (
        <div className="component footer">
            <h3>Footer</h3>
        </div>
    )
}



export default class App extends React.Component {

    render() {

        let { users, compositions } = store;
        console.log('store.users: ', users);
        console.log('store.compositions: ', compositions);

        return (
            <div className="App">
                <Nav />
                <Intro />

                <Dashboard 
                    who={'private'} 
                    userId={1}    // TEMP
                    users={users}
                    tracks={compositions}
                />
                <Dashboard 
                    who={'public'}
                    users={users}
                    tracks={compositions}
                />
                
                <DrumMachine />

                <Registration />
                <Login />
                <EditTitle />
                
                <Footer />
            </div>
        );
    }
}
