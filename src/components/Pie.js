import React from 'react';
import * as d3 from "d3";

export const Pie = (props) => {

var pie = d3.pie()
    .value(function(d) { return d.votes; }) (props.data);
    const outerRadius = props.radius - 50;

 const label = d3.arc().innerRadius(50).outerRadius(outerRadius + 120);
 
    function getText(d) { return d.data.name; }
    function transformAmount(i,x) {
        return "translate(" + x + "," + (i * 40 -40) + ")";
    }
  const arcGen = d3.arc()
    .innerRadius(0)
    .outerRadius(100);
  

 var color = d3.scaleOrdinal(["#ff9933", "#4d88ff", "#00cc99","#9933ff"]);
  function getColor(d) {
     return color(d.data.name);
   }


  return (<g transform="translate(150,150)">
    {pie.map((d, i) => {

      return (<g className="arc" key={'g-arc' + i}><path
        key={'arc' + i}
        fill={getColor(d)}
        stroke={'white'}
        d={arcGen(d)}/><rect fill={getColor(d)} transform={transformAmount(i,113)} height="10" width="10"></rect><text
        key={'text' + i} 
        stroke={'black'}
        d={label(d)} transform={transformAmount(i,130)} fontSize="14px">{getText(d)}</text></g>);
    })}
    </g>
);
 };