import { useContext, useState } from 'react';
import { format } from 'd3-format';
import maxBy from 'lodash.maxby';
import { scaleLinear } from 'd3-scale';
import UNDPColorModule from 'undp-viz-colors';
import styled from 'styled-components';
import max from 'lodash.max';
import orderBy from 'lodash.orderby';
import {
  CtxDataType,
  HoverDataType,
  HoverRowDataType,
  IndicatorNameType,
} from '../../Types';
import Context from '../../Context/Context';
import { Tooltip } from '../../Components/Tooltip';

interface Props {
  svgWidth: number;
}

interface ColorKeyDivProps {
  color: string;
}

const ColorKeyDiv = styled.div<ColorKeyDivProps>`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${props => props.color};
  border-radius: 0.75rem;
  margin-bottom: var(--spacing-01);
`;

export function Graph(props: Props) {
  const { svgWidth } = props;
  const {
    year,
    indicator,
    spendByPPP,
    spendByPerCapita,
    spendByYearly,
    disaggregatedData,
    selectedCountryIncomeGroups,
    selectedCountries,
    selectedRegions,
    selectedCountryGroup,
    disaggregationSettings,
    orderDisaggregatedDataBy,
    reverseOrder,
  } = useContext(Context) as CtxDataType;
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const barHeight = 15;
  const barGap = 3;
  const countryGap = 20;
  const countryWidth =
    disaggregationSettings.length * barHeight +
    (disaggregationSettings.length - 1) * barGap;
  const margin = {
    top: 50,
    bottom: 50,
    left: 175,
    right: 20,
  };
  const indicatorName: IndicatorNameType =
    indicator === 'headCount'
      ? 'headcount'
      : `expenditure_${spendByPPP ? 'ppp' : 'nominal'}${
          spendByPerCapita ? '_per_capita' : ''
        }${spendByYearly ? '' : '_daily'}`;
  const ids = disaggregationSettings.map(
    d =>
      `${d.gender} ${d.ageRange[0]}-${d.ageRange[1]} ${d.incomeRange[0]}-${d.incomeRange[1]}`,
  );
  const orderIndex = ids.indexOf(orderDisaggregatedDataBy);
  const dataFormatted = orderBy(
    disaggregatedData
      .map(d => {
        const valArr = d.disaggregation.map(
          el =>
            el.data[el.data.findIndex(dt => dt.year === year)][indicatorName],
        );

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
        return {
          countryCode: d['Alpha-3 code'],
          countryName: d['Country or Area'],
          group1: d['Group 1'],
          valArr,
          region,
          countryGroup,
          incomeGroup,
          country,
          maxValue: max(valArr) as number,
        };
      })
      .filter(d => d.country && d.countryGroup && d.incomeGroup && d.region),
    d => d.valArr[orderIndex],
    reverseOrder ? 'desc' : 'asc',
  );
  const graphWidth = svgWidth - margin.left - margin.right;
  const svgHeight =
    dataFormatted.length * countryWidth +
    (dataFormatted.length - 1) * countryGap +
    margin.top +
    margin.bottom;
  const xMaxValue = maxBy(dataFormatted, d => d.maxValue)
    ? (maxBy(dataFormatted, d => d.maxValue)?.maxValue as number)
    : 0;
  const xMinValue = 0;
  const xScale = scaleLinear()
    .domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue])
    .range([0, graphWidth])
    .nice();

  const xTicks = xScale.ticks(5);

  const colorArray = UNDPColorModule.categoricalColors.colors;

  return (
    <>
      <div
        className='flex-div flex-vert-align-center flex-hor-align-center margin-top-07'
        style={{ flexWrap: 'wrap' }}
      >
        {disaggregationSettings.map((d, i) => (
          <div
            key={i}
            className='flex-div flex-vert-align-center gap-02'
            style={{ flexShrink: 0 }}
          >
            <ColorKeyDiv color={colorArray[i]} />
            <p className='undp-typography small-font margin-bottom-00'>
              {d.gender === 'All' ? 'Both genders' : d.gender}, Age:{' '}
              {d.ageRange[1] === 80
                ? `> ${d.ageRange[0]}`
                : `${d.ageRange[0]}-${d.ageRange[0]}`}
              , Income:{' '}
              {d.incomeRange[1] === 999
                ? `> USD$ ${d.incomeRange[0]}`
                : `USD$ ${d.incomeRange[0]}-${d.incomeRange[0]}`}
            </p>
          </div>
        ))}
      </div>
      <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xTicks.map((d, i) => (
            <g key={i}>
              <text
                x={xScale(d)}
                y={-12.5}
                fill='#AAA'
                textAnchor='middle'
                fontSize={12}
              >
                {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
              </text>
              <line
                x1={xScale(d)}
                x2={xScale(d)}
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
            if (d.valArr.length === 0) return null;
            const rowData: HoverRowDataType[] = disaggregationSettings.map(
              (el, j) => {
                return {
                  title: `${
                    el.gender === 'All' ? 'Both genders' : el.gender
                  }, Age: 
                ${
                  el.ageRange[1] === 80
                    ? `> ${el.ageRange[0]}`
                    : `${el.ageRange[0]}-${el.ageRange[0]}`
                }
                , Income: 
                ${
                  el.incomeRange[1] === 999
                    ? `> USD$ ${el.incomeRange[0]}`
                    : `USD$ ${el.incomeRange[0]}-${el.incomeRange[0]}`
                }`,
                  value:
                    d.valArr[j] !== null && d.valArr[j] !== undefined
                      ? d.valArr[j]
                      : 'NA',
                  type: 'color',
                  color: colorArray[j],
                  year,
                  prefix: indicator === 'headCount' ? undefined : 'US$',
                  suffix: '',
                };
              },
            );
            return (
              <g
                key={i}
                transform={`translate(0,${i * (countryWidth + countryGap)})`}
              >
                <text
                  fill='#212121'
                  y={0}
                  x={0}
                  dx={-15}
                  dy={countryWidth / 2 + 2.5}
                  fontSize={12}
                  textAnchor='end'
                >
                  {d.countryName.length < 25
                    ? d.countryName
                    : `${d.countryName.substring(0, 25)}...`}
                </text>
                {d.valArr.map((el, j) =>
                  el !== undefined ? (
                    <g
                      key={i}
                      onMouseEnter={event => {
                        setHoverData({
                          country: d.countryName,
                          continent: d.group1,
                          rows: rowData,
                          xPosition: event.clientX,
                          yPosition: event.clientY,
                        });
                      }}
                      onMouseMove={event => {
                        setHoverData({
                          country: d.countryName,
                          continent: d.group1,
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
                        x={0}
                        y={j * (barHeight + barGap)}
                        width={xScale(el)}
                        height={barHeight}
                        style={{
                          fill: colorArray[j],
                        }}
                      />
                      <text
                        style={{
                          fill: colorArray[j],
                        }}
                        fontWeight='bold'
                        y={j * (barHeight + barGap)}
                        x={xScale(el)}
                        dx={5}
                        textAnchor='start'
                        dy={barHeight / 2 + 4}
                        fontSize={12}
                      >
                        {el < 1000000
                          ? format(',')(parseFloat(el.toFixed(2))).replace(
                              ',',
                              ' ',
                            )
                          : format('.3s')(el).replace('G', 'B')}
                      </text>
                    </g>
                  ) : null,
                )}
              </g>
            );
          })}
        </g>
      </svg>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </>
  );
}
