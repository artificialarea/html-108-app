import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../components/Dashboard/SearchBox';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <SearchBox />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});