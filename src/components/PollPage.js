import React from 'react';
import { Link } from 'react-router-dom';
import { PollsMenu } from './PollsMenu';

export const PollPage = ({ poll, polls }) => {

     return (
    <div className="poll-full">
      <PollsMenu polls={polls} />
      <div className="poll">
        <div>
          <h2 className="name">{poll.name}</h2>
        </div>
        <section className="description">
        <p>{poll.description}</p>
        </section>
      </div>
      <div className="navigateBack">
        <Link to="/">« Back to the index</Link>
      </div>
    </div>
  );
};

export default PollPage;