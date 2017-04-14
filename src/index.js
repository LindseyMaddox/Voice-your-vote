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
import EditPoll from './components/EditPoll';
import Auth from './modules/Auth';
import axios from 'axios';

const PollPageWrapper = ( {match} ) => {
    return <PollPage id={match.params.id} />;
};

const handleAddLinkFollow = ( ) => {
    if(Auth.isUserAuthenticated()){
    return <AddPoll />;
    } else {
        alert("You are not authorized to add new polls");
        return null;
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
      let token = Auth.getToken();
        let id = this.props.match.params.id;
       let headers = { 'Authorization': 'bearer: ' + token };
     axios.get('/api/restricted/polls/' + id, { headers: headers })
      .then(res => { 
        this.setState({allow:true});
          })
      .catch(err => {
          if(err) throw err;
          if(err.response.status >= 400 && err.res.status < 500){
            alert("You are not authorized to edit this poll");
          }
    });
}
    render(){
        let comp;
        let id = this.props.match.params.id;
        if(this.state.allow){
           comp = <EditPoll id={id} />;
        } else {
           comp = <PollPage id={id} />;
        }
     return (
        <div>{comp}</div>
        );
    }
};

class Index extends React.Component {
     constructor() {
    super();
    this.state = {
        loggedIN: false,
        actionMessage: ""
    };
   }
   
   componentDidMount(){
        if (Auth.isUserAuthenticated() ){
            console.log("user is authenticated");
            this.setState({
                loggedIN: true
            });
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
            this.setState({
               actionMessage: message
           });
      }
      handleCorrectLogin(){
        this.setState({
            loggedIN: true
        });
   }
   handleLogout(){
        this.setState({
            loggedIN: false
        });
   }
    
render() {
    let additionalNavLinks;
    if(this.state.loggedIN){
        additionalNavLinks =
            <div>
                <li className="nav-item"><Link to="/account">Account</Link></li>
                <li className="nav-item"><Link to="/polls/new">Add Poll</Link></li>
                <li className="nav-item"><Link to="/logout">Logout</Link></li>
            </div>;
    } else {
         additionalNavLinks =
            <div>
                <li className="nav-item"><Link to="/polls/signup">Signup</Link></li>
                <li className="nav-item"><Link to="/login">Login</Link></li>
            </div>;
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
                            <ul className="nav navbar-nav">
                                <li className="nav-item"><Link to="/">Home</Link></li>
                                {additionalNavLinks}
                            </ul>
                </div>
            </nav>
            <Switch>
                <Route path="/" exact={true} render={()=><IndexPage message={this.state.message} />} />
                <Route path="/polls/new" exact={true} component={handleAddLinkFollow} />
                <Route path="/polls/:id/edit" component={checkCorrectUser} />
                <Route path="/polls/:id" render={({ match })=><PollPage message={this.state.message} updateActionStatusMessage={this.updateActionStatusMessage.bind(this)} id={match.params.id} />} />
                <Route path="/login" render={()=><Login handleCorrectLogin={this.handleCorrectLogin.bind(this)} />} />
                <Route path='/logout'  render={()=><Logout handleLogout={this.handleLogout.bind(this)} />} />
                <Route path="/signup" component={Signup} />
                <Route path="/account" component={Account} />
            </Switch>
        </div>
    </Router>
            );
    }
}
ReactDOM.render(<Index />, document.getElementById("container"));
