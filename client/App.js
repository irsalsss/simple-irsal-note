import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';

import OverviewNote from './resources/pages/OverviewNote';
import storeNote from './resources/store/storeNote';

class App extends Component {
  render () {
    return (
      <Router>
        <Provider store={storeNote}>
          <Switch>
            <Route path="/" component={OverviewNote} />
          </Switch>
        </Provider>
      </Router>
    )
  }
}

export default App;