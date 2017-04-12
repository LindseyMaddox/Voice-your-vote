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

const checkAuth = ( ) => {
    if (Auth.isUserAuthenticated() ){
        return <AddPoll />;
     } else {
         alert("You are not authorized to add polls. Please create an account to add them");
         return <PollPage />;
     }
};

const checkCorrectUser = ( {match} ) => {
    console.log("here we'd verify the correct user");
    //if(Auth.isCorrectUser()){
    //    return <EditPoll />;
//    } else { 
  //  alert("you are not authorized to edit this poll");
    //redirect to poll they were on
//}
     return <EditPoll id={match.params.id}/>;
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
