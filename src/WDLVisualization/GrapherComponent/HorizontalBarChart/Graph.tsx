import { useContext, useState } from 'react';
import maxBy from 'lodash.maxby';
import orderBy from 'lodash.orderby';
import { format } from 'd3-format';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
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
}

export function Graph(props: Props) {
  const { svgWidth } = props;
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
    reverseOrder,
    showReference,
    data,
    worldData,
    gender,
    ageRange,
    incomeRange,
  } = useContext(Context) as CtxDataType;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const margin = {
    top: 150,
    bottom: 10,
    left: 175,
    right: 40,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
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
    reverseOrder ? 'desc' : 'asc',
  );

  const svgHeight = dataFormatted.length * 25 + margin.top + margin.bottom;
  const xMaxValue = maxBy(dataFormatted, d => d.xVal)
    ? refXVal && showReference
      ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number) > refXVal
        ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
        : refXVal
      : (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;
  const xMinValue = 0;
  const widthScale = scaleLinear()
    .domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue])
    .range([0, graphWidth])
    .nice();

  const xTicks = widthScale.ticks(5);

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
    <div className='undp-scrollbar'>
      <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <text
          x={margin.left}
          y={30}
          fontSize={14}
          fontWeight='bold'
          fill='#212121'
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
        <g transform={`translate(${margin.left},70)`}>
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
          {xTicks.map((d, i) => (
            <g key={i}>
              <text
                x={widthScale(d)}
                y={-12.5}
                fill='#AAA'
                textAnchor='middle'
                fontSize={12}
              >
                {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
              </text>
              <line
                x1={widthScale(d)}
                x2={widthScale(d)}
                y1={-2.5}
                y2={dataFormatted.length * 25 - 2.5}
                stroke='#AAA'
                strokeWidth={1}
                strokeDasharray='4,8'
                opacity={d === 0 ? 0 : 1}
              />
            </g>
          ))}
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
                <text
                  fill={d.colorVal ? colorScale(d.colorVal) : '#212121'}
                  y={i * 25}
                  x={0}
                  dx={-15}
                  dy={14}
                  fontSize={12}
                  textAnchor='end'
                >
                  {d.countryName.length < 25
                    ? d.countryName
                    : `${d.countryName.substring(0, 25)}...`}
                </text>
                <rect
                  y={i * 25}
                  x={widthScale(Math.min(0, d.xVal))}
                  height={20}
                  fill={
                    d.colorVal
                      ? colorScale(d.colorVal)
                      : UNDPColorModule.graphGray
                  }
                  width={Math.abs(widthScale(d.xVal) - widthScale(0))}
                  rx={3}
                  ry={3}
                />
                <text
                  fill='#212121'
                  fontWeight='bold'
                  y={i * 25}
                  x={
                    d.xVal < 0
                      ? widthScale(Math.min(0, d.xVal))
                      : widthScale(d.xVal)
                  }
                  dx={d.xVal < 0 ? -5 : 5}
                  textAnchor={d.xVal < 0 ? 'end' : 'start'}
                  dy={14}
                  fontSize={12}
                >
                  {d.xVal < 1000000
                    ? format(',')(parseFloat(d.xVal.toFixed(2))).replace(
                        ',',
                        ' ',
                      )
                    : format('.3s')(d.xVal).replace('G', 'B')}
                </text>
              </g>
            );
          })}
          <line
            x1={widthScale(0)}
            x2={widthScale(0)}
            y1={-2.5}
            y2={dataFormatted.length * 25 - 2.5}
            stroke='#212121'
            strokeWidth={1}
          />
          {refXVal && showReference ? (
            <g>
              <line
                style={{
                  stroke: 'var(--gray-700)',
                  strokeWidth: 1.5,
                }}
                strokeDasharray='4,4'
                x1={widthScale(refXVal)}
                x2={widthScale(refXVal)}
                y1={-20}
                y2={dataFormatted.length * 25 - 2.5}
              />
              <text
                y={0}
                x={widthScale(refXVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                dx={5}
                dy={-11}
                textAnchor={
                  widthScale(refXVal) > svgWidth / 2 ? 'end' : 'start'
                }
                fontWeight='bold'
              >
                {worldData['Alpha-3 code']}
              </text>
              <text
                y={0}
                x={widthScale(refXVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                fontWeight='bold'
                dx={5}
                dy={6}
                textAnchor={
                  widthScale(refXVal) > svgWidth / 2 ? 'end' : 'start'
                }
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
    </div>
  );
}
