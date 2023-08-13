import styled from 'styled-components';
import { useRef, useState } from 'react';
import { CountryGroupDataType, IndicatorMetaDataType } from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { DotPlot } from '../CardComponents/DotPlot';

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

export function EnergyOverviewViz(props: Props) {
  const { data, indicators } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  const toShow =
    data.indicators.findIndex(
      d => d.indicator === 'Access to electricity (% of population)',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator === 'Access to electricity, rural (% of rural population)',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator === 'Access to electricity, urban (% of urban population)',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Renewable energy consumption (% of total final energy consumption)',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Primary energy consumption per capita, measured in kilowatt-hours',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Access to clean fuels and technologies for cooking (% of population)',
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
              d => d.indicator === 'Access to electricity (% of population)',
            ) !== -1 ? (
              <DotPlot
                graphTitle='People with access to electricity'
                size={200}
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to electricity (% of population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to electricity (% of population)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to electricity (% of population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to electricity (% of population)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey === 'Access to electricity (% of population)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey === 'Access to electricity (% of population)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Access to electricity, urban (% of urban population)',
            ) !== -1 ? (
              <DotPlot
                graphTitle='Urban people with access to electricity'
                size={200}
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to electricity, urban (% of urban population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to electricity, urban (% of urban population)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to electricity, urban (% of urban population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to electricity, urban (% of urban population)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Access to electricity, urban (% of urban population)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Access to electricity, urban (% of urban population)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Access to electricity, rural (% of rural population)',
            ) !== -1 ? (
              <DotPlot
                graphTitle='Rural people with access to electricity'
                size={200}
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to electricity, rural (% of rural population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to electricity, rural (% of rural population)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to electricity, rural (% of rural population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to electricity, rural (% of rural population)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Access to electricity, rural (% of rural population)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Access to electricity, rural (% of rural population)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Access to clean fuels and technologies for cooking (% of population)',
            ) !== -1 ? (
              <DotPlot
                graphTitle='People with access to clean fuels and technologies for cooking'
                size={200}
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to clean fuels and technologies for cooking (% of population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to clean fuels and technologies for cooking (% of population)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Access to clean fuels and technologies for cooking (% of population)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Access to clean fuels and technologies for cooking (% of population)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Access to clean fuels and technologies for cooking (% of population)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Access to clean fuels and technologies for cooking (% of population)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Primary energy consumption per capita, measured in kilowatt-hours',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Primary energy consumption per capita, measured in kilowatt-hours',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Primary energy consumption per capita, measured in kilowatt-hours'
                suffix=' kWh'
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Primary energy consumption per capita, measured in kilowatt-hours',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Primary energy consumption per capita, measured in kilowatt-hours',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Renewable energy consumption (% of total final energy consumption)',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Renewable energy consumption (% of total final energy consumption)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Renewable energy consumption (% of total final energy consumption)'
                suffix='%'
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Renewable energy consumption (% of total final energy consumption)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Renewable energy consumption (% of total final energy consumption)',
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
