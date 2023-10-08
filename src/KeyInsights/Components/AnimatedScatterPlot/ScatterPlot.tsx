import { format } from 'd3-format';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
import UNDPColorModule from 'undp-viz-colors';
import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { interval } from 'd3-timer';
import { CONTINENTS, TRUNCATE_MAX_TEXT_LENGTH } from '../../../Constants';

interface DataFormattedProps {
  countryCode: string;
  group1: string;
  yearlyData: {
    year: number;
    xVal: number;
    yVal: number;
  }[];
}

interface Props {
  data: DataFormattedProps[];
  maxYValue: number;
  maxXValue: number;
  axisText: [string, string];
  svgWidth: number;
  svgHeight: number;
  baseYear: number;
  finalYear: number;
  yearIncrement: number;
}

export function ScatterPlot(props: Props) {
  const {
    data,
    maxYValue,
    maxXValue,
    svgHeight,
    svgWidth,
    axisText,
    baseYear,
    yearIncrement,
    finalYear,
  } = props;
  const graphDiv = useRef<SVGSVGElement>(null);
  const margin = {
    top: 40,
    bottom: 40,
    left: 50,
    right: 20,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, maxXValue])
    .range([0, graphWidth])
    .nice();
  const yScale = scaleLinear()
    .domain([0, maxYValue])
    .range([graphHeight, 0])
    .nice();
  const xTicks = xScale.ticks(5);
  const yTicks = yScale.ticks(5);

  const colorList: string[] = UNDPColorModule.categoricalColors.colors;

  const colorDomain = CONTINENTS;

  const colorScale = scaleOrdinal<string | number, string>()
    .domain(colorDomain)
    .range(colorList)
    .unknown(UNDPColorModule.graphGray);
  let year = baseYear;
  useEffect(() => {
    if (graphDiv.current) {
      const graphSVG = select(graphDiv.current);
      const G = graphSVG
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      G.selectAll('.points')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'points')
        .attr('cx', (d: DataFormattedProps) =>
          d.yearlyData.findIndex(el => el.year === year) !== -1
            ? xScale(
                d.yearlyData[d.yearlyData.findIndex(el => el.year === year)]
                  .xVal,
              )
            : 0,
        )
        .attr('cy', (d: DataFormattedProps) =>
          d.yearlyData.findIndex(el => el.year === year) !== -1
            ? yScale(
                d.yearlyData[d.yearlyData.findIndex(el => el.year === year)]
                  .yVal,
              )
            : 0,
        )
        .attr('opacity', (d: DataFormattedProps) =>
          d.yearlyData.findIndex(el => el.year === year) !== -1 ? 1 : 0,
        )
        .attr('r', (d: DataFormattedProps) =>
          d.yearlyData.findIndex(el => el.year === year) !== -1 ? 5 : 0,
        )
        .attr('fill', (d: DataFormattedProps) => colorScale(d.group1));

      const floating = () => {
        G.selectAll('.points')
          .attr('opacity', (d: any) =>
            d.yearlyData.findIndex((el: any) => el.year === year) !== -1
              ? 1
              : 0,
          )
          .transition()
          .attr('cx', (d: any) =>
            d.yearlyData.findIndex((el: any) => el.year === year) !== -1
              ? xScale(
                  d.yearlyData[
                    d.yearlyData.findIndex((el: any) => el.year === year)
                  ].xVal,
                )
              : 0,
          )
          .attr('cy', (d: any) =>
            d.yearlyData.findIndex((el: any) => el.year === year) !== -1
              ? yScale(
                  d.yearlyData[
                    d.yearlyData.findIndex((el: any) => el.year === year)
                  ].yVal,
                )
              : 0,
          )
          .attr('r', (d: any) =>
            d.yearlyData.findIndex((el: any) => el.year === year) !== -1
              ? 5
              : 0,
          );
        graphSVG.selectAll('.yearText').text(year);
        year =
          year + yearIncrement > finalYear ? baseYear : year + yearIncrement;
      };

      interval(floating, 1000);
    }
  }, [graphDiv]);
  return (
    <div style={{ flexGrow: 1 }}>
      <svg
        width='100%'
        height='100%'
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ref={graphDiv}
      >
        <g transform='translate(50,-20)'>
          {colorDomain.map((d, i) => (
            <g
              transform='translate(0,20)'
              key={i}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={(i * (graphWidth - 50)) / colorDomain.length + 1}
                y={1}
                width={(graphWidth - 50) / colorDomain.length - 2}
                height={8}
                fill={colorList[i]}
              />
              <text
                x={
                  (i * (graphWidth - 50)) / colorDomain.length +
                  (graphWidth - 50) / 2 / colorDomain.length
                }
                y={25}
                textAnchor='middle'
                fontSize={12}
                fill='#212121'
              >
                {d}
              </text>
            </g>
          ))}
          <g transform='translate(0,20)'>
            <rect
              x={graphWidth - 40}
              y={1}
              width={40}
              height={8}
              fill={UNDPColorModule.graphGray}
              stroke={UNDPColorModule.graphGray}
            />
            <text
              x={graphWidth - 20}
              y={25}
              textAnchor='middle'
              fontSize={12}
              fill={UNDPColorModule.graphGray}
            >
              NA
            </text>
          </g>
        </g>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g>
            {yTicks.map((d, i) => (
              <g key={i} opacity={d === 0 ? 0 : 1}>
                <line
                  x1={0}
                  x2={graphWidth}
                  y1={yScale(d)}
                  y2={yScale(d)}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                />
                <text
                  x={0}
                  y={yScale(d)}
                  fill={UNDPColorModule.graphGray}
                  textAnchor='end'
                  fontSize={12}
                  dy={4}
                  dx={-3}
                >
                  {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                </text>
              </g>
            ))}
            <line
              x1={0}
              x2={graphWidth}
              y1={yScale(0)}
              y2={yScale(0)}
              stroke={UNDPColorModule.graphGray}
              strokeWidth={1}
            />
            <text
              x={0}
              y={yScale(0)}
              fill={UNDPColorModule.graphGray}
              textAnchor='end'
              fontSize={12}
              dy={4}
              dx={-3}
            >
              0
            </text>
            <text
              transform={`translate(-30, ${graphHeight / 2}) rotate(-90)`}
              fill='#212121'
              textAnchor='middle'
              fontSize={12}
            >
              {axisText[1].length > TRUNCATE_MAX_TEXT_LENGTH
                ? `${axisText[1].substring(0, TRUNCATE_MAX_TEXT_LENGTH)}...`
                : axisText[1]}
            </text>
          </g>
          <g>
            {xTicks.map((d, i) => (
              <g key={i} opacity={d === 0 ? 0 : 1}>
                <line
                  y1={0}
                  y2={graphHeight}
                  x1={xScale(d)}
                  x2={xScale(d)}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                />
                <text
                  x={xScale(d)}
                  y={graphHeight}
                  fill={UNDPColorModule.graphGray}
                  textAnchor='middle'
                  fontSize={12}
                  dy={12}
                >
                  {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                </text>
              </g>
            ))}
            <line
              y1={0}
              y2={graphHeight}
              x1={xScale(0)}
              x2={xScale(0)}
              stroke={UNDPColorModule.graphGray}
              strokeWidth={1}
            />
            <text
              x={xScale(0)}
              y={graphHeight}
              fill={UNDPColorModule.graphGray}
              textAnchor='middle'
              fontSize={12}
              dy={15}
            >
              {0}
            </text>
            <text
              transform={`translate(${graphWidth / 2}, ${graphHeight})`}
              fill='#212121'
              textAnchor='middle'
              fontSize={12}
              dy={30}
            >
              {axisText[0].length > TRUNCATE_MAX_TEXT_LENGTH
                ? `${axisText[0].substring(0, TRUNCATE_MAX_TEXT_LENGTH)}...`
                : axisText[0]}
            </text>
          </g>
        </g>
        <text
          x={graphWidth / 2}
          y={graphHeight / 2}
          className='yearText'
          dy={100}
          fill={UNDPColorModule.graphGray}
          style={{
            fill: 'var(--gray-500)',
            opacity: 0.2,
            textAnchor: 'middle',
            fontFamily: 'var(--fontFamily)',
            fontWeight: 'bold',
            fontSize: '10rem',
          }}
        >
          2026
        </text>
      </svg>
    </div>
  );
}
