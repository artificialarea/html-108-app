import React from 'react';
import ReactDOM from 'react-dom';
import ResetButton from '../components/DrumMachine/ResetButton';
import { BrowserRouter } from 'react-router-dom';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
library.add(faRecycle);

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <ResetButton />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});