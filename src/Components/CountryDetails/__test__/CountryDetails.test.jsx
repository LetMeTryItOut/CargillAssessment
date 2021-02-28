import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import CountryDetails from '../CountryDetails';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(CountryDetails, div);
});

it("matches snapshot", () => {
    const component = renderer.create(<div>Capital City</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});