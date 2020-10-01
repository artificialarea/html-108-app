import React from 'react';
import ReactDOM from 'react-dom';
import BoxRow from '../components/DrumMachine/BoxRow';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <BoxRow />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});