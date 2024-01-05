import { useContext } from 'react';
import {
  CtxDataType,
  CountryGroupDataType,
  IndicatorMetaDataType,
} from '../Types';
import Context from '../Context/Context';
import { DataSourceListItem } from '../Components/DataSourceListItem';

interface Props {
  indicators: IndicatorMetaDataType[];
  data: CountryGroupDataType[];
}

export function DataSources(props: Props) {
  const { indicators, data } = props;
  const {
    graphType,
    disaggregationIndicator,
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
      {graphType !== 'disaggregation' ? (
        <DataSourceListItem indicatorData={xIndicatorMetaData} data={data} />
      ) : null}
      {graphType !== 'barGraph' &&
      graphType !== 'disaggregation' &&
      graphType !== 'multiCountryTrendLine' &&
      yIndicatorMetaData ? (
        <>
          <hr className='undp-style' />
          <DataSourceListItem indicatorData={yIndicatorMetaData} data={data} />
        </>
      ) : null}
      {graphType !== 'map' &&
      graphType !== 'disaggregation' &&
      colorIndicatorMetaData ? (
        <>
          <hr className='undp-style' />
          <DataSourceListItem
            indicatorData={colorIndicatorMetaData}
            data={data}
          />
        </>
      ) : null}
      {(graphType === 'scatterPlot' || graphType === 'map') &&
      sizeIndicatorMetaData ? (
        <>
          <hr className='undp-style' />
          <DataSourceListItem
            indicatorData={sizeIndicatorMetaData}
            data={data}
          />
        </>
      ) : null}
      {graphType === 'disaggregation' ? (
        <div>
          {disaggregationIndicator?.DisaggregatedIndicators.map(
            (indicator, i) => {
              const indicatorMetaData =
                indicators[indicators.findIndex(d => d.id === indicator.id)];
              return (
                <div key={i}>
                  <hr className='undp-style' />
                  <DataSourceListItem
                    indicatorData={indicatorMetaData}
                    data={data}
                  />
                </div>
              );
            },
          )}
        </div>
      ) : null}
    </div>
  );
}
