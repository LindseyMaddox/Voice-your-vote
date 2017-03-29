import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { NotFoundPage } from './NotFoundPage';
import polls from '../data/polls';

const renderIndex = () => <IndexPage polls={polls} />;
const renderPoll = ({ match, staticContext }) => {
  const id = match.params.id;
  const poll = polls.find(current => current.id === id);
  if (!poll) {
    return <NotFoundPage staticContext={staticContext} />;
  }

  return <PollPage poll={poll} polls={polls} />;
};

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" render={renderIndex} />
      <Route exact path="/poll/:id" render={renderPoll} />
      <Route component={NotFoundPage} />
    </Switch>
  </Layout>
);

export default App;