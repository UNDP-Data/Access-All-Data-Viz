import { useEffect, useRef, useState } from 'react';
import { IndicatorDataType } from '../../../Types';
import { AreaGraph } from './AreaGraph';

interface Props {
  data: [IndicatorDataType, IndicatorDataType];
  lineColors: [string, string];
  fillColor: [string, string];
  lineTags: [string, string];
  range?: [number, number];
  idSuffix: string;
}

export function Graph(props: Props) {
  const { data, lineColors, fillColor, range, lineTags, idSuffix } = props;
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
        <AreaGraph
          data={data}
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          lineColors={lineColors}
          fillColor={fillColor}
          range={range}
          lineTags={lineTags}
          idSuffix={idSuffix}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
