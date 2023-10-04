import { useEffect, useRef, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { Graph } from './Graph';
import { CountryGroupDataType, IndicatorDataType } from '../../../Types';
import { DATALINK } from '../../../Constants';

export function GHGEmissionGraph() {
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const [data, setData] = useState<undefined | IndicatorDataType>(undefined);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(
        graphDiv.current.clientHeight < (graphDiv.current.clientWidth * 9) / 16
          ? (graphDiv.current.clientWidth * 9) / 16
          : graphDiv.current.clientHeight,
      );
      setSvgWidth(
        graphDiv.current.clientWidth < 600 ? 600 : graphDiv.current.clientWidth,
      );
    }
  }, [graphDiv?.current?.clientHeight]);
  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}/regionData/WLD.json`)
      .await((err: any, dataFromFile: CountryGroupDataType) => {
        if (err) throw err;
        const dataForIndicator =
          dataFromFile.indicators[
            dataFromFile.indicators.findIndex(
              d => d.indicator === 'GHG emission',
            )
          ];
        setData(dataForIndicator);
      });
  }, []);
  return (
    <>
      <h5 className='undp-typography'>Global Greenhouse Gas (GHG) emissions</h5>
      <div ref={graphDiv} style={{ flexGrow: 1 }}>
        {data && svgWidth && svgHeight ? (
          <Graph data={data} svgWidth={svgWidth} svgHeight={svgHeight} />
        ) : (
          <div className='undp-loader-container undp-container'>
            <div className='undp-loader' />
          </div>
        )}
      </div>
      <div
        className='flex-div gap-03 flex-vert-align-center margin-bottom-00'
        style={{ width: '100%' }}
      >
        <p
          className='undp-typography margin-bottom-00 italics small-font'
          style={{ color: 'var(--gray-600)' }}
        >
          *The conversion is based on calculation from EPA
        </p>
      </div>
    </>
  );
}
