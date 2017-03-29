import React from 'react';
import { Link } from 'react-router-dom';

export const PollPreview = props => (
  <Link to={`/poll/${props.id}`}>
    <div className="poll-preview">
      <h2 className="name">{props.name}</h2>
    </div>
  </Link>
);

export default PollPreview;