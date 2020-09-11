// FOOTNOTES ////////////////////////////////////////////
// as .js instead of .md file so syntax highlight colours are the same


// [f1] ////////////////////////////////////////////////
// Spread operator to stop mutating state 

// Although the changes to state and subsequent re-renders were as I intended, I suspected that I may be erroneously mutating state in the process. I discovered only by accident that if I commented out the entire block of code within `setState()` and just left it as an empty `setState({ })` shell, the state still changed and re-rendered as intended ?!?!

// Upon discusion, my error was pointed out to me and the solution.

// Initially I was directly mutating state
const instrumentArr = this.state.compositions[track].step_sequence[instrumentKey];
instrumentArr[beatIndex] = beatBoolean; 

// Solution: adding a spread operator to the instrumentArray I made a copy/clone of that array in state, allowing me to manipulate it prior to setState without directly mutating state...
const instrumentArr = [...this.state.compositions[track].step_sequence[instrumentKey]];

// I'm still a bit fuzzy as why the spread operator does this... but gonna read up on it now.


// [f2] ////////////////////////////////////////////////
// Use objects not arrays for organizing data in state to conduct CRUD operations
// src: https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-why-you-should-use-an-object-not-an-array-for-lists-bee4a1fbc8bd
           
// Once I switched this.state.compositions and this.state.users from an array (of nameless objects) to an object
// suddenly CRUD operations to access state and setState became so much simpler.
// BAD:     [ {id:'1'}, {id:'2'}, ... ]
// GOOD:    { '1': {}, '2': {}, ... }

// READ example
const trackId = '2';
// array
this.state.compositions.find((track) => track.id === trackId)
// object (sooo much easier)
this.state.compositions[trackId];


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
// deleting composition key/value by directly mutating state, 
// then empty setState({ }) to trigger render in the DOM
delete this.state.compositions[trackId]
this.setState({ })

// James suggests this approach may not be that bad, tho. 
// Suggests I research "Primative vs Reference Types" to shed more light on state.

