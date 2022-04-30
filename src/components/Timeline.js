import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import data from "./data.json";

const newData = data;
JSON.stringify(newData);


 class ApexChart extends Component {

        constructor(props) {
          super(props);
        
          this.state = {
          
            series: [],
            options: {
              chart: {
                height: 350,
                type: 'rangeBar'
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  barHeight: '80%'
                }
              },
              xaxis: {
                type: 'datetime'
              },
              stroke: {
                width: 0.1, 
                curve: 'smooth',
                lineCap: 'butt',
              },
              fill: {
                type: 'solid',
                opacity: 0.5
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left'
              }
            },
          
          
          };

          
        };


  fetchData() {
    fetch(`https://port-5000-node-apps-vice889681.codeanyapp.com/api/v1/timelinedata`)
      .then(response => response.json())
      .then(dat => {
        const newSeries = [];
        newSeries.push({
          data: dat.data
        });
        this.setState({
          series: newSeries,
          options: {
            ...this.state.options
          }
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
console.log(newData);
export default ApexChart;