import React from 'react';
import { PollPreview } from './PollPreview';
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

class IndexPage extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      polls: [],
      selection: ""
    };
   }
   componentDidMount(){
     this.loadCommentsFromServer();
    //  .then((polls) => {
    //   this.setState({
    //     polls: polls,
    //   });
    //  });
   }
   
   loadCommentsFromServer(){
        fetch('api/polls')
        .then(function(response) {
  if(response.ok) {
   console.log("response is " + JSON.stringify(response));
  }
  throw new Error('Network response was not ok.');
})
.catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});
          
 }
  render() {
    return (
        <div className="home">
         <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div className="row polls-header"><h3>Polls</h3></div>
             <div className="polls-list">      
              {this.state.polls.map((poll) => <PollPreview key={poll.id} {...poll} />)}
             </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;