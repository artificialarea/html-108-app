import React from 'react';
import ReactDOM from 'react-dom';
import Box from '../components/DrumMachine/Box';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Box />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});