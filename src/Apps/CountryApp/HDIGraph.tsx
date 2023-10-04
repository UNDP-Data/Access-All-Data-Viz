import { useEffect, useRef, useState } from 'react';
import { IndicatorSimplifiedDataType } from '../../Types';
import { HDIGraphG } from './GraphG';

interface Props {
  data: IndicatorSimplifiedDataType;
  year: number;
  country: string;
}

export function HDIGraph(props: Props) {
  const { data, year, country } = props;
  const [svgWidth, setSvgWidth] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <div style={{ width: '100%' }} ref={graphDiv}>
      {svgWidth ? (
        <svg width='100%' viewBox={`0 0 ${svgWidth} 40`}>
          <HDIGraphG
            data={data}
            year={year}
            country={country}
            svgWidth={svgWidth}
          />
        </svg>
      ) : (
        <svg width='100%' height={40} />
      )}
    </div>
  );
}
