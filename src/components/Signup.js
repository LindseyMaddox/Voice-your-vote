import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Signup extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
    errors: {},
      user: {
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    };
   }
   
   handleChange(event){
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value;

    console.log("change is "+ field + " and now user is " + user);
       this.setState({
           user: user
       });
   }
   handleSubmit(event){
       event.preventDefault();
       let user = this.state.user;
       let passwordToken = "to be encrypted";
        axios.post('/api/auth/signup', {
            "userName": user.name,
    "passwordToken": passwordToken })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  render() {
    let errors = this.state.errors;
    return (
       <div className="home">
    <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h1>Sign up</h1>
        </div>
    </div>
    {errors.summary && <p className="error-message">{errors.summary}</p>}

    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
            <form onSubmit={this.handleSubmit.bind(this)}>
             <div className="form-group">
                <label htmlFor="signupEmail">Email address</label>
                <input type="email" name="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" 
                placeholder="Enter email" onChange={this.handleChange.bind(this)} value={this.state.user.email}></input>
              </div>
              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input name="password" type="password" className="form-control" id="signupPassword" placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.user.password}></input>
                 <small id="passwordHelp" className="form-text text-muted">Password must be at least 10 characters.</small>
              </div>
                <div className="form-group">
                <label htmlFor="signupPasswordConfirmation">Password Confirmation</label>
                <input name="passwordConfirmation" type="password" className="form-control" id="signupPasswordConfirmation" placeholder="Confirm Password" onChange={this.handleChange.bind(this)} value={this.state.user.passwordConfirmation}></input>
              </div>
              <button type="submit" id="signup-submit-button" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
            No account yet? <Link to="/signup">Sign up</Link> now
        </div>
    </div>
  </div>
    );
  }
}
