import { useRef, useState } from 'react';
import styled from 'styled-components';
import { LineChart } from '../CardComponents/LineChart';
import { ValueCard } from '../CardComponents/ValueCard';
import { CountryGroupDataType, IndicatorMetaDataType } from '../Types';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataType[];
}

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

export function GovernanceOverviewViz(props: Props) {
  const { data, indicators } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  const toShow =
    data.indicators.findIndex(d => d.indicator === 'Rule of Law: Estimate') !==
      -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'Government Effectiveness: Estimate',
    ) !== -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'Voice and Accountability (estimate)',
    ) !== -1 ||
    data.indicators.findIndex(d => d.indicator === 'State Legitimacy') !== -1 ||
    data.indicators.findIndex(d => d.indicator === 'Human Rights') !== -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'Economic Freedom Global Ranking',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Transparency Internationals Corruption Perceptions index',
    ) !== -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'Ease of Doing Business Score',
    ) !== -1;
  return (
    <div>
      {toShow ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className='margin-bottom-07'
          style={{
            cursor: `${cursor}, auto`,
          }}
          onClick={e => {
            if (WrapperRef.current) {
              if (e.clientX > window.innerWidth / 2)
                WrapperRef.current.scrollBy(50, 0);
              else WrapperRef.current.scrollBy(-50, 0);
            }
          }}
          onMouseMove={e => {
            if (e.clientX > window.innerWidth / 2)
              setCursor(
                'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
              );
            else
              setCursor(
                'url(https://design.undp.org/static/media/arrow-left.14de54ea.svg)',
              );
          }}
        >
          <WrapperEl
            className='flex-div stat-container undp-scrollbar'
            ref={WrapperRef}
          >
            {data.indicators.findIndex(
              d => d.indicator === 'Rule of Law: Estimate',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Rule of Law: Estimate',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Rule of Law: Estimate',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Rule of Law: Estimate',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Rule of Law: Estimate',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='Rule of Law: Estimate'
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Rule of Law: Estimate',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Rule of Law: Estimate',
                    )
                  ].DataSourceLink
                }
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Rule of Law: Estimate',
                    )
                  ].IndicatorDescription
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Government Effectiveness: Estimate',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Government Effectiveness: Estimate',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator === 'Government Effectiveness: Estimate',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Government Effectiveness: Estimate',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator === 'Government Effectiveness: Estimate',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='Government Effectiveness: Estimate'
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Government Effectiveness: Estimate',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Government Effectiveness: Estimate',
                    )
                  ].DataSourceLink
                }
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Government Effectiveness: Estimate',
                    )
                  ].IndicatorDescription
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Voice and Accountability (estimate)',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator === 'Voice and Accountability (estimate)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator === 'Voice and Accountability (estimate)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator === 'Voice and Accountability (estimate)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator === 'Voice and Accountability (estimate)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='Voice and Accountability (estimate)'
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Voice and Accountability (estimate)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Voice and Accountability (estimate)',
                    )
                  ].DataSourceLink
                }
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Voice and Accountability (estimate)',
                    )
                  ].IndicatorDescription
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'State Legitimacy',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'State Legitimacy',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='State Legitimacy'
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'State Legitimacy')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'State Legitimacy')
                  ].DataSourceLink
                }
                graphDescription={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'State Legitimacy')
                  ].IndicatorDescription
                }
              />
            ) : null}
            {data.indicators.findIndex(d => d.indicator === 'Human Rights') !==
            -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Human Rights',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Human Rights'
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Human Rights')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Human Rights')
                  ].DataSourceLink
                }
                graphDescription={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Human Rights')
                  ].IndicatorDescription
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Economic Freedom Global Ranking',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Economic Freedom Global Ranking',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Economic Freedom Global Ranking',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Economic Freedom Global Ranking',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Economic Freedom Global Ranking',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='Economic Freedom Global Ranking'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Economic Freedom Global Ranking',
                    )
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Economic Freedom Global Ranking',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Economic Freedom Global Ranking',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Transparency Internationals Corruption Perceptions index',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Transparency Internationals Corruption Perceptions index',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Transparency Internationals Corruption Perceptions index'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Transparency Internationals Corruption Perceptions index',
                    )
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Transparency Internationals Corruption Perceptions index',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Transparency Internationals Corruption Perceptions index',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Ease of Doing Business Score',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Ease of Doing Business Score',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Ease of Doing Business Score'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Ease of Doing Business Score',
                    )
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Ease of Doing Business Score',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Ease of Doing Business Score',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
          </WrapperEl>
        </div>
      ) : null}
    </div>
  );
}
