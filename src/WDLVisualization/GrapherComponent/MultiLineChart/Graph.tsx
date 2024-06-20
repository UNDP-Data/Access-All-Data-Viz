import { useContext, useState } from 'react';
import { line, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import max from 'lodash.max';
import { format } from 'd3-format';
import UNDPColorModule from 'undp-viz-colors';
import styled from 'styled-components';
import { range } from 'd3-array';
import {
  CtxDataType,
  CountryGroupDataType,
  HoverDataType,
  IndicatorNameType,
} from '../../Types';
import Context from '../../Context/Context';
import { TooltipForMultiLineChart } from '../../Components/TooltipForMultiLineChart';

interface Props {
  data: CountryGroupDataType[];
  svgWidth: number;
  svgHeight: number;
  worldData: CountryGroupDataType;
}

interface DataFormattedType {
  year: number;
  param?: number;
}

const XTickText = styled.text`
  font-size: 12px;
  @media (max-width: 980px) {
    font-size: 10px;
  }
  @media (max-width: 600px) {
    font-size: 9px;
  }
  @media (max-width: 420px) {
    display: none;
  }
`;

const LabelText = styled.text`
  font-size: 12px;
  @media (max-width: 980px) {
    font-size: 10px;
  }
  @media (max-width: 600px) {
    font-size: 9px;
  }
  @media (max-width: 420px) {
    display: 8px;
  }
`;

export function Graph(props: Props) {
  const { data, svgWidth, svgHeight, worldData } = props;
  const {
    indicator,
    spendByPPP,
    spendByPerCapita,
    spendByYearly,
    multiCountryTrendChartCountries,
    showLabel,
    showReference,
    gender,
    ageRange,
    incomeRange,
  } = useContext(Context) as CtxDataType;
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const margin = {
    top: 40,
    bottom: 50,
    left: 90,
    right: 90,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;
  const indicatorName: IndicatorNameType =
    indicator === 'headCount'
      ? 'headcount'
      : `expenditure_${spendByPPP ? 'ppp' : 'nominal'}${
          spendByPerCapita ? '_per_capita' : ''
        }${spendByYearly ? '' : '_daily'}`;

  const countryData = multiCountryTrendChartCountries.map(
    el => data[data.findIndex(d => d['Country or Area'] === el)],
  );
  const valueArray: number[] = [];
  const dataFormatted = countryData.map(d => {
    const countryFormattedData: DataFormattedType[] = [];
    for (let i = 2016; i < 2035; i += 1) {
      const param =
        d.data[d.data.findIndex(el => el.year === i)][indicatorName];
      valueArray.push(param);
      countryFormattedData.push({
        year: i,
        param,
      });
    }
    return {
      countryName: d['Country or Area'],
      alphaCode3: d['Alpha-3 code'],
      countryFormattedData,
      isRegion: false,
    };
  });

  if (showReference) {
    const countryFormattedData: DataFormattedType[] = [];
    for (let i = 2016; i < 2035; i += 1) {
      const param =
        worldData.data[worldData.data.findIndex(el => el.year === i)][
          indicatorName
        ];
      countryFormattedData.push({
        year: i,
        param,
      });
      valueArray.push(param);
    }
    dataFormatted.push({
      countryName: worldData['Country or Area'],
      alphaCode3: worldData['Alpha-3 code'],
      countryFormattedData,
      isRegion: true,
    });
  }

  const minParam = 0;

  const maxParam = max(valueArray) ? max(valueArray) : 0;

  const minYearFiltered = 2016;
  const maxYearFiltered = 2034;
  const x = scaleLinear()
    .domain([minYearFiltered, maxYearFiltered])
    .range([0, graphWidth]);
  const y = scaleLinear()
    .domain([minParam as number, maxParam as number])
    .range([graphHeight, 0])
    .nice();
  const yearRange = range(minYearFiltered, maxYearFiltered + 1, 1);
  const lineShape1 = line()
    .defined((d: any) => d.param !== undefined)
    .x((d: any) => x(d.year))
    .y((d: any) => y(d.param))
    .curve(curveMonotoneX);
  const yTicks = y.ticks(5);
  const xTicks = x.ticks(
    maxYearFiltered - minYearFiltered > 10
      ? 10
      : maxYearFiltered - minYearFiltered === 0
      ? 1
      : maxYearFiltered - minYearFiltered,
  );
  return (
    <>
      {valueArray.length > 0 ? (
        <svg
          width='100%'
          height='100%'
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
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
              {yTicks.map((d, i) => (
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
              ))}
              <LabelText
                transform={`translate(-60, ${graphHeight / 2}) rotate(-90)`}
                fill='#212121'
                textAnchor='middle'
                fontSize={12}
              >
                {indicator === 'headCount'
                  ? 'Head count'
                  : spendByPerCapita
                  ? 'Expenditure (per capita)'
                  : 'Expenditure (total)'}
                {indicator === 'headCount'
                  ? ''
                  : spendByYearly
                  ? ' per year'
                  : ' per day'}
                {gender === 'All' ? '' : `, ${gender}`}, Age:{' '}
                {ageRange[1] === 80
                  ? `>${ageRange[0]}`
                  : `${ageRange[0]}-${ageRange[0]}`}
                , Income:{' '}
                {incomeRange[1] === 999
                  ? `> USD$ ${incomeRange[0]}`
                  : `USD$ ${incomeRange[0]}-${incomeRange[0]}`}
              </LabelText>
            </g>
            <g>
              {xTicks.map((d, i) => (
                <g key={i}>
                  <XTickText
                    y={graphHeight}
                    x={x(d)}
                    fill='#AAA'
                    textAnchor='middle'
                    fontSize={12}
                    dy={15}
                  >
                    {d}
                  </XTickText>
                </g>
              ))}
            </g>
            <g>
              {dataFormatted.map((d, i) => (
                <g key={d.alphaCode3}>
                  <path
                    d={
                      lineShape1(
                        d.countryFormattedData.filter(
                          el => el.param !== undefined,
                        ) as any,
                      ) as string
                    }
                    fill='none'
                    style={{
                      stroke: d.isRegion
                        ? 'var(--gray-600)'
                        : UNDPColorModule.categoricalColors.colors[i % 10],
                    }}
                    strokeWidth={2}
                    strokeDasharray='4 8'
                  />
                  <path
                    d={lineShape1(d.countryFormattedData as any) as string}
                    fill='none'
                    style={{
                      stroke: d.isRegion
                        ? 'var(--gray-600)'
                        : UNDPColorModule.categoricalColors.colors[i % 10],
                    }}
                    strokeWidth={2}
                  />
                  {d.countryFormattedData
                    .filter(el => el.param !== undefined)
                    .map((el, k) =>
                      el.param !== undefined ? (
                        <g key={k}>
                          <circle
                            cx={x(el.year)}
                            cy={y(el.param)}
                            r={
                              window.innerWidth > 960
                                ? 4
                                : window.innerWidth > 600
                                ? 3
                                : 2
                            }
                            style={{
                              fill: d.isRegion
                                ? 'var(--gray-600)'
                                : UNDPColorModule.categoricalColors.colors[
                                    i % 10
                                  ],
                            }}
                          />
                          {showLabel ? (
                            <text
                              x={x(el.year)}
                              y={y(el.param)}
                              dy={-8}
                              fontSize={12}
                              textAnchor='middle'
                              style={{
                                fill: d.isRegion
                                  ? 'var(--gray-600)'
                                  : UNDPColorModule.categoricalColors.colors[
                                      i % 10
                                    ],
                              }}
                              strokeWidth={0.25}
                              stroke='#fff'
                              fontWeight='bold'
                            >
                              {el.param < 1 ? el.param : format('~s')(el.param)}
                            </text>
                          ) : null}
                        </g>
                      ) : null,
                    )}
                  {d.countryFormattedData.filter(el => el.param !== undefined)
                    .length > 0 ? (
                    <text
                      fontSize={10}
                      style={{
                        fill: d.isRegion
                          ? 'var(--gray-600)'
                          : UNDPColorModule.categoricalColors.colors[i % 10],
                      }}
                      x={x(
                        d.countryFormattedData.filter(
                          el => el.param !== undefined,
                        )[
                          d.countryFormattedData.filter(
                            el => el.param !== undefined,
                          ).length - 1
                        ].year,
                      )}
                      y={y(
                        d.countryFormattedData.filter(
                          el => el.param !== undefined,
                        )[
                          d.countryFormattedData.filter(
                            el => el.param !== undefined,
                          ).length - 1
                        ].param as number,
                      )}
                      dx={5}
                      dy={4}
                    >
                      {d.alphaCode3.replaceAll('UNDP_', '')}
                    </text>
                  ) : null}
                </g>
              ))}
              {yearRange.map((d, i) => (
                <rect
                  key={i}
                  x={x(d) - 3}
                  y={0}
                  width={6}
                  height={graphHeight}
                  fill='#fff'
                  opacity={0}
                  onMouseEnter={event => {
                    setHoverData({
                      country:
                        indicator === 'headCount'
                          ? 'Head count'
                          : spendByPerCapita
                          ? 'Expenditure (per capita)'
                          : 'Expenditure (total)',
                      continent: `${d}`,
                      rows: dataFormatted.map((el, j) => ({
                        title: el.countryName,
                        value:
                          el.countryFormattedData[
                            el.countryFormattedData.findIndex(
                              d1 => d1.year === d,
                            )
                          ].param !== undefined
                            ? el.countryFormattedData[
                                el.countryFormattedData.findIndex(
                                  d1 => d1.year === d,
                                )
                              ].param
                            : 'NA',
                        type: 'color',
                        color: el.isRegion
                          ? 'var(--gray-700)'
                          : UNDPColorModule.categoricalColors.colors[j % 10],
                        prefix: indicator === 'headCount' ? undefined : 'US$',
                        suffix:
                          indicator === 'headCount'
                            ? undefined
                            : spendByYearly
                            ? 'per year'
                            : 'per day',
                      })),
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseMove={event => {
                    setHoverData({
                      country:
                        indicator === 'headCount'
                          ? 'Head count'
                          : spendByPerCapita
                          ? 'Expenditure (per capita)'
                          : 'Expenditure (total)',
                      continent: `${d}`,
                      rows: dataFormatted.map((el, j) => ({
                        title: el.countryName,
                        value:
                          el.countryFormattedData[
                            el.countryFormattedData.findIndex(
                              d1 => d1.year === d,
                            )
                          ].param !== undefined
                            ? el.countryFormattedData[
                                el.countryFormattedData.findIndex(
                                  d1 => d1.year === d,
                                )
                              ].param
                            : 'NA',
                        type: 'color',
                        color: el.isRegion
                          ? 'var(--gray-700)'
                          : UNDPColorModule.categoricalColors.colors[j % 10],
                        prefix: indicator === 'headCount' ? undefined : 'US$',
                        suffix:
                          indicator === 'headCount'
                            ? undefined
                            : spendByYearly
                            ? 'per year'
                            : 'per day',
                      })),
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverData(undefined);
                  }}
                />
              ))}
              {hoverData ? (
                <line
                  y1={0}
                  y2={graphHeight}
                  x1={
                    hoverData.continent
                      ? x(parseInt(hoverData.continent, 10))
                      : 0
                  }
                  x2={
                    hoverData.continent
                      ? x(parseInt(hoverData.continent, 10))
                      : 0
                  }
                  stroke='#212121'
                  strokeDasharray='4 8'
                  strokeWidth={1}
                />
              ) : null}
            </g>
          </g>
        </svg>
      ) : (
        <div className='center-area-error-el'>
          No data available for the countries selected
        </div>
      )}
      {hoverData ? <TooltipForMultiLineChart data={hoverData} /> : null}
    </>
  );
}
