import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%",
          },
        },
        xaxis: {
          type: "datetime",
        },
        stroke: {
          width: 0.1,
          curve: "smooth",
          lineCap: "butt",
        },
        fill: {
          type: "solid",
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
      },
    };
  }

  fetchData() {
    fetch(
      `https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation`
    )
      .then((response) => response.json())
      .then((data) => {
        const newSeries = [];
        newSeries.push({
          data: data,
        });
        this.setState({
          series: newSeries,
          options: {
            ...this.state.options,
          },
        });
        console.log(this.state.options);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="rangeBar"
              height="400"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ApexChart;
