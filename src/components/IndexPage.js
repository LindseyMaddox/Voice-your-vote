import React from 'react';
import { PollPreview } from './PollPreview';
import axios from 'axios';

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
   }
   
    
   loadCommentsFromServer(){
     axios.get('/api/polls/')
      .then(res => {
 this.setState({ polls: res.data });
 })
      .catch(err => {
      console.log(err);
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