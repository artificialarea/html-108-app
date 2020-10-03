import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(faGithub);

describe(`Footer component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});