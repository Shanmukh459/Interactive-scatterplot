import { csv, scaleLinear, extent } from "d3";
import { useData } from "./useData";

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

  console.log(data);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = (d) => d.petal_length;
  const yValue = (d) => d.sepal_width;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="black" />
            <text
              x={0}
              y={innerHeight + 5}
              textAnchor="middle"
              dy="0.71em"
            >{tickValue}</text>
          </g>
        ))}
        {yScale.ticks().map((tickValue) => (
          <g transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} stroke="black" />
            <text
              x={-5}
              textAnchor="end"
              dy="0.32em"
            >{tickValue}</text>
          </g>
        ))}
        {data.map((d) => (
          <circle
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={5}
            fill="black"
          ></circle>
        ))}
      </g>
    </svg>
  );
}

export default App;
