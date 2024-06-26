import { csv, scaleLinear, extent, format, scaleOrdinal } from "d3";
import { useData } from "./useData";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { ColorLegend } from "./ColorLegend";
import { useState } from "react";

const width = 960;
const height = 500;

const margin = {
  top: 20,
  right: 180,
  bottom: 80,
  left: 80,
};

const xAxisLabelOffset = 50
const yAxisLabelOffset = 45

const fadeOpacity = 0.2

function App() {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null)

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = (d) => d.petal_length;
  const xAxisLabel = "Petal Length"

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width"

  const colorValue = d => d.species
  const colorLegendLabel = "Species"

  const circleRadius = 5

  const filteredData = data.filter(d => colorValue(d) === hoveredValue)

  const siFormat = format("0.2s")
  const xAxisTickFormat = (tickValue) => siFormat(tickValue)

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137880', '#8E6C8A'])

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom 
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <text
          className="axis-label"
          x={innerWidth/2}
          y={innerHeight+ xAxisLabelOffset}
          textAnchor="middle"
        >{xAxisLabel}</text>
        <AxisLeft 
          yScale={yScale}
          innerWidth={innerWidth}
        />
        <text
          className="axis-label"
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}
          textAnchor="middle"
        >{yAxisLabel}</text>
        <g
          transform={`translate(${innerWidth+50}, 70)`}
        >
          <text
            x={35}
            y={-25}
            className="axis-label"
            textAnchor="middle"
          >
            {colorLegendLabel}
          </text>
          <ColorLegend 
            colorScale={colorScale}
            tickSpacing={20}
            tickTextOffset={15}
            tickSize={circleRadius}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
        <g opacity={hoveredValue ? fadeOpacity : "1"}>
          <Marks 
            data={data}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue} 
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
        <Marks 
          data={filteredData}
          xScale={xScale}
          xValue={xValue}
          yScale={yScale}
          yValue={yValue} 
          colorScale={colorScale}
          colorValue={colorValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
}

export default App;
