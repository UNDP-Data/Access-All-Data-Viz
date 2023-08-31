import { useContext } from 'react';
import domtoimage from 'dom-to-image';
import { Image } from 'lucide-react';
import styled from 'styled-components';
import {
  CtxDataType,
  CountryGroupDataType,
  IndicatorMetaDataType,
} from '../Types';
import Context from '../Context/Context';
import { DataSourceListMinifiedItem } from '../Components/DataSourceListItem';

interface Props {
  indicators: IndicatorMetaDataType[];
  data: CountryGroupDataType[];
}

const Button = styled.button`
  background-color: var(--gray-200);
  padding: var(--spacing-07);
  width: 100%;
  font-size: 1rem;
  border: 0;
  text-align: left;
  display: flex;
  gap: var(--spacing-05);
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--gray-300);
  }
`;

export function DownloadModal(props: Props) {
  const { indicators, data } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    colorIndicator,
  } = useContext(Context) as CtxDataType;

  const xIndicatorMetaData =
    indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)];

  const yIndicatorMetaData =
    indicators[indicators.findIndex(d => d.DataKey === yAxisIndicator)];

  const sizeIndicatorMetaData =
    indicators[indicators.findIndex(d => d.DataKey === sizeIndicator)];

  const colorIndicatorMetaData =
    indicators[indicators.findIndex(d => d.DataKey === colorIndicator)];

  return (
    <div className='undp-scrollbar'>
      <h5 className='undp-typography bold margin-top-07'>Graph</h5>
      <Button
        type='button'
        onClick={() => {
          const node = document.getElementById('graph-node') as HTMLElement;
          domtoimage
            .toPng(node, { height: node.scrollHeight })
            .then((dataUrl: any) => {
              const link = document.createElement('a');
              link.download = 'graph.png';
              link.href = dataUrl;
              link.click();
            });
        }}
      >
        <Image size={48} strokeWidth={1} color='var(--gray-700)' />
        <p
          className='margin-bottom-00 undp-typography'
          style={{ lineHeight: '1.25rem' }}
        >
          Download the chart as Image
          <br />
          <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
            (suitable for most uses, widely compatible)
          </span>
        </p>
      </Button>
      <hr className='undp-style margin-top-09 margin-bottom-09' />
      <h5 className='undp-typography bold'>Data</h5>
      <DataSourceListMinifiedItem
        indicatorData={xIndicatorMetaData}
        data={data}
      />
      {graphType !== 'barGraph' && yIndicatorMetaData ? (
        <DataSourceListMinifiedItem
          indicatorData={yIndicatorMetaData}
          data={data}
        />
      ) : null}
      {graphType !== 'map' && colorIndicatorMetaData ? (
        <DataSourceListMinifiedItem
          indicatorData={colorIndicatorMetaData}
          data={data}
        />
      ) : null}
      {(graphType === 'scatterPlot' || graphType === 'map') &&
      sizeIndicatorMetaData ? (
        <DataSourceListMinifiedItem
          indicatorData={sizeIndicatorMetaData}
          data={data}
        />
      ) : null}
    </div>
  );
}
