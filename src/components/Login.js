import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../modules/Auth';

export default class Login extends React.Component {
      constructor(props) {
    super(props);
    this.state = {
    errors: {},
    genericErrorMessage: false,
      user: {
        email: '',
        password: ''
      }
    };
   }
   
   handleChange(event){
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value;
      
        this.setState({
           user: user
       });
   }
   handleSubmit(event){
       event.preventDefault();
       var that = this;
       let email = this.state.user.email;
       let password = this.state.user.password;
           axios.post('/auth/login', {
            'email': email,
    "password": password})
   .then(function (response) {
       Auth.authenticateUser(response.data.token);
       console.log("woohoo, you've got access! response is " + JSON.stringify(response.status));
  })
  .catch(function (error) {
        if(error.response.status >= 400 && error.response.status < 500){
            if(error.response.data.errors){
                that.setState({
                    errors: error.response.data.errors
                });
            } else {
                console.log("no error hash; setting generic to true");
                that.setState({
                    genericErrorMessage: true,
                    errors: ""
                });
            }
        }
  });
  }

  render()
  {
     let errors = this.state.errors;
     let errorDiv = "";
     let errorMessage;
        if(this.state.genericErrorMessage){
            errorMessage = "We couldn't log you in! Please check that your username and password are correct.";
        }
        if(Object.keys(errors).length > 0) {
            errorMessage = <p>We couldn't log you in. Why? </p>
                        {Object.values(errors).map(error => ( <li>{error}</li>))};
        }
       errorDiv = <div className="errors">
                    {errorMessage}
                 </div>;
    return (
       <div className="home">
    <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h1>Log in</h1>
        </div>
    </div>
     <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
            {errorDiv}
        </div>
      </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
            <form onSubmit={this.handleSubmit.bind(this)}>
             <div className="form-group">
                <label htmlFor="signupEmail">Email address</label>
                <input type="email" name="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" placeholder="Email" onChange={this.handleChange.bind(this)} value={this.state.user.email}></input>
              </div>
              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input type="password" name="password" className="form-control" id="signupPassword" placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.user.password}></input>
              </div>
              <button type="submit" id="signup-submit-button" className="btn btn-primary">Log in</button>
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