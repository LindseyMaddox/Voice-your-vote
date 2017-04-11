import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPoll extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
     id: this.props.match.params.id,
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
     let id = this.state.id;
     axios.get('/api/polls/' + id)
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
       this.removeEmptyOptions(this.postPollToServer);
       
    }
    removeEmptyOptions(callback){
        let options = this.state.additionalOptionsList;
        let filteredList = [];
        for(var i =0; i < options.length; i++){
            if(options[i].name != ""){
               filteredList.push(options[i]);
            }
        }
        callback(filteredList, this.state.id);
    }
    
    postPollToServer(filteredOptionsList, id){
       axios.post('/api/polls/' + id + '/edit', {
   'options': filteredOptionsList })
   .then(function (response) {
      console.log(response);
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
              <label htmlFor={"poll-options-" + i}>New Option</label>
              <input type="text" className="form-control" placeholder="Option" 
                   className="new-poll-options" id={"poll-options-" + i} onChange={this.handleChange.bind(this)} value={this.state.additionalOptionsList[i].name}></input>
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
            <h1>Edit Poll</h1>
        </div>
    </div>
    <div className="row">
        <div className="col-10 offset-1 col-md-6 offset-md-2 col-lg-4">
             <div className="row">
                <h2 className="poll-name">Poll: {pollName}</h2>
             </div>
             <div className="row">{description}</div>
             <div className="row">Existing Options</div>
             <ul className="original-options-list">
                    {originalOptions.map(option => ( <li>{option}</li>))}
             </ul>
             <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="new-options-list">
                       {newOptions.map(option => ( <div>{option}</div>))}
                  </div>
                  <div className="row">
                    <button id="create-new-option-button" className="btn btn-default btn-sm" onClick={this.handleAddOptions.bind(this)}>Add Option</button>
                  </div>
                  <div className="row submit-button-row">
                    <button type="submit" id="new-poll-button" className="btn btn-primary">Add Options</button>
                  </div>
            </form>
        </div>
    </div>
  </div>
    );
  }
}

export default EditPoll;