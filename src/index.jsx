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
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Voice your Vote</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {/* Change from a to Link */}
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </ul>
                        </div>
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
