import { Select } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Context from '../../Context/Context';
import { CountryListType, CtxDataType } from '../../Types';
import { Graph } from './Graph';

interface Props {
  countries: CountryListType[];
  countryCode?: string;
}

const GraphDiv = styled.div`
  flex-grow: 1;
  @media (max-width: 960px) {
    height: 70vw;
    max-height: 31.25rem;
  }
`;

const CountryAreaEl = styled.div`
  @media (max-width: 980px) {
    display: none;
  }
`;

export function DisaggregationLineChart(props: Props) {
  const { countries, countryCode } = props;
  const { trendChartCountry, updateTrendChartCountry, data } = useContext(
    Context,
  ) as CtxDataType;
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(graphDiv.current.clientHeight);
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv, trendChartCountry]);
  return (
    <>
      <div
        style={{
          padding: 'var(--spacing-06)',
          backgroundColor: 'var(--white)',
          borderBottom: '1px solid var(--gray-400)',
        }}
      >
        <Select
          showSearch
          className='undp-select'
          placeholder='Please select a country'
          onChange={d => {
            updateTrendChartCountry(d);
          }}
          disabled={countryCode !== undefined && countryCode !== null}
          value={trendChartCountry}
        >
          {countries
            .filter(
              d => data.findIndex(el => el['Alpha-3 code'] === d.code) !== -1,
            )
            .map(d => d.name)
            .map(d => (
              <Select.Option className='undp-select-option' key={d}>
                {d}
              </Select.Option>
            ))}
        </Select>
      </div>
      {!trendChartCountry ? (
        <CountryAreaEl className='center-area-info-el'>
          <h5 className='undp-typography'>
            Please select a country to see the trend for that country
          </h5>
          <Select
            showSearch
            className='undp-select'
            placeholder='Please select a country'
            value={trendChartCountry}
            onChange={d => {
              updateTrendChartCountry(d);
            }}
          >
            {countries
              .filter(
                d => data.findIndex(el => el['Alpha-3 code'] === d.code) !== -1,
              )
              .map(d => d.name)
              .map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
          </Select>
        </CountryAreaEl>
      ) : (
        <GraphDiv ref={graphDiv}>
          {svgHeight && svgWidth ? (
            <Graph svgWidth={svgWidth} svgHeight={svgHeight} />
          ) : null}
        </GraphDiv>
      )}
    </>
  );
}
