import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import { IndicatorSimplifiedDataType } from '../../Types';

interface Props {
  data: IndicatorSimplifiedDataType;
  year: number;
  country: string;
  highlightColor: string;
  svgWidth: number;
}

export function GraphG(props: Props) {
  const { data, year, country, highlightColor, svgWidth } = props;
  const dataArray = data.countryData
    .filter(d => d.data.findIndex(el => el.year === year) !== -1)
    .map(d => d.data[d.data.findIndex(el => el.year === year)].value);

  const maxValue = Math.max(...dataArray);
  const minValue = Math.min(...dataArray);
  const countryValue =
    data.countryData[
      data.countryData.findIndex(d => d['Alpha-3 code'] === country)
    ].data[
      data.countryData[
        data.countryData.findIndex(d => d['Alpha-3 code'] === country)
      ].data.findIndex(d => d.year === year)
    ].value;

  const scale = scaleLinear()
    .domain([minValue, maxValue])
    .range([5, svgWidth - 5]);
  return (
    <>
      {dataArray.map((d, i) => (
        <circle
          key={i}
          cx={scale(d)}
          cy={30}
          r={5}
          style={{
            fill: 'var(--gray-600)',
            opacity: 0.1,
          }}
        />
      ))}
      <circle
        cx={scale(countryValue)}
        cy={30}
        r={5}
        style={{
          fill: highlightColor,
        }}
      />
      <text
        x={scale(countryValue)}
        y={15}
        style={{
          fill: highlightColor,
          fontFamily: 'var(--fontFamily)',
          fontSize: '1rem',
          fontWeight: 'bold',
          textAnchor:
            scale(countryValue) < 25
              ? 'start'
              : scale(countryValue) > svgWidth - 25
              ? 'end'
              : 'middle',
        }}
      >
        {countryValue > 1000 ? format('.3s')(countryValue) : countryValue}
      </text>
      <text
        x={0}
        y={55}
        style={{
          fill: 'var(--gray-500)',
          fontFamily: 'var(--fontFamily)',
          fontSize: '0.825rem',
          textAnchor: 'start',
        }}
      >
        {minValue > 1000 ? format('.3s')(minValue) : minValue}
      </text>
      <text
        x={svgWidth}
        y={55}
        style={{
          fill: 'var(--gray-500)',
          fontFamily: 'var(--fontFamily)',
          fontSize: '0.825rem',
          textAnchor: 'end',
        }}
      >
        {maxValue > 1000 ? format('.3s')(maxValue) : maxValue}
      </text>
    </>
  );
}

interface HDIGraphProps {
  data: IndicatorSimplifiedDataType;
  year: number;
  country: string;
  svgWidth: number;
}

export function HDIGraphG(props: HDIGraphProps) {
  const { data, year, country, svgWidth } = props;
  const dataArray = data.countryData
    .filter(d => d.data.findIndex(el => el.year === year) !== -1)
    .map(d => d.data[d.data.findIndex(el => el.year === year)].value);
  const countryValue =
    data.countryData[
      data.countryData.findIndex(d => d['Alpha-3 code'] === country)
    ].data[
      data.countryData[
        data.countryData.findIndex(d => d['Alpha-3 code'] === country)
      ].data.findIndex(d => d.year === year)
    ].value;

  const scale = scaleLinear()
    .domain([0.35, 1])
    .range([5, svgWidth - 5])
    .nice();
  return (
    <>
      {dataArray.map((d, i) => (
        <circle
          key={i}
          cx={scale(d)}
          cy={15}
          r={7.5}
          style={{
            fill: 'var(--gray-700)',
            opacity: 0.05,
          }}
        />
      ))}
      <circle
        cx={scale(countryValue)}
        cy={15}
        r={7.5}
        style={{
          fill:
            countryValue < 0.55
              ? 'var(--dark-red)'
              : countryValue < 0.7
              ? 'var(--dark-yellow)'
              : countryValue < 0.8
              ? 'var(--blue-400)'
              : 'var(--blue-700)',
        }}
      />
      <text
        x={scale(countryValue)}
        y={40}
        style={{
          fill:
            countryValue < 0.55
              ? 'var(--dark-red)'
              : countryValue < 0.7
              ? 'var(--dark-yellow)'
              : countryValue < 0.8
              ? 'var(--blue-400)'
              : 'var(--blue-700)',
          fontFamily: 'var(--fontFamily)',
          fontSize: '1rem',
          fontWeight: 'bold',
          textAnchor:
            scale(countryValue) < 25
              ? 'start'
              : scale(countryValue) > svgWidth - 25
              ? 'end'
              : 'middle',
        }}
      >
        {countryValue}
      </text>
    </>
  );
}
