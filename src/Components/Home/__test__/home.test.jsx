import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Home from '../Home';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(Home, div);
});

it("matches snapshot", () => {
    const component = renderer.create(<h5 style={{ 'width': '20%', 'text-align': 'center' }}>Region</h5>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});