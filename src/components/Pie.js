import React from 'react';
import * as d3 from "d3";


export class Pie extends React.Component {
 constructor(props) {
    super(props);
     this.state = {
        colors: [],
        centroids: []
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
    let centroid = arcGen.centroid(d);
    let name = d.data.name;
    if(name.length > 25) {
        name = name.substring(0,25) + "...";
    } 
    const outerRadius = this.props.radius - 50;
   const label = d3.arc().innerRadius(50).outerRadius(outerRadius + 120);
return (<g className="arc" key={'g-arc' + i}>
                       <path key={'arc' + i} fill={this.state.colors[i]} stroke={'white'}
                       d={arcGen(d)}  onMouseOver={this.showTooltip.bind(this, d,centroid)} onMouseOut={this.hideTooltip.bind(this)}/>
                 <rect fill={this.state.colors[i]} transform={"translate(" + 113 + "," + (i * 40 - 80) + ")"} height="10" width="10"></rect><text
        key={'text' + i} 
        stroke={'black'}
        d={label(d)} transform={"translate(" + 130 + "," + (i * 40 - 70) + ")"} fontSize="14px">{name}</text>
                 </g>);

 }
 

  showTooltip (d,centroid){

      let width = 70;
      let height = 30;
      let charFromDefault = d.data.name.length - 10;
       if(charFromDefault > 0){
          width = width + (charFromDefault * 10); 
      } 
      if (charFromDefault <0){
            width = width + (charFromDefault * 2); 
      }
      let rectX = centroid[0] - width/2;
      rectX = rectX.toString();
      let rectY = centroid[1];
      rectY = rectY.toString();

      let textX = centroid[0] - width/2 + 5;
      textX.toString();
            let textY = centroid[1] + 20;
      textY.toString();
     let tooltip =  d3.select("#poll-tooltip");
     tooltip.transition().duration(200).style("opacity", .9); 

     tooltip.html("<rect x='" +rectX + "' y='" + rectY + "' width='" + width + "' height='" + height + "'></rect><text x='" + textX + "'y='"+
     textY + "' >" + d.data.name + ": " + d.data.votes + "</text>");
}
hideTooltip(){
        let tooltip =  d3.select("#poll-tooltip");
       tooltip.transition().duration(1000).style("opacity", 0); 
}

   render() {
      var pie = d3.pie()
    .value(function(d) { return d.votes; }) (this.props.data);

    return (
        <svg width={this.props.width + 'px'} height={this.props.height + 'px'}>
            <g>
                   <g transform="translate(150,150)">
                      {pie.map((d, i) =>  this.getPieSection(d,i)) }
                      <g id="poll-tooltip"></g>
                 </g>
                 
            </g>
        </svg>
    );
  }
}

