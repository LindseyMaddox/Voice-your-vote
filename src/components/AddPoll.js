import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../modules/Auth';

class AddPoll extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
     pollName: "",
     description: "",
     optionsList: [{"name": ""}, {"name": ""}],
     filteredOptionsList: [],
     numOfPollOptions: 2
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
        const id = event.target.id;
        const index = id.match(/\d+/)[0];
        const options = this.state.optionsList;
        options[index] = {"name": event.target.value, "votes": 0 };

        this.setState({
           options: options
          });
  }
    handleAddOptions(event){
        event.preventDefault();
        const options = this.state.optionsList;
        options.push({"name": ""});
        this.setState({
            optionsList: options,
            numOfPollOptions: this.state.numOfPollOptions + 1
    
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.removeEmptyOptions(this.postPollToServer);
       
    }
    removeEmptyOptions(callback){
        let options = this.state.optionsList;
        let filteredList = [];
        for(var i =0; i < options.length; i++){
            if(options[i].name != ""){
               filteredList.push(options[i]);
            }
        }
        callback(this.state.pollName, this.state.description,filteredList);
    }
    
    postPollToServer(name,description,filteredOptionsList){
        let token = Auth.getToken();
        console.log("token is " + token);
        let headers = { 'Authorization': 'bearer: ' + token };
       axios.post('/api/restricted/polls/create', {
            'name': name,
    'description': description,
   'options': filteredOptionsList },{ headers: headers })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
  render() {
      let options = [];
      for(var i = 0; i < this.state.numOfPollOptions; i++){
            var optionBlock =   <div className="form-group">
      <label htmlFor="newPollOptions">Options</label>
                <input type="text" name="Options" className="form-control poll-options" placeholder="Option" 
                  id={"new-poll-options" + i} onChange={this.handleOptionsChange.bind(this)} value={this.state.optionsList[i].name}></input>
              </div>;
          options.push(optionBlock);
      }
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
              <div className="options-list">
                   {options.map(option => ( <div>{option}</div>))}
              </div>
              <div className="row">
                <button className="btn btn-default btn-sm add-option-button" onClick={this.handleAddOptions.bind(this)}>Add Option</button>
              </div>
              <div className="row">
                 <button type="submit" id="new-poll-button" className="btn btn-primary">Add Poll</button>
              </div>
            </form>
        </div>
    </div>
  </div>
    );
  }
}

export default AddPoll;