import React, {Component} from 'react';
 
class Tile extends Component {
	render() {
		return (
			<a
				key={this.props.object.key}
				href={this.props.object.url}
				className={'tile'}
				target='_blank'
			>
				<p>
          {this.props.object.title}
        </p>
        <p className={'date'}>
          {this.props.object.latest}
        </p>
			</a>
		)
	}
}

export default Tile;
