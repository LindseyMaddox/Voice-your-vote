import React from 'react';
import * as d3 from "d3";

export const AccountChart = (props) => {
    
   var xAxis = d3.axisBottom(x).tickSizeOuter(0);

var y = d3.scaleLinear()
    .range([height, 0]);

var yAxis = d3.axisLeft(y);

// var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

function getValue((d) { return d.votes; }) (props);
    const outerRadius = props.radius - 50;

 const label = d3.arc().innerRadius(50).outerRadius(outerRadius + 120);
 
    function getText(d) { var name  = d.data.name; if(name.length > 25) {
        name = d.data.name.substring(0,25) + "...";
    } return name; }
    function transformAmount(i,x,offset) {
        return "translate(" + x + "," + (i * 40 - offset) + ")";
    }
  
  const arcGen = d3.arc()
    .innerRadius(0)
    .outerRadius(100);
  

 var color = d3.scaleOrdinal(d3.schemeCategory10);
  function getColor(d) {
     return color(d.data.name);
   }


  return (<svg width="600px" height="400px">
            <g transform="translate(150,150)">
    {chart.map((d, i) => {

      return (
                  <g className="rect" key={'g-rect' + i}><path
                    key={'rect' + i}
                    fill="blue"
                    stroke={'white'}
                    d={getValue(d)}/>
                    </g>);
                })}
                </g>
            </svg>
);
 };