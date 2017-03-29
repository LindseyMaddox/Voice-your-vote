import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import PollPreview from './components/PollPreview';
import NotFoundPage from './components/NotFoundPage';
const routes = (
    <Router>
       <Route path="/" component={Home}/>
       <Route path="/login" component={Login}/>
       <Route path="poll/:id" component={PollPreview}/>
       <Route path="*" component={NotFoundPage}/>
    </Router>
  );
// const routes = () => (
//   <Router>
//     <div>
//       <ul>
//         <li><Link to="/">Home</Link></li>
        
//       </ul>

//       <hr/>
//       <Route path="/" component={Layout} />
//       <IndexRoute component={Home}/>
//       <Route path="/login" component={Login}/>
//       <Route path="poll/:id" component={PollPreview}/>
//     </div>
//   </Router>
// )


export default routes;