import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types'; 

class AddPoll extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
     errors: {},
     genericErrorMessage: false,
     pollName: "",
     description: "",
     optionsList: [{"name": ""}, {"name": ""}],
     filteredOptionsList: []
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
            optionsList: options
    
        });
    }
    handleRemoveOption(event){
      event.preventDefault();
      const options = this.state.optionsList;
      var index = event.target.id.match(/\d+/)[0];
      if(options.length == 1){
          alert("Cannot delete option. A poll must contain at least one option");
      } else {
        options.splice(index,1);
        this.setState({
           optionsList: options
        });  
      }
    }
    handleSubmit(event){
        event.preventDefault();
        this.removeEmptyOptions(this.postPollToServer.bind(this));
       
    }
    removeEmptyOptions(callback){
        let options = this.state.optionsList;
        let filteredList = [];
        for(var i =0; i < options.length; i++){
            if(options[i].name != ""){
               filteredList.push(options[i]);
            }
        }
        callback(filteredList);
    }
    
    postPollToServer(filteredOptionsList){
        var that = this;
        let token = Auth.getToken();
       axios.post('/api/restricted/polls/create', {
            'name': this.state.pollName,
    'description': this.state.description,
   'options': filteredOptionsList },{ headers: {  'Authorization': 'bearer: ' + token } })
  .then(function (response) {
     that.context.router.history.push(response.data.location);
  })
  .catch(function (error) {
      if(error.response.status >= 400 && error.response.status < 500){
            if(error.response.data.errors){
                that.setState({
                    errors: error.response.data.errors
                });
            } else {
                that.setState({
                    genericErrorMessage: true,
                    errors: ""
                });
            }
        }
  });
    }
  render() {
      let options = [];
      for(var i = 0; i < this.state.optionsList.length; i++){
            var optionBlock =   <div className="form-group">
      <label htmlFor="newPollOptions">Options</label>
                <input type="text" name="Options" className="form-control poll-options" placeholder="Option" 
                  id={"new-poll-options" + i} onChange={this.handleOptionsChange.bind(this)} value={this.state.optionsList[i].name}></input>
                 <a href="#"><i className="fa fa-times" id={"poll-remove-options-icon-" +i} aria-hidden="true" onClick={this.handleRemoveOption.bind(this)}></i></a>
              </div>;
          options.push(optionBlock);
      }
       let errors = this.state.errors;
     let errorDiv = "";
     let errorMessage;
        if(this.state.genericErrorMessage){
            errorMessage = "There was a problem saving your poll! Please try again.";
        }
        if(Object.keys(errors).length > 0) {
            errorMessage = <div>
            <p>There was a problem saving your poll. It had these errors: </p>
                            <ul>
                        {Object.values(errors).map(error => ( <li>{error}</li>))}
                        </ul>
                        </div>;
        }
       errorDiv = <div className="errors">
                    {errorMessage}
                 </div>;
    return (
       <div className="home">
    <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h1>Create New Poll</h1>
        </div>
    </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
            {errorDiv}
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
 AddPoll.contextTypes = {
        router: React.PropTypes.object
    };
    
export default AddPoll;