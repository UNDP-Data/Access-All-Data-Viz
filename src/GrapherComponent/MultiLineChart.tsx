import { useContext, useState } from 'react';
import styled from 'styled-components';
import { line, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import max from 'lodash.max';
import min from 'lodash.min';
import { Select } from 'antd';
import { format } from 'd3-format';
import range from 'lodash.range';
import {
  CtxDataType, DataType, HoverDataType, IndicatorMetaDataWithYear, CountryListType,
} from '../Types';
import Context from '../Context/Context';
import { COLOR_SCALES, MAX_TEXT_LENGTH } from '../Constants';
import { TooltipForMultiLineChart } from '../Components/TooltipForMultiLineChart';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataWithYear[];
  countries: CountryListType[];
}

interface DataFormattedType {
  year: number;
  param?: number;
}

const El = styled.div`
  height: 100%;
  overflow-y: hidden;
`;

const GraphEl = styled.div`
  height: calc(100% - 89px);
`;

const ErrorNote = styled.div`
  width: 80%;
  margin: auto;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  color: var(--dark-red);
  text-align: center;
  background-color: var(--white);
  border: 1px solid var(--dark-red);
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const InfoNote = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 2rem;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

export const MultiLineChart = (props: Props) => {
  const {
    data,
    indicators,
    countries,
  } = props;
  const {
    xAxisIndicator,
    multiCountrytrendChartCountries,
    updateMultiCountrytrendChartCountries,
    showLabel,
  } = useContext(Context) as CtxDataType;
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(undefined);
  const queryParams = new URLSearchParams(window.location.search);
  const svgWidth = queryParams.get('showSettings') === 'false' && window.innerWidth > 960 ? 1280 : 960;
  const svgHeight = 678;
  const margin = {
    top: 40,
    bottom: 50,
    left: 90,
    right: 90,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const xIndicatorMetaData = indicators[indicators.findIndex((indicator) => indicator.IndicatorLabelTable === xAxisIndicator)];

  const countryData = multiCountrytrendChartCountries.map((el) => data[data.findIndex((d) => d['Country or Area'] === el)]);

  const minYear = xIndicatorMetaData.years[0];
  const maxYear = xIndicatorMetaData.years[xIndicatorMetaData.years.length - 1];
  const valueArray: number[] = [];
  const yearArray: number[] = [];
  const dataFormatted = countryData.map((d) => {
    const countryFormattedData: DataFormattedType[] = [];
    const xIndicatorIndex = d?.indicators.findIndex((el) => xIndicatorMetaData.DataKey === el.indicator);
    for (let i = minYear; i < maxYear + 1; i += 1) {
      countryFormattedData.push({
        year: i,
        param: d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.findIndex((el) => el.year === i)]?.value,
      });
      if (d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.findIndex((el) => el.year === i)]?.value !== undefined) {
        yearArray.push(i);
        valueArray.push(d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.findIndex((el) => el.year === i)]?.value as number);
      }
    }
    return ({
      countryName: d['Country or Area'],
      alphaCode3: d['Alpha-3 code-1'],
      countryFormattedData,
    });
  });

  const minParam = min(valueArray) ? min(valueArray) as number > 0 ? 0 : min(valueArray) : 0;

  const maxParam = max(valueArray) ? max(valueArray) : 0;

  const minYearFiltered: number = min(yearArray) ? min(yearArray) as number : minYear;
  const maxYearFiltered: number = max(yearArray) ? max(yearArray) as number : maxYear;
  const x = scaleLinear().domain([minYearFiltered, maxYearFiltered]).range([0, graphWidth]);
  const y = scaleLinear().domain([minParam as number, maxParam as number]).range([graphHeight, 0]).nice();
  const yearRange = range(minYearFiltered, maxYearFiltered + 1, 1);
  const lineShape1 = line()
    .defined((d: any) => d.param)
    .x((d: any) => x(d.year))
    .y((d: any) => y(d.param))
    .curve(curveMonotoneX);
  const yTicks = y.ticks(5);
  const xTicks = x.ticks(maxYearFiltered - minYearFiltered > 10 ? 10 : maxYearFiltered - minYearFiltered === 0 ? 1 : maxYearFiltered - minYearFiltered);
  return (
    <El>
      <div style={{ padding: 'var(--spacing-06)', backgroundColor: 'var(--white)', borderBottom: '1px solid var(--gray-400)' }}>
        <Select
          showSearch
          mode='multiple'
          className='undp-select'
          placeholder='Please select a country'
          onChange={(d) => { updateMultiCountrytrendChartCountries(d); }}
          value={multiCountrytrendChartCountries}
          maxTagCount='responsive'
        >
          {
            countries.map((d, i) => (
              <Select.Option className='undp-select-option' key={i}>{d.name}</Select.Option>
            ))
          }
        </Select>
      </div>
      <GraphEl>
        {
          multiCountrytrendChartCountries && valueArray.length > 0
            ? (
              <svg width='100%' height='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                  <line
                    y1={y(0)}
                    y2={y(0)}
                    x1={-15}
                    x2={graphWidth + 15}
                    stroke='#212121'
                    strokeWidth={1}
                  />
                  <text
                    x={-25}
                    y={y(0)}
                    fill='#666'
                    textAnchor='end'
                    fontSize={12}
                    dy={3}
                  >
                    0
                  </text>
                  <g>
                    {
                      yTicks.map((d, i) => (
                        <g key={i}>
                          <line
                            y1={y(d)}
                            y2={y(d)}
                            x1={-15}
                            x2={graphWidth}
                            stroke='#AAA'
                            strokeWidth={1}
                            strokeDasharray='4,8'
                            opacity={d === 0 ? 0 : 1}
                          />
                          <text
                            x={-25}
                            y={y(d)}
                            fill='#666'
                            textAnchor='end'
                            fontSize={12}
                            dy={3}
                            opacity={d === 0 ? 0 : 1}
                          >
                            {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                          </text>
                        </g>
                      ))
                    }
                    <text
                      transform={`translate(-60, ${graphHeight / 2}) rotate(-90)`}
                      fill='#212121'
                      textAnchor='middle'
                      fontSize={12}
                    >
                      {xIndicatorMetaData.IndicatorLabelTable.length > MAX_TEXT_LENGTH ? `${xIndicatorMetaData.IndicatorLabelTable.substring(0, MAX_TEXT_LENGTH)}...` : xIndicatorMetaData.IndicatorLabelTable}
                    </text>
                  </g>
                  <g>
                    {
                      xTicks.map((d, i) => (
                        <g key={i}>
                          <text
                            y={graphHeight}
                            x={x(d)}
                            fill='#AAA'
                            textAnchor='middle'
                            fontSize={12}
                            dy={15}
                          >
                            {d}
                          </text>
                        </g>
                      ))
                    }
                  </g>
                  <g>
                    {
                      dataFormatted.map((d, i) => (
                        <g key={d.alphaCode3}>
                          <path d={lineShape1(d.countryFormattedData.filter((el) => el.param !== undefined) as any) as string} fill='none' stroke={COLOR_SCALES.Categorical[i % 8]} strokeWidth={2} strokeDasharray='4 8' />
                          <path d={lineShape1(d.countryFormattedData as any) as string} fill='none' stroke={COLOR_SCALES.Categorical[i % 8]} strokeWidth={2} />
                          {
                            d.countryFormattedData.filter((el) => el.param !== undefined).map((el, k) => (el.param !== undefined
                              ? (
                                <g
                                  key={k}
                                >
                                  <circle
                                    cx={x(el.year)}
                                    cy={y(el.param)}
                                    r={4}
                                    fill={COLOR_SCALES.Categorical[i % 8]}
                                  />
                                  {
                                    showLabel
                                      ? (
                                        <text
                                          x={x(el.year)}
                                          y={y(el.param)}
                                          dy={-8}
                                          fontSize={12}
                                          textAnchor='middle'
                                          fill={COLOR_SCALES.Categorical[i % 8]}
                                          strokeWidth={0.25}
                                          stroke='#fff'
                                          fontWeight='bold'
                                        >
                                          {el.param < 1 ? el.param : format('~s')(el.param)}
                                        </text>
                                      ) : null
                                  }
                                </g>
                              )
                              : null))
                          }
                          {
                            d.countryFormattedData.filter((el) => el.param !== undefined).length > 0
                              ? (
                                <text
                                  fontSize={10}
                                  fill={COLOR_SCALES.Categorical[i % 8]}
                                  x={x(d.countryFormattedData.filter((el) => el.param !== undefined)[d.countryFormattedData.filter((el) => el.param !== undefined).length - 1].year)}
                                  y={y(d.countryFormattedData.filter((el) => el.param !== undefined)[d.countryFormattedData.filter((el) => el.param !== undefined).length - 1].param as number)}
                                  dx={5}
                                  dy={4}
                                >
                                  {d.alphaCode3}
                                </text>
                              ) : null
                          }
                        </g>
                      ))
                    }
                    {
                      yearRange.map((d, i) => (
                        <rect
                          key={i}
                          x={x(d) - 3}
                          y={0}
                          width={6}
                          height={graphHeight}
                          fill='#fff'
                          opacity={0}
                          onMouseEnter={(event) => {
                            setHoverData({
                              country: xAxisIndicator,
                              continent: `${d}`,
                              rows: dataFormatted.map((el, j) => ({
                                title: el.countryName,
                                value: el.countryFormattedData[el.countryFormattedData.findIndex((d1) => d1.year === d)].param !== undefined ? el.countryFormattedData[el.countryFormattedData.findIndex((d1) => d1.year === d)].param : 'NA',
                                type: 'color',
                                color: COLOR_SCALES.Categorical[j % 8],
                                prefix: xIndicatorMetaData?.LabelPrefix,
                                suffix: xIndicatorMetaData?.LabelSuffix,
                              })),
                              xPosition: event.clientX,
                              yPosition: event.clientY,
                            });
                          }}
                          onMouseMove={(event) => {
                            setHoverData({
                              country: xAxisIndicator,
                              continent: `${d}`,
                              rows: dataFormatted.map((el, j) => ({
                                title: el.countryName,
                                value: el.countryFormattedData[el.countryFormattedData.findIndex((d1) => d1.year === d)].param !== undefined ? el.countryFormattedData[el.countryFormattedData.findIndex((d1) => d1.year === d)].param : 'NA',
                                type: 'color',
                                color: COLOR_SCALES.Categorical[j % 8],
                                prefix: xIndicatorMetaData?.LabelPrefix,
                                suffix: xIndicatorMetaData?.LabelSuffix,
                              })),
                              xPosition: event.clientX,
                              yPosition: event.clientY,
                            });
                          }}
                          onMouseLeave={() => {
                            setHoverData(undefined);
                          }}
                        />
                      ))
                    }
                    {
                      hoverData
                        ? (
                          <line
                            y1={0}
                            y2={graphHeight}
                            x1={hoverData.continent ? x(parseInt(hoverData.continent, 10)) : 0}
                            x2={hoverData.continent ? x(parseInt(hoverData.continent, 10)) : 0}
                            stroke='#212121'
                            strokeDasharray='4 8'
                            strokeWidth={1}
                          />
                        ) : null
                    }
                  </g>
                </g>
              </svg>
            ) : null
        }
        {
          !multiCountrytrendChartCountries ? (
            <InfoNote>
              <>Please select a country above to see the trend for that country</>
              <Select
                showSearch
                className='undp-select'
                placeholder='Please select a country'
                value={multiCountrytrendChartCountries}
                onChange={(d) => { updateMultiCountrytrendChartCountries(d); }}
              >
                {
                  countries.map((d, i) => (
                    <Select.Option className='undp-select-options' key={i}>{d.name}</Select.Option>
                  ))
                }
              </Select>
            </InfoNote>
          ) : null
        }
        {
          multiCountrytrendChartCountries.length === 0 ? (
            <InfoNote>
              <h5 className='undp-typography'>Please select countries to see their trends</h5>
              <Select
                showSearch
                mode='multiple'
                className='undp-select'
                placeholder='Please select a country'
                onChange={(d) => { updateMultiCountrytrendChartCountries(d); }}
                value={multiCountrytrendChartCountries}
                maxTagCount='responsive'
              >
                {
                  countries.map((d, i) => (
                    <Select.Option className='undp-select-option' key={i}>{d.name}</Select.Option>
                  ))
                }
              </Select>
            </InfoNote>
          ) : null
        }
        {
          valueArray.length === 0 && multiCountrytrendChartCountries.length > 0 ? (
            <ErrorNote>
              No data available for the countries selected
            </ErrorNote>
          ) : null
        }
      </GraphEl>
      {
        hoverData ? <TooltipForMultiLineChart data={hoverData} /> : null
      }
    </El>
  );
};
