import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


function Intro (props) {
    return (
        <div class="component">
            <h1>Intro</h1>
        </div>
    )
}

class DrumMachine extends React.Component {

    render() {
        return (
            <div class="component">
                <h1>Drum Machine</h1>
            </div>
        )
    }
}

function Dashboard (props) {

    let displayView;

    props.who !== 'private'
        ? displayView = 'Public Dashboard for Community'
        : displayView = 'Private Dashboard for Login User';

    return (
        <div class="component">
            <h1>{displayView}</h1>
            <p>Conditional elements and functionality displayed depending on type of dashboard (user vs community).</p>
               
        </div>
    )
}

function Login (props) {
    return (
        <div class="component">
            <h1>Login</h1>
        </div>
    )
}

function Registration (props) {
    return (
        <div class="component">
            <h1>Registration</h1>
        </div>
    )
}

function EditTitle (props) {
    return (
        <div class="component">
            <h1>Edit Title</h1>
        </div>
    )
}








export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Intro />
                <DrumMachine />
                <Dashboard who={'public'} />
                <Dashboard who={'private'} />
                <Registration />
                <Login />
                <EditTitle />
            </div>
        );
    }
}
