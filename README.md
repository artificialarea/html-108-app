# Capstone: HTML-108

The HTML-108 is a minimal browser-based step synthesizer.

A nostalgic nod to the synthesizer hardware of the 1980s, like the seminal [Roland TR-808](https://en.wikipedia.org/wiki/Roland_TR-808), that ushered in several genres of electronic music.

Personally, it also enabled me to explore the wonderful world of the Web Audio API and the Tone.js javascript framework.

<br />

## 1. Working Prototype 
You can access a working prototype of the React app here: **https://html-108.vercel.app**

The corresponding Node Express Sever repo here: **[html-108-server](https://github.com/artificialarea/html-108-server)**


<br />

## 2. Functionality 

Landing page introduces the application...

<img src="https://raw.githubusercontent.com/artificialarea/html-108-app/master/docs/images/screenshot-01-intro.png" alt="intro screen" width="600"/>

User is presented with an interactive step sequencer interface to create a new track...

<img src="https://raw.githubusercontent.com/artificialarea/html-108-app/master/docs/images/screenshot-02-newtrack-blank.png" alt="intro screen" width="600"/>

Users can save, update, and delete their tracks...

<img src="https://raw.githubusercontent.com/artificialarea/html-108-app/master/docs/images/screenshot-03-track-saved.png" alt="intro screen" width="600"/>

All saved tracks are accessible via the community dashboard...

<img src="https://raw.githubusercontent.com/artificialarea/html-108-app/master/docs/images/screenshot-04-dashboard.png" alt="intro screen" width="600"/>


<br />

## 3. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React, Tone.js
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Vercel (client), Heroku (server), DBeaver


<br />

## 4. Wireframes
Early initial wireframes accessible here: **['Greybox' HTML Wireframes](https://artificialarea.github.io/html-108-app/greybox/)**


<br />

## 5. Front-end Struture: React Components Map

_Components are **stateless** unless otherwise noted. In progress, as may introduce more stateful components._

* **Index.js**
  * **APP.JS** **(STATEFUL:BRAIN)**
    * **Nav.js**
    * **Footer.js**
    * **Intro.js**
    * **Dashboard.js**
    * **AddTrack.js**
     * **DrumMachine.js** **(STATEFUL)**
    * **EditTrack.js**
     * **DrumMachine.js** **(STATEFUL)**
     
    
**[Component track Diagram](https://github.com/artificialarea/html-108-app/blob/master/docs/component-track.pdf)**


<br />

## 6. Back-end Structure

**Schema**

![Schema](https://github.com/artificialarea/html-108-app/blob/master/docs/schema.png)

**Business Objects**

* **Users** (database table)
  * **id** (primary key, auto-generated)
  * **username** (validation: NOT NULL; UNIQUE)
  * **password** (validation: NOT NULL; at least 8 characters, including at least one lowercase, one uppercase, one number, and one special character)
  * **email** (validation: includes @ character and .com, .org, or .net)
  * **date_created** (new Date())
  
* **tracks** (database table)
  * **id** (primary key, auto-generated)
  * **user_id** (foreign key > Users.id)
  * **title** (defaults to 'Untitled')
  * **date_modified** (new Date()) 
  * **visible** (NOT NULL, boolean default false)
  * **tempo** (NOT NULL, numeric)
  * **sequence_length** (NOT NULL, numeric)
  * **notes** (NOT NULL, text)
  _Data structure associated with step sequence_
  * **checked** (NOT NULL, BOOLEAN ARRAY)

<br />


## 7. API Documentation
API TOKEN Authorization required

* **`POST`**
  * **`/api/tracks`** create new track via `/add-track` URL
  * **`/api/users`** create new user via `/register` URL
  
* **`GET`** 
  * **`/api/tracks`** get all tracks
  * **`/api/tracks?visible=true`** get all public tracks for community `/dashboard` URL
  * **`/api/tracks?userId=[:userId]`** get all tracks for signed-in user's `/my-dashboard` URL
  * **`/api/tracks/:trackId`** get particular track for `/track/:trackId` URL
  * **`/api/users`** get all users associated with `/api/tracks/?visible=true`
  * **`/api/users/:userId`** for user to log-in
  
* **`PATCH`**
  * **`/api/tracks/:trackId`** update track via `/track/:trackId` URL
  * **`/api/users`** update user profile
  
* **`DELETE`**
  * **`/api/tracks/:trackId`** delete own track via `/my-dashboard` URL
  * **`/api/users`** delete profile?
  

<br />

## Development Roadmap (v1.x)
<img src="https://raw.githubusercontent.com/artificialarea/html-108-app/master/docs/plan---release.jpg" alt="situation" width="400"/>
[**Project Board**](https://github.com/artificialarea/html-108-app/projects/1) featuring bugs and enhancements

Scaled back the ambition and scope of project considerably for v1.o MVP release.

Anticipate future v1.x enhancements to include:
* User Login via JWT Auth, with personal Dashboard
* Ability to adjust time signature from 4 to 8 to 12 to 16 beats
* Ability to adjust pitch
* Ability to choose samples (e.g. hihat, clap, trap, bass, etc)
* Ability to download mp3 file of track

<br />

<hr /> 

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

<br />

<hr /> 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
