export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickTextOffset = 15,
  tickSize = 5,
  onHover,
  hoveredValue,
  fadeOpacity,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      key={domainValue}
      transform={`translate(0, ${i * tickSpacing})`}
      className="ticks"
      onMouseEnter={() => onHover(domainValue)}
      onMouseLeave={() => onHover(null)}
      opacity={hoveredValue && hoveredValue !== domainValue ? fadeOpacity : "1"}
    >
      <circle r={tickSize} fill={colorScale(domainValue)}></circle>
      <text x={tickTextOffset} dy="0.32em">
        {domainValue}
      </text>
    </g>
  ))
