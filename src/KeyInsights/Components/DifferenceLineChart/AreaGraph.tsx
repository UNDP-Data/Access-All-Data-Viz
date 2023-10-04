import { line, area, curveStep } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import maxBy from 'lodash.maxby';
import minBy from 'lodash.minby';
// import { bisector } from 'd3-array';
import { useEffect, useRef, useState } from 'react';
// import { pointer, select } from 'd3-selection';
import { pointer, select } from 'd3-selection';
import { bisector } from 'd3-array';
import { format } from 'd3-format';
import { IndicatorDataType } from '../../../Types';

interface Props {
  data: [IndicatorDataType, IndicatorDataType];
  svgWidth: number;
  svgHeight: number;
  lineColors: [string, string];
  fillColor: [string, string];
  lineTags: [string, string];
  range?: [number, number];
  idSuffix: string;
}

export function AreaGraph(props: Props) {
  const {
    data,
    svgWidth,
    svgHeight,
    lineColors,
    fillColor,
    range,
    lineTags,
    idSuffix,
  } = props;
  const MouseoverRectRef = useRef(null);
  const margin = {
    top: 25,
    bottom: 20,
    left: 0,
    right: 70,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const data1 = data[0].yearlyData;
  const data2 = data[1].yearlyData;

  const dataFormatted = data1.map(d => ({
    year: d.year,
    value1: d.value,
    value2: data2[data2.findIndex(el => el.year === d.year)].value,
  }));

  const [mouseOverData, setMouseOverData] = useState<any>(undefined);

  const bisect = bisector((d: any) => d.year).left;
  const minYearFiltered = minBy(data1, d => d.year)?.year as number;
  const maxYearFiltered = maxBy(data1, d => d.year)?.year as number;

  const x = scaleLinear()
    .domain([minYearFiltered, maxYearFiltered])
    .range([0, graphWidth]);

  const minParam = 0;
  const maxParam =
    (maxBy(dataFormatted, d => d.value1)?.value1 as number) >
    (maxBy(dataFormatted, d => d.value2)?.value2 as number)
      ? (maxBy(dataFormatted, d => d.value1)?.value1 as number)
      : (maxBy(dataFormatted, d => d.value2)?.value2 as number);
  const y = scaleLinear()
    .domain(range || [minParam, maxParam])
    .range([graphHeight, 0])
    .nice();

  const lineShape = line()
    .x((d: any) => x(d.year))
    .y((d: any) => y(d.value))
    .curve(curveStep);

  const mainGraphArea = area()
    .x((d: any) => x(d.year))
    .y1((d: any) => y(d.value1))
    .y0((d: any) => y(d.value2))
    .curve(curveStep);

  const mainGraphArea1 = area()
    .x((d: any) => x(d.year))
    .y1((d: any) => y(d.value))
    .y0(y(0))
    .curve(curveStep);
  const mainGraphArea2 = area()
    .x((d: any) => x(d.year))
    .y1((d: any) => y(d.value))
    .y0(0)
    .curve(curveStep);

  const yTicks = y.ticks(5);
  useEffect(() => {
    const mousemove = (event: any) => {
      const selectedData =
        dataFormatted[bisect(dataFormatted, x.invert(pointer(event)[0]), 1)];
      setMouseOverData(selectedData || dataFormatted[dataFormatted.length - 1]);
    };
    const mouseout = () => {
      setMouseOverData(undefined);
    };
    select(MouseoverRectRef.current)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);
  }, [x, data]);
  return (
    <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <clipPath id={`below${idSuffix}`}>
          <path
            d={mainGraphArea1(data2 as any) as string}
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <clipPath id={`above${idSuffix}`}>
          <path
            d={mainGraphArea2(data2 as any) as string}
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <g>
          <text
            y={graphHeight}
            x={x(minYearFiltered as number)}
            style={{ fill: 'var(--gray-600)' }}
            textAnchor='start'
            fontSize={14}
            dy={15}
          >
            {minYearFiltered}
          </text>
          <text
            y={graphHeight}
            x={x(maxYearFiltered as number)}
            style={{ fill: 'var(--gray-600)' }}
            textAnchor='end'
            fontSize={14}
            dy={15}
          >
            {maxYearFiltered}
          </text>
        </g>
        <path
          d={mainGraphArea(dataFormatted as any) as string}
          clipPath={`url(#above${idSuffix})`}
          style={{
            fill: fillColor[0],
            opacity: 0.3,
          }}
        />
        <path
          d={mainGraphArea(dataFormatted as any) as string}
          clipPath={`url(#below${idSuffix})`}
          style={{
            fill: fillColor[1],
            opacity: 0.3,
          }}
        />
        <g>
          <path
            d={lineShape(data1 as any) as string}
            style={{
              fill: 'none',
              stroke: lineColors[0],
              strokeWidth: 2,
            }}
            shapeRendering='geometricPrecision'
          />
          <path
            d={lineShape(data2 as any) as string}
            style={{
              fill: 'none',
              stroke: lineColors[1],
              strokeWidth: 2,
            }}
            shapeRendering='geometricPrecision'
          />
        </g>
        <text
          x={graphWidth}
          dx={15}
          y={y(data1[data1.length - 1].value)}
          style={{
            fill: lineColors[0],
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontFamily: 'var(--fontFamily)',
          }}
          dy={
            data1[data1.length - 1].value > data2[data2.length - 1].value
              ? 0
              : 7
          }
        >
          {lineTags[0]}
        </text>
        <text
          x={graphWidth}
          dx={15}
          y={y(data2[data2.length - 1].value)}
          style={{
            fill: lineColors[1],
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontFamily: 'var(--fontFamily)',
          }}
          dy={
            data1[data1.length - 1].value > data2[data2.length - 1].value
              ? 5
              : 0
          }
        >
          {lineTags[1]}
        </text>
        {mouseOverData ? (
          <g>
            <text
              x={x(mouseOverData.year)}
              dx={5}
              y={y(mouseOverData.value1)}
              style={{
                fill: lineColors[0],
                fontSize: '0.825rem',
                fontWeight: 'bold',
                fontFamily: 'var(--fontFamily)',
                textAnchor: 'middle',
              }}
              dy={mouseOverData.value1 > mouseOverData.value2 ? -10 : 15}
            >
              {Math.abs(mouseOverData.value1) < 1
                ? mouseOverData.value1
                : format('.3s')(mouseOverData.value1).replace('G', 'B')}
            </text>
            <text
              x={x(mouseOverData.year)}
              dx={5}
              y={y(mouseOverData.value2)}
              style={{
                fill: lineColors[1],
                fontSize: '0.825rem',
                fontWeight: 'bold',
                fontFamily: 'var(--fontFamily)',
                textAnchor: 'middle',
              }}
              dy={mouseOverData.value1 < mouseOverData.value2 ? -5 : 15}
            >
              {Math.abs(mouseOverData.value2) < 1
                ? mouseOverData.value2
                : format('.3s')(mouseOverData.value2).replace('G', 'B')}
            </text>
            {mouseOverData.year ===
            dataFormatted[dataFormatted.length - 1].year ? null : (
              <text
                y={graphHeight}
                x={x(mouseOverData.year)}
                style={{ fill: 'var(--gray-600)' }}
                textAnchor='end'
                fontSize={14}
                dy={15}
              >
                {mouseOverData.year}
              </text>
            )}
          </g>
        ) : null}
        {yTicks.map((d, i) => (
          <g key={i}>
            <line
              y1={y(d)}
              y2={y(d)}
              x1={0}
              x2={graphWidth}
              stroke='#AAA'
              strokeWidth={1}
              strokeDasharray='4,8'
              opacity={d === 0 ? 0 : 1}
            />
            <text
              x={0}
              y={y(d)}
              fill='#666'
              textAnchor='start'
              fontSize={12}
              dy={-5}
              opacity={d === 0 ? 0 : 1}
            >
              {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
            </text>
          </g>
        ))}
        <line
          y1={y(yTicks[0])}
          y2={y(yTicks[0])}
          x1={0}
          x2={graphWidth}
          style={{
            stroke: 'var(--black)',
            strokeWidth: 1,
          }}
        />
      </g>
      <rect
        ref={MouseoverRectRef}
        fill='none'
        pointerEvents='all'
        width={graphWidth}
        height={graphHeight}
      />
    </svg>
  );
}
