import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

it('renders App component without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});


// test.skip('renders learn react link', () => {
//     const { getByText } = render(<App />);
//     const linkElement = getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// });
