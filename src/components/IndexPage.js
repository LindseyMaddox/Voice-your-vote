import React from 'react';
import { PollPreview } from './PollPreview';
import polls from '../data/polls';

class IndexPage extends React.Component {
  render() {
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