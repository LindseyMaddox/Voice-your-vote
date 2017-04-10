import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AddPoll extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
     pollName: "",
     description: "",
     optionsList: [{"name": ""}, {"name": ""}],
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
       console.log("commented out regex to see if it is causing the error");
   const index = id.match(/\d+/)[0];
        const options = this.state.options;
    options[index] = {"name": event.target.value };

      console.log("index is " + index + " and options[index] is " + options[index]);
   this.setState({
           options: options
         });
  }
    handleAddOptions(event){
        event.preventDefault();
        const options = options.push({"name": ""});
        this.setState({
            options: options,
            numOfPollOptions: this.state.numOfPollOptions + 1
    
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
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
      let options = [];
      for(var i = 0; i < this.state.numOfPollOptions; i++){
            var optionBlock =   <div className="form-group">
      <label htmlFor="newPollOptions">Options</label>
                <input type="text" name="Options" className="form-control" placeholder="Option" 
                 className={"new-poll-options" + [i]} onChange={this.handleOptionsChange.bind(this)} value={this.state.options[i].name}></input>
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
              <button id="create-new-option-button" className="btn btn-default" onClick={this.handleAddOptions.bind(this)}>Add Option</button>
              <button type="submit" id="new-poll-button" className="btn btn-primary">Add Poll</button>
            </form>
        </div>
    </div>
  </div>
    );
  }
}

export default AddPoll;