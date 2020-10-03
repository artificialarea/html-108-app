import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Dashboard/Header';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});