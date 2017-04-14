import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';

class Logout extends React.Component {

  componentWillMount() {
    // Auth.deauthenticateUser();
    // this.context.router.history.replace('/');
    console.log("this.props is " + JSON.stringify(this.props));
//    this.props.handleLogout();
  }

  render() {
    return null;
  }
}
 Logout.contextTypes = {
        router: React.PropTypes.object
    };

export default Logout;