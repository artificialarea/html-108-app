import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// TODO: do some proper event listener snapshot tests with enzyme
// import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import Dashboard from '../components/Dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';

describe(`Dashboard component`, () => {

    // stub items for testing
    const usersProps = [
        {
            id: 1,
            username: 'admin_node',
            password: 'aaAA11!!',
            email: 'somebody@somewhere.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ];
    const tracksProps = [
        {  
            id: 1, 
            user_id: 1,
            title: 'Silencio', 
            date_modified: '2029-01-22T16:28:32.615Z',
            visible: true, 
            tempo: 120,
            sequence_length: 8,
            notes: ["G5", "Eb5", "C5", "G4"],
            checked: [
                [false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false],
            ],
        },
        {  
            id: 2, 
            user_id: 1,
            title: 'FullBlastoff', 
            date_modified: '2100-05-22T16:28:32.615Z',
            visible: true,
            tempo: 200,
            sequence_length: 8,
            notes: ["G5", "Eb5", "C5", "G4"],
            checked: [
                [true,true,true,true,true,true,true,true],
                [true,true,true,true,true,true,true,true],
                [true,true,true,true,true,true,true,true],
                [true,true,true,true,true,true,true,true],
            ], 
        },
        {  
            id: 3, 
            user_id: 1,
            title: 'Browser Noise', 
            date_modified: '1919-12-22T16:28:32.615Z',
            visible: true,
            tempo: 80,
            sequence_length: 8,
            notes: ["G5", "Eb5", "C5", "G4"],
            checked: [
                [false,false,false,false,false,true,true,false],
                [true,false,true,false,false,false,false,true],
                [false,true,false,false,false,true,false,false],
                [true,false,true,false,true,false,true,false],
            ],
        },
    ];

    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it(`renders the UI as expected`, () => {
        const tree = renderer
            .create(<BrowserRouter>
                <Dashboard 
                    who={'public'}
                    users={usersProps}
                    tracks={tracksProps}
                />
            </BrowserRouter>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

