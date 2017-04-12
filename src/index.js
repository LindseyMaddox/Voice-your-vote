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

const checkAuth = (page) => {
     if (Auth.isUserAuthenticated()){
         console.log("user is authorized to access");
         <AddPoll />;
     } else {
         alert("You are not authorized to add new polls");
     }
};
render(
    // function requireAuth(nextState, replace) {
    //   if (!loggedIn()) {
    //     replace({
    //       pathname: '/login'
    //     })
    //   }
    // }
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
                            </ul>
                </div>
            </nav>
            <Switch>
                <Route path="/" exact={true} component={IndexPage} />
                <Route path="/polls/new" component={checkAuth("add")} />
                <Route path="/polls/:id/edit" component={EditPoll} />
                <Route path="/polls/:id" component={PollPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('container')
);
