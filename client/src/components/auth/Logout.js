import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';

class Logout extends React.Component {
  render() {
    return (
      <NavLink href="#" onClick={this.props.logout}>
        Log out
      </NavLink>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
