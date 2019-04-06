import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
// import Bar from "../../components/bars.jsx";

import { bugs, website, server } from "../../variables/general.jsx";
import Button from "../../components/CustomButtons/Button";
import {
  dailySalesChart,
  emailsSubscriptionChart
} from "../../variables/charts.jsx";
import * as d3 from "d3";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import axios from "axios";
import {token} from '../../variables/general.jsx'
import raw from '../../variables/data.jsx'
let Chartist = require("chartist");

class Dashboard extends React.Component {
  state = {
    value: 0,
    curCount: 1,
    data: {
      data: {
        // labels: [],
        series: [[]]
      },
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: -100,
        high: 300, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      animation: {
        draw: function(data) {
          if (data.type === "line" || data.type === "area") {
            data.element.animate({
              d: {
                begin: 500,
                dur: 10,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.width())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
                // easing: Chartist.Svg.Easing.easeInSine
              }
            });
          } else if (data.type === "point") {
            // data.element.animate({
            //   opacity: {
            //     begin: (data.index + 1) * 80,
            //     dur: 1,
            //     from: 0,
            //     to: 1,
            //     // easing: "ease"
            //   }
            // });
          }
        }
      }
    }
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  //
  setBgChartData = () => {
    // let settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://ml.googleapis.com/v1/projects/sacred-cirrus-236720/models/iotcmpt733:predict",
    //   "method": "POST",
    //   "headers": {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer ya29.GqQB4wa7ugZUP8P_3czocPxVIoUH_j6ViSs8B63HP5TzFu3fd_zyUgR_PIQ_UsHeKsLpkokvyuxhdUrb3UI6irym2COlwCIJWlil-jaCatYRCwci9D5Cp1FDe9Pm4kLTGbG18ElNlEf1X5tVAE0BQF3Yn799Vm03jbGaCVpaiQibo-etUpY8st0HkS4QQc-e48ul-koNaK9wGPKKYby8LP8812gI8nk",
    //     "cache-control": "no-cache"
    //   },
    //   "processData": false,
    //   "data": "{\"signature_name\": \"serving_default\", \"instances\": [{\"X\": [[0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0], [0.0]]}]}"
    // }
    //
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });
    // d3.json('https://jsonplaceholder.typicode.com/posts', {
    //   method:"POST",
    //   body: JSON.stringify({
    //     title: 'Hello',
    //     body: '_d3-fetch_ is it',
    //     userId: 1,
    //     friends: [2,3,4]
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    //   .then(json => {
    //     svg.append("text")
    //       .text(JSON.stringify(json))
    //       .attr("y", 200)
    //       .attr("x", 120)
    //       .attr("font-size", 16)
    //       .attr("font-family", "monospace")
    //
    //   });
    // const token = "ya29.GqQB4waqlZ2LY2XAii5KOkeNdoRLIV6C4bG8ipqiJlMiIvpk7OebmoS-PRWBXLdnvqKO_zWaIfx6lHKmIrsQwpqgABdE2sK6CRLmfmrmLQRhjvI_g-Are1-E4cw9KMrEb1GJwbA23VrKkLspj5jYubByVX3oERROkup5P3k6sSkIzcyui" +
    //   "QxV-qEvrqHUS8XR_LH8s08NKQY74w--evlxVrer0WVf4Wk";
    const config = {
      headers: {
        "Authorization": "Bearer " + token,
        "cache-control": "no-cache"
        // "Access-Control-Allow-Origin": "*",
      }
    };
    let ls = [];
    for (let i = 0; i < 100; i++) {
      let temp = [];
      temp.push(Math.floor((Math.random() * 100) + 1));
      ls.push(temp);
    }
    // console.log(ls);
    const bodyParameters = {
      "signature_name": "serving_default",
      "instances": [{ "X": ls }]
    };

    axios.post(
      "https://ml.googleapis.com/v1/projects/sacred-cirrus-236720/models/iotcmpt733:predict",
      bodyParameters,
      config
    ).then((response) => {

      let ar = response.data.predictions[0].outputs.flat();
      console.log(ar);
      // console.log(ar.flat());
      let temp = this.state.data;
      temp.data.series[0] = ar;
      console.log(temp)
      this.setState({
        data: temp
      });
      console.log(this.state)
    }).catch((error) => {
      console.log(error);
    });
    // d3.json("https://swapi.co/api/people/" + this.state.curCount).then((res) => {
    //   // this.curCount++;
    //   // console.log(this.curCount);
    //   let temp = this.state.data;
    //   // temp.data.labels.push(res.name)
    //   temp.data.series[0].push(res.height);
    //   // console.log(temp);
    //   this.setState({
    //     data: temp,
    //     curCount: this.state.curCount + 1
    //   });
    //   // console.log(this.state);
    //   // d.push(res);
    //   // drawChart(d);
    // }).catch(reason => {
    //   console.error(reason);
    // });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Anomaly Detection</p>
                <h3 className={classes.cardTitle}>
                  9/10
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning/>
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Assign Tickets
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store/>
                </CardIcon>
                <p className={classes.cardCategory}>Machines Status</p>
                <h3 className={classes.cardTitle}>10/10</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange/>
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer/>
                  Tracked this week
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility/>
                </CardIcon>
                <p className={classes.cardCategory}>Workers on site</p>
                <h3 className={classes.cardTitle}>5</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update/>
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
                {/*<div className='grahh'><Bar/></div>*/}
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
                <Button
                  tag="label"
                  className='butt'
                  color="info"
                  id="butts"
                  size="sm"
                  // onClick={() => this.setBgChartData("data1")}
                >click</Button>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime/> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime/> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.data.data}
                  type="Line"
                  options={this.state.data.options}
                  listener={this.state.data.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Live Machine Status</h4>
                <p className={classes.cardCategory}>
                  Live Prediction
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime/> campaign sent 2 days ago
                </div>
                <Button
                  tag="label"
                  className='butt'
                  color="info"
                  id="sentReq"
                  size="sm"
                  onClick={() => this.setBgChartData()}
                >click</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
