import React from 'react';
import ReactDOM from 'react-dom';
import Intro from '../components/Intro/Intro';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Intro />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});