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
      polls: [{ "name": "", "votes": 0, "showActiveTooltip": false, "showDeleteTooltip": false }],
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
         let polls =  res.data["vote summary"];
         
         polls.forEach(function(val){
             val["showEditTooltip"] = false;
             val["showDeleteTooltip"] = false;
         })
         console.log("test for poll adding tooltip, polls are " + JSON.stringify(polls));
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
          this.loadPollsFromServer(this.setLoadedTrue.bind(this));
        })
        .catch(err => {
          console.log(err);
        });
      } 
  }
  
  showTooltip(action){
      
      let polls = this.state.polls.splice();
      let index = 0;//capture id of event
     
      if(action == "edit"){
          polls[index].showEditTooltip = true;
      }
       if(action == "delete"){
          polls[index].showDeleteTooltip = true;
      }
      this.setState({
          polls: polls
      })
  }
  hideTooltip(action){
       let polls = this.state.polls.splice();
      let index = 0;//capture id of event
     
      if(action == "edit"){
          polls[index].showEditTooltip = false;
      }
       if(action == "delete"){
          polls[index].showDeleteTooltip = false;
      }
      this.setState({
          polls: polls
      })
  }
  showPoll(poll){
      let deleteTooltip;
      let editTooltip;
      if(poll.showDeleteTooltip){
          deleteTooltip = <div className="delete-tooltip">Delete</div>;
      }
        if(poll.showEditTooltip){
          editTooltip = <div className="edit-tooltip">Edit Poll</div>;
      }
     return (<div> 
                    <Link to={'/polls/' + poll["id"]}><span>{poll.name}</span></Link>
                    <Link to={'/polls/' + poll["id"] + '/edit'}> <i className="fa fa-pencil fa-fw" onMouseOver={this.showTooltip.bind(this,"edit")} onMouseOut=
                         {this.hideTooltip.bind(this, "edit")}>{editTooltip}</i></Link> 
                    <Link to="/account/#"> 
                         <i className="fa fa-trash-o fa-lg" onMouseOver={this.showTooltip.bind(this, "delete")} onMouseOut=
                         {this.hideTooltip.bind(this, "delete")} 
                    onClick={this.handleDelete.bind(this, poll["id"])}>{deleteTooltip}</i></Link>
                </div> );
  }
  render() {
      let acctChart;
      if(this.state.loaded){
          acctChart = <AcctChart polls={this.state.polls} />;
      }
      let editTooltip;
      if(this.state.showEditTooltip){
          editTooltip = "Edit Poll";
      }
      let deleteTooltip;
       if(this.state.showDeleteTooltip){
         deleteTooltip = "Delete Poll";
      }
    return (
        <div className="row">
          <div className="col-10 offset-1 col-md-6 offset-md-2 graph-header"><h3>Your Polls</h3></div>
          <div className="col-10 offset-1 col-md-6 offset-md-2">
            <div className="row">      
                {acctChart}
             </div>
         </div>
         <div className="col-10 offset-1 col-md-3 offset-md-1">
            <div className="summary row"> 
              <div className="polls-list" >{this.state.polls.map(poll => this.showPoll(poll)) }
              </div>
             </div>
        </div>
      </div>
    );
  }
}

export default Account;