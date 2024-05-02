export const Marks = ({ data, xScale, xValue, yScale, yValue }) => (
  data.map((d) => (
    <circle
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={5}
      fill="black"
    ></circle>
  ))
)