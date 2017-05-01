import React from 'react';
import * as d3 from "d3";


export class Pie extends React.Component {
 constructor(props) {
    super(props);
     this.state = {
        margins: { "marginLeft": 50, "marginRight": 20,"marginTop": 70, "marginBottom": 50 }
    };
   }
   
   getPieSection(d,i){
       console.log("arrived at get pie section with item " + JSON.stringify(d) + " at index " + i);
  const arcGen = d3.arc()
    .innerRadius(0)
    .outerRadius(100);

  let color = d3.scaleOrdinal(d3.schemeCategory10);
 let getColor = function (d) {
     return color(d.data.name);
 };
return <g className="arc" key={'g-arc' + i}>
                      <path key={'arc' + i} fill={getColor(d)} stroke={'white'} d={arcGen(d)} 
                     onMouseOver={this.showTooltip.bind(this,d)}/>
                </g>;
 }
 
  showTooltip (d){
    console.log("test for this, it's " + this);
       let tooltip  = this.refs.tooltip;
         tooltip.transition().duration(200).style("opacity", .9);    
      tooltip.html("<div><span><strong>" + d.data.name + "</strong></span><div><div>" + d.data.votes + " votes</div>")
       .style("left", (d3.event.pageX) + "px")     
       .style("top", (d3.event.pageY - 28) + "px"); 
}
   render() {
      var pie = d3.pie()
    .value(function(d) { return d.votes; }) (this.props.data);

    return (
     <div>
        <g>
               <g transform="translate(150,150)">
                  {pie.map((d, i) => { this.getPieSection(d,i); }) }
             </g>;
        </g>
        <div className="tooltip pie-tooltip" ref="tooltip"></div>
    </div>
    );
  }
}
