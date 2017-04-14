import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../modules/Auth';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types'; 
import IndexPage from './IndexPage';

class EditPoll extends React.Component {
   constructor(props, context) {
    super(props, context);
    this.state = {
     pollName: "",
     description: "",
     originalOptionsList: [{"name": ""}],
     additionalOptionsList: [{"name": ""}]
    };
   }

    componentDidMount(){
        this.loadPollFromServer();
    }
   loadPollFromServer(){
       let id = this.props.id;
       let token = Auth.getToken();
        let headers = { 'Authorization': 'bearer: ' + token };
     axios.get('/api/base/polls/' + id, { headers: headers })
      .then(res => { 
        this.setState({
              pollName: res.data[0].name,
              description: res.data[0].description,
              originalOptionsList: res.data[0].options
          });
 })
      .catch(err => {
      console.log(err);
    });
 }
   handleChange(event) {
        const id = event.target.id;
        const index = id.match(/\d+/)[0];
        const options = this.state.additionalOptionsList;
        options[index] = {"name": event.target.value, "votes": 0 };

         this.setState({
           options: options
           });
  }
    handleAddOptions(event){
        event.preventDefault();
        const options = this.state.additionalOptionsList;
        options.push({"name": ""});
        this.setState({
            additionalOptionsList: options,
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.removeEmptyOptions(this.postPollToServer.bind(this));
       
    }
    removeEmptyOptions(callback){
        let newOptions = this.state.additionalOptionsList;
        let originalOptions = this.state.originalOptionsList;
        let filteredList = originalOptions;
        for(var i =0; i < newOptions.length; i++){
            if(newOptions[i].name != ""){
               filteredList.push(newOptions[i]);
            }
        }
        callback(filteredList, this.props.id);
    }
    
    postPollToServer(filteredOptionsList, id){
       let token = Auth.getToken();
        let headers = { 'Authorization': 'bearer: ' + token };
        var that = this;
 axios.post('/api/restricted/polls/' + id + '/edit', {
   'options': filteredOptionsList },{ headers: headers })
   .then(function (response) {
       let pollPath = '/polls/' + id;
       that.context.router.history.push(pollPath);
   })
   .catch(function (error) {
      console.log(error);
   });
    }
  
 
  render() {
      let newOptions = [];
      let optionBlock;
    for(var i = 0; i < this.state.additionalOptionsList.length; i++){
          optionBlock = 
          <div className="form-group">
              <label htmlFor={"poll-options-" + i}> New Option</label>
              <input type="text" className="form-control new-poll-options" placeholder="Option" id={"poll-options-" + i} onChange={this.handleChange.bind(this)} value={this.state.additionalOptionsList[i].name}></input>
          </div>;
         newOptions.push(optionBlock);
     }
    let pollName = this.state.pollName;
    let description = this.state.description;
    let originalOptions = [];

    for(i = 0; i < this.state.originalOptionsList.length; i++){
         for(var prop in this.state.originalOptionsList[i]){
             if(prop == "name"){
                originalOptions.push(this.state.originalOptionsList[i][prop]);
             }
         }
    }

    return (
       <div className="home">
    <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h2>{pollName}</h2>
        </div>
    </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h4 className="poll-description">{description}</h4>
        </div>
    </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
             <form onSubmit={this.handleSubmit.bind(this)}>
                    <h3 className="edit-form-header">Add New Options</h3>
                  <div className="new-options-list">
                       {newOptions.map(option => ( <div>{option}</div>))}
                  </div>
                  <div className="row">
                    <button className="btn btn-default btn-sm add-option-button" onClick={this.handleAddOptions.bind(this)}>Add Another Option</button>
                  </div>
                 <div className="row">Existing Options</div>
                 <ul className="original-options-list">
                        {originalOptions.map(option => ( <li>{option}</li>))}
                 </ul>
                  <div className="row submit-button-row">
                    <button type="submit" id="add-options-submit-button" className="btn btn-primary">Add Options to Poll</button>
                  </div>
            </form>
        </div>
    </div>
  </div>
    );
  }
}

    EditPoll.contextTypes = {
        router: React.PropTypes.object
    };
export default EditPoll;