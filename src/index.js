import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {BrowserRouter as Router, Route, IndexRoute, Switch, Link} from 'react-router-dom';

import  IndexPage from './components/IndexPage';
import  PollPage  from './components/PollPage';
import  Login  from './components/Login';
import polls from './data/polls';

render(
    <Router>
           <div>
             <nav class="navbar navbar-toggleable-sm navbar-light">
			    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
    			    <span class="navbar-toggler-icon"></span>
  			    </button>
  			    <div className="navbar-header">
                            <a className="navbar-brand" href="#">Voice your Vote</a>
                </div>
				<div class="collapse navbar-collapse justify-content-end" id="navbarContent">
                            <ul className="nav navbar-nav">
                                {/* Change from a to Link */}
                                <li className="nav-item"><Link to="/">Home</Link></li>
                                <li className="nav-item"><Link to="/login">Login</Link></li>
                            </ul>
                </div>
            </nav>
            <Switch>
                <Route path="/" exact={true} component={IndexPage} polls={polls}/>
                <Route path="/polls/:id" component={PollPage} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('container')
);
