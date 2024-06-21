import { useEffect, useRef, useState } from 'react';
import { Graph } from './Graph';

export function GroupedBarChart() {
  const [svgWidth, setSvgWidth] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <div ref={graphDiv} style={{ flexGrow: 1 }}>
      {svgWidth ? <Graph svgWidth={svgWidth} /> : null}
    </div>
  );
}
