import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import EditPoll from './EditPoll';
import  PollPage  from './PollPage';

class CheckCorrectUser extends React.Component {
     constructor(props) {
    super(props);
    this.state = {
     allow: false,
    };
}
componentDidMount(){
      let token = Auth.getToken();
        let id = this.props.id;
       let headers = { 'Authorization': 'bearer: ' + token };
     axios.get('/api/restricted/polls/' + id, { headers: headers })
      .then(res => { 
        this.setState({allow:true});
          })
      .catch(err => {
          if(err) throw err;
          if(err.response.status >= 400 && err.res.status < 500){
            alert("You are not authorized to edit this poll");
          }
    });
}
    handleSuccessfulEdit(){
        this.props.updateActionStatusMessage("poll options added");
    }
    render(){
        let id = this.props.id;
        if(this.state.allow){
           return <EditPoll id={id} handleSuccessfulEdit={this.handleSuccessfulEdit.bind(this)} />;
        } else {
            return null;
        }
    }
}

export default CheckCorrectUser;