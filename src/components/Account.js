import React from 'react';
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
         });
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
  
  showTooltip(action, event){
      let polls = this.state.polls.slice();
      var index = event.target.id.match(/\d+/);
       if(action == "edit"){
           polls[index].showEditTooltip = true;
       }
       if(action == "delete"){
           polls[index].showDeleteTooltip = true;
       }
       this.setState({
           polls: polls
       });
  }
  hideTooltip(action, event){
       let polls = this.state.polls.slice();
      let index = event.target.id.match(/\d+/)[0];
       if(action == "edit"){
           polls[index].showEditTooltip = false;
       }
       if(action == "delete"){
           polls[index].showDeleteTooltip = false;
       }
      this.setState({
          polls: polls
      });
  }
  showPoll(poll, index){
      let deleteTooltip;
      let editTooltip;
      let deleteIconClass = "fa fa-trash-o fa-lg";
      let editIconClass = "fa fa-pencil fa-fw";
      if(poll.showDeleteTooltip){
          deleteTooltip = <div className="icon-tooltip">Delete Poll</div>;
          deleteIconClass += " tooltip-parent";
      }
      if(poll.showEditTooltip){
          editTooltip = <div className="icon-tooltip">Edit Poll</div>;
          editIconClass += " tooltip-parent";
      } 
     return (<div> 
                    <Link to={'/polls/' + poll["id"]}><span>{poll.name}</span></Link>
                    <Link to={'/polls/' + poll["id"] + '/edit'}><i className={editIconClass} id={"edit-icon-" + index} onMouseOver={this.showTooltip.bind(this, "edit")} onMouseOut=
                         {this.hideTooltip.bind(this, "edit")}>{editTooltip}</i></Link> 
                    <Link to="/account/#"><i className={deleteIconClass} id={"delete-icon-" + index} onMouseOver={this.showTooltip.bind(this, "delete")} onMouseOut=
                         {this.hideTooltip.bind(this, "delete")} 
                    onClick={this.handleDelete.bind(this, poll["id"])}>{deleteTooltip}</i></Link>
                </div> );
  }
  render() {
      let acctChart;
      if(this.state.loaded){
          acctChart = <AcctChart polls={this.state.polls} />;
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
              <div className="polls-list" >{this.state.polls.map((poll,index) => this.showPoll(poll, index)) }
              </div>
             </div>
        </div>
      </div>
    );
  }
}

export default Account;