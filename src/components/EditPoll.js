import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPoll extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
     id: "",
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
 this.setState({ pollName: res.data[0].name, description: res.data[0].name, originalOptionsList: res.data[0].options });
 })
      .catch(err => {
      console.log(err);
    });
 }
   handleChange(event) {
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
        let id = this.state.id;
       axios.post('/api/polls/' + id + '/edit', {
   'options': filteredOptionsList })
   .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   });
    }
  
    // addOptionsBlock(list,blockList,status){
    //     for(var i = 0; i < list.length; i++){
    //         var optionBlock =   <div className="form-group">
    //   <label htmlFor="newPollOptions">Options</label>;
    //         if(status == "disabled"){
    //              optionBlock += <input type="text" name="Options" className="form-control" placeholder="Option" 
    //              className="new-poll-options" id={"new-poll-options" + i} disabled></input>;
    //         } else  {
    //           optionBlock += <input type="text" name="Options" className="form-control" placeholder="Option" 
    //              className="new-poll-options" id={"new-poll-options" + i} onChange={this.handleOptionsChange.bind(this)} value={this.state.additionalOptionsList[i].name}></input>;
    //         }

    //           optionsBlock +=</div>;
    //       blockList.push(optionBlock);
    // }
    // }
  render() {
      let options = [];

     // this.addOptionsBlock(this.state.additionalOptionsList,options,"active");
      //this.addOptions.Block(this.state.originalOptionsList,options,"disabled")

  var optionBlock;
     for(var i = 0; i < this.state.originalOptionsList.length; i++){
         optionBlock =   
         <div className="form-group">
             <label htmlFor={"poll-options-" + i}>Options</label>;
                <input type="text" name="Options" className="form-control" placeholder="Option" 
                  className="original-poll-options" id={"poll-options" + i} disabled></input>
        </div>;
        options.push(optionBlock);
    }
     for(var item = 0; item < this.state.additionalOptionsList.length; item++){
         optionBlock =   
         <div className="form-group">
             <label htmlFor={"poll-options-" + item}>Options</label>;
                <input type="text" name="Options" className="form-control" placeholder="Option" 
                  className="new-poll-options" id={"poll-options" + item} onChange={this.handleChange.bind(this)} value={this.state.additionalOptionsList[i].name}></input>
        </div>;
        options.push(optionBlock);
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
            <form onSubmit={this.handleSubmit.bind(this)}>
             <div className="form-group">
                <label htmlFor="newPollName">Poll Name</label>
                <input type="text" name="pollName" className="form-control" id="newPollName"  placeholder="Name..." disabled></input>
              </div>
              <div className="form-group">
                <label htmlFor="newPollDescription">Description</label>
                <input type="text" name="Description" className="form-control" id="newPollDescription" placeholder="Description" disabled></input>
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

function addOptionsBlock(list,blockList,status){
    for(var i = 0; i < list.length; i++){
            var optionBlock =   <div className="form-group">
      <label htmlFor="newPollOptions">Options</label>
                <input type="text" name="Options" className="form-control" placeholder="Option" 
                 className="new-poll-options" id={"new-poll-options" + i} onChange={this.handleOptionsChange.bind(this)} value={this.state.optionsList[i].name}></input>
              </div>;
          blockList.push(optionBlock);
    }
}
export default EditPoll;