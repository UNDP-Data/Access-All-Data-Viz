import {
  CountryGroupDataType, IndicatorMetaDataWithYear,
} from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { DotPlot } from '../CardComponents/DotPlot';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataWithYear[];
}

export const CountrySummary = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  return (
    <div className='margin-bottom-07'>
      <div className='flex-div flex-wrap stat-container'>
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
          data.indicators.findIndex((d) => d.indicator === 'GINI index (World Bank estimate)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'GINI index (World Bank estimate)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='GINI Index'
                suffix=''
                source={indicators[indicators.findIndex((d) => d.DataKey === 'GINI index (World Bank estimate)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Population covered by at least one social protection benefit') !== -1
            ? (
              <DotPlot
                graphTitle='People are covered by at least one social protection benefit'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population covered by at least one social protection benefit')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population covered by at least one social protection benefit')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population covered by at least one social protection benefit')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population covered by at least one social protection benefit')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Population covered by at least one social protection benefit')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)') !== -1
            ? (
              <DotPlot
                graphTitle='People of age 15-24 are unemployed'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Informal employment by sex and age (thousands), Total, 15 and above') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Informal employment by sex and age (thousands), Total, 15 and above',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Informal employment by sex and age (thousands), Total, 15 and above'
                suffix=''
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Informal employment by sex and age (thousands), Total, 15 and above')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Population using at least basic sanitation services (%)') !== -1
            ? (
              <DotPlot
                graphTitle='People uses at least basic sanitation services'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population using at least basic sanitation services (%)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population using at least basic sanitation services (%)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population using at least basic sanitation services (%)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Population using at least basic sanitation services (%)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Population using at least basic sanitation services (%)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)'
                suffix='%'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'School enrollment, tertiary (% gross)') !== -1
            ? (
              <DotPlot
                graphTitle='People of are enrolled for tertiary education'
                size={200}
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'School enrollment, tertiary (% gross)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'School enrollment, tertiary (% gross)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'School enrollment, tertiary (% gross)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'School enrollment, tertiary (% gross)')].yearlyData.length - 1].year}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'School enrollment, tertiary (% gross)')].DataSourceName}
              />
            ) : null
        }
      </div>
    </div>
  );
};
