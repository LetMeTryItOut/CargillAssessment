import React from 'react';
import Header from '../Header/Header';

const AppLayout = (props) => {
    return (
        <div data-testid="applayout">
            <Header />
            <div>{props.children}</div>
        </div>
    );
}
export default AppLayout;