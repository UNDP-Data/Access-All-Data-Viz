import UNDPColorModule from 'undp-viz-colors';
import {
  CountryGroupDataType, IndicatorMetaDataWithYear,
} from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { StackedAreaChart } from '../CardComponents/StackedAreaChart';
import { DotPlot } from '../CardComponents/DotPlot';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataWithYear[];
}

export const DefaultCountrySummary = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  return (
    <div className='margin-bottom-07'>
      <div className='flex-div flex-wrap stat-container'>
        {
          data.indicators.findIndex((d) => d.indicator === 'Population, total') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Population, total',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Population, total'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Population, total')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Rural Population, total') !== -1 && data.indicators.findIndex((d) => d.indicator === 'Urban Population, total') !== -1
            ? (
              <StackedAreaChart
                data1={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Rural Population, total',
                    )
                  ].yearlyData
                }
                data2={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Urban Population, total',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor1={UNDPColorModule.categoricalColors.locationColors.rural}
                lineColor2={UNDPColorModule.categoricalColors.locationColors.urban}
                graphTitle='Urban and Rural Population'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Population, total')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'GHG emission') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'GHG emission',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Greenhouse Gas Emission'
                suffix='MtC02e'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'GHG emission')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)'
                suffix='%'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Access to electricity (% of population)') !== -1
            ? (
              <DotPlot
                graphTitle='People with access to electricity'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity (% of population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity (% of population)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity (% of population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity (% of population)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Access to electricity (% of population)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Primary energy consumption per capita, measured in kilowatt-hours') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Primary energy consumption per capita, measured in kilowatt-hours',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Primary energy consumption per capita, measured in kilowatt-hours'
                suffix=' kWh'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Primary energy consumption per capita, measured in kilowatt-hours')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Gender Inequality Index') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Gender Inequality Index-Gender Inequality Index',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Gender Inequality Index'
                suffix=''
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Gender Inequality Index-Gender Inequality Index')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Human development index (HDI)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Human development index (HDI)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Human Development Index'
                suffix=''
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Human development index (HDI)')].DataSourceName}
              />
            ) : null
        }
      </div>
    </div>
  );
};
