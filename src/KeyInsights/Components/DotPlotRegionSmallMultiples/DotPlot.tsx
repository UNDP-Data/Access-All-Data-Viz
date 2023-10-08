interface Props {
  region: string;
  year: number;
  value: number;
}

export function DotPlot(props: Props) {
  const { value, region, year } = props;
  const size = 300;
  const gridSize = size / 25;
  const radius = (gridSize - 6) / 2;
  return (
    <div>
      <p className='undp-typography margin-bottom-01'>
        {region.replace(
          'currently Europe & Central Asia (excluding high income)',
          'excluding high income',
        )}{' '}
        <span style={{ color: 'var(--gray-500)' }}>({year})</span>
      </p>
      <p className='undp-typography margin-bottom-01 bold'>
        {Math.round(value)} people out of 100
      </p>
      <svg width='100%' viewBox={`0 0 ${size} ${(size * 4) / 25}`}>
        <g>
          {Array.from(Array(100), (_, index) => index + 1).map(d => (
            <circle
              key={d}
              cx={((d - 1) % 25) * gridSize + gridSize / 2}
              cy={Math.floor((d - 1) / 25) * gridSize + gridSize / 2}
              style={{
                fill:
                  d <= Math.round(value)
                    ? 'var(--dark-green)'
                    : 'var(--gray-200)',
                stroke:
                  d <= Math.round(value)
                    ? 'var(--dark-green)'
                    : 'var(--gray-500)',
                strokeWidth: 1,
              }}
              r={radius}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
