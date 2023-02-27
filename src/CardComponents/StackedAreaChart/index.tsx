import { format } from 'd3-format';
import max from 'lodash.max';
import min from 'lodash.min';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StackedAreaChartGraph } from './Graph';

interface Props {
  data1: {
    year: number;
    value: number;
  }[];
  data2: {
    year: number;
    value: number;
  }[];
  lineColor1: string;
  lineColor2: string;
  graphTitle: string;
  strokeWidth: number;
  source: string;
  graphDescription?: string;
}

interface DataFormattedType {
  year: number;
  param1?: number;
  param2?: number;
  total?: number;
}

const StatCardsEl = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 22.5rem;
  min-height: 22.5rem;
  background-color: var(--gray-200);
  justify-content: space-between;
  font-size: 1.25rem;
  color: var(--black);
  transition: 300ms all;
  height: auto !important;
`;

const SourceEl = styled.div`
  font-size: 1rem;
  color: var(--gray-500);
`;

export function StackedAreaChart(props: Props) {
  const {
    data1, data2, lineColor1, lineColor2, graphTitle, strokeWidth, source, graphDescription,
  } = props;

  const minYear = min([data1[0].year, data2[0].year]);
  const maxYear = max([data1[data1.length - 1].year, data2[data1.length - 1].year]);

  const dataFormatted: DataFormattedType[] = [];
  for (let i = minYear as number; i < (maxYear as number) + 1; i += 1) {
    dataFormatted.push({
      year: i,
      param1: data1.findIndex((d) => d.year === i) !== -1 && data2.findIndex((d) => d.year === i) !== -1
        ? +data1[data1.findIndex((d) => d.year === i)].value
        : undefined,
      param2:
        data2.findIndex((d) => d.year === i) !== -1 && data1.findIndex((d) => d.year === i) !== -1
          ? +data2[data2.findIndex((d) => d.year === i)].value
          : undefined,
      total:
        data2.findIndex((d) => d.year === i) !== -1 && data1.findIndex((d) => d.year === i) !== -1
          ? data1[data1.findIndex((d) => d.year === i)].value + data2[data2.findIndex((d) => d.year === i)].value
          : undefined,
    });
  }
  const [mouseOverData, setMouseOverData] = useState<any>(
    dataFormatted[dataFormatted.length - 1],
  );

  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(graphDiv.current.clientHeight);
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv?.current]);
  return (
    <StatCardsEl>
      <p className='undp-typography margin-bottom-00'>{graphTitle}</p>
      {
        graphDescription ? <p className='undp-typography small-font margin-bottom-00' style={{ color: 'var(--gray-500)' }}>{graphDescription}</p> : null
      }
      <div className='flex-div flex-wrap gap-05 margin-top-03'>
        <div className='flex-div gap-03 flex-vert-align-center'>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: lineColor1 }} />
          <p className='undp-typography margin-bottom-00'>
            Rural:
            {' '}
            <span className='bold'>{format('.3s')(mouseOverData.param1)}</span>
            {' '}
            (
            {mouseOverData.year}
            )
          </p>
        </div>
        <div className='flex-div gap-03 flex-vert-align-center'>
          <div style={{ width: '1rem', height: '1rem', backgroundColor: lineColor2 }} />
          <p className='undp-typography margin-bottom-00'>
            Urban:
            {' '}
            <span className='bold'>{format('.3s')(mouseOverData.param2)}</span>
            {' '}
            (
            {mouseOverData.year}
            )
          </p>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <>
          <div style={{ flexGrow: 1, width: '100%' }} ref={graphDiv}>
            {svgWidth && svgHeight ? (
              <>
                <StackedAreaChartGraph
                  data={dataFormatted}
                  lineColor1={lineColor1}
                  lineColor2={lineColor2}
                  svgWidth={svgWidth}
                  svgHeight={svgHeight}
                  strokeWidth={strokeWidth}
                  setMouseOverData={setMouseOverData}
                  mouseOverData={mouseOverData}
                />
              </>
            ) : null}
          </div>
        </>
      </div>
      <SourceEl className='margin-top-05'>
        Source:
        {' '}
        {source}
      </SourceEl>
    </StatCardsEl>
  );
}
