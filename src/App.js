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
                    username: "Sarah State",
                    // presumably won't store this sensitive data client-side?
                    // (even for the signed-in user?)
                    // password: "aaAA11!!",        
                    // email: "sarah@hotmail.com"
                },
                {
                    id: 2,
                    username: "Dolfmeister State",
                },

            ],
            compositions: [
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
                        bass: [0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
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
            // for /track route, sans api, 
            // temporary storage of data from new drum machine session
            new_composition: {
                id: '', 
                test: [],   // temp, to be deleted 
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
        let beatBoolean = targets[2]; 

        // I'm sure there is a better way to do this but
        // need to inverse value of beat to setState
        beatBoolean == 1
            ? beatBoolean = 0
            : beatBoolean = 1;

        // ISSUE: THINK I MAY BE MUTATING STATE!!!
        // if leave setState empty ala  this.setState({ })
        // the state is still modified and renders!!!
        const instrumentArr = this.state.new_composition.step_sequence[instrumentKey]
        instrumentArr[beatIndex] = beatBoolean;
        
        this.setState({ }) 

        // ... I thought it was changing state in here, but apparently not
        // this.setState({
        //     new_composition: {  
        //         ...this.state.new_composition,
        //         step_sequence: {
        //             ...this.state.new_composition.step_sequence,
        //             [instrumentKey]: instrumentArr,
        //         }
        //     }
        // })

        // ATTEMPT 2
        // this.setState({
        //     new_composition: {  
        //         ...this.state.new_composition,
        //         step_sequence: {
        //             ...this.state.new_composition.step_sequence,
        //             [this.state.new_composition.step_sequence[instrumentKey]]: this.state.new_composition.step_sequence[instrumentKey],
        //         }
        //     }
        // })
    }

    handleTempoChange = (target) => {
        this.setState({
            new_composition: {
                ...this.state.new_composition,
                tempo: target.value

            }
        })
    }

    handlePrivacyChange = (changeEvent) => {
        // console.log('privacy target: ', changeEvent.target.name)
        // console.log('privacy target: ', changeEvent.target.value)

        const newPrivacyBool = changeEvent.target.value === 'public' ? true : false;

        const compositionToUpdate = this.state.compositions.find(key => key.id == changeEvent.target.name)
        // console.log("objToChange", compositionToUpdate)

        compositionToUpdate.public = newPrivacyBool;
        // console.log("objToChange (changed)", compositionToUpdate)

        // ISSUE, AGAIN: THINK I MAY BE MUTATING STATE!!!
        this.setState({

            // FAIL 1
            // successful updates that particular composition,
            // BUT all the other compositions are lost
            // compositions: [
            //     compositionToUpdate
            // ]

            // FAIL 2
            // compositions: [
            //     ...this.state.compositions,
            //     compositionToUpdate
            // ]
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
        console.log('this.state.compositions: ', this.state.compositions)
        // console.log('this.state.new_composition: ', this.state.new_composition)

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
                            userId={1}    // TODO: make dynamic
                            users={this.state.users}
                            tracks={this.state.compositions}
                            // onChange={e => this.handlePrivacyChange(e.target)}
                            onChange={this.handlePrivacyChange}
                        />
                    }  
                />

                <Route 
                    exact 
                    path='/track' 
                    render={() => 
                        <DrumMachine 
                            track={this.state.new_composition}
                            onChange={e => this.handleTempoChange(e.target)}
                            onClick={e => this.handleBeatChange(e.target)}
                        />
                    }   
                />
                <Route 
                    path='/track/:track_id' 
                    render={() => 
                        <DrumMachine 
                            track={this.state.compositions[2]}
                            onChange={e => this.handleTempoChange(e.target)}
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
