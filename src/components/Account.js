import React from 'react';
import { PollPreview } from './PollPreview';
import axios from 'axios';
import Auth from '../modules/Auth';
import AcctChart from './AcctChart';
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
    
 
     handleDelete(id, event){
  if(confirm("Are you sure you want to delete this poll?")){
      let token = Auth.getToken();
      axios.delete('/api/restricted/polls/' + id, {
          headers: { "Authorization": "bearer: " + token }
        })
        .then(res => { 
          this.loadPollsFromServer;
        })
        .catch(err => {
          console.log(err);
        });
      } 
  }
  render() {
      let acctChart;
      if(this.state.loaded){
          acctChart = <AcctChart polls={this.state.polls} />;
      }
    return (
        <div className="row">
          <div className="col-10 offset-1 col-md-6 offset-md-2"><h3>Your Polls</h3></div>
          <div className="col-10 offset-1 col-md-6 offset-md-2">
            <div className="row">      
                {acctChart}
             </div>
         </div>
         <div className="col-10 offset-1 col-md-3 offset-md-1">
            <div className="summary row"> 
              <div className="polls-list">{this.state.polls.map(poll => (<div> <Link to={'/polls/' + poll["id"]}><span>{poll.name}</span></Link>
                <Link to={'/polls/' + poll["id"] + '/edit'}> <i className="fa fa-pencil fa-fw"></i></Link> 
                <Link to="/account/#"> <i className="fa fa-trash-o fa-lg" onClick={this.handleDelete.bind(this, poll["id"])}></i></Link></div>))}</div>  
             </div>
        </div>
      </div>
    );
  }
}

export default Account;