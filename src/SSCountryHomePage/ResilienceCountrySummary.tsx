import {
  CountryGroupDataType, IndicatorMetaDataWithYear,
} from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { ValueCard } from '../CardComponents/ValueCard';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataWithYear[];
}

export const ResilienceCountrySummary = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  return (
    <div className='margin-bottom-07'>
      <div className='flex-div flex-wrap stat-container'>
        {
          data.indicators.findIndex((d) => d.indicator === 'Global Peace Index Rank') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Global Peace Index Rank')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Global Peace Index Rank')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Global Peace Index Rank')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Global Peace Index Rank')].yearlyData.length - 1].year}
                graphTitle='Global Peace Index Rank'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Global Peace Index Rank')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Global Peace Index Rank')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Refugees and Internally Displaced People as Percentage of the Population') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Refugees and Internally Displaced People as Percentage of the Population',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Refugees and Internally Displaced People as Percentage of the Population'
                suffix='%'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Refugees and Internally Displaced People as Percentage of the Population')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Refugees and IDPs Pressure on State') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Refugees and IDPs Pressure on State')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Refugees and IDPs Pressure on State')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Refugees and IDPs Pressure on State')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Refugees and IDPs Pressure on State')].yearlyData.length - 1].year}
                graphTitle='Refugees and IDPs Pressure on State'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Refugees and IDPs Pressure on State')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Refugees and IDPs Pressure on State')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Country Fragility') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Country Fragility')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Country Fragility')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Country Fragility')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Country Fragility')].yearlyData.length - 1].year}
                graphTitle='Composite Fragile States Index'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Country Fragility')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Country Fragility')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'COVID-19 Government Response Stringency') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'COVID-19 Government Response Stringency')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'COVID-19 Government Response Stringency')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'COVID-19 Government Response Stringency')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'COVID-19 Government Response Stringency')].yearlyData.length - 1].year}
                graphTitle='COVID-19 Government Response Stringency'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'COVID-19 Government Response Stringency')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'COVID-19 Government Response Stringency')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Fiscal Response') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Fiscal Response')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Fiscal Response')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Fiscal Response')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Fiscal Response')].yearlyData.length - 1].year}
                graphTitle='COVID-19 Fiscal Response'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Fiscal Response')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Fiscal Response')].DataSourceName}
                prefix='US $'
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Monetary Response') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Monetary Response')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Monetary Response')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Monetary Response')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Monetary Response')].yearlyData.length - 1].year}
                graphTitle='COVID-19 Monetary Response'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Monetary Response')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Monetary Response')].DataSourceName}
                prefix='US $'
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'International migrant stock at mid-year (both sexes)') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'International migrant stock at mid-year (both sexes)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='International migrant stock at mid-year (both sexes)'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'International migrant stock at mid-year (both sexes)')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'International migrant stock at mid-year (both sexes)')].DataSourceName}
              />
            ) : null
        }
      </div>
    </div>
  );
};
