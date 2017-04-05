import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';

import Layout from './components/Layout';
import { IndexPage } from './components/IndexPage';
import { PollPage } from './components/PollPage';
import { Login } from './components/Login';
import polls from './data/polls';

render(
    <Router>
        <Layout>
            <Route path="/" exact={true} component={IndexPage} polls={polls}/>
            <Route path="/polls/:id" component={PollPage} polls={polls}/>
            <Route path="/login" component={Login} />
        </Layout>
    </Router>,
    document.getElementById('container')
);
