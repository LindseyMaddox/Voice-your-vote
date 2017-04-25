import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
// Import routing components
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { browserHistory } from 'react-router'; 

import  IndexPage from './components/IndexPage';
import  PollPage  from './components/PollPage';
import  Login  from './components/Login';
import  Logout  from './components/Logout';
import Account from './components/Account';
import  Signup  from './components/Signup';
import AddPoll from './components/AddPoll';
import CheckCorrectUser from './components/CheckCorrectUser';
import Auth from './modules/Auth';
import AccountWithFeatures from './components/AccountWithFeatures';

const handleAddLinkFollow = ( ) => {
    if(Auth.isUserAuthenticated()){
    return <AddPoll />;
    } else {
        alert("You are not authorized to add new polls");
        return null;
    }
};

class Index extends React.Component {
     constructor() {
    super();
    this.state = {
        loggedIN: false,
        actionStatus: ""
    };
   }
   
    componentDidMount(){
        if(Auth.isUserAuthenticated()){
            this.setState({
                loggedIN: true
            })
        }
    }
      updateActionStatusMessage(status){
    
          let message;
          if(status == "poll deleted"){
              message = "Successfully deleted poll";
          } else if(status == "poll added"){
              message = "Successfully created poll";
          } else if (status == "poll options added"){
              message = "Added new options to poll";
          } else {
              //do nothing
          }
          console.log("made it ot update status message fx and message is " + message);
            this.setState({
               actionStatus: message
           });
           
          setTimeout(this.clearMessage.bind(this), 3000); 
   
      }
      clearMessage(){
          console.log("made it to clear message");
          this.setState({actionStatus: ""});
      }
      
      handleCorrectLogin(){
          console.log("made it to handle correct login");
        this.setState({
            loggedIN: true
        });
     }
   handleLogout(){
         console.log("made it to handle logout");
       
        this.setState({
            loggedIN: false
        });
   }
    
render() {
    console.log("logged in is " + this.state.loggedIN);
    let navLinks;
    if(this.state.loggedIN){
       navLinks =
       	        <div>
                            <ul className="nav navbar-nav">
                                <li className="nav-item"><Link to="/">Home</Link></li>
                                <li className="nav-item"><Link to="/account">Account</Link></li>
                                <li className="nav-item"><Link to="/polls/new">Add Poll</Link></li>
                                <li className="nav-item"><Link to="/logout">Logout</Link></li>
                            </ul>
                </div>;
    } else {
         navLinks =
           <div>
                            <ul className="nav navbar-nav">
                                <li className="nav-item"><Link to="/">Home</Link></li>
                                <li className="nav-item"><Link to="/signup">Signup</Link></li>
                                <li className="nav-item"><Link to="/login">Login</Link></li>
                            </ul>
                </div>
    }

    return (
    <Router history={browserHistory}>
           <div>
             <nav className="navbar navbar-toggleable-sm navbar-light">
			    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
    			    <span className="navbar-toggler-icon"></span>
  			    </button>
  			    <div className="navbar-header">
                            <a className="navbar-brand" href="#">Voice your Vote</a>
                </div>
				<div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    {navLinks}
                </div>
            </nav>
            <Switch>
                <Route path="/" exact={true} render={()=><IndexPage message={this.state.actionStatus} clearMessage={this.clearMessage.bind(this)} />} />
                <Route path="/polls/new" exact={true} component={handleAddLinkFollow} />
                <Route path="/polls/:id/edit" render={( { match } )=> <CheckCorrectUser id ={match.params.id} updateActionStatusMessage={this.updateActionStatusMessage.bind(this)} clearMessage={this.clearMessage.bind(this)} /> } />
                <Route path="/polls/:id" render={({ match })=><PollPage message={this.state.actionStatus} updateActionStatusMessage={this.updateActionStatusMessage.bind(this)} clearMessage={this.clearMessage.bind(this)} id={match.params.id} />} />
                <Route path="/login" render={()=><Login handleCorrectLogin={this.handleCorrectLogin.bind(this)} />} />
                <Route path='/logout'  render={()=><Logout handleLogout={this.handleLogout.bind(this)} />} />
                <Route path="/signup" component={Signup} />
                <Route path="/account" component={Account} />
                <Route path="/account_with_features" component={AccountWithFeatures} />
            </Switch>
        </div>
    </Router>
            );
    }
}
ReactDOM.render(<Index />, document.getElementById("container"));
