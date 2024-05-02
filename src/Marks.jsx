export const Marks = ({ data, xScale, xValue, yScale, yValue, tooltipFormat }) => (
  data.map((d) => (
    <circle 
      className="marks"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={5}
      fill="black"
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ))
)