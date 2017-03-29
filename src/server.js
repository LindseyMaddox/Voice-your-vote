import express from 'express';
import React from 'react';

var path = require('path');
import { Server } from 'http';


import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

// initialize the server and configure support for ejs templates
const app = express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  let markup;
   const match =  matchPath(req.url, routes, { exact: true } );
console.log("url requested is " + req.url);
  if(!match){
      markup = renderToString(<NotFoundPage/>);
        res.status(404);
  }  else {
    markup = renderToString(<Router context={{}} location={req.url}></Router>);
     res.status(200);
   }
 return res.render('index.ejs', { markup });

    });

  app.listen(process.env.PORT || 8080, function () {
     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);;
  });
  