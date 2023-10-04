/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import UNDPColorModule from 'undp-viz-colors';
import { CountryGroupDataType, IndicatorDataType } from '../../../Types';
import { Graph } from './Graph';
import { DATALINK } from '../../../Constants';

interface Props {
  dataId: [string, string];
  title?: string;
  footer?: string;
}

export function StackedBarGraph(props: Props) {
  const { dataId, title, footer } = props;
  const [data1, setData1] = useState<undefined | IndicatorDataType>(undefined);
  const [data2, setData2] = useState<undefined | IndicatorDataType>(undefined);
  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}/regionData/WLD.json`)
      .await((err: any, dataFromFile: CountryGroupDataType) => {
        if (err) throw err;
        setData1(
          dataFromFile.indicators[
            dataFromFile.indicators.findIndex(el => el.indicator === dataId[0])
          ],
        );
        setData2(
          dataFromFile.indicators[
            dataFromFile.indicators.findIndex(el => el.indicator === dataId[1])
          ],
        );
      });
  }, []);
  return (
    <>
      {title ? <h5 className='undp-typography'>{title}</h5> : null}
      {data1 && data2 ? (
        <Graph
          data1={data1}
          data2={data2}
          lineColor1={UNDPColorModule.categoricalColors.locationColors.rural}
          lineColor2={UNDPColorModule.categoricalColors.locationColors.urban}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
      {footer ? (
        <div>
          <p
            className='undp-typography margin-bottom-00 italics small-font'
            style={{ color: 'var(--gray-600)' }}
          >
            {footer}
          </p>
        </div>
      ) : null}
    </>
  );
}
