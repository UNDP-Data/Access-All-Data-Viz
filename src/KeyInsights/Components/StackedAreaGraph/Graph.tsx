import { format } from 'd3-format';
import max from 'lodash.max';
import min from 'lodash.min';
import { useEffect, useRef, useState } from 'react';
import { StackedAreaChartGraph } from './StackedAreaChartGraph';
import { IndicatorDataType } from '../../../Types';

interface Props {
  data1: IndicatorDataType;
  data2: IndicatorDataType;
  lineColor1: string;
  lineColor2: string;
}

interface DataFormattedType {
  year: number;
  param1?: number;
  param2?: number;
  total?: number;
}

export function Graph(props: Props) {
  const { data1, data2, lineColor1, lineColor2 } = props;

  const minYear = min([data1.yearlyData[0].year, data2.yearlyData[0].year]);
  const maxYear = max([
    data1.yearlyData[data1.yearlyData.length - 1].year,
    data2.yearlyData[data1.yearlyData.length - 1].year,
  ]);

  const dataFormatted: DataFormattedType[] = [];
  for (let i = minYear as number; i < (maxYear as number) + 1; i += 1) {
    dataFormatted.push({
      year: i,
      param1:
        data1.yearlyData.findIndex(d => d.year === i) !== -1 &&
        data2.yearlyData.findIndex(d => d.year === i) !== -1
          ? +data1.yearlyData[data1.yearlyData.findIndex(d => d.year === i)]
              .value
          : undefined,
      param2:
        data2.yearlyData.findIndex(d => d.year === i) !== -1 &&
        data1.yearlyData.findIndex(d => d.year === i) !== -1
          ? +data2.yearlyData[data2.yearlyData.findIndex(d => d.year === i)]
              .value
          : undefined,
      total:
        data2.yearlyData.findIndex(d => d.year === i) !== -1 &&
        data1.yearlyData.findIndex(d => d.year === i) !== -1
          ? data1.yearlyData[data1.yearlyData.findIndex(d => d.year === i)]
              .value +
            data2.yearlyData[data2.yearlyData.findIndex(d => d.year === i)]
              .value
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
      setSvgHeight(
        graphDiv.current.clientHeight < (graphDiv.current.clientWidth * 9) / 16
          ? (graphDiv.current.clientWidth * 9) / 16
          : graphDiv.current.clientHeight,
      );
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <>
      <div className='flex-div flex-wrap gap-05 margin-top-03'>
        <div className='flex-div gap-03 flex-vert-align-center'>
          <div
            style={{
              width: '1rem',
              height: '1rem',
              backgroundColor: lineColor1,
            }}
          />
          <p
            className='undp-typography margin-bottom-00'
            style={{ fontSize: '1rem' }}
          >
            Rural:{' '}
            <span className='bold'>
              {format('.3s')(mouseOverData.param1).replace('G', 'B')}
            </span>{' '}
            ({mouseOverData.year})
          </p>
        </div>
        <div className='flex-div gap-03 flex-vert-align-center'>
          <div
            style={{
              width: '1rem',
              height: '1rem',
              backgroundColor: lineColor2,
            }}
          />
          <p
            className='undp-typography margin-bottom-00'
            style={{ fontSize: '1rem' }}
          >
            Urban:{' '}
            <span className='bold'>
              {format('.3s')(mouseOverData.param2).replace('G', 'B')}
            </span>{' '}
            ({mouseOverData.year})
          </p>
        </div>
      </div>
      <div style={{ flexGrow: 1 }} ref={graphDiv}>
        {svgWidth && svgHeight ? (
          <StackedAreaChartGraph
            data={dataFormatted}
            lineColor1={lineColor1}
            lineColor2={lineColor2}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            strokeWidth={2}
            setMouseOverData={setMouseOverData}
            mouseOverData={mouseOverData}
          />
        ) : (
          <div className='undp-loader-container undp-container'>
            <div className='undp-loader' />
          </div>
        )}
      </div>
    </>
  );
}
