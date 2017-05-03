import React from 'react';
import { Pie } from './Pie';


export class Chart extends React.Component {
     
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props != nextProps){
      this.setState({
        data: nextProps.data
      });
    }
  }
  getCurMax(data){
    let curMaxAmt = 0;
    let curMaxName = ""
    for(var i = 0; i< data.length; i++){
      if(data[i].votes > curMaxAmt){
        curMaxAmt = data[i].votes;
         curMaxName = data[i].name;
      }
    }
    let newHsh = {"name": curMaxName, "votes": curMaxAmt};
    return newHsh;
  }
  
  sumOtherVotes(data){
    let voteCount = 0;
    
    data.forEach(function(el){
      voteCount = voteCount + el["votes"];
    });
    let others = { "name": "Other", "votes": voteCount };
    return others;
  }
  
  render() {
      let data = this.state.data.options;
      if(data.length > 5){
        data = data.slice();
        let newArr = [];
        while(newArr.length < 4){
          let curMax = this.getCurMax(data);
          newArr.push(curMax);
        let idx =   data.findIndex(x => x.name == curMax["name"]);
          data.splice(idx,1);
        }
        let others = this.sumOtherVotes(data);
        newArr.push(others);
        data = newArr;
      }
      const width = "450";
      const height = "300";
    const radius = Math.min(width, height) / 2;
    let chart = "Chart loading";
     if(data.length > 0){
       chart =  <Pie data={data} radius={radius}  width={width} height={height} />;
    }
    return (
      <div>
        {chart}
      </div>
    );
  }
}
