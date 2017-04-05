import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './redux/store';
import App from './app';
import Index from './modules/home';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
import ReactGA from 'react-ga';

class Main extends Component {
  render() {
    return ( 
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Index}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}
 
ReactDOM.render(<Main/>, document.getElementById('app'));
