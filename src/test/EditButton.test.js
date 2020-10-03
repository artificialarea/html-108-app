import React from 'react';
import ReactDOM from 'react-dom';
import EditButton from '../components/DrumMachine/EditButton';
import { BrowserRouter } from 'react-router-dom';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faPencilAlt);

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <EditButton />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});