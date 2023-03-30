import {
  CountryGroupDataType, IndicatorMetaDataWithYear,
} from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { DotPlot } from '../CardComponents/DotPlot';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataWithYear[];
}

export const GenderCountrySummary = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  return (
    <div className='margin-bottom-07'>
      <div className='flex-div flex-wrap stat-container'>
        {
          data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Maternal mortality ratio (deaths per 100,000 live births)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Gender Inequality Index-Maternal mortality ratio (deaths per 100,000 live births)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Maternal mortality ratio (deaths per 100,000 live births)'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Gender Inequality Index-Maternal mortality ratio (deaths per 100,000 live births)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Adolescent birth rate') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Gender Inequality Index-Adolescent birth rate',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Number of births per 1,000 women ages 15-19'
                suffix=''
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Gender Inequality Index-Adolescent birth rate')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Share of seats in parliament (% held by women)') !== -1
            ? (
              <DotPlot
                graphTitle='Share of seats in parliament (% held by women)'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Share of seats in parliament (% held by women)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Share of seats in parliament (% held by women)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Share of seats in parliament (% held by women)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Share of seats in parliament (% held by women)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Gender Inequality Index-Share of seats in parliament (% held by women)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)') !== -1
            ? (
              <DotPlot
                graphTitle='People of age 15-24 are unemployed'
                size={200}
                dotColors='var(--dark-red)'
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].DataSourceName}
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
          data.indicators.findIndex((d) => d.indicator === 'Gender Inequality Index-Labour force participation rate, female (% ages 15 and older)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Gender Inequality Index-Labour force participation rate, female (% ages 15 and older)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Labour force participation rate, female (% ages 15 and older)'
                suffix='%'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Gender Inequality Index-Labour force participation rate, female (% ages 15 and older)')].DataSourceName}
              />
            ) : null
        }
      </div>
    </div>
  );
};
