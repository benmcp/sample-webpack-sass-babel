import React, {Component} from 'react';
import { Link } from 'react-router';
import styles from '../../styles/main.scss';
import Splash from './splash';

class App extends Component {
	render() {
		return (
			<div className={'page'}>
				<div className={'container'}>
					<Splash/>
				</div>
			</div>
		)
	}
}

export default App;
