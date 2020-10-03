import React from 'react';
import ReactDOM from 'react-dom';
import TempoDisplay from '../components/DrumMachine/TempoDisplay';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <TempoDisplay />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});