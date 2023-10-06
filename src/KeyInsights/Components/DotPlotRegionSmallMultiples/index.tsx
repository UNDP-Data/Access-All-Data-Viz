import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { IndicatorSimplifiedDataType } from '../../../Types';
import { Graph } from './Graph';
import { DATALINK } from '../../../Constants';

interface Props {
  dataId: string;
  title: string;
  regions: string[];
  footer?: string;
}
export function DotPlotSmallMultiples(props: Props) {
  const { dataId, title, regions, footer } = props;
  const [data, setData] = useState<undefined | IndicatorSimplifiedDataType>(
    undefined,
  );
  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}/indicatorData/${dataId}.json`)
      .await((err: any, dataFromFile: IndicatorSimplifiedDataType) => {
        if (err) throw err;
        setData(dataFromFile);
      });
  }, []);
  return (
    <>
      <h6 className='undp-typography'>{title}</h6>
      {data ? (
        <Graph data={data} regions={regions} />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
      {footer ? (
        <p
          className='undp-typography small-font margin-bottom-00'
          style={{ color: 'var(--gray-600)' }}
        >
          {footer}
        </p>
      ) : null}
    </>
  );
}
