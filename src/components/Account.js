import React from 'react';
import { PollPreview } from './PollPreview';
import axios from 'axios';
import Auth from '../modules/Auth';

class Account extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
   }
   componentDidMount(){
     this.loadPollsFromServer();
   }
   
    
   loadPollsFromServer(){
       let token = Auth.getToken();
       let headers = { 'Authorization': 'bearer: ' + token };
     axios.get('api/restricted/account', { headers: headers})
      .then(res => {
 this.setState({ polls: res.data });
 })
      .catch(err => {
      console.log(err);
    });
 }
 
  render() {
    return (
        <div className="home">
         <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div className="row polls-header"><h3>Your Polls</h3></div>
            <div className="summary row">      
              Number of polls: {this.state.polls.length}
             </div>
             <div className="polls-list">      
              {this.state.polls.map((poll) => <PollPreview key={poll["_id"]} {...poll} />)}
             </div>
        </div>
      </div>
    );
  }
}

export default Account;