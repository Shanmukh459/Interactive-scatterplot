import { csv, scaleLinear, extent } from "d3";
import { useData } from "./useData";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const width = 960;
const height = 500;

const margin = {
  top: 20,
  right: 20,
  bottom: 80,
  left: 80,
};

const xAxisLabelOffset = 40
const yAxisLabelOffset = 50

function App() {
  const data = useData();

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = (d) => d.petal_length;
  const xAxisLabel = "Petal Length"

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width"

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom 
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <text
          x={innerWidth/2}
          y={innerHeight+ xAxisLabelOffset}
          textAnchor="middle"
        >{xAxisLabel}</text>
        <AxisLeft 
          yScale={yScale}
          innerWidth={innerWidth}
        />
        <text
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}
          textAnchor="middle"
        >{yAxisLabel}</text>
        <Marks 
          data={data}
          xScale={xScale}
          xValue={xValue}
          yScale={yScale}
          yValue={yValue} 
        />
      </g>
    </svg>
  );
}

export default App;
