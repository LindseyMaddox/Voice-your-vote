import React from 'react';
import {
  Link
} from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Chart } from './PieChart';
import axios from 'axios';

class PollPage extends React.Component {
    constructor(props) {
      super(props);
    this.state = {
      poll: { "name": "Placeholder Poll", "options": []},
      selection: "",
      message: "",
      id: this.props.match.params.id,
      loaded: false
    };
   }
   
   componentDidMount(){
      this.loadPollFromServer(this.setLoadedTrue.bind(this));
   }
 
    setLoadedTrue(){
      console.log("loaded is going to be true and poll name is " + this.state.poll.name);
       this.setState({
       loaded: true
      });
    }
    
   loadPollFromServer(callback){
     let id = this.state.id;
     axios.get('/api/polls/' + id)
      .then(res => { 
        if(res.data.length != 0){
          console.log("check for error, res.data is " + res.data);
           this.setState({ poll: res.data[0] });
        }
        callback();
 })
      .catch(err => {
      console.log(err);
    });
 }
 
    postPollVoteToServer(){
     let id = this.state.id;
     let selection = this.state.selection;
     axios.post('/api/polls/' + id, {
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
  handleDelete(){
    //probably should confirm first
       let id = this.state.id;
     axios.delete('/api/polls/' + id)
      .then(res => { 
       this.setState({ message: res.data.message });
    })
      .catch(err => {
      console.log(err);
    });
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
          <div className="col-10 offset-1 col-md-4 offset-md-2">
            <button className="btn btn-default" onClick={this.handleDelete.bind(this)}>
              Delete Poll
            </button>
          </div>
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