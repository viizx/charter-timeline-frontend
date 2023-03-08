import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts'

class ApexChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      years: [],
      year: new Date().getFullYear(),
      allData: [],
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
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              month: 'MMM'
            }

          }
        },
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
        const newSeries = data
        const filteredSeries = []

        const newYears = new Set(data.map(res => {
          return new Date(res.y[0]).getFullYear()
        }))

        const filteredReservations = data.filter(el => {
          return new Date(el.y[0]).getFullYear() === new Date().getFullYear()
        })
        filteredSeries.push({ data: filteredReservations })

        this.setState({
          series: filteredSeries,
          allData: newSeries,
          years: [...newYears],
          options: {
            ...this.state.options,
            tooltip: {
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const options = {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }
                const root = filteredSeries[seriesIndex].data[dataPointIndex]
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

  filterYears (year) {
    const filteredSeries = []
    const filteredReservations = this.state.allData.filter(el => new Date(el.y[0]).getFullYear() === year)
    filteredSeries.push({ data: filteredReservations })
    this.setState({
      series: filteredSeries,
      year,
      options: {

        // options: {
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const options = {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }
            const root = filteredSeries[seriesIndex].data[dataPointIndex]
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
        },

        ...this.state.options.chart,
        ...this.state.options.legend,
        ...this.state.options.plotOptions,
        ...this.state.options.states,
        ...this.state.options.xaxis
      }

    })
  }

  render () {
    return (
      <div className="app">
        <div className="row">
          {this.state.years.length > 1 && this.state.years.map(year => {
            return <button key={year} className={`${this.state.year === year ? 'text-sky-500' : 'text-black'} m-2 text-[20px]`} onClick={() => this.filterYears(year)}>{year}</button>
          })}
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
