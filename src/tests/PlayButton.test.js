import React from 'react';
import ReactDOM from 'react-dom';
import PlayButton from '../components/DrumMachine/PlayButton';
import { BrowserRouter } from 'react-router-dom';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faPlay);

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <PlayButton />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});