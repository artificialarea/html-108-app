import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
import NotFound from './components/NotFound/NotFound'


export default class App extends React.Component {

    renderNavRoutes() {
        return (
            <>
                <Route 
                    path='/'
                    component={Nav}
                />
            </>
        )
    }

    renderFooterRoutes() {
        return (
            <>
                <Route 
                    path='/'
                    component={Footer}    
                />
            </>
        )
    }

    renderMainRoutes() {

        let { users, compositions } = store;
        console.log('store.users: ', users);
        console.log('store.compositions: ', compositions);

        return (
            <Switch>
                <Route exact path='/' component={Intro} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Registration} />
                <Route path='/profile' component={Registration} />
                <Route path='/edit-title' component={EditTitle} />
                <Route 
                    path='/dashboard' 
                    render={() => 
                        <Dashboard 
                            who={'public'}
                            users={users}
                            tracks={compositions}
                        />
                    } 
                />
                <Route 
                    path='/my-dashboard'
                    render={() => 
                        <Dashboard 
                            who={'private'} 
                            userId={1}    // TEMP
                            users={users}
                            tracks={compositions}
                        />
                    }  
                />
                <Route exact path='/track' component={DrumMachine} />
                <Route path='/track/:track_id' component={DrumMachine} />
                <Route component={NotFound} />
            </Switch>
        )
    }

    render() {
        return (
            <div className="App">
                {this.renderNavRoutes()}

                <main className="App__main">
                    {this.renderMainRoutes()}
                </main>
                
                {this.renderFooterRoutes()}
            </div>
        );
    }
}
