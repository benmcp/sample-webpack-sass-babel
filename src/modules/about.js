import React, {Component} from 'react';
import HeaderView from '../components/header';
import { Link } from 'react-router';

class About extends Component {
  render() {
    return (
      <div className={'pageContainer right'}>
        <HeaderView></HeaderView>
        <p>About Page</p>
        <Link to="/">Index</Link>
      </div>
    )
  }
}

export default About;
