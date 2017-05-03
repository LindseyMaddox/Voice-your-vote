import React from 'react';
import { Pie } from './Pie';


export class Chart extends React.Component {
     
  constructor(props){
    super(props);
    this.state = {
        data: this.props.data,
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props != nextProps){
      this.setState({
        data: nextProps.data
      });
    }
  }
  
  render() {
      let data = this.state.data.options;
      var width = "450";
      var height = "300";
    var radius = Math.min(width, height) / 2;
    let chart = "Chart loading";
     if(data.length > 0){
       chart =  <Pie data={data} radius={radius}  width={width} height={height} />;
    }
    return (
      <div>
        {chart}
      </div>
    );
  }
}
