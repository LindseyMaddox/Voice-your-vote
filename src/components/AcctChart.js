  import React from 'react';
  import * as d3 from "d3";
  import AccountDataSeries from './AccountDataSeries'
   class AcctChart extends React.Component {
     

 constructor(props) {
    super(props);
    this.state = {
        margins: { "marginLeft": 50, "marginRight": 20,"marginTop": 70, "marginBottom": 50 }
    };
  }
      render() {
                       let width = 600;
                       let height = 350;
                       let margins = this.state.margins;
                       let xScaleWidth = width - margins.marginLeft - margins.marginRight;
                       let yScaleHeight = height - margins.marginTop - margins.marginBottom;
    let data = this.props.polls;
    let xScale= d3.scaleBand()
  .range([0,xScaleWidth])
  .padding(.2)
  .domain(data.map(function(d){ return d.name;}));
    let yScale = d3.scaleLinear()
                   .range([yScaleHeight,0])
                   .domain([0,d3.max(data, function(d) { return +d.votes; })]);
                   

    return (
      <svg width={width} height={height}>
          <AccountDataSeries
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            height={height}
            margins={margins}
            data={data}
            />
      </svg>
    );
  }
   }


export default AcctChart;