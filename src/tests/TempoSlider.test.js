import React from 'react';
import ReactDOM from 'react-dom';
import TempoSlider from '../components/DrumMachine/TempoSlider';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <TempoSlider />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});