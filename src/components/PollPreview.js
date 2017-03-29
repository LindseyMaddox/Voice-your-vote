import React from 'react';
import { Link } from 'react-router-dom';
import polls from '../data/polls';
import PollPage from './PollPage';

export default class PollPreview extends React.Component {
  render() {
    return (
      <Link to={`/poll/${this.props.id}`}>
        <div className="poll-preview">
          Poll name would go here
        </div>
      </Link>
    );
  }
}