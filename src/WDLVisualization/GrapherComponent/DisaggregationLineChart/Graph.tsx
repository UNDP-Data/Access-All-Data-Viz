import { useContext, useState } from 'react';
import { line, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import UNDPColorModule from 'undp-viz-colors';
import styled from 'styled-components';
import max from 'lodash.max';
import { range } from 'd3-array';
import { CtxDataType, HoverDataType, IndicatorNameType } from '../../Types';
import Context from '../../Context/Context';
import { Tooltip } from '../../Components/Tooltip';

interface Props {
  svgWidth: number;
  svgHeight: number;
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
  const { svgHeight, svgWidth } = props;
  const {
    disaggregatedData,
    trendChartCountry,
    indicator,
    spendByPPP,
    spendByPerCapita,
    spendByYearly,
    disaggregationSettings,
  } = useContext(Context) as CtxDataType;
  const indicatorName: IndicatorNameType =
    indicator === 'headCount'
      ? 'headcount'
      : `expenditure_${spendByPPP ? 'ppp' : 'nominal'}${
          spendByPerCapita ? '_per_capita' : ''
        }${spendByYearly ? '' : '_daily'}`;

  const countryData =
    disaggregatedData[
      disaggregatedData.findIndex(
        d => d['Country or Area'] === trendChartCountry,
      )
    ];

  const maxValueArray = countryData.disaggregation.map(d =>
    max(d.data.map(el => el[indicatorName])),
  ) as number[];
  const minYear = 2016;
  const maxYear = 2034;

  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const margin = {
    top: 0,
    bottom: 50,
    left: 90,
    right: 20,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom - 50;
  const yearRange = range(minYear, maxYear + 1, 1);
  const minParam = 0;
  const maxParam = max(maxValueArray) as number;
  const x = scaleLinear().domain([minYear, maxYear]).range([0, graphWidth]);
  const y = scaleLinear()
    .domain([minParam, maxParam])
    .range([graphHeight, 0])
    .nice();
  const lineShape = line()
    .x((d: any) => x(d.year))
    .y((d: any) => y(d[indicatorName]))
    .curve(curveMonotoneX);
  const yTicks = y.ticks(5);
  const xTicks = x.ticks(
    (maxYear as number) - (minYear as number) > 10 ||
      (maxYear as number) - (minYear as number) === 0
      ? 10
      : (maxYear as number) - (minYear as number),
  );

  const colorArray = UNDPColorModule.categoricalColors.colors;
  return (
    <>
      <div
        className='flex-div gap-05'
        style={{ padding: '1rem 1rem 0 1rem', justifyContent: 'center' }}
      >
        {disaggregationSettings.map((d, i) => (
          <div className='flex-div gap-02 flex-vert-align-center' key={i}>
            <div
              style={{
                width: '1rem',
                height: '0.25rem',
                backgroundColor: colorArray[i],
              }}
            />
            <p
              className='undp-typography margin-bottom-00 small-font'
              style={{
                color: colorArray[i],
              }}
            >
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
      <svg
        width='100%'
        height='100%'
        viewBox={`0 0 ${svgWidth} ${svgHeight - 50}`}
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
            {countryData.disaggregation.map((fd, i) => (
              <g key={i}>
                <path
                  d={lineShape(fd.data as any) as string}
                  style={{
                    fill: 'none',
                    stroke: colorArray[i],
                    strokeWidth: 2,
                  }}
                />

                {fd.data.map((el, k) => (
                  <g key={k}>
                    <circle
                      cx={x(el.year)}
                      cy={y(el[indicatorName])}
                      r={
                        window.innerWidth > 960
                          ? 4
                          : window.innerWidth > 600
                          ? 3
                          : 2
                      }
                      style={{
                        fill: colorArray[i],
                      }}
                    />
                  </g>
                ))}
              </g>
            ))}
          </g>
          <g>
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
                    country: `${
                      indicator === 'headCount'
                        ? 'Head count'
                        : spendByPerCapita
                        ? 'Expenditure (per capita)'
                        : 'Expenditure (total)'
                    }
                    ${
                      indicator === 'headCount'
                        ? ''
                        : spendByYearly
                        ? ' per year'
                        : ' per day'
                    }`,
                    continent: `${d}`,
                    rows: countryData.disaggregation.map((el, j) => {
                      return {
                        title: `{d.gender === 'All' ? 'Both genders' : d.gender}, Age: 
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
                          el.data[el.data.findIndex(d1 => d1.year === d)][
                            indicatorName
                          ],
                        type: 'color',
                        color: colorArray[j],
                        prefix: indicator === 'headCount' ? undefined : 'US$',
                        suffix: '',
                      };
                    }),
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseMove={event => {
                  setHoverData({
                    country: `${
                      indicator === 'headCount'
                        ? 'Head count'
                        : spendByPerCapita
                        ? 'Expenditure (per capita)'
                        : 'Expenditure (total)'
                    }
                    ${
                      indicator === 'headCount'
                        ? ''
                        : spendByYearly
                        ? ' per year'
                        : ' per day'
                    }`,
                    continent: `${d}`,
                    rows: countryData.disaggregation.map((el, j) => {
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
                          el.data[el.data.findIndex(d1 => d1.year === d)][
                            indicatorName
                          ],
                        type: 'color',
                        color: colorArray[j],
                        prefix: indicator === 'headCount' ? undefined : 'US$',
                        suffix: '',
                      };
                    }),
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseLeave={() => {
                  setHoverData(undefined);
                }}
              />
            ))}
          </g>
          {hoverData ? (
            <line
              y1={0}
              y2={graphHeight}
              x1={
                hoverData.continent ? x(parseInt(hoverData.continent, 10)) : 0
              }
              x2={
                hoverData.continent ? x(parseInt(hoverData.continent, 10)) : 0
              }
              stroke='#212121'
              strokeDasharray='4 8'
              strokeWidth={1}
            />
          ) : null}
        </g>
      </svg>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </>
  );
}
