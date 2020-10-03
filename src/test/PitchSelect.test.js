import React from 'react';
import ReactDOM from 'react-dom';
import PitchSelect from '../components/DrumMachine/PitchSelect';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <PitchSelect />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});