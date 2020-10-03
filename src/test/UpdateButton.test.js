import React from 'react';
import ReactDOM from 'react-dom';
import UpdateButton from '../components/DrumMachine/UpdateButton';
import { BrowserRouter } from 'react-router-dom';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faCloudUploadAlt);

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <UpdateButton />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});