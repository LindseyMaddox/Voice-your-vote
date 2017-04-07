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
    console.log("test for next props with chart, they're " + JSON.stringify(nextProps));
  }
  
  render() {
      let data = this.state.data.options;
      console.log("test for props, data is " + JSON.stringify(this.props));
      var width = "375";
      var height = "300";
    var radius = Math.min(width, height) / 2;
    console.log("in pie chart, data is " + data);
    let svg;
    if(data.length == 0){
      svg = "Chart loading";
    } else {
      svg =  <svg width={width + 'px'} height={height + 'px'}>
           <Pie data={data} radius={radius} />
        </svg>;
    }
// console.log("radius is " + radius + " in the piechart main fx");
    return (
      <div>
        {svg}
      </div>
    );
  }
}
