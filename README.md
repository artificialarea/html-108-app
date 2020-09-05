# HTML-108

Deployed to production: **https://html-108.vercel.app/**

Corresponding server repo: **[html-108-server](https://github.com/artificialarea/html-108-server)**

<br />

## Preliminary 

* [Screen Inventory](https://github.com/artificialarea/html-108-app/blob/master/docs/screen-inventory.md)
* [User Flows](https://github.com/artificialarea/html-108-app/blob/master/docs/user-flow.pdf)
* [HTML Wireframes](https://artificialarea.github.io/html-108-app/greybox/)
* [Component Composition Diagram](https://github.com/artificialarea/html-108-app/blob/master/docs/component-composition.pdf)

<br />

## Notes

Did some initial React integration studies in my [p5-reaction](https://github.com/artificialarea/p5-reaction) repo to explore integration of **p5.js library** as Web Audio API middleware. Was able to integrate `p5.js` sketch canvas, but encountered too many difficulties with `p5.sound.js` library. Looking at other audio optons, discovered **[Tone.js](https://tonejs.github.io/)** audio framework integrates with React, so will go that route.

<br />

## Dependencies

* **Tone.js**: [npm](https://www.npmjs.com/package/tone) | [docs](https://tonejs.github.io/)
* **StartAudioContext**: [npm](https://www.npmjs.com/package/startaudiocontext) | [repo](https://github.com/tambien/StartAudioContext)
<br />

<hr /> 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
