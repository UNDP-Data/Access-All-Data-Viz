import { useContext, useState } from 'react';
import { line, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import maxBy from 'lodash.maxby';
import minBy from 'lodash.minby';
import { format } from 'd3-format';
import UNDPColorModule from 'undp-viz-colors';
import styled from 'styled-components';
import min from 'lodash.min';
import max from 'lodash.max';
import range from 'lodash.range';
import {
  CtxDataType,
  CountryGroupDataType,
  HoverDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import { Tooltip } from '../../Components/Tooltip';
import { MAX_TEXT_LENGTH } from '../../Constants';
import { GetYearsArray } from '../../Utils/GetYearsArray';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  svgWidth: number;
  svgHeight: number;
  country: string;
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
  const { data, indicators, svgHeight, svgWidth, country } = props;
  const { disaggregationIndicator } = useContext(Context) as CtxDataType;

  const indicatorMetaData =
    disaggregationIndicator?.DisaggregatedIndicators.map(
      d => indicators[indicators.findIndex(indicator => indicator.id === d.id)],
    );

  const countryData =
    data[data.findIndex(d => d['Country or Area'] === country)];

  const minYear = min(
    indicatorMetaData?.map(d => min(GetYearsArray([countryData], d))),
  );
  const maxYear = max(
    indicatorMetaData?.map(d => max(GetYearsArray([countryData], d))),
  );

  if (!minYear || !maxYear || !disaggregationIndicator)
    return (
      <div className='center-area-error-el'>
        No data available for {country}
      </div>
    );

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
  const finalData = disaggregationIndicator.DisaggregatedIndicators.map(ind => {
    const indicatorIndex = countryData?.indicators.findIndex(
      el => ind.DataKey === el.indicator,
    );
    const dataFormatted: DataFormattedType[] = [];
    for (let i = minYear; i < maxYear + 1; i += 1) {
      dataFormatted.push({
        year: i,
        param:
          indicatorIndex !== -1
            ? countryData?.indicators[indicatorIndex]?.yearlyData[
                countryData?.indicators[indicatorIndex].yearlyData.findIndex(
                  el => el.year === i,
                )
              ]?.value
            : undefined,
      });
    }
    return {
      key: ind.key,
      ind: ind.DataKey,
      id: ind.id,
      dataWOUndefined: dataFormatted.filter(el => el.param !== undefined),
      dataWithUndefined: dataFormatted,
      maxValue:
        maxBy(
          dataFormatted.filter(el => el.param !== undefined),
          'param',
        )?.param || 0,
      minValue:
        minBy(
          dataFormatted.filter(el => el.param !== undefined),
          'param',
        )?.param || 0,
    };
  });
  const yearRange = range(minYear, maxYear + 1, 1);
  const minParam: number = minBy(finalData, d => d.minValue)?.minValue
    ? (minBy(finalData, d => d.minValue)?.minValue as number) > 0
      ? 0
      : (minBy(finalData, d => d.minValue)?.minValue as number)
    : 0;
  const maxParam: number = maxBy(finalData, d => d.maxValue)?.maxValue
    ? (maxBy(finalData, d => d.maxValue)?.maxValue as number)
    : 0;
  const x = scaleLinear().domain([minYear, maxYear]).range([0, graphWidth]);
  const y = scaleLinear()
    .domain([minParam, maxParam])
    .range([graphHeight, 0])
    .nice();
  const lineShape = line()
    .defined((d: any) => d.param !== undefined)
    .x((d: any) => x(d.year))
    .y((d: any) => y(d.param))
    .curve(curveMonotoneX);
  const yTicks = y.ticks(5);
  const xTicks = x.ticks(
    (maxYear as number) - (minYear as number) > 10 ||
      (maxYear as number) - (minYear as number) === 0
      ? 10
      : (maxYear as number) - (minYear as number),
  );

  const colorArray =
    disaggregationIndicator?.DisaggregationType === 'Gender'
      ? [
          UNDPColorModule.categoricalColors.genderColors.female,
          UNDPColorModule.categoricalColors.genderColors.male,
          'var(--gray-500)',
        ]
      : disaggregationIndicator?.DisaggregationType === 'Urban/Rural'
      ? [
          UNDPColorModule.categoricalColors.locationColors.urban,
          UNDPColorModule.categoricalColors.locationColors.rural,
          'var(--gray-500)',
        ]
      : UNDPColorModule.categoricalColors.colors;
  return (
    <>
      {finalData.filter(d => d.dataWOUndefined.length > 0).length > 0 ? (
        <>
          <div
            className='flex-div gap-07'
            style={{ padding: '1rem 1rem 0 1rem', justifyContent: 'center' }}
          >
            {disaggregationIndicator.DisaggregatedIndicators.map((d, i) => (
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
                  {d.key}
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
                  {disaggregationIndicator.Indicator.length > MAX_TEXT_LENGTH
                    ? `${disaggregationIndicator.Indicator.substring(
                        0,
                        MAX_TEXT_LENGTH,
                      )}...`
                    : disaggregationIndicator.Indicator}
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
                {finalData.map((fd, i) => (
                  <g key={i}>
                    <path
                      d={lineShape(fd.dataWithUndefined as any) as string}
                      style={{
                        fill: 'none',
                        stroke: colorArray[i],
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      d={lineShape(fd.dataWOUndefined as any) as string}
                      style={{
                        fill: 'none',
                        stroke: colorArray[i],
                        strokeWidth: 2,
                        strokeDasharray: '4 8',
                      }}
                    />

                    {fd.dataWithUndefined
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
                                fill: colorArray[i],
                              }}
                            />
                          </g>
                        ) : null,
                      )}
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
                        country: disaggregationIndicator.Indicator,
                        continent: `${d}`,
                        rows: finalData.map((el, j) => {
                          const indicatorIndex = disaggregationIndicator
                            ? indicators.findIndex(
                                indicator =>
                                  indicator.id ===
                                  disaggregationIndicator
                                    .DisaggregatedIndicators[j].id,
                              )
                            : undefined;
                          return {
                            title: el.key,
                            value:
                              el.dataWithUndefined[
                                el.dataWithUndefined.findIndex(
                                  d1 => d1.year === d,
                                )
                              ].param !== undefined
                                ? el.dataWithUndefined[
                                    el.dataWithUndefined.findIndex(
                                      d1 => d1.year === d,
                                    )
                                  ].param
                                : 'NA',
                            type: 'color',
                            color: colorArray[j],
                            prefix: indicatorIndex
                              ? indicators[indicatorIndex]?.LabelPrefix
                              : '',
                            suffix: indicatorIndex
                              ? indicators[indicatorIndex]?.LabelSuffix
                              : '',
                          };
                        }),
                        xPosition: event.clientX,
                        yPosition: event.clientY,
                      });
                    }}
                    onMouseMove={event => {
                      setHoverData({
                        country: disaggregationIndicator.Indicator,
                        continent: `${d}`,
                        rows: finalData.map((el, j) => {
                          const indicatorIndex = disaggregationIndicator
                            ? indicators.findIndex(
                                indicator =>
                                  indicator.id ===
                                  disaggregationIndicator
                                    .DisaggregatedIndicators[j].id,
                              )
                            : undefined;
                          return {
                            title: el.key,
                            value:
                              el.dataWithUndefined[
                                el.dataWithUndefined.findIndex(
                                  d1 => d1.year === d,
                                )
                              ].param !== undefined
                                ? el.dataWithUndefined[
                                    el.dataWithUndefined.findIndex(
                                      d1 => d1.year === d,
                                    )
                                  ].param
                                : 'NA',
                            type: 'color',
                            color: colorArray[j],
                            prefix: indicatorIndex
                              ? indicators[indicatorIndex]?.LabelPrefix
                              : '',
                            suffix: indicatorIndex
                              ? indicators[indicatorIndex]?.LabelSuffix
                              : '',
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
          </svg>
        </>
      ) : (
        <div className='center-area-error-el'>
          No data available for {country}
        </div>
      )}
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </>
  );
}
