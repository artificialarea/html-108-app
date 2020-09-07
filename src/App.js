import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import store from './STORE'; // temporary faux-db

import Nav from './components/Nav/Nav';
import Intro from './components/Intro/Intro';
import Dashboard from './components/Dashboard/Dashboard';
import DrumMachine from './components/DrumMachine/DrumMachine';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import EditTitle from './components/EditTitle/EditTitle';
import Footer from './components/Footer/Footer';


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
