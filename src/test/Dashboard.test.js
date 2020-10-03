import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';

describe(`Dashboard component`, () => {

    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });

});

