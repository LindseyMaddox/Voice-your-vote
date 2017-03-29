import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      <Link to="/">H</Link>
    </header>
    <div className="app-content">{props.children}</div>
    <footer>
      <p>
       Enjoy your pollz!!
      </p>
    </footer>
  </div>
);

export default Layout;