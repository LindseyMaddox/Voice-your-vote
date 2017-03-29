import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import PollPreview from './PollPreview';
import polls from '../data/polls';

export default class Home extends React.Component {
  componentDidMount(){
    console.log("home class loaded");
  }
  
  render() {
    return (
      <div className="home">
        <div className="polls-selector">
          {polls.map(pollData => <PollPreview key={pollData.id} {...pollData} />)}
        </div>
      </div>
    );
  }
}