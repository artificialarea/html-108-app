import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from '../components/NotFound/NotFound';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});