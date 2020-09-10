import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

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
            users: {
                '1': {
                    id: 1,
                    username: "Sarah",
                    // presumably won't store this sensitive data client-side?
                    // (even for the signed-in user?)
                    // password: "aaAA11!!",        
                    // email: "sarah@hotmail.com"
                },
                '2': {
                    id: 2,
                    username: "Dolfmeister",
                },
            },
            compositions: { // [f2]
                '0': {  // temporary storage for 'new' composition that doesn't really have a trackId yet
                    id: '0', 
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
                '1': {
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
                '2': {
                    id: 2,
                    user_id: 1,
                    title: "Tiny Tempah",
                    date_modified: "",
                    public: false,
                    tempo: 80,
                    sequence_length: 16,
                    mp3: "http://path-of-the-audio-preview.mp3",
                    step_sequence: {
                        hihat: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                        clap: [0,0,0,1,0,0,0,1,1,0,1,0,0,0,0,1],
                        trap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        bass: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    },
                },
                '10': {
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
                        bass: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    },
                },
                '11': {
                    id: 11,
                    user_id: 2,
                    title: "Untitled",
                    date_modified: "",
                    public: false,
                    tempo: 100,
                    sequence_length: 16,
                    mp3: "http://path-of-the-audio-preview.mp3",
                    step_sequence: {
                        hihat: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        clap: [0,0,0,1,0,0,0,1,1,1,0,1,0,0,0,1],
                        trap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        bass: [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
                    },
                },
            },
        }
    }

    handleBeatChange = (changeEvent) => {
        // probably a less hacky way to do this, but...
        // Extract target tag id information from string into array
        // "trackId instrumentKey beatIndex beatBoolean" e.g. "2 hihat 5 0" // => ['2','hihat', 5, 0]
        const targets = changeEvent.target.id.split(' ');
        const track = targets[0];
        const instrumentKey = targets[1];
        const beatIndex = targets[2];
        let beatBoolean = targets[3]; 

        beatBoolean == 1        // fails if strict equality (===)
            ? beatBoolean = 0
            : beatBoolean = 1;

        // [f1]
        const instrumentArr = [...this.state.compositions[track].step_sequence[instrumentKey]];
        instrumentArr[beatIndex] = beatBoolean; 
        
        this.setState({
            compositions: {  
                ...this.state.compositions,
                [track]: {
                    ...this.state.compositions[track],
                    step_sequence: {
                        ...this.state.compositions[track].step_sequence,
                        [instrumentKey]: instrumentArr,
                    }
                }
            }
        })
    }

    handleTempoChange = (changeEvent) => {
        // console.log(changeEvent)
        const track = changeEvent.target.name;
        console.log(track);
        this.setState({
            compositions: {
                ...this.state.compositions,
                [track]: {
                    ...this.state.compositions[track],
                    tempo: changeEvent.target.value
                }
            }
        })
    }

    handlePrivacyChange = (changeEvent) => {
        const track = changeEvent.target.name;
        const newPrivacyBool = changeEvent.target.value === 'public' ? true : false;

        this.setState({
            compositions: {
                ...this.state.compositions,
                [track]: {
                    ...this.state.compositions[track],
                    public: newPrivacyBool
                }
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
                            users={this.state.users}
                            tracks={this.state.compositions}
                        />
                    } 
                />
                <Route 
                    path='/my-dashboard'
                    render={() => 
                        <Dashboard 
                            who={'private'} 
                            userId={1}    // this will be dynamic once login auth set up
                            users={this.state.users}
                            tracks={this.state.compositions}
                            onChange={this.handlePrivacyChange}
                        />
                    }  
                />

                <Route 
                    exact 
                    path='/track' 
                    render={() => 
                        <DrumMachine 
                            track={this.state.compositions['0']}
                            onChange={this.handleTempoChange}
                            onClick={this.handleBeatChange}
                        />
                    }   
                />
                <Route 
                    path='/track/:trackId' 
                    component={(props) => {
                        // console.log('props.match: ', props.match)
                        return <DrumMachine 
                                    track={this.state.compositions[props.match.params.trackId]}
                                    onChange={this.handleTempoChange}
                                    onClick={this.handleBeatChange}
                                />
                    }}
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
