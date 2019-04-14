import React from "react";
import * as d3 from "d3";

class BarChart extends React.Component {
  componentDidMount() {
    this.makeChart();
  }

  init() {
    let curCount = 1;
    const getData = () => {
      d3.json("https://swapi.co/api/people/" + curCount).then((res) => {
        curCount++;
        d.push(res);
        drawChart(d);
      }).catch(reason => {
        console.error(reason);
      });
    };
    const w = 500, h = 200;
    const svg = d3.select(".grahh")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);
    document.getElementById("butts").addEventListener("click", getData);
    let d = [];

    function drawChart(res) {
      // const data = [12, 5, 6, 6, 9, 10];
      let data = res;
      console.log(data);


      svg.selectAll(".bar").remove().exit();

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - parseInt(d.height))
        .attr("width", 65)
        .attr("height", (d, i) => parseInt(d.height) * 10)
        .attr("fill", "green");

      svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.name)
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - (parseInt(d.height)) - 3);
    }

    getData();

  }

  makeChart() {

    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
      , width = window.innerWidth - margin.left - margin.right // Use the window's width
      , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
    var n = 100;

// 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
      .domain([0, n - 1]) // input
      .range([0, width]); // output

// 6. Y scale will use the randomly generate number
    var yScale = d3.scaleLinear()
      .domain([0, 1]) // input
      .range([height, 0]); // output

// 7. d3's line generator
    var line = d3.line()
      .x(function(d, i) {
        return xScale(i);
      }) // set the x values for the line generator
      .y(function(d) {
        return yScale(d.y);
      }) // set the y values for the line generator
      .curve(d3.curveMonotoneX); // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = d3.range(n).map(function(d) {
      return { "y": d3.randomUniform(1)() };
    });

// 1. Add the SVG to the page and employ #2
    var svg = d3.select(".grahh").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
    svg.append("path")
      .datum(dataset) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("d", line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint
    svg.selectAll(".dot")
      .data(dataset)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d, i) {
        return xScale(i);
      })
      .attr("cy", function(d) {
        return yScale(d.y);
      })
      .attr("r", 5)
      .on("mouseover", function(a, b, c) {
        console.log(a);
        this.attr("class", "focus");
      })
      .on("mouseout", function() {
      });

    // function animatelines(whichline) {
    //
    //   // Look at what button was clicked
    //   if (whichline == 0) {
    //
    //     // First set all the lines to be invisible
    //     d3.selectAll(".line").style("opacity", "0");
    //
    //     // Then highlight the main line to be fully visable and give it a thicker stroke
    //     d3.select("#line0").style("opacity", "1").style("stroke-width", 4);
    //
    //     // First work our the total length of the line
    //     var totalLength = d3.select("#line0").node().getTotalLength();
    //
    //     d3.selectAll("#line0")
    //     // Set the line pattern to be an long line followed by an equally long gap
    //       .attr("stroke-dasharray", totalLength + " " + totalLength)
    //       // Set the intial starting position so that only the gap is shown by offesetting by the total length of the line
    //       .attr("stroke-dashoffset", totalLength)
    //       // Then the following lines transition the line so that the gap is hidden...
    //       .transition()
    //       .duration(5000)
    //       .ease("quad") //Try linear, quad, bounce... see other examples here - http://bl.ocks.org/hunzy/9929724
    //       .attr("stroke-dashoffset", 0);
    //
    //   } else if (whichline == 1) {
    //
    //     d3.selectAll(".line").style("opacity", "0.5");
    //
    //
    //     //Select All of the lines and process them one by one
    //     d3.selectAll(".line").each(function(d, i) {
    //
    //       // Get the length of each line in turn
    //       var totalLength = d3.select("#line" + i).node().getTotalLength();
    //
    //       d3.selectAll("#line" + i).attr("stroke-dasharray", totalLength + " " + totalLength)
    //         .attr("stroke-dashoffset", totalLength)
    //         .transition()
    //         .duration(5000)
    //         .delay(100 * i)
    //         .ease("quad") //Try linear, quad, bounce... see other examples here - http://bl.ocks.org/hunzy/9929724
    //         .attr("stroke-dashoffset", 0)
    //         .style("stroke-width", 3);
    //     });
    //
    //
    //   }
    // }

    //Draw single line onload
    // animatelines(0);
  }


  render() {
    return <div id={"#555"}></div>;
  }
}

export default BarChart;

