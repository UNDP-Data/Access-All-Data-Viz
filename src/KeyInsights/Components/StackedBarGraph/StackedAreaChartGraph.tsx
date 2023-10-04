import { line, area, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import maxBy from 'lodash.maxby';
import minBy from 'lodash.minby';
import { bisector } from 'd3-array';
import { useEffect, useRef } from 'react';
import { pointer, select } from 'd3-selection';

interface DataFormattedType {
  year: number;
  param1?: number;
  param2?: number;
  total?: number;
}

interface Props {
  data: DataFormattedType[];
  lineColor1: string;
  lineColor2: string;
  svgWidth: number;
  svgHeight: number;
  strokeWidth: number;
  setMouseOverData: (_d: DataFormattedType) => void;
  mouseOverData: DataFormattedType;
}

export function StackedAreaChartGraph(props: Props) {
  const {
    data,
    lineColor1,
    lineColor2,
    svgWidth,
    svgHeight,
    strokeWidth,
    setMouseOverData,
    mouseOverData,
  } = props;
  const MouseoverRectRef = useRef(null);
  const margin = {
    top: 5,
    bottom: 20,
    left: 0,
    right: 5,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const minYear = data[0].year;
  const maxYear = data[data.length - 1].year;

  const minParam = 0;
  const maxParam: number = maxBy(data, d => d.total)?.total
    ? (maxBy(data, d => d.total)?.total as number)
    : 0;

  const dataFiltered = data.filter(d => d.total !== undefined);
  const bisect = bisector((d: any) => d.year).left;
  const minYearFiltered = minBy(dataFiltered, d => d.year)?.year
    ? minBy(dataFiltered, d => d.year)?.year
    : minYear;
  const maxYearFiltered = maxBy(dataFiltered, d => d.year)?.year
    ? maxBy(dataFiltered, d => d.year)?.year
    : maxYear;

  const x = scaleLinear()
    .domain([minYearFiltered as number, maxYearFiltered as number])
    .range([0, graphWidth]);
  const y = scaleLinear()
    .domain([minParam, maxParam])
    .range([graphHeight, 0])
    .nice();

  const lineShape1 = line()
    .defined((d: any) => d.param1 !== undefined)
    .x((d: any) => x(d.year))
    .y((d: any) => y(d.param))
    .curve(curveMonotoneX);

  const lineShape2 = line()
    .defined((d: any) => d.total !== undefined)
    .x((d: any) => x(d.year))
    .y((d: any) => y(d.param))
    .curve(curveMonotoneX);

  const mainGraphArea1 = area()
    .x((d: any) => x(d.year))
    .y1((d: any) => y(d.param1))
    .y0(y(0))
    .curve(curveMonotoneX);
  const mainGraphArea2 = area()
    .x((d: any) => x(d.year))
    .y1((d: any) => y(d.total))
    .y0(y(0))
    .curve(curveMonotoneX);

  useEffect(() => {
    const mousemove = (event: any) => {
      const selectedData = data[bisect(data, x.invert(pointer(event)[0]), 1)];
      setMouseOverData(selectedData || data[data.length - 1]);
    };
    const mouseout = () => {
      setMouseOverData(data[data.length - 1]);
    };
    select(MouseoverRectRef.current)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);
  }, [x, data]);
  return (
    <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      {data.length === 0 ? (
        <text
          x={svgWidth / 2}
          y={svgHeight / 2}
          textAnchor='middle'
          fontSize='2rem'
          fontWeight='bold'
          style={{ fill: 'var(--gray-600)' }}
        >
          No data available
        </text>
      ) : (
        <g transform={`translate(${margin.left},${margin.top})`}>
          <path
            clipPath='url(#clip)'
            d={mainGraphArea2(dataFiltered as any) as string}
            fill={lineColor2}
            opacity={1}
          />
          <path
            clipPath='url(#clip)'
            d={mainGraphArea1(dataFiltered as any) as string}
            fill={lineColor1}
            opacity={1}
          />
          <g>
            {minYearFiltered === maxYearFiltered ? (
              <text
                y={graphHeight}
                x={x(minYearFiltered as number)}
                style={{ fill: 'var(--gray-600)' }}
                textAnchor='middle'
                fontSize={14}
                dy={15}
              >
                {minYearFiltered}
              </text>
            ) : (
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
            )}
          </g>
          <g>
            <path
              d={lineShape1(dataFiltered as any) as string}
              fill='none'
              stroke={lineColor1}
              strokeWidth={strokeWidth}
              shapeRendering='geometricPrecision'
            />
            <path
              d={lineShape2(dataFiltered as any) as string}
              fill='none'
              stroke={lineColor2}
              strokeWidth={strokeWidth}
              shapeRendering='geometricPrecision'
            />
            {mouseOverData.param1 && mouseOverData.total ? (
              <>
                <circle
                  cx={x(mouseOverData.year)}
                  cy={y(mouseOverData.param1)}
                  r={5}
                  style={{ fill: 'var(--gray-700)' }}
                />
                <circle
                  cx={x(mouseOverData.year)}
                  cy={y(mouseOverData.total)}
                  r={5}
                  style={{ fill: 'var(--gray-700)' }}
                />
              </>
            ) : null}
          </g>
        </g>
      )}
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
