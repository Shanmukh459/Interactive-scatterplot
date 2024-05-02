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
  bottom: 20,
  left: 40,
};

function App() {
  const data = useData();

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = (d) => d.petal_length;
  const yValue = (d) => d.sepal_width;

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
        <AxisLeft 
          yScale={yScale}
          innerWidth={innerWidth}
        />
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
