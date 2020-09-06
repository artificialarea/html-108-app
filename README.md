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

## Front-end Struture: React Components Map

_Components are **stateless** unless otherwise noted_

* **Index.js**
  * **APP.JS** **(STATEFUL:BRAIN)**
    * **Nav.js**
    * **Footer.js**
    * **LandingPage.js**
    * **LOGIN.JS** **(STATEFUL)**
    * **REGISTRATION.JS** **(STATEFUL)**
    * **Dashboard.js**
    * **DrumMachine.js**
    
<br />

## Back-end Structure: Business Objects

* **Users** (database table)
  * **id** (primary key, auto-generated)
  * **username** (validation: NOT NULL; UNIQUE)
  * **password** (validation: NOT NULL; at least 8 characters, including at least one lowercase, one uppercase, one number, and one special character)
  * **email** **TBD** (validation: includes @ character and .com, .org, or .net)
  * **date_login** (new Date())
  
* **Compositions** (database table)
  * **id** (primary key, auto-generated)
  * **user_id** (foreign key > Users.id)
  * **title** (defaults to 'Untitled')
  * **date_modified** (new Date()) 
  * **public** (NOT NULL, boolean)
  * **tempo** (NOT NULL, numeric)
  * **sequence_length** (NOT NULL, numeric)
  * **mp3** **TBD** (location of file, e.g. "http://path-of-the-audio-preview.mp3")
  * **step-sequence** (NOT NULL, _**array of objects?**_)
    * `{'hihat': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},`
    * `{'clap': [0,0,0,1,0,0,0,1,1,1,0,1,0,0,0,1]},`
    * `{'trap': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},`
    * `{'bass': [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1]}`


<br />

**Schema** _(I think)_

![Schema](https://github.com/artificialarea/html-108-app/blob/master/docs/schema.png)


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