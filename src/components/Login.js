import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  render() {
    return (
       <div className="home">
    <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h1>Log in</h1>
        </div>
    </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
            <form>
             <div className="form-group">
                <label htmlFor="signupEmail">Email address</label>
                <input type="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
              </div>
              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input type="password" className="form-control" id="signupPassword" placeholder="Password"></input>
                 <small id="passwordHelp" className="form-text text-muted">Password must be at least 10 characters.</small>
              </div>
              <button type="submit" id="signup-submit-button" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  </div>
    );
  }
}