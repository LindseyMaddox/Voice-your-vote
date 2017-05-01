import React from 'react';
import * as d3 from "d3";


export class AltPieChart extends React.Component {
 constructor(props) {
    super(props);
     this.state = {
        colors: []
    };
   }

    componentDidMount(){
        this.getColorScale();
    }
    
    getColorScale(){
        let colors = this.state.colors.slice();
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        for(var i = 0; i< this.props.data.length ; i++){
            colors.push(color(i));
        }
        this.setState({
            colors: colors
        });
    }
   getPieSection(d,i){
 const arcGen = d3.arc()
    .innerRadius(0)
    .outerRadius(100);

return (<g className="arc" key={'g-arc' + i}>
                       <path key={'arc' + i} fill={this.state.colors[i]} stroke={'white'} d={arcGen(d)} onMouseOver={this.showTooltip.bind(this, d)}/>
                 </g>);

 }
 
  showTooltip (d){
     let tooltip =  d3.select("#poll-tooltip");
     tooltip.transition().duration(200).style("opacity", .9); 
     let voteText = "votes";
     if(d.data.votes == 1){
         voteText = "vote";
     }
     tooltip.html("<div><span><strong>" + d.data.name + "</strong></span><div><div>" + d.data.votes + " " + voteText + "</div>"); 
}

   render() {
      var pie = d3.pie()
    .value(function(d) { return d.votes; }) (this.props.data);

    return (
        <div>
        <svg width={this.props.width + 'px'} height={this.props.height + 'px'}>
            <g>
                   <g transform="translate(150,150)">
                      {pie.map((d, i) =>  this.getPieSection(d,i)) }
                 </g>;
            </g>
        </svg>
        <div id="poll-tooltip" className="tooltip" ref="tooltip"></div>
        </div>
    );
  }
}

