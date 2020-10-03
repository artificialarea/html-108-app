import React from 'react';
import ReactDOM from 'react-dom';
import TimeSignature from '../components/DrumMachine/TimeSignature';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <TimeSignature />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});