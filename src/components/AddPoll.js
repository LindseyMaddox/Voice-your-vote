import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AddPoll extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
     pollName: "",
     description: "",
     options: ""
    };
   }
   
handleNameChange(event) {
   this.setState({
          pollName: event.target.value
        });
  }
  handleDescriptionChange(event) {
   this.setState({
          description: event.target.value
        });
  }
   handleOptionsChange(event) {
   this.setState({
          options: event.target.value
        });
  }
    handleSubmit(event){
        event.preventDefault();
             console.log("In handle submit event, name is " + this.state.pollName)
   
        this.postPollToServer();
    }
    postPollToServer(){
        let pollName = this.state.pollName;
         let description = this.state.description;
        let options = this.state.options;
        axios.post('/api/polls/create', {
            'name': pollName,
    'description': description,
   'options': options })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
  render() {
    return (
       <div className="home">
    <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h1>Create New Poll</h1>
        </div>
    </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
            <form onSubmit={this.handleSubmit.bind(this)}>
             <div className="form-group">
                <label htmlFor="newPollName">Poll Name</label>
                <input type="text" name="pollName" className="form-control" id="newPollName"  placeholder="Name..." onChange={this.handleNameChange.bind(this)} value={this.state.pollName}></input>
              </div>
              <div className="form-group">
                <label htmlFor="newPollDescription">Description</label>
                <input type="text" name="Description" className="form-control" id="newPollDescription" placeholder="Description" onChange={this.handleDescriptionChange.bind(this)} value={this.state.description}></input>
              </div>
              <div className="form-group">
                <label htmlFor="newPollOptions">Options</label>
                <input type="text" name="Options" className="form-control" id="newPollOptions" placeholder="Option1" onChange={this.handleOptionsChange.bind(this)} value={this.state.options}></input>
              </div>
              <button type="submit" id="new-poll-button" className="btn btn-primary">Add Poll</button>
            </form>
        </div>
        <div>Test: {this.state.pollName} </div>
    </div>
  </div>
    );
  }
}

export default AddPoll;