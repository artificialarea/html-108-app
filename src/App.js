import React from 'react';
import { Route, Switch } from 'react-router-dom';
import config from './config';

import './App.css';

import Nav from './components/Nav/Nav';
import Intro from './components/Intro/Intro';
import Dashboard from './components/Dashboard/Dashboard';
import ViewTrack from './components/ViewTrack/ViewTrack';
import AddTrack from './components/AddTrack/AddTrack';
import EditTrack from './components/EditTrack/EditTrack';
// import DrumMachine from './components/DrumMachine/DrumMachine';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import ApiContext from './ApiContext';
// import Login from './components/Login/Login';
// import Registration from './components/Registration/Registration';
// import EditTitle from './components/EditTitle/EditTitle';

// console.log('process.env: ', process.env) // [f4] Re: Vercel `.env.local` issues

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authUser: {     // static placeholder at this phase
                id: 1,
                username: 'admin_react',
            },
            users: [],                     
            tracks: [],              
            error: null,
        }
    }

    componentDidMount() {

        const fetchOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
        }

        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/users`, fetchOptions),
            fetch(`${config.API_ENDPOINT}/api/tracks`, fetchOptions),
        ])
            .then(([usersRes, tracksRes]) => {
                if (!usersRes.ok)
                    return usersRes.json().then(e => Promise.reject(e))
                if (!tracksRes.ok)
                    return tracksRes.json().then(e => Promise.reject(e))

                return Promise.all([
                    usersRes.json(),
                    tracksRes.json(),
                ])
            })
            .then(([users, tracks]) => {
                this.setState({ users, tracks })
            })
            .catch(err => {
                console.error({ err })
            })
    }

    handleDeleteTrack = (trackId) => {
        const { tracks } = this.state;
        // [f3] + [f1]
        const newtracks = [...tracks]
        const index = newtracks.findIndex(track => track.id === trackId)
        if (index > -1) {
            newtracks.splice(index, 1);
        }

        this.setState({
            tracks: newtracks
        })
    }

    handleAddTrack = track => {
        this.setState({
            tracks: [
                ...this.state.tracks,
                track
            ]
        })
    }

    handleUpdateTrack = updatedTrack => {
        const newTracks = this.state.tracks.map(track =>
            (track.id !== updatedTrack.id)
                ? track
                : updatedTrack    
        )
        this.setState({
            tracks: newTracks
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
        const { authUser, users, tracks } = this.state;
        console.log('state:', this.state)

        return (
            <Switch>
                <Route exact 
                    path='/' 
                    component={Intro} 
                />

                <Route 
                    path='/dashboard' 
                    render={() => 
                        <Dashboard 
                            who={'public'}
                            users={users}
                            tracks={tracks}
                        />
                    } 
                />

                <Route 
                    path='/add-track' 
                    render={(props) => 
                        <AddTrack 
                            authUser={authUser}
                        />
                    }
                />

                <Route 
                    path='/tracks/:trackId'
                    component={ViewTrack}    
                />
                
                {/* <Route 
                    path='/edit/:trackId'
                    component={EditTrack}    
                /> */}

                <Route 
                    path='/edit/:trackId' 
                    render={(props) => 
                        <EditTrack 
                            authUser={authUser}
                            track={tracks.find(track => track.id == props.match.params.trackId)} 
                        />
                    }
                />

                <Route component={NotFound} />

            </Switch>
        )
    }

    render() {
        const value = {
            authUser: this.state.authUser,
            users: this.state.users,
            tracks: this.state.tracks,
            addTrack: this.handleAddTrack,
            deleteTrack: this.handleDeleteTrackReprise,
            updateTrack: this.handleUpdateTrack,
        }
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    {this.renderNavRoutes()}

                    <main className="App__main">
                        {this.renderMainRoutes()}
                    </main>
                    
                    {this.renderFooterRoutes()}
                </div>
            </ApiContext.Provider>
        );
    }
}
