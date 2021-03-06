import React from 'react';
import { Route, Switch } from 'react-router-dom';
import config from './config';
import Nav from './components/Nav/Nav';
import Intro from './components/Intro/Intro';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import ApiContext from './ApiContext';
import AddTrack from './components/AddTrack/AddTrack';
import EditTrack from './components/EditTrack/EditTrack';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPlay,
    faStop,
    faRecycle,
    faInfoCircle,
    faTrashAlt,
    faSave,
    faCloudUploadAlt,
    faPencilAlt,
    faSpinner,
    faCog,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

// fontawesome library setup
library.add(
    faPlay,
    faStop,
    faRecycle,
    faInfoCircle,
    faTrashAlt,
    faSave,
    faCloudUploadAlt,
    faPencilAlt,
    faGithub,
    faSpinner,
    faCog,
);

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
                'Authorization': `Bearer ${config.API_KEY}`,
                mode: 'no-cors' // per: https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api#cross-origin_requests
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
        const newTracks = [...tracks]
        const index = newTracks.findIndex(track => track.id === trackId)
        if (index > -1) {
            newTracks.splice(index, 1);
        }

        this.setState({
            tracks: newTracks
        })
    }

    handleAddTrack = track => {
        this.setState({
            tracks: [
                track,
                ...this.state.tracks
            ]
        })
    }

    handleUpdateTrack = updatedTrack => {
        // to prepend track, purge from the rest
        const restTracks = this.state.tracks.filter(track => 
            track.id !== updatedTrack.id
        )

        this.setState({
            tracks: [updatedTrack, ...restTracks]
        })
    }

    renderNavRoutes () {
        return (
            <>
                {['/dashboard', '/add-track', '/tracks/:trackId', '/edit/:trackId'].map(path =>
                    <Route 
                    key={path}
                    path={path}
                    component={Nav}    
                    />
                )}
            </>
        )
    }

    renderFooterRoutes () {
        return (
            <>  
                <Route 
                    exact
                    path='/'
                    component={Footer}    
                />

            </>
        )
    }

    renderMainRoutes () {
        const { authUser, users, tracks } = this.state;
        
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
                    render={(routerProps) => 
                        <AddTrack 
                            authUser={authUser}
                            editable={true}
                        />
                    }
                />
                
                <Route 
                    path='/tracks/:trackId'
                    render={(routerProps) => 
                        <EditTrack 
                            authUser={authUser}
                            editable={false}
                            track={tracks.find(track => track.id == routerProps.match.params.trackId)}
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
            deleteTrack: this.handleDeleteTrack,
            updateTrack: this.handleUpdateTrack,
        }
        return (
            <ApiContext.Provider value={value}>
                <ScrollToTop>
                    <>
                        {this.renderNavRoutes()}
                        {this.renderMainRoutes()}
                        {this.renderFooterRoutes()}
                    </>
                </ScrollToTop>
            </ApiContext.Provider>
        );
    }
}
