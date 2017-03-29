import React from 'react';
import { Route, Link } from 'react-router-dom';

const PollMenuLink = ({ id, to, label }) => (
  <Route path={`/poll/${id}`}>
    {({ match }) => (
      <Link to={to} className={match ? 'active' : ''}>{label}</Link>
    )}
  </Route>
);

export const PollsMenu = ({ polls }) => (
  <nav className="polls-menu">
    {
      polls.map(poll =>
        <PollMenuLink key={poll.id} id={poll.id} to={`/poll/${poll.id}`} label={poll.name} />
      )
    }
  </nav>
);

export default PollsMenu;