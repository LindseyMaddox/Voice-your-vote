import React from 'react';
import { PollPreview } from './PollPreview';
import axios from 'axios';
import Auth from '../modules/Auth';
import AccountChart from './AccountChart';

class AccounWithFeatures extends React.Component {
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
            <div className="summary row">      
              <div className="polls-list">{this.state.polls.map(poll => ( <Link to={`/polls/poll["_id"]}`}><div>{poll.name} - {poll.votes} votes</div></Link>))}</div>  
             </div>
        </div>
          <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div className="row polls-header"><h3>Your Polls</h3></div>
            <div className="summary row">      
                <AccountChart polls={this.state.polls} />
             </div>
        </div>
      </div>
    );
  }
}

export default AccountWithFeatures;