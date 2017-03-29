import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import path from 'path';
import { Server } from 'http';

import { StaticRouter as Router} from 'react-router';
import { App } from './components/App';

// initialize the server and configure support for ejs templates
const app = express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = "totally tubular";
    // markup = ReactDOMServer.renderToString(
    //   <Router location={req.url} context={context}>
    //     <App />
    //   </Router>
    // );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});

  app.listen(process.env.PORT || 8080, function () {
     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);;
  });
  