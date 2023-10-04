import { scaleLinear } from 'd3-scale';
import maxBy from 'lodash.maxby';
import { format } from 'd3-format';
import { IndicatorDataType } from '../../../Types';

interface Props {
  data: IndicatorDataType;
  svgWidth: number;
  svgHeight: number;
}

export function Graph(props: Props) {
  const { data, svgWidth, svgHeight } = props;
  const margin = {
    top: 25,
    bottom: 0,
    left: 0,
    right: 0,
  };
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const minParam = 0;
  const maxParam: number = maxBy(data.yearlyData, d => d.value)?.value
    ? (maxBy(data.yearlyData, d => d.value)?.value as number)
    : 0;

  const y = scaleLinear()
    .domain([minParam, maxParam])
    .range([0, graphHeight])
    .nice();

  return (
    <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      <defs>
        <linearGradient id='ghgGradient'>
          <stop stopColor='#EDEFF0' stopOpacity={0.1} offset='5%' />
          <stop stopColor='#D12800' stopOpacity={0.6} offset='95%' />
        </linearGradient>
      </defs>
      <text
        y={10}
        x={svgWidth / 8}
        style={{
          textAnchor: 'middle',
          fill: 'var(--gray-600)',
          fontFamily: 'var(--fontFamily)',
          fontSize: '0.875rem',
        }}
      >
        1990
      </text>
      <text
        y={10}
        x={svgWidth / 2}
        style={{
          textAnchor: 'middle',
          fill: 'var(--gray-600)',
          fontFamily: 'var(--fontFamily)',
          fontSize: '0.875rem',
        }}
      >
        Change
      </text>
      <text
        y={10}
        x={(7 * svgWidth) / 8}
        style={{
          textAnchor: 'middle',
          fill: 'var(--gray-600)',
          fontFamily: 'var(--fontFamily)',
          fontSize: '0.875rem',
        }}
      >
        {data.yearlyData[data.yearlyData.length - 1].year}
      </text>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <rect
          x={0}
          y={
            graphHeight -
            y(
              data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
                .value,
            )
          }
          height={y(
            data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
              .value,
          )}
          width={svgWidth / 4}
          style={{
            fill: 'var(--gray-300)',
          }}
        />
        <text
          y={
            graphHeight -
            y(
              data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
                .value,
            )
          }
          dy={-10}
          x={svgWidth / 8}
          style={{
            textAnchor: 'middle',
            fill: 'var(--gray-700)',
            fontFamily: 'var(--fontFamily)',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}
        >
          {format('.2s')(
            data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
              .value,
          )}{' '}
          Million T
        </text>
        <rect
          x={(3 * svgWidth) / 4}
          y={graphHeight - y(data.yearlyData[data.yearlyData.length - 1].value)}
          height={y(data.yearlyData[data.yearlyData.length - 1].value)}
          width={svgWidth / 4}
          style={{
            fill: 'var(--dark-red)',
          }}
        />
        <text
          y={graphHeight - y(data.yearlyData[data.yearlyData.length - 1].value)}
          dy={-10}
          x={(7 * svgWidth) / 8}
          style={{
            textAnchor: 'middle',
            fill: 'var(--gray-700)',
            fontFamily: 'var(--fontFamily)',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}
        >
          {format('.2s')(data.yearlyData[data.yearlyData.length - 1].value)}{' '}
          Million T
        </text>
        <polygon
          fill='url(#ghgGradient)'
          points={`${svgWidth / 4},${graphHeight} ${
            (3 * svgWidth) / 4
          },${graphHeight} ${(3 * svgWidth) / 4},${
            graphHeight - y(data.yearlyData[data.yearlyData.length - 1].value)
          } ${svgWidth / 4},${
            graphHeight -
            y(
              data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
                .value,
            )
          }`}
        />
        <g
          transform={`translate(${svgWidth / 2},${
            graphHeight -
            y(
              data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
                .value,
            ) +
            20
          })`}
        >
          <text
            y={0}
            x={0}
            dy={0}
            style={{
              textAnchor: 'middle',
              fill: 'var(--dark-red)',
              fontFamily: 'var(--fontFamily)',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {(
              ((data.yearlyData[data.yearlyData.length - 1].value -
                data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
                  .value) *
                100) /
              data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
                .value
            ).toFixed(1)}
            %
          </text>
          <text
            y={0}
            dy={20}
            x={0}
            style={{
              textAnchor: 'middle',
              fill: 'var(--gray-700)',
              fontFamily: 'var(--fontFamily)',
              fontSize: '1rem',
            }}
          >
            increase in GHG emissions
          </text>
          <text
            y={0}
            dy={70}
            x={0}
            style={{
              textAnchor: 'middle',
              fill: 'var(--gray-700)',
              fontFamily: 'var(--fontFamily)',
              fontSize: '1rem',
            }}
          >
            which is equivalent to
          </text>
          <text
            x={0}
            y={120}
            style={{
              textAnchor: 'middle',
              fill: 'var(--dark-red)',
              fontFamily: 'var(--fontFamily)',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {format('.2s')(
              (data.yearlyData[data.yearlyData.length - 1].value -
                data.yearlyData[data.yearlyData.findIndex(d => d.year === 1990)]
                  .value) /
                0.6,
            ).replace('k', ' Billion')}
          </text>
          <text
            y={0}
            dy={140}
            x={0}
            style={{
              textAnchor: 'middle',
              fill: 'var(--gray-700)',
              fontFamily: 'var(--fontFamily)',
              fontSize: '1rem',
            }}
          >
            extra trees seedlings
          </text>
          <text
            y={0}
            dy={160}
            x={0}
            style={{
              textAnchor: 'middle',
              fill: 'var(--gray-700)',
              fontFamily: 'var(--fontFamily)',
              fontSize: '1rem',
            }}
          >
            grown for 10 years
          </text>
          <text
            y={0}
            dy={180}
            x={0}
            style={{
              textAnchor: 'middle',
              fill: 'var(--gray-700)',
              fontFamily: 'var(--fontFamily)',
              fontSize: '1rem',
            }}
          >
            needed to compensate the increase*
          </text>
        </g>
      </g>
    </svg>
  );
}
