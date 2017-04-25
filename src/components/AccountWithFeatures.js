import React from 'react';
import { PollPreview } from './PollPreview';
import axios from 'axios';
import Auth from '../modules/Auth';
import AcctChartSandbox from './AcctChartSandbox';
import { Link } from 'react-router-dom';

class AccountWithFeatures extends React.Component {
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
   
    
   loadPollsFromServer(callback){
       let token = Auth.getToken();
       let headers = { 'Authorization': 'bearer: ' + token };
     axios.get('api/restricted/account', { headers: headers})
      .then(res => {
 this.setState({ polls: res.data["vote summary"] });
 callback();
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
      console.log("loaded is " + this.state.loaded);
      let acctChartSandbox;
      if(this.state.loaded){
          acctChartSandbox = <AcctChartSandbox polls={this.state.polls} />;
      }
    return (
        <div className="home">
         <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div className="row polls-header"><h3>Your Polls</h3></div>
            <div className="summary row">      
              <div className="polls-list">{this.state.polls.map(poll => ( <Link to={'/polls/' + poll["id"]}><div>{poll.name} - {poll.votes} votes</div></Link>))}</div>  
             </div>
        </div>
          <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div className="row polls-header"><h3>Your Polls</h3></div>
            <div className="summary row">      
                {acctChartSandbox}
             </div>
        </div>
      </div>
    );
  }
}

export default AccountWithFeatures;