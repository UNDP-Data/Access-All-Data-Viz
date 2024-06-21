import { useContext, useState } from 'react';
import { format } from 'd3-format';
import maxBy from 'lodash.maxby';
import orderBy from 'lodash.orderby';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import UNDPColorModule from 'undp-viz-colors';
import {
  CtxDataType,
  HoverDataType,
  HoverRowDataType,
  IndicatorNameType,
} from '../../Types';
import Context from '../../Context/Context';
import { CONTINENTS, INCOME_GROUPS } from '../../Constants';
import { Tooltip } from '../../Components/Tooltip';

interface Props {
  svgWidth: number;
  svgHeight: number;
}

export function Graph(props: Props) {
  const { svgWidth, svgHeight } = props;
  const {
    year,
    indicator,
    spendByPPP,
    spendByPerCapita,
    spendByYearly,
    colorIndicator,
    selectedCountries,
    selectedRegions,
    selectedCountryIncomeGroups,
    selectedCountryGroup,
    showReference,
    data,
    worldData,
    gender,
    incomeRange,
    ageRange,
  } = useContext(Context) as CtxDataType;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const margin = {
    top: 90,
    bottom: 50,
    left: 90,
    right: 20,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;
  const indicatorName: IndicatorNameType =
    indicator === 'headCount'
      ? 'headcount'
      : `expenditure_${spendByPPP ? 'ppp' : 'nominal'}${
          spendByPerCapita ? '_per_capita' : ''
        }${spendByYearly ? '' : '_daily'}`;
  const refXVal =
    worldData.data[worldData.data.findIndex(d => d.year === year)][
      indicatorName
    ];

  const dataFormatted = orderBy(
    data
      .map(d => {
        const xVal =
          d.data.findIndex(el => el.year === year) === -1
            ? undefined
            : d.data[d.data.findIndex(el => el.year === year)][indicatorName];
        const colorVal =
          colorIndicator === 'Continents' ? d['Group 1'] : d['Income group'];
        const countryGroup =
          selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];
        const incomeGroup = !!(
          selectedCountryIncomeGroups.length === 0 ||
          selectedCountryIncomeGroups.indexOf(d['Income group']) !== -1
        );
        const region = !!(
          selectedRegions.length === 0 ||
          selectedRegions.indexOf(d['Group 2']) !== -1
        );
        const country = !!(
          selectedCountries.length === 0 ||
          selectedCountries.indexOf(d['Country or Area']) !== -1
        );
        const xYear = year;
        return {
          countryCode: d['Alpha-3 code'],
          countryName: d['Country or Area'],
          xVal,
          colorVal,
          region,
          countryGroup,
          incomeGroup,
          country,
          xYear,
        };
      })
      .filter(
        d =>
          d.xVal !== undefined &&
          d.country &&
          d.countryGroup &&
          d.incomeGroup &&
          d.region,
      ),
    'xVal',
    'asc',
  );
  const xMaxValue = maxBy(dataFormatted, d => d.xVal)
    ? refXVal && showReference
      ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number) > refXVal
        ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
        : refXVal
      : (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;
  const xMinValue = 0;

  const heightScale = scaleLinear()
    .domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue])
    .range([graphHeight, 0])
    .nice();
  const yTicks = heightScale.ticks(5);
  const xScale = scaleBand()
    .domain(dataFormatted.map(d => d.countryCode))
    .range([0, graphWidth])
    .paddingInner(0.25);

  const colorList: string[] =
    colorIndicator === 'Income Groups'
      ? UNDPColorModule.divergentColors.colorsx04
      : UNDPColorModule.categoricalColors.colors;

  const colorDomain =
    colorIndicator === 'Continents' ? CONTINENTS : INCOME_GROUPS;
  const colorScale = scaleOrdinal<string | number, string>()
    .domain(colorDomain)
    .range(colorList)
    .unknown(UNDPColorModule.graphGray);
  return (
    <>
      <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g transform='translate(90,20)'>
          <text x={0} y={10} fontSize={14} fill='#212121'>
            {colorIndicator}
          </text>
          {colorDomain.map((d, i) => (
            <g
              transform='translate(0,20)'
              key={i}
              onMouseOver={() => {
                setSelectedColor(colorList[i]);
              }}
              onMouseLeave={() => {
                setSelectedColor(undefined);
              }}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={(i * (graphWidth - 50)) / colorDomain.length + 1}
                y={1}
                width={(graphWidth - 50) / colorDomain.length - 2}
                height={8}
                fill={colorList[i]}
                stroke={
                  selectedColor === colorList[i] ? '#212121' : colorList[i]
                }
              />
              <text
                x={
                  (i * (graphWidth - 50)) / colorDomain.length +
                  (graphWidth - 50) / 2 / colorDomain.length
                }
                y={25}
                textAnchor='middle'
                fontSize={12}
                fill='#212121'
              >
                {d}
              </text>
            </g>
          ))}
          <g transform='translate(0,20)'>
            <rect
              x={graphWidth - 40}
              y={1}
              width={40}
              height={8}
              fill={UNDPColorModule.graphGray}
              stroke={UNDPColorModule.graphGray}
            />
            <text
              x={graphWidth - 20}
              y={25}
              textAnchor='middle'
              fontSize={12}
              fill={UNDPColorModule.graphGray}
            >
              NA
            </text>
          </g>
        </g>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g>
            {yTicks.map((d, i) => (
              <g key={i} opacity={d === 0 ? 0 : 1}>
                <line
                  y1={heightScale(d)}
                  y2={heightScale(d)}
                  x1={0}
                  x2={graphWidth}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                />
                <text
                  x={0}
                  y={heightScale(d)}
                  fill={UNDPColorModule.graphGray}
                  textAnchor='end'
                  fontSize={12}
                  dy={3}
                  dx={-2}
                >
                  {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                </text>
              </g>
            ))}
            <line
              y1={heightScale(0)}
              y2={heightScale(0)}
              x1={0}
              x2={graphWidth}
              stroke={UNDPColorModule.graphGray}
              strokeWidth={1}
            />
            <text
              x={0}
              y={heightScale(0)}
              fill={UNDPColorModule.graphGray}
              textAnchor='end'
              fontSize={12}
              dy={3}
              dx={-2}
            >
              {0}
            </text>
            <text
              transform={`translate(-50, ${graphHeight / 2}) rotate(-90)`}
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
            </text>
          </g>
          {dataFormatted.map((d, i) => {
            const countryData =
              data[data.findIndex(el => el['Alpha-3 code'] === d.countryCode)];
            const selectedColorOpacity =
              d.colorVal !== undefined
                ? !selectedColor ||
                  selectedColor === (colorScale(d.colorVal) as string)
                : !selectedColor;
            const rowData: HoverRowDataType[] = [
              {
                title:
                  indicator === 'headCount'
                    ? 'Head count'
                    : spendByPerCapita
                    ? 'Expenditure (per capita)'
                    : 'Expenditure (total)',
                value: d.xVal !== undefined ? d.xVal : 'NA',
                type: 'x-axis',
                year,
                prefix: indicator === 'headCount' ? undefined : 'US$',
                suffix:
                  indicator === 'headCount'
                    ? undefined
                    : spendByYearly
                    ? 'per year'
                    : 'per day',
              },
            ];

            if (d.xVal === undefined) return null;
            return (
              <g
                key={i}
                opacity={
                  !hoverData
                    ? selectedColorOpacity
                      ? 1
                      : 0.1
                    : hoverData.country === countryData['Country or Area']
                    ? 1
                    : 0.1
                }
                onMouseEnter={event => {
                  setHoverData({
                    country: countryData['Country or Area'],
                    continent: countryData['Group 1'],
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseMove={event => {
                  setHoverData({
                    country: countryData['Country or Area'],
                    continent: countryData['Group 1'],
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseLeave={() => {
                  setHoverData(undefined);
                }}
              >
                <rect
                  x={xScale(d.countryCode)}
                  y={heightScale(Math.max(0, d.xVal))}
                  width={xScale.bandwidth()}
                  fill={
                    d.colorVal
                      ? colorScale(d.colorVal)
                      : UNDPColorModule.graphGray
                  }
                  height={Math.abs(heightScale(d.xVal) - heightScale(0))}
                />
                {xScale.bandwidth() >= 7 && xScale.bandwidth() < 20 ? (
                  <g
                    transform={`translate(${
                      (xScale(d.countryCode) as number) + xScale.bandwidth() / 2
                    },${heightScale(0)})`}
                  >
                    <text
                      x={0}
                      y={0}
                      fontSize='10px'
                      textAnchor={d.xVal >= 0 ? 'end' : 'start'}
                      fill='#110848'
                      transform='rotate(-90)'
                      dy='5px'
                      dx={d.xVal >= 0 ? '-5px' : '19px'}
                    >
                      {countryData['Alpha-3 code']}
                    </text>
                  </g>
                ) : null}
                {xScale.bandwidth() >= 20 ? (
                  <text
                    x={
                      (xScale(d.countryCode) as number) + xScale.bandwidth() / 2
                    }
                    y={heightScale(0)}
                    fontSize='12px'
                    textAnchor='middle'
                    fill='#110848'
                    dy={d.xVal >= 0 ? '15px' : '-5px'}
                  >
                    {d.countryCode}
                  </text>
                ) : null}
              </g>
            );
          })}
          {refXVal && showReference ? (
            <g>
              <line
                style={{
                  stroke: 'var(--gray-700)',
                  strokeWidth: 1.5,
                }}
                strokeDasharray='4,4'
                y1={heightScale(refXVal)}
                y2={heightScale(refXVal)}
                x1={0 - 15}
                x2={graphWidth}
              />
              <text
                x={0}
                y={heightScale(refXVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                dy={-5}
                dx={0 - 15}
                fontWeight='bold'
              >
                {worldData['Alpha-3 code']}
              </text>
              <text
                x={0}
                fontWeight='bold'
                y={heightScale(refXVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                dy={15}
                dx={0 - 15}
              >
                {Math.abs(refXVal) < 1
                  ? refXVal
                  : format('~s')(refXVal).replace('G', 'B')}
              </text>
            </g>
          ) : null}
        </g>
      </svg>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </>
  );
}
