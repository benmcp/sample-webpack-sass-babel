import React, {Component} from 'react';
import { Link } from 'react-router';

class Header extends Component {

	render() {
		return (
			<div className={'header'}>
				<p>
          ben mcphail - <span>{this.props.title}</span>
        </p>
			</div>
		)
	}
}

export default Header;
