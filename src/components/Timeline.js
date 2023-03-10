import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

const TimelineChart = () => {
  const [years, setYears] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [allData, setAllData] = useState([])
  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({
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
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://charter-timeline.vercel.app/api/reservation'
      )
      const data = await response.json()

      const newYears = Array.from(
        new Set(data.map((res) => new Date(res.y[0]).getFullYear()))
      )

      const filteredReservations = data.filter(
        (el) => new Date(el.y[0]).getFullYear() === new Date().getFullYear()
      )
      const filteredSeries = [{ data: filteredReservations }]

      setSeries(filteredSeries)
      setAllData(data)
      setYears(newYears)
      setOptions((prevState) => ({
        ...prevState,
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
      }))
    }

    fetchData()
  }, [])

  function filterYears (selectedYear) {
    const filteredReservations = allData.filter(
      (el) => new Date(el.y[0]).getFullYear() === selectedYear
    )
    const filteredSeries = [{ data: filteredReservations }]

    const newOptions = {
      ...options,
      tooltip: {
        ...options.tooltip,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }
          const root =
            filteredSeries[seriesIndex].data[dataPointIndex]
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

    setSeries(filteredSeries)
    setYear(selectedYear)
    setOptions(newOptions)
  }

  return (
    <div className="app">
      <div className="row">
        {years.length > 1 &&
          years.map((yearOption) => {
            return (
              <button
                key={yearOption}
                className={`${
                  year === yearOption ? 'text-sky-500' : 'text-black'
                } m-2 text-[20px]`}
                onClick={() => filterYears(yearOption)}
              >
                {yearOption}
              </button>
            )
          })}
        <div className="mixed-chart">
          <ReactApexChart
            options={options}
            series={series}
            key={year}
            type="rangeBar"
            height="400"
          />
        </div>
      </div>
    </div>
  )
}

export default TimelineChart
