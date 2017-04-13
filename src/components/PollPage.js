import React from 'react';
import {
  Link
} from 'react-router-dom';
import EditPoll from './EditPoll';
import { NotFoundPage } from './NotFoundPage';
import { Chart } from './PieChart';
import axios from 'axios';
import Auth from '../modules/Auth';

class PollPage extends React.Component {
    constructor(props) {
      super(props);
    this.state = {
      poll: { "name": "Placeholder Poll", "options": []},
      selection: "",
      message: "",
      id: this.props.match.params.id,
      loaded: false,
      showButtons: false
    };
   }
   
   componentDidMount(){
      this.loadPollFromServer(this.setLoadedTrue.bind(this));
      this.checkCorrectUser();
   }
 
    setLoadedTrue(){
       this.setState({
       loaded: true
      });
    }
    
   loadPollFromServer(callback){
     let id = this.state.id;
     axios.get('/api/base/polls/' + id)
      .then(res => { 
        if(res.data.length != 0){
           this.setState({ poll: res.data[0] });
        }
        callback();
 })
      .catch(err => {
      console.log(err);
    });
 }
    checkCorrectUser(callback){
      let id = this.state.id;
       let token = Auth.getToken();
        let headers = { 'Authorization': 'bearer: ' + token };
        axios.get('/api/restricted/polls/' + id, { headers: headers })
      .then(res => { 
           this.setState({ showButtons: true });
      })
      .catch(err => {
        if (err) throw err;
    });
    }
    postPollVoteToServer(){
     let id = this.state.id;
     let selection = this.state.selection;
     axios.post('/api/base/polls/' + id, {
       "name": selection
     })
      .then(res => { 
       this.setState({ message: res.data.message });
       this.loadPollFromServer();
 })
      .catch(err => {
      console.log(err);
    });
 }
  handleChange(event) {
    this.setState({selection: event.target.value});
  }
 handleSubmit(event) {
    event.preventDefault();
    
    var pollChoice = { name: this.state.selection };
    this.postPollVoteToServer();
}
  handleAddPollOptions(){
    console.log("made it to add poll options method");
    return <EditPoll />;
  }
  handleDelete(){
    console.log("button test");
//  if(confirm("Are you sure you want to delete this poll?")){
     let id = this.state.id;
       let token = Auth.getToken();
      axios.delete('/api/restricted/polls/' + id, {
          headers: { "Authorization": "bearer: " + token }
        })
        .then(res => { 
          this.setState({ message: res.data.message });
        })
        .catch(err => {
          console.log(err);
        });
    //  } take out confirm for now to test the routes are working
  }
  render(){
    const poll = this.state.poll;
    let message = this.state.message;
    let loaded = this.state.loaded;
    if(!loaded) {
      return <h2> Loading data </h2>;
    } else if (loaded && poll.name == "Placeholder Poll"){
        return <NotFoundPage />;
    }
    var options = [];
    for(var i = 0; i < poll.options.length; i++){
      options.push(poll.options[i]["name"]);
    }
    let deleteAndEditButtons;
    console.log("show buttons is " + this.state.showButtons);
    if(this.state.showButtons){
      deleteAndEditButtons = 
      <div className="col-10 offset-1 col-md-4 offset-md-2">
            <button className="btn btn-default" onClick={this.handleAddPollOptions.bind(this)}>
              Add Poll Options
            </button>
            <button className="btn btn-default" onClick={this.handleDelete.bind(this)}>
              Delete Poll
            </button>
      </div>;
    }
      return (
      <div>
       <div className="poll row">
          <div className="col-10 offset-1 col-md-4 offset-md-2">
            <div className="row">
              <h4 className="success-message">{message}</h4>
            </div>
          </div>
        </div>
        <div className="poll row">
          <div className="col-10 offset-1 col-md-4 offset-md-2">
            <div className="row">
              <h2 className="poll-name">Poll: {poll.name}</h2>
            </div>
            <section className="description">
              <div className="row">
                <h4 className="poll-description">{poll.description}</h4>
              </div>
            </section>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
              <label htmlFor="option-select">Vote for your favorite</label>
                <select id="option-select" className="form-control" value={this.state.selection} onChange={this.handleChange.bind(this)}>
                  <option defaultValue>Pick your favorite...</option>
                   {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
                </select>
              </div>
              <button type="submit" id="vote-button" className="btn btn-primary">Vote!</button>
            </form>
          </div>
          <div className="col-10 offset-1 col-md-3 offset-md-1">
            <div className="row">
               <Chart data={poll} />
            </div>
          </div>
        </div>
        <div className="row">
          {deleteAndEditButtons}
        </div>
        <div className="row">
          <div className="col-10 offset-1 col-md-4 offset-md-2">
            <div className="navigateBack">
              <Link to="/">« Back to the index</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PollPage;