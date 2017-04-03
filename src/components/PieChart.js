import React from 'react';
import { Pie } from './Pie';


export class Chart extends React.Component {
     
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
    };
  }
  
  
  render() {
      let data = this.state.data;
      var width = "375";
      var height = "300";
    var radius = Math.min(width, height) / 2;
console.log("radius is " + radius + " in the piechart main fx");
    return (
      <div>
        <svg width={width + 'px'} height={height + 'px'}>
           <Pie data={data} radius={radius} />
        </svg>
      </div>
    );
  }
}
