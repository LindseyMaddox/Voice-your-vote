import React from 'react';
import * as d3 from "d3";


export class Pie extends React.Component {
 constructor(props) {
    super(props);
     this.state = {
        colors: [],
        centroids: [],
        data: this.props.data
    };
   }

    componentDidMount(){
        this.getColorScale();
        this.checkDataLength();
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
      const height = 30;
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

  checkDataLength(){
      if(this.state.data.length > 5){
          this.consolidateLongData();
      }
  }
  consolidateLongData(){
     let data = this.state.data.slice();
      let newArr = [];
      let ct = 0;
      while(ct < 4){
        let curMax = this.getCurMax(data);
          //this means the value was 0 or name was "other"
          if(!curMax){
            console.log("there wasn't a current max");
            ct +=1;
          } else {
            newArr.push(curMax);
            let idx =   data.findIndex(x => x.name == curMax["name"]);
            data.splice(idx,1);
            ct +=1;
          }
      }
        let others = this.sumOtherVotes(data);
        newArr.push(others);
        data = newArr;
        this.setState({
            data: data
        });
  }
  getCurMax(data){
    let curMaxAmt = 0;
    let curMaxName = "";
    for(var i = 0; i< data.length; i++){
      //if user has supplied an 'other' option, group its votes with the other low count options
      if(data[i].votes > curMaxAmt && data[i].name != "Other"){
        curMaxAmt = data[i].votes;
        curMaxName = data[i].name;
        let newHsh = {"name": curMaxName, "votes": curMaxAmt};
        return newHsh;
      }
    }
    return null;
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
       let data = this.state.data;
      console.log("data is " + JSON.stringify(data));
      var pie = d3.pie()
    .value(function(d) { return d.votes; }) (data);

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

