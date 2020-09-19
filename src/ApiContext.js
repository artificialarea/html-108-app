import React from 'react'

export default React.createContext({
    authUser: [],
    users: [],
    tracks: [],
    addTrack: () => { },
    deleteTrack: () => { },
    updateTrack: () => { },
})