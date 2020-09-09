export default {

    users: [
        {
            id: 1,
            username: "Sarah",
            password: "aaAA11!!",
            email: "sarah@hotmail.com"
        },
        {
            id: 2,
            username: "Dolfmeister",
            password: "aaAA11!!",
            email: "dolf@aol.com"
        },
    ],

    // QUESTION: Should I split compositions into three distinct objects, each with their own api call?
    // public_compositions: []  // via api
    // user_compositions: []    // via api, if signed in
    // temp_composition: []     // sans api, for new /track route 
    // ANSWER: For dashboard scenarios, No; for new drum machine track, Yes. 
    // Pull down the entire Compositions db table (public and private, by all users), then filter data clientside when required. Same goes for Users db table (sans password + email, presumably).
    
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
    ]
    
}