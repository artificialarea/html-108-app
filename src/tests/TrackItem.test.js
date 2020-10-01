import React from 'react';
import ReactDOM from 'react-dom';
import TrackItem from '../components/Dashboard/TrackItem';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <TrackItem />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});