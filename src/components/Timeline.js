import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts'

class ApexChart extends Component {
  constructor (props) {
    super(props)
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
            barHeight: '80%',
            borderRadius: 5
            // borderRadiusApplication: 'around',
            // borderRadiusWhenStacked: 'last',
            // rangeBarOverlap: true,
          }
        },
        states: {
          hover: {
            filter: {
              type: 'darken',
              value: 0.85
            }
          }
        },
        xaxis: {
          type: 'datetime'
        },
        stroke: {
          width: 0.1,
          curve: 'smooth',
          lineCap: 'round'
        },
        // fill: {
        //   type: 'solid',
        //   opacity: 0.8
        // },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Booked', 'Option', 'Available'],
          markers: {
            fillColors: ['#f2dbdb', '#c5d8f1', '#e0e8df']
          }
        }
      }
    }
  }

  fetchData () {
    fetch('https://charter-timeline.vercel.app/api/reservation')
      .then((response) => response.json())
      .then((data) => {
        const newSeries = []
        newSeries.push({
          data
        })
        this.setState({
          series: newSeries,
          options: {
            ...this.state.options,
            tooltip: {
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const options = {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }
                const root = newSeries[seriesIndex].data[dataPointIndex]
                const fromDate = new Date(root.y[0]).toLocaleDateString(
                  'en-UK',
                  options
                )
                const toDate = new Date(root.y[1]).toLocaleDateString(
                  'en-UK',
                  options
                )
                return `<div class="p-2"><span><p><b>From:</b> ${root.from}, ${fromDate}</p><p><b>To:</b> ${root.to}, ${toDate}</p></span></div>`
              }
            }
          }
        })
      })
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
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
    )
  }
}
export default ApexChart
