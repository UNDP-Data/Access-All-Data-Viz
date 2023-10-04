import { useEffect, useRef, useState } from 'react';
import { ScatterPlot } from './ScatterPlot';

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
  baseYear: number;
  finalYear: number;
  yearIncrement: number;
}

export function Graph(props: Props) {
  const {
    data,
    maxYValue,
    maxXValue,
    axisText,
    baseYear,
    finalYear,
    yearIncrement,
  } = props;
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(
        graphDiv.current.clientHeight < (graphDiv.current.clientWidth * 9) / 16
          ? (graphDiv.current.clientWidth * 9) / 16
          : graphDiv.current.clientHeight,
      );
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <div style={{ flexGrow: 1 }} ref={graphDiv}>
      {svgWidth && svgHeight ? (
        <ScatterPlot
          data={data}
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          maxYValue={maxYValue}
          maxXValue={maxXValue}
          axisText={axisText}
          baseYear={baseYear}
          finalYear={finalYear}
          yearIncrement={yearIncrement}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
