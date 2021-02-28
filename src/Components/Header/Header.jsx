import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    Header: {
        'text-align': 'center', 'font-weight': '900', 'backgroundColor': 'lightblue', 'height': '30px', 'marginTop': '-10px', 'paddingTop':'10px'
    }
});

const Header = () => {
    const styles = useStyles();
    return (
        <>
            <div data-testid="header" className={styles.Header}>Welcome to Countries Hub</div>
        </>
    );
}
export default Header;