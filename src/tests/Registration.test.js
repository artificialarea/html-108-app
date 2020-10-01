import React from 'react';
import ReactDOM from 'react-dom';
import Registration from '../components/Registration/Registration';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Registration />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});