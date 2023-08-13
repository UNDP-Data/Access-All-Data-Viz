import UNDPColorModule from 'undp-viz-colors';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { CountryGroupDataType, IndicatorMetaDataType } from '../Types';
import { LineChart } from '../CardComponents/LineChart';
import { StackedAreaChart } from '../CardComponents/StackedAreaChart';

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

export function EnvironmentOverviewViz(props: Props) {
  const { data, indicators } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  const toShow =
    data.indicators.findIndex(d => d.indicator === 'GHG emission') !== -1 ||
    data.indicators.findIndex(
      d =>
        d.indicator ===
        'Emission levels associated with GHG target set by (I)NDCs',
    ) !== -1 ||
    data.indicators.findIndex(
      d => d.indicator === 'Reduced Mean Daily CO2 Emissions; percent change',
    ) !== -1 ||
    data.indicators.findIndex(d => d.indicator === 'Population, total') !==
      -1 ||
    (data.indicators.findIndex(
      d => d.indicator === 'Rural Population, total',
    ) !== -1 &&
      data.indicators.findIndex(
        d => d.indicator === 'Urban Population, total',
      ) !== -1);
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
            {data.indicators.findIndex(d => d.indicator === 'GHG emission') !==
            -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'GHG emission',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Greenhouse Gas Emission'
                suffix='MtC02e'
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'GHG emission')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'GHG emission')
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Emission levels associated with GHG target set by (I)NDCs',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Emission levels associated with GHG target set by (I)NDCs',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Emission levels associated with GHG target set by (I)NDCs'
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Emission levels associated with GHG target set by (I)NDCs',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Emission levels associated with GHG target set by (I)NDCs',
                    )
                  ].DataSourceLink
                }
                graphDescription={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Emission levels associated with GHG target set by (I)NDCs',
                    )
                  ].IndicatorDescription
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d =>
                d.indicator ===
                'Reduced Mean Daily CO2 Emissions; percent change',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d =>
                        d.indicator ===
                        'Reduced Mean Daily CO2 Emissions; percent change',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Reduced Mean Daily CO2 Emissions; percent change'
                suffix='%'
                source={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Reduced Mean Daily CO2 Emissions; percent change',
                    )
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(
                      d =>
                        d.DataKey ===
                        'Reduced Mean Daily CO2 Emissions; percent change',
                    )
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Population, total',
            ) !== -1 ? (
              <LineChart
                data={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Population, total',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor='#232E3D'
                graphTitle='Population, total'
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Population, total')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Population, total')
                  ].DataSourceLink
                }
              />
            ) : null}
            {data.indicators.findIndex(
              d => d.indicator === 'Rural Population, total',
            ) !== -1 &&
            data.indicators.findIndex(
              d => d.indicator === 'Urban Population, total',
            ) !== -1 ? (
              <StackedAreaChart
                data1={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Rural Population, total',
                    )
                  ].yearlyData
                }
                data2={
                  data.indicators[
                    data.indicators.findIndex(
                      d => d.indicator === 'Urban Population, total',
                    )
                  ].yearlyData
                }
                strokeWidth={1}
                lineColor1={
                  UNDPColorModule.categoricalColors.locationColors.rural
                }
                lineColor2={
                  UNDPColorModule.categoricalColors.locationColors.urban
                }
                graphTitle='Urban and Rural Population'
                source={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Population, total')
                  ].DataSourceName
                }
                sourceLink={
                  indicators[
                    indicators.findIndex(d => d.DataKey === 'Population, total')
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
