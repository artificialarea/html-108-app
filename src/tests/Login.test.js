import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login/Login';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});