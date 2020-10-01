import React from 'react';
import ReactDOM from 'react-dom';
import StepSequence from '../components/DrumMachine/StepSequence';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <StepSequence />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});