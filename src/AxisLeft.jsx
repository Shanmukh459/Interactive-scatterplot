export const AxisLeft = ({ yScale, innerWidth }) => (
  yScale.ticks().map((tickValue) => (
    <g className="ticks" key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth} stroke="black" />
      <text
        x={-5}
        textAnchor="end"
        dy="0.32em"
      >{tickValue}</text>
    </g>
  ))
)