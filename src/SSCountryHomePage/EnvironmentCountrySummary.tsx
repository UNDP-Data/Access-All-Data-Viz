import UNDPColorModule from 'undp-viz-colors';
import { CountryGroupDataType, IndicatorMetaDataWithYear } from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { StackedAreaChart } from '../CardComponents/StackedAreaChart';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataWithYear[];
}

export function EnvironmentCountrySummary(props: Props) {
  const { data, indicators } = props;
  return (
    <div className='margin-bottom-07'>
      <div className='flex-div flex-wrap stat-container'>
        {data.indicators.findIndex(d => d.indicator === 'GHG emission') !==
        -1 ? (
          <LineChart
            data={
              data.indicators[
                data.indicators.findIndex(d => d.indicator === 'GHG emission')
              ].yearlyData
            }
            strokeWidth={1}
            lineColor='#232E3D'
            graphTitle='Greenhouse Gas Emission'
            suffix='MtC02e'
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'GHG emission')
              ].DataSourceName
            }
          />
        ) : null}
        {data.indicators.findIndex(
          d =>
            d.indicator ===
            'Emission levels associated with GHG target set by (I)NDCs',
        ) !== -1 ? (
          <LineChart
            data={
              data.indicators[
                data.indicators.findIndex(
                  d =>
                    d.indicator ===
                    'Emission levels associated with GHG target set by (I)NDCs',
                )
              ].yearlyData
            }
            strokeWidth={1}
            lineColor='#232E3D'
            graphTitle='Emission levels associated with GHG target set by (I)NDCs'
            source={
              indicators[
                indicators.findIndex(
                  d =>
                    d.DataKey ===
                    'Emission levels associated with GHG target set by (I)NDCs',
                )
              ].DataSourceName
            }
            graphDescription={
              indicators[
                indicators.findIndex(
                  d =>
                    d.DataKey ===
                    'Emission levels associated with GHG target set by (I)NDCs',
                )
              ].IndicatorDescription
            }
          />
        ) : null}
        {data.indicators.findIndex(
          d =>
            d.indicator === 'Reduced Mean Daily CO2 Emissions; percent change',
        ) !== -1 ? (
          <LineChart
            data={
              data.indicators[
                data.indicators.findIndex(
                  d =>
                    d.indicator ===
                    'Reduced Mean Daily CO2 Emissions; percent change',
                )
              ].yearlyData
            }
            strokeWidth={1}
            lineColor='#232E3D'
            graphTitle='Reduced Mean Daily CO2 Emissions; percent change'
            suffix='%'
            source={
              indicators[
                indicators.findIndex(
                  d =>
                    d.DataKey ===
                    'Reduced Mean Daily CO2 Emissions; percent change',
                )
              ].DataSourceName
            }
          />
        ) : null}
        {data.indicators.findIndex(d => d.indicator === 'Population, total') !==
        -1 ? (
          <LineChart
            data={
              data.indicators[
                data.indicators.findIndex(
                  d => d.indicator === 'Population, total',
                )
              ].yearlyData
            }
            strokeWidth={1}
            lineColor='#232E3D'
            graphTitle='Population, total'
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'Population, total')
              ].DataSourceName
            }
          />
        ) : null}
        {data.indicators.findIndex(
          d => d.indicator === 'Rural Population, total',
        ) !== -1 &&
        data.indicators.findIndex(
          d => d.indicator === 'Urban Population, total',
        ) !== -1 ? (
          <StackedAreaChart
            data1={
              data.indicators[
                data.indicators.findIndex(
                  d => d.indicator === 'Rural Population, total',
                )
              ].yearlyData
            }
            data2={
              data.indicators[
                data.indicators.findIndex(
                  d => d.indicator === 'Urban Population, total',
                )
              ].yearlyData
            }
            strokeWidth={1}
            lineColor1={UNDPColorModule.categoricalColors.locationColors.rural}
            lineColor2={UNDPColorModule.categoricalColors.locationColors.urban}
            graphTitle='Urban and Rural Population'
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'Population, total')
              ].DataSourceName
            }
          />
        ) : null}
      </div>
    </div>
  );
}
