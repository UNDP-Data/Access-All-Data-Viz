/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { CountryGroupDataType, IndicatorDataType } from '../../../Types';
import { Graph } from './Graph';
import { DATALINK } from '../../../Constants';

interface Props {
  dataId: [string, string];
  title?: string;
  footer?: string;
  lineColors: [string, string];
  fillColor: [string, string];
  lineTags: [string, string];
  range?: [number, number];
  idSuffix: string;
}

export function DifferenceLineChart(props: Props) {
  const {
    dataId,
    title,
    footer,
    lineColors,
    fillColor,
    range,
    lineTags,
    idSuffix,
  } = props;
  const [data, setData] = useState<
    undefined | [IndicatorDataType, IndicatorDataType]
  >(undefined);
  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}/regionData/WLD.json`)
      .await((err: any, dataFromFile: CountryGroupDataType) => {
        if (err) throw err;
        const dataForIndicator1 =
          dataFromFile.indicators[
            dataFromFile.indicators.findIndex(d => d.indicator === dataId[0])
          ];
        const dataForIndicator2 =
          dataFromFile.indicators[
            dataFromFile.indicators.findIndex(d => d.indicator === dataId[1])
          ];
        setData([dataForIndicator1, dataForIndicator2]);
      });
  }, []);
  return (
    <>
      {title ? <h6 className='undp-typography'>{title}</h6> : null}
      {data ? (
        <Graph
          data={data}
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
      {footer ? (
        <div>
          <p
            className='undp-typography margin-bottom-00 small-font'
            style={{ color: 'var(--gray-600)' }}
          >
            {footer}
          </p>
        </div>
      ) : null}
    </>
  );
}
