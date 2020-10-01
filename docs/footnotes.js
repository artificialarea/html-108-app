// FOOTNOTES ////////////////////////////////////////////
// as .js instead of .md file so syntax highlight colours are the same


// [f1] ////////////////////////////////////////////////
// Spread operator to stop mutating state 

// Although the changes to state and subsequent re-renders were as I intended, I suspected that I may be erroneously mutating state in the process. I discovered only by accident that if I commented out the entire block of code within `setState()` and just left it as an empty `setState({ })` shell, the state still changed and re-rendered as intended ?!?!

// Upon discusion, my error was pointed out to me and the solution

// This directly mutate state
const newtracks = this.state.tracks;

// Whereas apparently this does not: adding a spread operator to the instrumentArray I made a copy/clone of that array in state, allowing me to manipulate it prior to setState without directly mutating state...
const newtracks = [...this.state.tracks];

// BUT... it still seems to update state without the need of setState, tho? =/



// [f2] ////////////////////////////////////////////////
// Use objects not arrays for organizing data in state to conduct CRUD operations
// src: https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-why-you-should-use-an-object-not-an-array-for-lists-bee4a1fbc8bd
           
// Once I switched this.state.tracks and this.state.users 
// from an array (of nameless objects) to an object
// suddenly CRUD operations to access state and setState became so much simpler.
// BAD?:     [ {id:'1'}, {id:'2'}, ... ]
// GOOD?:    { '1': {}, '2': {}, ... }

// READ example
const trackId = '2';
// array
this.state.tracks.find((track) => track.id === trackId)
// object (sooo much easier)
this.state.tracks[trackId];

// POST-SCRIPT!!!! 
// Unfortunately, it appears Marius recommends the opposite. Ugh.
// I failed to capture all the pros and cons he gave, but essentially he said 99% of databases are configured as an array of object. It's easier to access data (via mapping, etc) and also something about deleting data.
// For now I will leave as is, but may likely need to refactor again back to how I previously had it =/e e.g. tracks: [ {}, {}, {} ]



// [f3] ////////////////////////////////////////////////
// Unable to purge key/value from state via setState

// Per guidelines
// BAD
delete this.state.obj.key;
// GOOD
const {key, ...rest} = this.state.obj;
this.setState({
    obj: rest
});

// However, I was unable to implement via the suggested GOOD method.
// So, resorted to the BAD approach:
// deleting track key/value by directly mutating state, 
// then empty setState({ }) to trigger render in the DOM
delete this.state.tracks[trackId]
this.setState({ })

// James suggests this approach may not be that bad, tho. 
// Suggests I research "Primative vs Reference Types" to shed more light on state.

// POST-SCRIPT!!!!
// was able to pull it off in branch 'state-with-objects'
// co-opted this from somewhere else...
let {[trackId]: _, ...rest} = this.state.tracks;
this.setState({
    tracks: rest
})
// Note: the underscore (_) indicates to ignore.
// and in master state with arrays
const newtracks = [...this.state.tracks]
const index = newtracks.findIndex(track => track.id === trackId)
newtracks.splice(index, 1);

this.setState({
    tracks: newtracks
})



// [f4] ////////////////////////////////////////////////
// Vercel: .env -vs- .env.local

/*
in Thinkful checkpoint Deploying to Production: https://courses.thinkful.com/react-v1/checkpoint/18
it explictly tells me to add REACT_APP_API_KEY to `.env.local` ... but when I deployed .env.local Vercel it was ignored.

Changing the file name to just `.env` and redeploying to Vercel solved that problem. But WHY?????


Aside: https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d
*/






// [f#] ///////////////////////////////////////////////
/* Opting to use CSS Modules 

As usual, Mosh explains it best:
https://programmingwithmosh.com/react/css-modules-react/

"A CSS module is, in simple words, a CSS file. But with a key difference: 

1. by default, when imported, every class name and animation inside a CSS module is scoped locally to the component that is importing it. This allows you to use virtually any valid name for your classes, without worrying about conflicts with other class names in your application.
 
2. CSS modules also allow you to extend one or more classes, inheriting their styles. This concept is called class composition."

*/

// [f#] ///////////////////////////////////////////////
/* Logo

Logo from: https://www.newgroove.it/

*/