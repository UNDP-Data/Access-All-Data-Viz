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
        (graphDiv.current.clientWidth * 9) / 16 < 400
          ? 400
          : (graphDiv.current.clientWidth * 9) / 16,
      );
      setSvgWidth(graphDiv.current.clientWidth);
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
      <h6 className='undp-typography'>Global Greenhouse Gas (GHG) emissions</h6>
      <div ref={graphDiv}>
        {data && svgWidth && svgHeight ? (
          <div>
            <Graph data={data} svgWidth={svgWidth} svgHeight={svgHeight} />
            <div
              className='flex-div gap-03 flex-vert-align-center margin-bottom-00'
              style={{ width: '100%' }}
            >
              <p
                className='undp-typography margin-bottom-00 small-font'
                style={{ color: 'var(--gray-600)' }}
              >
                *The conversion is based on calculation from U.S. Environmental
                Protection Agency
              </p>
            </div>
          </div>
        ) : (
          <div className='undp-loader-container undp-container'>
            <div className='undp-loader' />
          </div>
        )}
      </div>
    </>
  );
}
