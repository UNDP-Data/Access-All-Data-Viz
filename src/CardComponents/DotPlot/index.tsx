import styled from 'styled-components';

interface Props {
  value: number;
  year: number;
  size: number;
  graphTitle: string;
}

const StatCardsEl = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 22.5rem;
  background-color: var(--gray-200);
  font-size: 1.25rem;
  color: var(--black);
  transition: 300ms all;
  height: auto !important;
`;

export function DotPlot(props: Props) {
  const {
    value, size, graphTitle, year,
  } = props;
  const margin = {
    top: 0,
    bottom: 0,
    left: 10,
    right: 10,
  };
  const gridSize = (size - margin.left - margin.right) / 10;
  const radius = (gridSize - 6) / 2;
  return (
    <StatCardsEl>
      <h2
        className='undp-typography bold margin-bottom-00'
        style={{ textAlign: 'center' }}
      >
        {value}
        {' '}
        out of 100
      </h2>
      <svg
        style={{ maxWidth: '15rem', margin: 'var(--spacing-05) auto var(--spacing-05) auto' }}
        width='100%'
        viewBox={`0 0 ${size} ${size}`}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {Array.from(Array(100), (_, index) => index + 1).map((d) => (
            <circle
              key={d}
              cx={((d - 1) % 10) * gridSize + gridSize / 2}
              cy={Math.floor((d - 1) / 10) * gridSize + gridSize / 2}
              style={{
                fill:
                  d + 1 <= Math.round(value)
                    ? 'var(--dark-green)'
                    : 'var(--white)',
                stroke:
                  d + 1 <= Math.round(value)
                    ? 'var(--dark-green)'
                    : 'var(--gray-500)',
                strokeWidth: 1,
              }}
              r={radius}
            />
          ))}
        </g>
      </svg>
      <h6 className='undp-typography bold margin-top-03' style={{ textAlign: 'center' }}>
        {graphTitle}
        {' '}
        (
        {year}
        )
      </h6>
    </StatCardsEl>
  );
}