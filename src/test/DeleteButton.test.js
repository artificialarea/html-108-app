import React from 'react';
import ReactDOM from 'react-dom';
import DeleteButton from '../components/DrumMachine/DeleteButton';
import { BrowserRouter } from 'react-router-dom';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt);

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <DeleteButton />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});