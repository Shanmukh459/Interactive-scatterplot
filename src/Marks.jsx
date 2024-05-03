export const Marks = ({ data, xScale, xValue, yScale, yValue, tooltipFormat, circleRadius }) => (
  data.map((d, i) => (
    <circle 
      key={i}
      className="marks"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
      fill="black"
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ))
)