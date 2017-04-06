import React from 'react';
import {
  Link
} from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import polls from '../data/polls';
import { Chart } from './PieChart';
import axios from 'axios';

const find = (id) => polls.find(p => p.id == id);

class PollPage extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      poll: {},
      selection: ""
    };
   }
   componentDidMount(){
     this.loadCommentsFromServer();
   }
   
   loadCommentsFromServer(){
     let id = "58e62644a654bd9f30ace54e";
     axios.get('/api/polls/'+id)
      .then(res => {
 this.setState({ poll: res.data });
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
}
  render(){
    const poll = this.state.poll;
    if(!poll){
        return <NotFoundPage />;
    }
  console.log("poll is " + JSON.stringify(poll) + " and name is " + poll.name);
    var options = [];
         for(var i = 0; i < poll.options.length; i++){
           options.push(poll.options[i]["name"]);
         }
      return (
      <div>
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
               <Chart data={poll.options} />
            </div>
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