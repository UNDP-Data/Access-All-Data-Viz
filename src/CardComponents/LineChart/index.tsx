import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { LineChartGraph } from './Graph';

interface Props {
  data: {
    year: number;
    value: number;
  }[];
  lineColor: string;
  graphTitle: string;
  strokeWidth: number;
  suffix?: string;
  source: string;
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

const StatEl = styled.h3`
  font-size: 4.375rem !important;
  line-height: 0.75 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 2px var(--black) !important;
  color: var(--gray-200) !important;
  letter-spacing: .05rem !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
  font-family: var(--fontFamilyHeadings) !important;
`;

const YearEl = styled.span`
  font-size: 2.5rem !important;
  line-height: 1.09 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 0px var(--black) !important;
  color: var(--gray-500) !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
`;

export function LineChart(props: Props) {
  const {
    data, lineColor, graphTitle, strokeWidth, suffix, source,
  } = props;
  const [mouseOverData, setMouseOverData] = useState<any>(
    data[data.length - 1],
  );

  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(graphDiv.current.clientHeight);
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <StatCardsEl>
      <p className='undp-typography'>{graphTitle}</p>
      <div
        style={{
          flexGrow: 1,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {
          data.length > 1 ? (
            <>
              <h2 className='undp-typography bold margin-bottom-00'>
                {mouseOverData.value}
                {suffix || ''}
                {' '}
                <span style={{ color: 'var(--gray-500)', fontSize: '1.5rem' }}>
                  (
                  {mouseOverData.year}
                  )
                </span>
              </h2>
              <div style={{ flexGrow: 1, width: '100%' }} ref={graphDiv}>
                {svgWidth && svgHeight ? (
                  <>
                    <LineChartGraph
                      data={data}
                      lineColor={lineColor}
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
          ) : (
            <StatEl>
              {data[0].value}
              {' '}
              <YearEl>
                (
                {data[0].year}
                )
              </YearEl>
            </StatEl>
          )
        }
      </div>
      <SourceEl className='margin-top-05'>
        Source:
        {' '}
        {source}
      </SourceEl>
    </StatCardsEl>
  );
}
