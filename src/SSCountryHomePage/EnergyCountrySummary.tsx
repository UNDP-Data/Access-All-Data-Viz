import {
  CountryGroupDataType, IndicatorMetaDataWithYear,
} from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { DotPlot } from '../CardComponents/DotPlot';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataWithYear[];
}

export const EnergyCountrySummary = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  return (
    <div className='margin-bottom-07'>
      <div className='flex-div flex-wrap stat-container'>
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
          data.indicators.findIndex((d) => d.indicator === 'Access to electricity, urban (% of urban population)') !== -1
            ? (
              <DotPlot
                graphTitle='Urban people with access to electricity'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, urban (% of urban population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, urban (% of urban population)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, urban (% of urban population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, urban (% of urban population)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Access to electricity, urban (% of urban population)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Access to electricity, rural (% of rural population)') !== -1
            ? (
              <DotPlot
                graphTitle='Rural people with access to electricity'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, rural (% of rural population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, rural (% of rural population)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, rural (% of rural population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to electricity, rural (% of rural population)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Access to electricity, rural (% of rural population)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Access to clean fuels and technologies for cooking  (% of population)') !== -1
            ? (
              <DotPlot
                graphTitle='People with access to clean fuels and technologies for cooking'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to clean fuels and technologies for cooking  (% of population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to clean fuels and technologies for cooking  (% of population)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to clean fuels and technologies for cooking  (% of population)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Access to clean fuels and technologies for cooking  (% of population)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Access to clean fuels and technologies for cooking  (% of population)')].DataSourceName}
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
                suffix='KwH'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Primary energy consumption per capita, measured in kilowatt-hours')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Renewable energy consumption (% of total final energy consumption)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Renewable energy consumption (% of total final energy consumption)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Renewable energy consumption (% of total final energy consumption)'
                suffix='%'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Renewable energy consumption (% of total final energy consumption)')].DataSourceName}
              />
            ) : null
        }
      </div>
    </div>
  );
};
