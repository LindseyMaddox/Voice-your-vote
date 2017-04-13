import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {BrowserRouter as Router, Route, IndexRoute, Switch, Link} from 'react-router-dom';

import  IndexPage from './components/IndexPage';
import  PollPage  from './components/PollPage';
import  Login  from './components/Login';
import  Signup  from './components/Signup';
import AddPoll from './components/AddPoll';
import EditPoll from './components/EditPoll';
import Auth from './modules/Auth';
import axios from 'axios';

const checkAuth = ( ) => {
    if (Auth.isUserAuthenticated() ){
        return <AddPoll />;
     } else {
         alert("You are not authorized to add polls. Please create an account to add them");
         return <PollPage />;
     }
};

class checkCorrectUser extends React.Component {
     constructor(props) {
    super(props);
    this.state = {
     allow: false
    };
}
componentDidMount(){
    console.log("checkCorrectUser component mounted");
      let token = Auth.getToken();
      console.log("check for props on specific call, they're " + JSON.stringify(this.props));
    let id = "58ee710c2a2994210978fac9";
    // let id = this.props.match.params.id || this.props.id;
       let headers = { 'Authorization': 'bearer: ' + token };
     axios.get('/api/restricted/polls/' + id, { headers: headers })
      .then(res => { 
        this.setState({allow:true});
          })
      .catch(err => {
          if(err) throw err;
          console.log("test for error response, it's " + err.response);
          if(err.response.status >= 400 && err.res.status < 500){
            alert("You are not authorized to edit this poll");
          }
    });
}
    render(){
        let comp;
        if(this.state.allow){
          //  comp = <EditPoll id={this.props.match.params.id} />;
            comp = <EditPoll id="58ee710c2a2994210978fac9" />;
        } else {
            //this.props for consistency in component's state
            comp = <PollPage id="58ee710c2a2994210978fac9" / >;
            //comp = <PollPage id ={this.props} />;
        }
        console.log("allow is " + this.state.allow);
     return (
        <div>{comp}</div>
        );
    }
};
render(
    <Router>
           <div>
             <nav className="navbar navbar-toggleable-sm navbar-light">
			    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
    			    <span className="navbar-toggler-icon"></span>
  			    </button>
  			    <div className="navbar-header">
                            <a className="navbar-brand" href="#">Voice your Vote</a>
                </div>
				<div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                            <ul className="nav navbar-nav">
                                {/* Change from a to Link */}
                                <li className="nav-item"><Link to="/">Home</Link></li>
                                <li className="nav-item"><Link to="/login">Login</Link></li>
                                <li className="nav-item"><Link to="/polls/58ee710c2a2994210978fac9/edit">Edit Poll</Link></li>
                            </ul>
                </div>
            </nav>
            <Switch>
                <Route path="/" exact={true} component={IndexPage} />
                <Route path="/polls/new" exact={true} component={checkAuth} />
                <Route path="/polls/:id/edit" component={checkCorrectUser} />
                <Route path="/polls/:id" component={PollPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('container')
);
