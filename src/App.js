import React from 'react';
import Login from './views/Login.js';
import Dashboard from './views/Dashboard.js'
import Navigation from './components/Navigation.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
//import { AuthContext } from './context/auth.js'

import store from './ReduxStore/store.js'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <AuthContext.Provider value={false}> */}
          <Router>
              <Navigation/>
              <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path="/dashboard" component={Dashboard}/>
              </Switch>
            </Router>
        {/* </AuthContext.Provider> */}
      </div>
    </Provider>
  );
}

export default App;
