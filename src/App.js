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

    constructor(props) {
        super(props);
        this.state = {
            // via api, list users with public compositions on community dashboard
            users: [
                {
                    id: 1,
                    username: "Sarah State",
                    // presumably won't store this data client-side
                    // (even for the signed-in user?)
                    // password: "aaAA11!!",        
                    // email: "sarah@hotmail.com"
                },
                {
                    id: 2,
                    username: "Dolfmeister State",
                },

            ],
            // via api, public compositions by any user, listed on community dashboard
            public_compositions: [
                {
                    id: 1,
                    user_id: 1,
                    title: "Krautrock",
                    date_modified: "",
                    public: true,
                    tempo: 80,
                    sequence_length: 16,
                    mp3: "http://path-of-the-audio-preview.mp3",
                    step_sequence: {
                        hihat: [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        clap: [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
                        trap: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                        bass: [0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0],
                    },
                },
                {
                    id: 10,
                    user_id: 2,
                    title: "Browser Noise",
                    date_modified: "",
                    public: true,
                    tempo: 220,
                    sequence_length: 16,
                    mp3: "http://path-of-the-audio-preview.mp3",
                    step_sequence: {
                        hihat: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                        clap: [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
                        trap: [0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0],
                        bass: [0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
                    },
                },
            ],
            // via api, compositions by logged-in user, listed on private dashboard
            user_compositions: [
                {
                    id: 1,
                    user_id: 1,
                    title: "Krautrock",
                    date_modified: "",
                    public: true,
                    tempo: 80,
                    sequence_length: 16,
                    mp3: "http://path-of-the-audio-preview.mp3",
                    step_sequence: [
                        { hihat: [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
                        { clap: [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1] },
                        { trap: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1] },
                        { bass: [0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0] },
                    ],
                },
                {
                    id: 2,
                    user_id: 1,
                    title: "Tiny Tempah",
                    date_modified: "",
                    public: false,
                    tempo: 80,
                    sequence_length: 16,
                    mp3: "http://path-of-the-audio-preview.mp3",
                    step_sequence: [
                        { hihat: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0] },
                        { clap: [0,0,0,1,0,0,0,1,1,0,1,0,0,0,0,1] },
                        { trap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
                        { bass: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
                    ],
                },
            ],
            // for /track route, sans api, 
            // temporary storage of data from new drum machine session
            new_composition: {
                id: '', 
                test: [], 
                user_id: '',
                title: '', 
                date_modified: '',
                public: false,
                tempo: 120,
                sequence_length: 16,
                mp3: '',
                step_sequence: {
                    hihat: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    clap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    trap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    bass: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
            },
        }
    }

    handleBeatChange = (target) => {
        // extract target tag id information from string into array
        // "instrumentKey beatIndex beatBoolean" e.g. "hihat 5 0"
        const targets = target.id.split(' ');
        const instrumentKey = targets[0];
        const beatIndex = targets[1];
        const beatBoolean = targets[2]; // will need to inverse value for setState()
        console.log(instrumentKey, beatIndex, beatBoolean)

        const newTest = [instrumentKey, beatIndex, beatBoolean]
        this.setState({
            new_composition: {
                ...this.state.new_composition,
                test: newTest
                // step_sequence: [
                //     ...this.state.step_sequence,

                // ]
            }
        })
    }

    renderNavRoutes () {
        return (
            <>
                <Route 
                    path='/'
                    component={Nav}
                />
            </>
        )
    }

    renderFooterRoutes () {
        return (
            <>
                <Route 
                    path='/'
                    component={Footer}    
                />
            </>
        )
    }

    renderMainRoutes () {

        let { users, compositions } = store;
        // console.log('store.users: ', users);
        // console.log('store.compositions: ', compositions);
        // console.log('this.state.new_composition: ', this.state.new_composition)
        // console.log('this.state.new_composition.test: ', this.state.new_composition.test)

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

                <Route 
                    exact 
                    path='/track' 
                    render={() => 
                        <DrumMachine 
                            track={this.state.new_composition}
                            onClick={e => this.handleBeatChange(e.target)}
                        />
                    }   
                />
                <Route 
                    path='/track/:track_id' 
                    render={() => 
                        <DrumMachine 
                            track={compositions[2]}
                            onClick={e => this.handleBeatChange(e.target)}
                        />
                    }   
                />

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
