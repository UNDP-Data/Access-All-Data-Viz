import { line, curveMonotoneX } from 'd3-shape';
import { format } from 'd3-format';
import max from 'lodash.max';
import min from 'lodash.min';
import uniqBy from 'lodash.uniqby';
import { scaleLinear } from 'd3-scale';
import { useEffect, useRef, useState } from 'react';
import { pointer, select } from 'd3-selection';
import { TimeSeriesDataTypeWithStatusCode } from '../../../Types';

interface Props {
  data: TimeSeriesDataTypeWithStatusCode;
  svgWidth: number;
}

export function Graph(props: Props) {
  const { data, svgWidth } = props;
  const [hoverData, setHoverData] = useState<any>(null);
  const svgHeight = (svgWidth * 9) / 16 > 420 ? 420 : (svgWidth * 9) / 16;
  const margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const MouseoverRectRef = useRef(null);

  const values = uniqBy(data.values, 'year').filter(d => d.value !== null);
  const minParam = min(values.map(d => d.value))
    ? (min(values.map(d => d.value)) as number) > 0
      ? 0
      : min(values.map(d => d.value))
    : 0;

  const maxParam = max(values.map(d => d.value))
    ? max(values.map(d => d.value))
    : 0;

  const minYearFiltered: number = min(values.map(d => d.year))
    ? (min(values.map(d => d.year)) as number)
    : 2000;
  const maxYearFiltered: number = max(values.map(d => d.year))
    ? (max(values.map(d => d.year)) as number)
    : 2023;
  const x = scaleLinear()
    .domain([minYearFiltered, maxYearFiltered])
    .range([0, graphWidth]);
  const y = scaleLinear()
    .domain([minParam as number, maxParam as number])
    .range([graphHeight, 0])
    .nice();
  const lineShape1 = line()
    .defined((d: any) => d.value || d.value === 0)
    .x((d: any) => x(d.year))
    .y((d: any) =>
      typeof d.value === 'number'
        ? y(d.value)
        : y(parseInt(d.value.substring(1), 10)),
    )
    .curve(curveMonotoneX);
  const yTicks = y.ticks(5);
  const xTicks = x.ticks(
    maxYearFiltered - minYearFiltered > 10
      ? 10
      : maxYearFiltered - minYearFiltered === 0
      ? 1
      : maxYearFiltered - minYearFiltered,
  );
  useEffect(() => {
    const mousemove = (event: any) => {
      const yr = Math.round(x.invert(pointer(event)[0]));
      const indx = data.values.findIndex(
        d => d.year === Math.round(x.invert(pointer(event)[0])),
      );
      if (indx !== -1) {
        setHoverData({
          year: yr,
          value:
            typeof data.values[indx].value === 'number'
              ? Math.abs(data.values[indx].value) < 1
                ? data.values[indx].value
                : data.values[indx].value > 1000
                ? format('.2s')(data.values[indx].value).replace('G', 'B')
                : format('.3s')(data.values[indx].value)
              : data.values[indx].value,
          label: data.values[indx].label,
        });
      } else {
        setHoverData({
          year: yr,
          value: 'NA',
        });
      }
    };
    select(MouseoverRectRef.current)
      .on('mousemove', mousemove)
      .on('mouseleave', () => {
        setHoverData(null);
      });
  }, [data]);
  return (
    <div>
      {values.length === 0 ? (
        <h6 className='undp-typography'>No Data Available</h6>
      ) : (
        <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <line
              y1={y(0)}
              y2={y(0)}
              x1={0 - margin.left}
              x2={graphWidth + margin.right}
              stroke='#55606E'
              strokeWidth={1}
            />
            <text
              x={0 - margin.left + 2}
              y={y(0)}
              fill='#A9B1B7'
              textAnchor='start'
              fontSize={12}
              dy={-3}
            >
              0
            </text>
            <g>
              {yTicks.map((d, i) => (
                <g key={i}>
                  <line
                    y1={y(d)}
                    y2={y(d)}
                    x1={0 - margin.left}
                    x2={graphWidth + margin.right}
                    stroke='#A9B1B7'
                    strokeWidth={1}
                    strokeDasharray='4,8'
                    opacity={d === 0 ? 0 : 1}
                  />
                  <text
                    x={0 - margin.left + 2}
                    y={y(d)}
                    fill='#A9B1B7'
                    textAnchor='start'
                    fontSize={12}
                    dy={-3}
                    opacity={d === 0 ? 0 : 1}
                  >
                    {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                  </text>
                </g>
              ))}
            </g>
            <g>
              {xTicks.map((d, i) => (
                <g key={i}>
                  <text
                    y={graphHeight}
                    x={x(d)}
                    fill='#A9B1B7'
                    textAnchor='middle'
                    fontSize={12}
                    dy={15}
                  >
                    {d}
                  </text>
                </g>
              ))}
            </g>
            <g>
              <path
                d={lineShape1(values as any) as string}
                fill='none'
                stroke='#006EB5'
                strokeWidth={2}
              />
              {values.map((d, i: number) => (
                <g key={i}>
                  <circle cx={x(d.year)} cy={y(d.value)} r={4} fill='#006EB5' />
                  <text
                    x={x(d.year)}
                    y={y(d.value)}
                    dy={-8}
                    fontSize={
                      values.length > 10 ? (values.length > 20 ? 0 : 11) : 12
                    }
                    textAnchor='middle'
                    fill='#55606E'
                  >
                    {d.label
                      ? d.label
                      : typeof d.value === 'number'
                      ? Math.abs(d.value) === 0
                        ? 0
                        : Math.abs(d.value) < 1
                        ? Math.abs(d.value) < 0.09
                          ? d.value.toFixed(3)
                          : d.value.toFixed(2)
                        : Math.abs(d.value) > 1000
                        ? format('.2s')(d.value).replace('G', 'B')
                        : format('.3s')(d.value)
                      : d.value}
                  </text>
                </g>
              ))}
              {data.methodology ? (
                data.methodology.baseYear ? (
                  <g>
                    <line
                      x1={x(data.methodology.baseYear)}
                      x2={x(data.methodology.baseYear)}
                      y1={0}
                      y2={graphHeight}
                      stroke='#55606E'
                      strokeWidth={1}
                    />
                    <text
                      fill='#232E3D'
                      fontSize={12}
                      y={0}
                      x={x(data.methodology.baseYear)}
                      textAnchor='middle'
                      dy={-10}
                    >
                      {data.methodology.baseYear}
                    </text>
                  </g>
                ) : null
              ) : null}
              {hoverData ? (
                <g>
                  <line
                    x1={x(hoverData.year)}
                    x2={x(hoverData.year)}
                    y1={0}
                    y2={graphHeight}
                    stroke='#55606E'
                    strokeWidth={1}
                  />
                  <rect
                    fill='#EDEFF0'
                    opacity={0.8}
                    y={0}
                    x={
                      x(hoverData.year) > graphWidth / 2
                        ? x(hoverData.year) -
                          (`${hoverData.value}`.length + 6) * 7 -
                          3
                        : x(hoverData.year) + 2
                    }
                    height={20}
                    width={(`${hoverData.value}`.length + 6) * 7}
                  />
                  <text
                    fill='#232E3D'
                    fontSize={12}
                    y={0}
                    x={x(hoverData.year)}
                    textAnchor={
                      x(hoverData.year) > graphWidth / 2 ? 'end' : 'start'
                    }
                    dx={x(hoverData.year) > graphWidth / 2 ? -3 : 3}
                    dy={15}
                  >
                    {hoverData.year}:{' '}
                    {hoverData.label
                      ? hoverData.label
                      : hoverData.value === null
                      ? 'NA'
                      : hoverData.value}
                  </text>
                </g>
              ) : null}
              <rect
                x={0}
                y={0}
                width={graphWidth}
                height={graphHeight}
                fill='#fff'
                opacity={0}
                ref={MouseoverRectRef}
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
