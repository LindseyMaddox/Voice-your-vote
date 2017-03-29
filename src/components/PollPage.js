import React from 'react';


export default class PollPage extends React.Component {
  render() {
    const id = this.props.params.id;

    return (
    <div>
      <div className="poll-topic">
        Placeholder for poll topic
      </div>
        <div className="navigateBack">
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}