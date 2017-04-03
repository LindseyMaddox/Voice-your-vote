import React from 'react';
import {
  Link
} from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import polls from '../data/polls';
import { Chart } from './PieChart';


const find = (id) => polls.find(p => p.id == id);

export const PollPage = ({ match }) => {
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
        Test for bad parts
        </div>
      </div>
    </div>
  );
};
