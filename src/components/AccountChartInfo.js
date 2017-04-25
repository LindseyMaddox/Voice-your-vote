  import React from 'react';
  import * as d3 from "d3";
export default class DataSeries extends React.Component {


  render() {
    let bars;
    let pollData = [{"id":"58f27774ad275a1842350129","name":"Greatest Kurt Russell Movie","votes":2},{"id":"58e63d5d734d1d12d73a30e2","name":"Best Band","votes":3},{"id":"58f28692e3a58a1e422f7eea","name":"Caleb's Best Band","votes":1},{"id":"58f0bf80eae9f70b0ddf7a7c","name":"Favorite Character in The Adventures of Kavalier and Clay","votes":5}];

    var barWidth = this.props.width / pollData.length;
    console.log("bar width should be " + barWidth);
    let yScale = this.props.yScale;
    let xScale = this.props.xScale;
    bars = pollData.map((d, i) => {
      let y = yScale(d.votes);
      let height = this.props.height - yScale(d.votes); 
      let width = barWidth-3;
   let getTransform = function(i){
   return "translate(" + i * barWidth + ",0)"; 
};
      return (
        <g transform={getTransform(i)} key={'g-rect' + i}>
          <rect key = {'rect' + i} height={height}
            y={y}
            width={width}
            stroke="lightgreen"/>
        </g>
      );
    });
//}

  return (
      <g>
        <g>{bars}</g>
      </g>
    );
  }

}