import { useEffect, useState } from 'react'
import { csv, scaleLinear, extent } from 'd3';

const csvUrl =   'https://gist.githubusercontent.com/Shanmukh459/b5d83c8b7334616ceb7d9bfba7ffeb24/raw/c2a883e845ddae11c612c03823ee403e1f4d12ed/Iris.csv';

const width = 960
const height = 500

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    const row = (d) => {
      d.sepal_length = +d.sepal_length
      d.petal_length = +d.petal_length
      d.sepal_width = +d.sepal_width
      d.petal_width = +d.petal_width
      return d
    }
    csv(csvUrl, row).then(setData)
  }, [])

  if(!data) {
    return <h1>Loading...</h1>
  }

  console.log(data)

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xValue = d => d.petal_length
  const yValue = d => d.sepal_width

  const xScale= scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  return (
    <svg height={height} width={width} >
      {data.map((d) => (
        <circle 
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={5}
          fill="black"
        ></circle>
      ))}

    </svg>
  )
}

export default App
