interface CoordinatesProps {
  x: number;
  y: number;
  distanceFromCenter: number;
}

interface Props {
  dots: CoordinatesProps[];
  year: number;
  val: number;
  svgWidth: number;
  svgHeight: number;
}

export function AnimatedDotsG(props: Props) {
  const { dots, year, val, svgWidth, svgHeight } = props;
  return (
    <svg
      width={`${svgWidth}px`}
      height={`${svgHeight}px`}
      viewBox='0 0 330 330'
    >
      <g transform='translate(165,165)'>
        {dots.map((d, i) => (
          <circle
            cx={d.x}
            cy={d.y}
            r={3}
            key={i}
            style={{
              fill: i < val ? 'var(--blue-600)' : 'var(--gray-500)',
            }}
          />
        ))}
        <rect
          x={-33}
          y={-15}
          width={66}
          height={30}
          style={{ fill: 'var(--white)', opacity: 0.75 }}
        />
        <text
          x={0}
          y={0}
          dy={7}
          style={{
            fill: 'var(--gray-700)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAnchor: 'middle',
          }}
        >
          {year}
        </text>
      </g>
    </svg>
  );
}
