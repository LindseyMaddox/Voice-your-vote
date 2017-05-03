  import React from 'react';
  import * as d3 from 'd3';
export default class AccountDataSeries extends React.Component {

  componentDidMount(){
  this.renderAxes();
  }
  renderAxes(){
      var xNode  = this.refs.xAxis;
  var xAxis = d3.axisBottom(this.props.xScale).tickSizeOuter(0);
   d3.select(xNode).call(xAxis);
   var tickText = d3.selectAll(".tick text");
       tickText.call(this.wrap, this.props.xScale.bandwidth());
   var yNode  = this.refs.yAxis;
  var yAxis = d3.axisRight(this.props.yScale).ticks(6).tickSizeOuter(0);
  d3.select(yNode).call(yAxis);
  d3.selectAll(".tick")
    .each(function (d) {
        if ( d === 0 ) {
            this.remove();
        }
    });
  }

wrap(text, width) {
  console.log("test for wrap with text " + JSON.stringify(text) + " and width " + width);
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

  showTooltip (d,x,y, barHeight, callback){
      const width = 100;
      const tooltipHeight = 30;

      let rectX = x;
      rectX = rectX.toString();
      let rectY = y + barHeight/2;
      rectY = rectY.toString();

      let textX = x + 5;
      textX.toString();
            let textY = y + 20 +barHeight/2;
      textY.toString();
     let tooltip =  d3.select("#account-tooltip");
     tooltip.transition().duration(200).style("opacity", .9); 

     tooltip.html("<rect x='" +rectX + "' y='" + rectY + "' width='" + width + "' height='" + tooltipHeight + "'></rect><text x='" + textX + "'y='"+
     textY + "' >" + d.name + ": " + d.votes + "</text>");
}
hideTooltip(){
        let tooltip =  d3.select("#account-tooltip");
       tooltip.transition().duration(1000).style("opacity", 0); 
}

  render() {
    let bars;
    let data = this.props.data;
    let chartHeight = this.props.height - this.props.margins.marginTop - this.props.margins.marginBottom;
    let chartWidth = this.props.width  - this.props.margins.marginLeft - this.props.margins.marginRight;
    let xScale = this.props.xScale;
   let yScale = this.props.yScale;
    bars = data.map((d, i) => {
      let y = yScale(d.votes);
      let x = xScale(d.name);
      let height = chartHeight - yScale(d.votes); 
   return (
        <g key={'g-rect' + i}>
          <rect className="bar-chart-rectangle" key = {'rect' + i} x={x} height={height}
            y={y}
            width={xScale.bandwidth()} onMouseOver={this.showTooltip.bind(this, d,x,y,height, this.wrapTooltipText)} onMouseOut={this.hideTooltip.bind(this)} />
        </g>
        
      );
    });
    
  return (
      <g transform="translate(50,40)">
        <g>{bars}</g>
        <g className="x-axis" ref="xAxis" transform={"translate(0," + chartHeight + ")"}></g>
        <g className="y-axis" ref="yAxis"></g>
        <text className="chart-title" textAnchor="middle" x="220" y="-20">Number of Votes per Poll</text>
        <text className="y-label" textAnchor="end" y="-20" x ="-50" transform="rotate(-90)">Number of Votes</text>
        <text className="x-label" textAnchor="end" y="330" x ={chartWidth/2}>Poll Name</text>
        <g id="account-tooltip"></g>
      </g>
    );
  }

}