import React from "react";
import * as d3 from "d3";

class BarChart extends React.Component {
  componentDidMount() {
    this.init();
  }

  init () {
    let curCount = 1
    const getData = () => {
      d3.json('https://swapi.co/api/people/' + curCount).then((res) => {
        curCount++
        d.push(res)
        drawChart(d)
      }).catch(reason => {
        console.error(reason)
      })
    }
    const w = 500, h = 200;
    const svg = d3.select(".grahh")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);
    document.getElementById('butts').addEventListener('click', getData)
    let d = []
    function drawChart(res) {
      // const data = [12, 5, 6, 6, 9, 10];
      let data = res
      console.log(data)


      svg.selectAll('.bar').remove().exit()

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - parseInt(d.height))
        .attr("width", 65)
        .attr("height", (d, i) => parseInt(d.height) * 10)
        .attr("fill", "green")

      svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.name)
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - (parseInt(d.height)) - 3)
    }

    getData()

  }


  render(){
    return <div id={"#555"}></div>
  }
}

export default BarChart;

