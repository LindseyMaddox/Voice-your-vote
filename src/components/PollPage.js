import React from 'react';
import {
  Link
} from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import polls from '../data/polls';
import { Chart } from './PieChart';

const find = (id) => polls.find(p => p.id == id);

const PollPage = ({ match }) => {
    const poll = find(match.params.id);
    if(!poll){
        return <NotFoundPage />;
    }
    var options = [];
        for(var i = 0; i < poll.options.length; i++){
           options.push(poll.options[i]["name"]);
        }

      return (
    <div>
      <div className="poll row">
        <div className="col-10 offset-1 col-md-4 offset-md-2">
          <div className="row">
            <h2 className="poll-name">Poll: {poll.name}</h2>
          </div>
          <section className="description">
            <div className="row">
              <h4 className="poll-description">{poll.description}</h4>
            </div>
          </section>
          <form>
            <div className="form-group">
            <label htmlFor="option-select">Vote for your favorite</label>
              <select id="option-select" className="form-control">
                <option defaultValue>Pick your favorite...</option>
                 {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
              </select>
            </div>
            <button type="submit" id="vote-button" className="btn btn-primary">Vote!</button>
          </form>
        </div>
        <div className="col-10 offset-1 col-md-3 offset-md-1">
          <div className="row">
            <Chart data={poll.options} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-10 offset-1 col-md-4 offset-md-2">
          <div className="navigateBack">
            <Link to="/">« Back to the index</Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PollPage;