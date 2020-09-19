# Capstone: HTML-108

The HTML-108 is a minimal beat machine in the browser.

A nostalgic nod to the seminal Roland TR-808 analog synthesizer drum machine of the 1980s that ushered in several genres of electronic music.

## 00. Pivoting...
Scaling back ambition and scope of project considerably for now, in order to get some semblance of an MVP and some "quick wins".

This project will evolve in several phases in line with certain Thinkful project for guidance:
* **Phase 1:** ala **Noteful**
    * No user/sign-in
        * **branch: `pivot-01-noteful`** purged all instances of users, user, userId (and refactored code to accomodate)... **but subseqeuntly realised this was the wrong approach.** In antipation of re-integrating users/auth at some later phase, at this initial phase I still need to have users table in dB and have a single primary and foreign key placeholder **`user.id - - - - track.user_id`** whilst handing data on client-side. Soooooooooo, will need to start a new branch that's probably in some ways closer to **`prior-to-pivot`** branch. Doh! >_<
        * ergo, **branch: `pivot-02-noteful`**
    * Community Dashboard with CRUD
    * JSON server, then Postgres DB
    * MVP upon completion 
* **Phase 2 (?):** ala **Bookmarks**
    * No user/sign-in, per se, although API_TOKEN required
* **Phase 3:** Integrate Web Audio API / Tone.js

* **Phase 4 Stretch:** Login with Auth and JWT, ala **Blogful**. Doubtful in timeframe, but will revisit later if necessary.


<br />

## 1. Working Prototype 
You can access a working prototype of the React app here: **https://html-108.vercel.app**

The corresponding Node Express Sever repo here: **[html-108-server](https://github.com/artificialarea/html-108-server)**


<br />

## 2. User Stories (to do later)
This app is for two types of users: a visitor and a logged-in user

**[User Flows](https://github.com/artificialarea/html-108-app/blob/master/docs/user-flow.pdf)**


<br />

## 3. Functionality (to do later)
The app's functionality includes:
* (Example) Every User has the ability to create an account

**[Screen Inventory](https://github.com/artificialarea/html-108-app/blob/master/docs/screen-inventory.md)**


<br />

## 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React, Tone.js
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Vercel (client), Heroku (server), DBeaver


<br />

## 5. Wireframes (add images later)
See: **['Greybox' HTML Wireframes](https://artificialarea.github.io/html-108-app/greybox/)**


<br />

## 6. Front-end Struture: React Components Map

_Components are **stateless** unless otherwise noted. In progress, as may introduce more stateful components._

* **Index.js**
  * **APP.JS** **(STATEFUL:BRAIN)**
    * **Nav.js**
    * **Footer.js**
    * **LandingPage.js**
    * **LOGIN.JS** **(STATEFUL)**
    * **REGISTRATION.JS** **(STATEFUL)**
    * **Dashboard.js**
    * **DrumMachine.js**
    
**[Component Composition Diagram](https://github.com/artificialarea/html-108-app/blob/master/docs/component-composition.pdf)**


<br />

## 7. Back-end Structure: Business Objects

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
  * **visible** (NOT NULL, boolean default false)
  * **tempo** (NOT NULL, numeric)
  * **sequence_length** (NOT NULL, numeric)
  * **mp3** **TBD** (location of file, e.g. "http://path-of-the-audio-preview.mp3")
  
  _Data structure associated with step sequence (and perhaps audio sequence) still TBD_
  * **step_sequence** (NOT NULL, ARRAY[4])
    * `[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],`
    * `[0,0,0,1,0,0,0,1,1,1,0,1,0,0,0,1],`
    * `[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],`
    * `[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1]`
  * **audio_sequence** (NOT NULL, ARRAY)

<br />

**Schema** _(WIP)_

![Schema](https://github.com/artificialarea/html-108-app/blob/master/docs/schema.png)


<br />

## 8. API Documentation (WIP)
API Documentation details of CRUD

* **`POST`**
  * **`/api/compositions`** create/add new composition via `/track` URL
  * **`/api/users`** create/add new user via `/register` URL
  
* **`GET`** 
  * **`/api/compositions`** get all compositions
  * **`/api/compositions?visible=true`** get all public compositions for community `/dashboard` URL
  * **`/api/compositions?userId=[:userId]`** get all compositions for signed-in user's `/my-dashboard` URL
  * **`/api/compositions/:compositionId`** get particular composition for `/track/:trackId` URL
  * **`/api/users`** get all users associated with an `/api/compositions` fetch _(presumably just id & username, sans sensitive info)_
  * **`/api/users/:userId`** for user to log-in
  
* **`PATCH`**
  * **`/api/compositions/:compositionId`** update composition via `/track/:trackId` or `/my-dashboard` URL
  * **`/api/users`** update user profile (via `/register` URL?)
  
* **`DELETE`**
  * **`/api/compositions/:compositionId`** delete own composition via `/my-dashboard` URL
  * **`/api/users`** delete profile?
  

<br />

## Screenshots (to do later)
(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page-screenshot.png)
Register Page
![Register Page](/github-images/screenshots/register-page-screenshot.png)

## Development Roadmap (to do later)
This is v1.0 of the app, but future enhancements are expected to include:
* (Example) add more functionality

## How to run it (done)
Use command line to navigate into the project folder and run the following in terminal

### Local React scripts
* To install the react project ===> `npm install`
* To run react (on port 3000) ===> `npm start`
* To run tests ===> `npm run test`

### Local Node scripts
* To install the node project ===> `npm install`
* To migrate the database ===> `npm run migrate -- 1`
* To run Node server (on port 8000) ===> `npm run dev`
* To run tests ===> `npm run test`

<hr />

<br />

# Personal Notes (to delete later...)

Did some initial React integration studies in my [p5-reaction](https://github.com/artificialarea/p5-reaction) repo to explore integration of **p5.js library** as Web Audio API middleware. Was able to integrate `p5.js` sketch canvas, but encountered too many difficulties with `p5.sound.js` library. Looking at other audio optons, discovered **[Tone.js](https://tonejs.github.io/)** audio framework integrates with React, so will go that route.

<br />

## in /docs 

* **[Questions](https://github.com/artificialarea/html-108-app/blob/master/docs/questions.md)**
* **[Footnotes](https://github.com/artificialarea/html-108-app/blob/master/docs/footnotes.js)**

<br />

## Dependencies

* **Tone.js**: [npm](https://www.npmjs.com/package/tone) | [docs](https://tonejs.github.io/)
* **StartAudioContext**: [npm](https://www.npmjs.com/package/startaudiocontext) | [repo](https://github.com/tambien/StartAudioContext)
* **[FontAwesome Icons](https://fontawesome.com/icons)** via...
```
$ npm install @fortawesome/fontawesome-svg-core
$ npm install @fortawesome/free-solid-svg-icons
$ npm install @fortawesome/react-fontawesome
```
https://fontawesome.com/how-to-use/on-the-web/using-with/react
https://react-icons.github.io/react-icons/icons?name=fa
refer to [checkpoint 12](https://courses.thinkful.com/react-v1/checkpoint/12#brief-interlude) & repo 05-21_fileuploader

<br />

<hr /> 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
