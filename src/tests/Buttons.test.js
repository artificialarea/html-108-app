import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from '../components/DrumMachine/Buttons';
import { BrowserRouter } from 'react-router-dom';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faPlay, faPencilAlt);

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Buttons />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});