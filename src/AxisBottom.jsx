export const AxisBottom = ({ xScale, innerHeight}) => (
  xScale.ticks().map((tickValue) => (
    <g className="ticks" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line y2={innerHeight} stroke="black" />
      <text
        x={0}
        y={innerHeight + 5}
        textAnchor="middle"
        dy="0.71em"
      >{tickValue}</text>
    </g>
  ))
)