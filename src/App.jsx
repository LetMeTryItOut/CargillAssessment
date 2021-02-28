import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import AppLayout from './Components/Layout/AppLayout';
import Home from './Components/Home/Home';
import CountryDetails from './Components/CountryDetails/CountryDetails';

const App = () => {
  return (
    <div className="App">
      <Router>
        <AppLayout>
          <Switch>
            <Route default exact path="/"
              render={() => {
                return (<Redirect to="/countries" />)
              }}>
            </Route>
            <Route default exact path="/countries">
              <Home />
            </Route>
            <Route default exact path="/country/:name">
              <CountryDetails />
            </Route>
          </Switch>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
