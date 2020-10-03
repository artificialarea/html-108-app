import React from 'react';
import ReactDOM from 'react-dom';
import TrackList from '../components/Dashboard/TrackList';
import { BrowserRouter } from 'react-router-dom';

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <TrackList />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});