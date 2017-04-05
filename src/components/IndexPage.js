import React from 'react';
import { PollPreview } from './PollPreview';

class IndexPage extends React.Component {
  render() {
    let polls = this.props.polls;
    console.log("In index page, polls are " + polls);
    return (
        <div className="home">
         <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div className="row polls-header"><h3>Polls</h3></div>
             <div className="polls-list">      
              {polls.map((poll) => <PollPreview key={poll.id} {...poll} />)}
             </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;