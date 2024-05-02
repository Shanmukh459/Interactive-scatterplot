import { csv, scaleLinear, extent } from 'd3';
import { useData } from './useData';

const width = 960
const height = 500

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

function App() {
  const data = useData()
  

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
