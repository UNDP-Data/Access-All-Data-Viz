import { useContext } from 'react';
import {
  CtxDataType,
  CountryGroupDataType,
  IndicatorMetaDataWithYear,
} from '../Types';
import Context from '../Context/Context';
import { DataSourceListItem } from '../Components/DataSourceListItem';

interface Props {
  indicators: IndicatorMetaDataWithYear[];
  data: CountryGroupDataType[];
}

export function DataSources(props: Props) {
  const { indicators, data } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    colorIndicator,
  } = useContext(Context) as CtxDataType;

  const xIndicatorMetaData =
    indicators[
      indicators.findIndex(d => d.IndicatorLabelTable === xAxisIndicator)
    ];

  const yIndicatorMetaData =
    indicators[
      indicators.findIndex(d => d.IndicatorLabelTable === yAxisIndicator)
    ];

  const sizeIndicatorMetaData =
    indicators[
      indicators.findIndex(d => d.IndicatorLabelTable === sizeIndicator)
    ];

  const colorIndicatorMetaData =
    colorIndicator === 'Human Development Index'
      ? indicators[
          indicators.findIndex(
            d => d.IndicatorLabelTable === 'Human development index (HDI)',
          )
        ]
      : indicators[
          indicators.findIndex(d => d.IndicatorLabelTable === colorIndicator)
        ];

  return (
    <div className='undp-scrollbar'>
      <DataSourceListItem indicatorData={xIndicatorMetaData} data={data} />
      {graphType !== 'barGraph' && yIndicatorMetaData ? (
        <>
          <hr className='undp-style' />
          <DataSourceListItem indicatorData={yIndicatorMetaData} data={data} />
        </>
      ) : null}
      {graphType !== 'map' && colorIndicatorMetaData ? (
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
    </div>
  );
}
