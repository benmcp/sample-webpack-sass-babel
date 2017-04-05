import React, { Component, PropTypes } from 'react';
import styles from './styles/main.scss';
import Head from './components/Head';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
	render() {
		return (
			<div>
				<Head />
				<ReactCSSTransitionGroup
		      component="div"
		      transitionName="app"
		      transitionEnterTimeout={500}
		      transitionLeaveTimeout={500}
		    >
		      {React.cloneElement(this.props.children, {
		        key: this.props.location.pathname
		      })}
		    </ReactCSSTransitionGroup>
			</div>
		)
	}
}

export default App;
