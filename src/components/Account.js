import React from 'react';
import { PollPreview } from './PollPreview';
import axios from 'axios';
import Auth from '../modules/Auth';
import { Link } from 'react-router-dom';

class Account extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      polls: [{ "name": "", "votes": 0 }],
      loaded: false
    };
   }
   componentDidMount(){
     this.loadPollsFromServer(this.setLoadedTrue.bind(this));
   }
   
    
   loadPollsFromServer(){
       let token = Auth.getToken();
       let headers = { 'Authorization': 'bearer: ' + token };
     axios.get('api/restricted/account', { headers: headers})
      .then(res => {
 this.setState({ polls: res.data["vote summary"] });
 })
      .catch(err => {
      console.log(err);
    });
 }
    setLoadedTrue(){
        this.setState({
            loaded:true
        });
    }
  render() {
      console.log("polls are " + JSON.stringify(this.state.polls));
    return (
        <div className="home">
         <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div className="row polls-header"><h3>Your Polls</h3></div>
            <div className="row polls-header"><div id="account-page-poll-subheader" className="col-6 col-md-4"><h4>Poll Name</h4></div> <div id="account-page-votes-subheader" className="col-4 offset-1 col-md-4 offset-md-2"><h4>Total Votes</h4></div></div>
            <div className="summary">      
                    {this.state.polls.map(poll => ( 
                        <div className="polls-list row">
                                    <div className="account-poll-name col-6 col-md-4"> <Link to={'/polls/' + poll["id"]}>{poll.name}</Link></div>
                                    <div className="account-poll-votes col-4 offset-1 col-md-4 offset-md-2"> {poll.votes}</div>
                        </div>))}
             </div>
        </div>
      </div>
    );
  }
}

export default Account;