import { useEffect, useRef, useState } from 'react';
import { IndicatorSimplifiedDataType } from '../../Types';
import { GraphG } from './GraphG';

interface Props {
  data: IndicatorSimplifiedDataType;
  year: number;
  country: string;
  tabText: string;
  title: string;
  highlightColor: string;
}

export function ComponentCard(props: Props) {
  const { data, year, country, tabText, title, highlightColor } = props;
  const [svgWidth, setSvgWidth] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(graphDiv.current.clientWidth - 32);
    }
  }, [graphDiv]);
  return (
    <div>
      <div
        style={{
          backgroundColor: 'var(--white)',
          padding: 'var(--spacing-05) var(--spacing-05) 0 var(--spacing-05)',
        }}
        ref={graphDiv}
      >
        <h6
          className='undp-typography margin-bottom-03'
          style={{
            color: highlightColor,
            width: 'fit-content',
          }}
        >
          {tabText}
        </h6>
        <hr
          className='undp-style light'
          style={{
            marginLeft: '-1rem',
            marginRight: '-1rem',
          }}
        />
        <p
          className='undp-typography margin-bottom-00 margin-top-05'
          style={{ fontSize: '1rem' }}
        >
          {title}
        </p>
        {svgWidth ? (
          <svg width='100%' viewBox={`0 0 ${svgWidth} 65`}>
            <GraphG
              data={data}
              year={year}
              country={country}
              highlightColor={highlightColor}
              svgWidth={svgWidth}
            />
          </svg>
        ) : (
          <svg width='100%' height={65} />
        )}
      </div>
    </div>
  );
}
