import React from 'react';
import ReactDOM from 'react-dom';
import UserControls from '../components/Dashboard/UserControls';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <UserControls />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});