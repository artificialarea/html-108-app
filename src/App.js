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
            users: [
                {
                    id: 1,
                    username: "Sarah",
                    // presumably won't store this sensitive data client-side?
                    // (even for the signed-in user?)
                    // password: "aaAA11!!",        
                    // email: "sarah@hotmail.com"
                },
                {
                    id: 2,
                    username: "Dolfmeister",
                },
            ],
            compositions: [ // [f2]
                {  // temporary storage for 'new' composition that doesn't really have a trackId yet
                    id: 0, 
                    user_id: null,
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
                        bass: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    },
                },
                {
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
            ],
        }
    }

    handleBeatChange = (changeEvent) => {
        // probably a less hacky way to do this, but...
        // Extract target tag id information from string into array
        // "trackId instrumentKey beatIndex beatBoolean" e.g. "2 hihat 5 0" // => ['2','hihat', 5, 0]
        const targets = changeEvent.target.id.split(' ');
        const trackId = targets[0];
        const instrumentKey = targets[1];
        const beatIndex = targets[2];
        let beatBoolean = targets[3]; 

        beatBoolean == 1        // fails if strict equality (===)
            ? beatBoolean = 0
            : beatBoolean = 1;

        // [f1]
        const newCompositions = [...this.state.compositions];
        newCompositions.find(track => track.id == trackId).step_sequence[instrumentKey][beatIndex] = beatBoolean;

        this.setState({
            // [f1]
            // compositions: newCompositions
        })
    }

    handleTempoChange = (changeEvent) => {
        const trackId = changeEvent.target.name;

        const newCompositions = [...this.state.compositions];
        newCompositions.find(track => track.id == trackId).tempo = changeEvent.target.value;

        this.setState({
            // [f1]
            // compositions: newCompositions
        })
    }

    handlePrivacyChange = (changeEvent) => {
        const trackId = changeEvent.target.name;  
        const newPrivacyBool = changeEvent.target.value === 'public' ? true : false;

        const newCompositions = [...this.state.compositions];
        newCompositions.find(track => track.id == trackId).public = newPrivacyBool;

        this.setState({
            // [f1]
            // compositions: newCompositions
        })
    }

    handleDeleteTrack = (trackId) => {
        // [f3] + [f1]
        delete this.state.compositions[trackId]
        this.setState({ })
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
        console.log(this.state.compositions)
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
                            onClickDelete={this.handleDeleteTrack}
                        />
                    }  
                />

                <Route 
                    exact 
                    path='/track' 
                    render={() => 
                        <DrumMachine 
                            track={this.state.compositions[0]}
                            onChange={this.handleTempoChange}
                            onClick={this.handleBeatChange}
                        />
                    }   
                />
                <Route 
                    path='/track/:trackId' 
                    component={(props) => {
                        console.log('props.match: ', props.match)
                        const trackViaParams = this.state.compositions.find(track => track.id == props.match.params.trackId)
                        return <DrumMachine 
                                    track={trackViaParams}  
                                    userId={1}    // this will be dynamic once login auth set up
                                    users={this.state.users}
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
