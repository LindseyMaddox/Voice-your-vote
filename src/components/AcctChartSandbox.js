  import React from 'react';
  import * as d3 from "d3";
  import DataSeries from './AccountChartInfo'
   class AcctChartSandbox extends React.Component {
     

                   render() {
                       let width = 500;
                       let height = 300;
    let data = this.props.polls;
    let xScale= d3.scaleOrdinal()
                   .domain(["Greatest Kurt Russell Movie", "Best Band", "Caleb's Best Band", "Favorite Character in The Adventures of Kavalier and Clay"])
                   .range([0, width]);

    let yScale = d3.scaleLinear()
                   .range([height,0])
                   .domain([0,d3.max(data, function(d) { return d.votes; })]);

    return (
      <svg width={width} height={height}>
          <DataSeries
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            height={height}
            />
      </svg>
    );
  }
   }


export default AcctChartSandbox;