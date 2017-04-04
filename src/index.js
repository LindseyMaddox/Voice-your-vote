import React, { Component } from 'react';
import { render } from 'react-dom';

import {Router, Route} from 'react-router';
import Home from './common/home.component.js'
window.onload = () => {
  render(
 <Router>
    <Route path="/" component={Home}/>
  </Router>
      , document.getElementById('root'));
};