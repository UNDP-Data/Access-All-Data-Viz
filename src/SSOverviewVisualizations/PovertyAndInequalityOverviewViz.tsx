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
  user-select: none;
`;

export function PovertyAndInequalityOverviewViz(props: Props) {
  const { data, indicators } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  const toShow =
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'People are covered by at least one social protection benefit',
    ) !== -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'GINI index (World Bank estimate)',
    ) !== -1 ||
    data.indicators.findIndex(d => d.indicator === 'GHG emission') !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Informal employment by sex and age (thousands), Total, 15 and above',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Population using at least basic sanitation services (%)',
    ) !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)',
    ) !== -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'School enrollment, tertiary (% gross)',
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
              d =>
                d.indicator ===
                'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)'
                suffix='%'
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'GINI index (World Bank estimate)',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'GINI index (World Bank estimate)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='GINI Index'
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'GINI index (World Bank estimate)',
                    )
                  ].IndicatorDescription
                }
                suffix=''
                source={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'GINI index (World Bank estimate)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d => d.DataKey === 'GINI index (World Bank estimate)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Population covered by at least one social protection benefit',
            ) !== -1 ? (
              <DotPlot
                graphTitle='People are covered by at least one social protection benefit'
                size={200}
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Population covered by at least one social protection benefit',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Population covered by at least one social protection benefit',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Population covered by at least one social protection benefit',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Population covered by at least one social protection benefit',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Population covered by at least one social protection benefit',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Population covered by at least one social protection benefit',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
            ) !== -1 ? (
              <DotPlot
                graphTitle='People of age 15-24 are unemployed'
                size={200}
                dotColors='var(--dark-red)'
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Informal employment by sex and age (thousands), Total, 15 and above',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Informal employment by sex and age (thousands), Total, 15 and above',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Informal employment by sex and age (thousands), Total, 15 and above'
                suffix=''
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Informal employment by sex and age (thousands), Total, 15 and above',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Informal employment by sex and age (thousands), Total, 15 and above',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Population using at least basic sanitation services (%)',
            ) !== -1 ? (
              <DotPlot
                graphTitle='People uses at least basic sanitation services'
                size={200}
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Population using at least basic sanitation services (%)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Population using at least basic sanitation services (%)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Population using at least basic sanitation services (%)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'Population using at least basic sanitation services (%)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Population using at least basic sanitation services (%)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Population using at least basic sanitation services (%)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)'
                suffix='%'
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'School enrollment, tertiary (% gross)',
            ) !== -1 ? (
              <DotPlot
                graphTitle='People of are enrolled for tertiary education'
                size={200}
                value={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator === 'School enrollment, tertiary (% gross)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'School enrollment, tertiary (% gross)',
                      )
                    ].yearlyData.length - 1
                  ].value
                }
                year={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator === 'School enrollment, tertiary (% gross)',
                    )
                  ].yearlyData[
                    data.indicators[
                      data.indicators.findIndex(
                        d =>
                          d.indicator ===
                          'School enrollment, tertiary (% gross)',
                      )
                    ].yearlyData.length - 1
                  ].year
                }
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey === 'School enrollment, tertiary (% gross)',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey === 'School enrollment, tertiary (% gross)',
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