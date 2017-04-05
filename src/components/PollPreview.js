import React from 'react';
import { Link } from 'react-router-dom';

export const PollPreview = props => (
  <div className="row poll-preview">
    <div className="col-12 col-md-8 offset-md-4">
      <Link to={`/polls/${props.id}`}>{props.name}
      </Link>
    </div>
  </div>
);

export default PollPreview;