import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Header from '../Header';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(Header, div);
});

it("renders Header correctly", () => {
    const { getByTestId } = render(<Header></Header>);
    expect(getByTestId('header')).toHaveTextContent("Welcome to Countries Hub");
});


it("renders Header correctly", () => {
    const { getByTestId } = render(<Header></Header>);
    expect(getByTestId('header')).toHaveTextContent("Welcome to Countries Hub");
});


it("matches snapshot", () => {
    const component = renderer.create(<div style={{'text-align': 'center', 'font-weight': '900', 'backgroundColor': 'lightblue', 'height': '30px', 'marginTop': '-10px', 'paddingTop':'10px'}}>Welcome to Countries Hub</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


