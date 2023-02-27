import { LineChart } from '../CardComponents/LineChart';
import { ValueCard } from '../CardComponents/ValueCard';
import {
  CountryGroupDataType, IndicatorMetaDataWithYear,
} from '../Types';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataWithYear[];
}

export const GovernanceCountrySummary = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  return (
    <div className='margin-bottom-07'>
      <div className='stat-card-container'>
        {
          data.indicators.findIndex((d) => d.indicator === 'Rule of Law: Estimate') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Rule of Law: Estimate')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Rule of Law: Estimate')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Rule of Law: Estimate')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Rule of Law: Estimate')].yearlyData.length - 1].year}
                graphTitle='Rule of Law: Estimate'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Rule of Law: Estimate')].DataSourceName}
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Rule of Law: Estimate')].IndicatorDescription}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Government Effectiveness: Estimate') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Government Effectiveness: Estimate')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Government Effectiveness: Estimate')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Government Effectiveness: Estimate')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Government Effectiveness: Estimate')].yearlyData.length - 1].year}
                graphTitle='Government Effectiveness: Estimate'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Government Effectiveness: Estimate')].DataSourceName}
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Government Effectiveness: Estimate')].IndicatorDescription}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Voice and Accountability (estimate)') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Voice and Accountability (estimate)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Voice and Accountability (estimate)')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Voice and Accountability (estimate)')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Voice and Accountability (estimate)')].yearlyData.length - 1].year}
                graphTitle='Voice and Accountability (estimate)'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Voice and Accountability (estimate)')].DataSourceName}
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Voice and Accountability (estimate)')].IndicatorDescription}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'State Legitimacy') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'State Legitimacy',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='State Legitimacy'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'State Legitimacy')].DataSourceName}
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'State Legitimacy')].IndicatorDescription}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Human Rights') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Human Rights',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Human Rights'
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Human Rights')].DataSourceName}
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Human Rights')].IndicatorDescription}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Economic Freedom Global Ranking') !== -1
            ? (
              <ValueCard
                value={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Economic Freedom Global Ranking')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Economic Freedom Global Ranking')].yearlyData.length - 1].value}
                year={data.indicators[data.indicators.findIndex((d) => d.indicator === 'Economic Freedom Global Ranking')].yearlyData[data.indicators[data.indicators.findIndex((d) => d.indicator === 'Economic Freedom Global Ranking')].yearlyData.length - 1].year}
                graphTitle='Economic Freedom Global Ranking'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Economic Freedom Global Ranking')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Economic Freedom Global Ranking')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Transparency Internationals Corruption Perceptions index') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Transparency Internationals Corruption Perceptions index',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Transparency Internationals Corruption Perceptions index'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Transparency Internationals Corruption Perceptions index')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Transparency Internationals Corruption Perceptions index')].DataSourceName}
              />
            ) : null
        }
        {
          data.indicators.findIndex((d) => d.indicator === 'Ease of Doing Business Score') !== -1
            ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      (d) => d.indicator
                        === 'Ease of Doing Business Score',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Ease of Doing Business Score'
                graphDescription={indicators[indicators.findIndex((d) => d.DataKey === 'Ease of Doing Business Score')].IndicatorDescription}
                source={indicators[indicators.findIndex((d) => d.DataKey === 'Ease of Doing Business Score')].DataSourceName}
              />
            ) : null
        }
      </div>
    </div>
  );
};
