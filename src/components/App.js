import React from 'react';

import { BrowserRouter as Router,Link, Route, Switch } from 'react-router-dom';
import { IndexPage } from './IndexPage';
import { PollPage } from './PollPage';
import { LoginPage } from './Login';
import polls from '../data/polls';
 
const renderIndex = () => <IndexPage polls={polls} />;

const App = () => (
  <Router>
    <div>
      <header>
    	 	<nav id="vote-navbar" className="navbar navbar-toggleable-sm navbar-light bg-faded">
    			<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        			<span className="navbar-toggler-icon"></span>
      			</button>
    				 <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
        				<ul className="navbar-nav">
    						 <li className="nav-item"><Link to="/">Home</Link></li>
                 <li className="nav-item"><Link to="/login">Login</Link></li>
    					</ul>
    				</div> 
    			</nav> 
  		</header>
     <Switch>
        <Route exact path path="/" render={renderIndex} />
        <Route path="/poll/:id" component={PollPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  </Router>
  );

export default App;
