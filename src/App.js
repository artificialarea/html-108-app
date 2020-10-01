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
import ViewTrack from './components/ViewTrack/ViewTrack';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
// import Login from './components/Login/Login';
// import Registration from './components/Registration/Registration';
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
    // faGithub,
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
                
                {/* Should I bypass the /tracks/:trackId route and go directly from /dashboard to /edit/:trackId? */}
                <Route 
                    path='/tracks/:trackId'
                    render={(routerProps) => 
                        <ViewTrack 
                            authUser={authUser}
                            editable={false}
                            track={tracks.find(track => track.id == routerProps.match.params.trackId)}
                        />
                    }
                />
                
                <Route 
                    path='/edit/:trackId' 
                    render={(routerProps) => 
                        <EditTrack 
                            authUser={authUser}
                            editable={true}
                            track={tracks.find(track => track.id == routerProps.match.params.trackId)}
                        />
                        
                    }
                />

                <Route component={NotFound} />

            </Switch>
        )
    }

    render() {
        // console.log ("App state: ", this.state)
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
