import React from 'react';
import ReactDOM from 'react-dom';
import DrumMachine from '../components/DrumMachine/DrumMachine';
import { BrowserRouter } from 'react-router-dom';

// TONE + TESTING
// Known issue with testing Tone.js in React
// Requires some sor of Mock Stub Function,
// https://jestjs.io/docs/en/mock-functions.html
// Ergo, need to skip for now...

// TODO: Mock Tone.js Functions
// https://stackoverflow.com/questions/55986493/how-to-fix-typeerror-cannot-read-property-creategain-of-null-while-testing
// https://stackoverflow.com/questions/55272123/testing-a-library-that-uses-the-web-audio-api-with-mocha-chai/55473204#55473204


describe.skip(`DrumMachine component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <DrumMachine />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});