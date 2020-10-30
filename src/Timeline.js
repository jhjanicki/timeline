import React, { Component } from "react";
import * as d3 from "d3";


class BarChart extends Component {
  state = {
  };


  static getDerivedStateFromProps(nextProps, prevState) {

  }

  componentDidUpdate() {

  }

  render() {
    const height = 200;
    const width = 1500;
    const margin = {"top":100,"left":100}

    const globalScale = width / 2000;

    const extent = [[0, 0], [width, 0]];
    const scaleExtent = [width / 2000, 2]// Infinity]
    const translateExtent = [[0, 0], [2000, 0]]

    const xDomainMax = d3.max(this.props.epochData, d=> d.end)
    const xScale = d3.scaleLinear().domain([0,xDomainMax]).range([0,width])

    return (
      <svg width={width} height={height}>
        {this.props.epochData.map((d,i) => (
          <rect x={xScale(d.from)} y={height/4} width={xScale(d.duration)} height={height/2} fill={d3.interpolateRainbow(i / 5)} />
        ))}
      </svg>
    );
  }
}

export default BarChart;
