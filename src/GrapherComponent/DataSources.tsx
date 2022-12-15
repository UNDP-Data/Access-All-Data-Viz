import { useContext } from 'react';
import styled from 'styled-components';
import { CtxDataType, DataType, IndicatorMetaDataWithYear } from '../Types';
import Context from '../Context/Context';
import { DataSourceListItem } from '../Components/DataSourceListItem';

interface Props {
  indicators: IndicatorMetaDataWithYear[];
  data: DataType[];
}

const El = styled.div`
  width: 75%;
  flex-grow: 1;
  overflow: auto;
  @media (max-width: 960px) {
    width: 100%;
    height: auto;
    min-height: 0;
  }
`;

const HeaderEl = styled.div`
  padding: var(--spacing-07);
  background-color: var(--white);
  border-bottom: 1px solid var(--gray-400);
  position: sticky;
  top: 0;
`;

export const DataSources = (props: Props) => {
  const {
    indicators,
    data,
  } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    colorIndicator,
    updateShowSource,
  } = useContext(Context) as CtxDataType;

  const xIndicatorMetaData = indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)];

  const yIndicatorMetaData = indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)];

  const sizeIndicatorMetaData = indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)];

  const colorIndicatorMetaData = colorIndicator === 'Human Development Index' ? indicators[indicators.findIndex((d) => d.IndicatorLabelTable === 'Human development index (HDI)')] : indicators[indicators.findIndex((d) => d.IndicatorLabelTable === colorIndicator)];

  return (
    <El className='undp-scrollbar'>
      <HeaderEl className='flex-div flex-space-between flex-vert-align-center'>
        <h4 className='undp-typography margin-bottom-00'>
          Data Description
        </h4>
        <button className='undp-button button-primary' type='button' onClick={() => { updateShowSource(false); }}>Close</button>
      </HeaderEl>
      <DataSourceListItem
        indicatorData={xIndicatorMetaData}
        data={data}
      />
      {
        graphType !== 'barGraph' && yIndicatorMetaData ? (
          <>
            <hr className='undp-style' />
            <DataSourceListItem
              indicatorData={yIndicatorMetaData}
              data={data}
            />
          </>
        ) : null
      }
      {
        graphType !== 'map' && colorIndicatorMetaData ? (
          <>
            <hr className='undp-style' />
            <DataSourceListItem
              indicatorData={colorIndicatorMetaData}
              data={data}
            />
          </>
        ) : null
      }
      {
        (graphType === 'scatterPlot' || graphType === 'map') && sizeIndicatorMetaData ? (
          <>
            <hr className='undp-style' />
            <DataSourceListItem
              indicatorData={sizeIndicatorMetaData}
              data={data}
            />
          </>
        ) : null
      }
    </El>
  );
};
