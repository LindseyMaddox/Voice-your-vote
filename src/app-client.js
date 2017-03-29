import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

console.log("app client loaded");
window.onload = () => {
    console.log("app client fired");
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};