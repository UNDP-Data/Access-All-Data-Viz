import styled from 'styled-components';
import { useRef, useState } from 'react';
import { CountryGroupDataType, IndicatorMetaDataType } from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { ValueCard } from '../CardComponents/ValueCard';

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

export function ResilienceOverviewViz(props: Props) {
  const { data, indicators } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  const toShow =
    data.indicators.findIndex(
      d => d.indicator === 'Global Peace Index Rank',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Refugees and Internally Displaced People as Percentage of the Population',
    ) !== -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'Refugees and IDPs Pressure on State',
    ) !== -1 ||
    data.indicators.findIndex(d => d.indicator === 'Country Fragility') !==
      -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'COVID-19 Government Response Stringency',
    ) !== -1 ||
    data.indicators.findIndex(d => d.indicator === 'Fiscal Response') !== -1 ||
    data.indicators.findIndex(d => d.indicator === 'Monetary Response') !==
      -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator === 'International migrant stock at mid-year (both sexes)',
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
              d => d.indicator === 'Global Peace Index Rank',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Global Peace Index Rank',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Global Peace Index Rank',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Global Peace Index Rank',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Global Peace Index Rank',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='Global Peace Index Rank'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Global Peace Index Rank',
                    )
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Global Peace Index Rank',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Global Peace Index Rank',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Refugees and Internally Displaced People as Percentage of the Population',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Refugees and Internally Displaced People as Percentage of the Population',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Refugees and Internally Displaced People as Percentage of the Population'
                suffix='%'
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Refugees and Internally Displaced People as Percentage of the Population',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Refugees and Internally Displaced People as Percentage of the Population',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Refugees and IDPs Pressure on State',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator === 'Refugees and IDPs Pressure on State',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator === 'Refugees and IDPs Pressure on State',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator === 'Refugees and IDPs Pressure on State',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator === 'Refugees and IDPs Pressure on State',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='Refugees and IDPs Pressure on State'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Refugees and IDPs Pressure on State',
                    )
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Refugees and IDPs Pressure on State',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'Refugees and IDPs Pressure on State',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Country Fragility',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Country Fragility',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Country Fragility',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Country Fragility',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Country Fragility',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='Composite Fragile States Index'
                graphDescription={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Country Fragility')
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Country Fragility')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Country Fragility')
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'COVID-19 Government Response Stringency',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'COVID-19 Government Response Stringency',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'COVID-19 Government Response Stringency',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'COVID-19 Government Response Stringency',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'COVID-19 Government Response Stringency',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='COVID-19 Government Response Stringency'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey === 'COVID-19 Government Response Stringency',
                    )
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey === 'COVID-19 Government Response Stringency',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey === 'COVID-19 Government Response Stringency',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Fiscal Response',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Fiscal Response',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Fiscal Response',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Fiscal Response',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Fiscal Response',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='COVID-19 Fiscal Response'
                graphDescription={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Fiscal Response')
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Fiscal Response')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Fiscal Response')
                  ].DataSourceLink
                }
                prefix='US $'
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Monetary Response',
            ) !== -1 ? (
              <ValueCard
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Monetary Response',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Monetary Response',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Monetary Response',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d => d.indicator === 'Monetary Response',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                graphTitle='COVID-19 Monetary Response'
                graphDescription={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Monetary Response')
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Monetary Response')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Monetary Response')
                  ].DataSourceLink
                }
                prefix='US $'
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'International migrant stock at mid-year (both sexes)',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'International migrant stock at mid-year (both sexes)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='International migrant stock at mid-year (both sexes)'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'International migrant stock at mid-year (both sexes)',
                    )
                  ].IndicatorDescription
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'International migrant stock at mid-year (both sexes)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'International migrant stock at mid-year (both sexes)',
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
