import React from 'react';
import { PollPreview } from './PollPreview';

export const IndexPage = ({ polls }) => (
  <div className="home">
    <div className="polls-selector">
      {polls.map(
       pollData => <PollPreview key={pollData.id} {...pollData} />
      )}
    </div>
  </div>
);

export default IndexPage;