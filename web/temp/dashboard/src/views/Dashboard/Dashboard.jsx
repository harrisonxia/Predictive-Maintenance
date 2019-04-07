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
import { token } from "../../variables/general.jsx";
import { raw, shuffleArray } from "../../variables/data.jsx";

let Chartist = require("chartist");

class Dashboard extends React.Component {
  state = {
    value: 0,
    curCount: 1,
    raw: [],
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
        high: 200,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      animation: {
        draw: function(data) {
          // console.log(data)
          if (data.type === "line" || data.type === "area") {
            console.log(data);
            data.element.animate({
              d: {
                begin: (data.index + 1) * 80,
                dur: 600,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
                //   // easing: Chartist.Svg.Easing.easeInSine
              }
              // opacity: {
              //   // The delay when we like to start the animation
              //   begin: (data.index+1)*80 + 1000,
              //   // Duration of the animation
              //   dur: 500,
              //   // The value where the animation should start
              //   from: 0,
              //   // The value where it should end
              //   to: 1
              // }
            });
          } else if (data.type === "point") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * 20,
                dur: 1,
                from: 0,
                to: 1,
                easing: "ease"
              }
            });
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
    if (this.state.raw.length === 0) {
      shuffleArray(raw);
      let temp = this.state;
      temp.raw = raw;
      this.setState({
        raw: temp.raw
      });
    } else {
      let temp = this.state.raw.splice(-100, 100);
    }

    const config = {
      headers: {
        "Authorization": "Bearer " + token,
        "cache-control": "no-cache"
      }
    };

    let ls = [];
    let tempLast10 = this.state.raw.slice(-100);
    for (let i = 0; i < 100; i++) {
      let temp = [];
      temp.push(tempLast10[i]);
      ls.push(temp);
    }
    // console.log(ls);
    const bodyParameters = {
      "signature_name": "serving_default",
      "instances": [{ "X": ls }]
    };
    // raw = raw.slice(0, raw.length-10)
    axios.post(
      "https://ml.googleapis.com/v1/projects/sacred-cirrus-236720/models/iotcmpt733:predict",
      bodyParameters,
      config
    ).then((response) => {

      let ar = response.data.predictions[0].outputs.flat();
      let max = Math.max(...ar);
      let min = Math.min(...ar);
      console.log(max, min);
      // console.log(ar.flat());
      let temp = this.state.data;
      temp.data.series[0] = ar;
      temp.options.low = min + 20;
      temp.options.high = max + 20;
      // console.log(temp);
      this.setState({
        data: temp
      });
      // console.log(this.state);
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
    // svm.OneClassSVM.fit(this.state.data.data.series)
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
                  <AccessTime/> last update seconds ago.
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
                <h4 className={classes.cardTitle}>Response Time</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 27%
                  </span>{" "}
                  increase in response time on average from last week.
                </p>
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
                <h4 className={classes.cardTitle}>Monthly Issues</h4>
                <p className={classes.cardCategory}>
                  Keep tracks of total issues each month.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime/> updated 10 mins ago.
                </div>
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
                  Employees tickets assignment
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Ticket", "Status"]}
                  tableData={[
                    ["1", "Chuangxin Xia", "#4324", "WIP"],
                    ["2", "Risheng Wang", "#3719", "WIP"],
                    ["3", "Yifan Li", "#4325", "Testing"]
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
