import { useContext, useState } from 'react';
import { format } from 'd3-format';
import maxBy from 'lodash.maxby';
import max from 'lodash.max';
import orderBy from 'lodash.orderby';
import { Delaunay } from 'd3-delaunay';
import {
  scaleOrdinal,
  scaleLinear,
  scaleThreshold,
  scaleSqrt,
  scaleLog,
} from 'd3-scale';
import minBy from 'lodash.minby';
import UNDPColorModule from 'undp-viz-colors';
import flattenDeep from 'lodash.flattendeep';
import { Tooltip } from '../../Components/Tooltip';
import {
  CountryGroupDataType,
  CtxDataType,
  HoverDataType,
  HoverRowDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import {
  CONTINENTS,
  HDI_LEVELS,
  INCOME_GROUPS,
  MAX_TEXT_LENGTH,
  TRUNCATE_MAX_TEXT_LENGTH,
} from '../../Constants';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  svgWidth: number;
  svgHeight: number;
  regionData?: CountryGroupDataType;
}

export function Graph(props: Props) {
  const { data, indicators, svgHeight, svgWidth, regionData } = props;
  const {
    year,
    xAxisIndicator,
    yAxisIndicator,
    showMostRecentData,
    showLabel,
    showReference,
    sizeIndicator,
    colorIndicator,
    selectedCountries,
    selectedRegions,
    selectedIncomeGroups,
    selectedCountryGroup,
    keepAxisSame,
    xScaleType,
    yScaleType,
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
  const xIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.DataKey === xAxisIndicator)
    ];
  const yIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.DataKey === yAxisIndicator)
    ];
  const sizeIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.DataKey === sizeIndicator)
    ];
  const colorIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.DataKey === colorIndicator)
    ];
  const maxRadiusValue = [0];
  if (sizeIndicatorMetaData) {
    data.forEach(d => {
      const indicatorIndex = d.indicators.findIndex(
        el => sizeIndicatorMetaData.DataKey === el.indicator,
      );
      if (indicatorIndex !== -1) {
        if (
          maxBy(d.indicators[indicatorIndex].yearlyData, el => el.value)
            ?.value !== undefined
        ) {
          maxRadiusValue.push(
            maxBy(d.indicators[indicatorIndex].yearlyData, el => el.value)
              ?.value as number,
          );
        }
      }
    });
  }
  const radiusScale = sizeIndicatorMetaData
    ? scaleSqrt()
        .domain([0, max(maxRadiusValue) as number])
        .range([0.25, 30])
        .nice()
    : undefined;
  const fullArray = flattenDeep(
    data.map(d => {
      const xIndicatorIndex = d.indicators.findIndex(
        el => xIndicatorMetaData.DataKey === el.indicator,
      );
      const xArr = d.indicators[xIndicatorIndex]?.yearlyData.map(
        el => el.value,
      );
      const yIndicatorIndex = d.indicators.findIndex(
        el => yIndicatorMetaData.DataKey === el.indicator,
      );
      const yArr = d.indicators[yIndicatorIndex]?.yearlyData.map(
        el => el.value,
      );
      return {
        x: max(xArr),
        y: max(yArr),
      };
    }),
  ).filter(d => d.x !== undefined && d.y !== undefined);
  const dataFormatted = orderBy(
    data
      .map(d => {
        const xIndicatorIndex = d.indicators.findIndex(
          el => xIndicatorMetaData.DataKey === el.indicator,
        );
        const yIndicatorIndex = d.indicators.findIndex(
          el => yIndicatorMetaData.DataKey === el.indicator,
        );
        const colorIndicatorIndex =
          colorIndicator === 'Human Development Index'
            ? d.indicators.findIndex(
                el => el.indicator === 'Human development index (HDI)',
              )
            : d.indicators.findIndex(
                el => colorIndicatorMetaData?.DataKey === el.indicator,
              );
        const radiusIndicatorIndex = radiusScale
          ? d.indicators.findIndex(
              el => sizeIndicatorMetaData?.DataKey === el.indicator,
            )
          : -1;

        const radiusValue = !radiusScale
          ? 5
          : radiusIndicatorIndex === -1
          ? undefined
          : year !== -1 && !showMostRecentData
          ? d.indicators[radiusIndicatorIndex].yearlyData[
              d.indicators[radiusIndicatorIndex].yearlyData.findIndex(
                el => el.year === year,
              )
            ]?.value
          : d.indicators[radiusIndicatorIndex].yearlyData[
              d.indicators[radiusIndicatorIndex].yearlyData.length - 1
            ]?.value;
        const xVal =
          xIndicatorIndex === -1
            ? undefined
            : year !== -1 && !showMostRecentData
            ? d.indicators[xIndicatorIndex].yearlyData[
                d.indicators[xIndicatorIndex].yearlyData.findIndex(
                  el => el.year === year,
                )
              ]?.value
            : d.indicators[xIndicatorIndex].yearlyData[
                d.indicators[xIndicatorIndex].yearlyData.length - 1
              ]?.value;
        const yVal =
          yIndicatorIndex === -1
            ? undefined
            : year !== -1 && !showMostRecentData
            ? d.indicators[yIndicatorIndex].yearlyData[
                d.indicators[yIndicatorIndex].yearlyData.findIndex(
                  el => el.year === year,
                )
              ]?.value
            : d.indicators[yIndicatorIndex].yearlyData[
                d.indicators[yIndicatorIndex].yearlyData.length - 1
              ]?.value;
        const colorVal =
          colorIndicator === 'Continents'
            ? d['Group 1']
            : colorIndicator === 'Income Groups'
            ? d['Income group']
            : colorIndicator === 'Human Development Index'
            ? year !== -1 && !showMostRecentData
              ? d.indicators[colorIndicatorIndex]?.yearlyData[
                  d.indicators[colorIndicatorIndex].yearlyData.findIndex(
                    el => el.year === year,
                  )
                ]?.value
              : d.indicators[colorIndicatorIndex]?.yearlyData[
                  d.indicators[colorIndicatorIndex].yearlyData.length - 1
                ]?.value
            : colorIndicatorIndex === -1
            ? undefined
            : year !== -1 && !showMostRecentData
            ? d.indicators[colorIndicatorIndex].yearlyData[
                d.indicators[colorIndicatorIndex].yearlyData.findIndex(
                  el => el.year === year,
                )
              ]?.value
            : d.indicators[colorIndicatorIndex].yearlyData[
                d.indicators[colorIndicatorIndex].yearlyData.length - 1
              ]?.value;
        const countryGroup =
          selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];
        const region = !!(
          selectedRegions.length === 0 ||
          selectedRegions.indexOf(d['Group 2']) !== -1
        );
        const xYear =
          year === -1 || showMostRecentData
            ? d.indicators[xIndicatorIndex]?.yearlyData[
                d.indicators[xIndicatorIndex].yearlyData.length - 1
              ]?.year
            : year;
        const yYear =
          year === -1 || showMostRecentData
            ? d.indicators[yIndicatorIndex]?.yearlyData[
                d.indicators[yIndicatorIndex].yearlyData.length - 1
              ]?.year
            : year;
        const radiusYear =
          (year === -1 || showMostRecentData) && radiusIndicatorIndex !== -1
            ? d.indicators[radiusIndicatorIndex]?.yearlyData[
                d.indicators[radiusIndicatorIndex].yearlyData.length - 1
              ]?.year
            : year;
        const colorYear =
          (year === -1 || showMostRecentData) && colorIndicatorIndex !== -1
            ? d.indicators[colorIndicatorIndex]?.yearlyData[
                d.indicators[colorIndicatorIndex].yearlyData.length - 1
              ]?.year
            : year;
        return {
          countryCode: d['Alpha-3 code'],
          radiusValue,
          xVal,
          yVal,
          xYear,
          yYear,
          radiusYear,
          colorYear,
          colorVal,
          region,
          countryGroup,
        };
      })
      .filter(
        d =>
          d.radiusValue !== undefined &&
          d.xVal !== undefined &&
          d.yVal !== undefined &&
          d.countryGroup &&
          d.region,
      ),
    'radiusValue',
    'desc',
  );
  const refXIndicatorIndex = regionData
    ? regionData.indicators.findIndex(
        el => xIndicatorMetaData.DataKey === el.indicator,
      )
    : -1;

  const refXVal =
    refXIndicatorIndex === -1 ||
    !regionData ||
    regionData.indicators[refXIndicatorIndex].yearlyData.length === 0
      ? undefined
      : year !== -1 && !showMostRecentData
      ? regionData.indicators[refXIndicatorIndex].yearlyData[
          regionData.indicators[refXIndicatorIndex].yearlyData.findIndex(
            el => el.year === year,
          )
        ]?.value
      : regionData.indicators[refXIndicatorIndex].yearlyData[
          regionData.indicators[refXIndicatorIndex].yearlyData.length - 1
        ]?.value;
  const xMaxValue = keepAxisSame
    ? (maxBy(fullArray, d => d.x)?.x as number)
    : maxBy(dataFormatted, d => d.xVal)
    ? refXVal && showReference
      ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number) > refXVal
        ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
        : refXVal
      : (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;
  const xMinValue = keepAxisSame
    ? (minBy(fullArray, d => d.x)?.x as number)
    : minBy(dataFormatted, d => d.xVal)
    ? refXVal && showReference
      ? (minBy(dataFormatted, d => d.xVal)?.xVal as number) < refXVal
        ? (minBy(dataFormatted, d => d.xVal)?.xVal as number)
        : refXVal
      : (minBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;
  const refYIndicatorIndex = regionData
    ? regionData.indicators.findIndex(
        el => yIndicatorMetaData.DataKey === el.indicator,
      )
    : -1;

  const refYVal =
    refYIndicatorIndex === -1 ||
    !regionData ||
    regionData.indicators[refYIndicatorIndex].yearlyData.length === 0
      ? undefined
      : year !== -1 && !showMostRecentData
      ? regionData.indicators[refYIndicatorIndex].yearlyData[
          regionData.indicators[refYIndicatorIndex].yearlyData.findIndex(
            el => el.year === year,
          )
        ]?.value
      : regionData.indicators[refYIndicatorIndex].yearlyData[
          regionData.indicators[refYIndicatorIndex].yearlyData.length - 1
        ]?.value;
  const yMaxValue = keepAxisSame
    ? (maxBy(fullArray, d => d.y)?.y as number)
    : maxBy(dataFormatted, d => d.yVal)
    ? refYVal && showReference
      ? (maxBy(dataFormatted, d => d.yVal)?.yVal as number) > refYVal
        ? (maxBy(dataFormatted, d => d.yVal)?.yVal as number)
        : refYVal
      : (maxBy(dataFormatted, d => d.yVal)?.yVal as number)
    : 0;
  const yMinValue = keepAxisSame
    ? (minBy(fullArray, d => d.y)?.y as number)
    : minBy(dataFormatted, d => d.yVal)
    ? refYVal && showReference
      ? (minBy(dataFormatted, d => d.yVal)?.yVal as number) < refYVal
        ? (minBy(dataFormatted, d => d.yVal)?.yVal as number)
        : refYVal
      : (minBy(dataFormatted, d => d.yVal)?.yVal as number)
    : 0;
  const xScaleLogAllowed = !(
    xScaleType === 'linear' ||
    fullArray.filter(d => (d.x as number) <= 0).length > 0
  );
  const yScaleLogAllowed = !(
    yScaleType === 'linear' ||
    fullArray.filter(d => (d.y as number) <= 0).length > 0
  );
  const xScale = !xScaleLogAllowed
    ? scaleLinear()
        .domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue])
        .range([0, graphWidth])
        .nice()
    : scaleLog().domain([xMinValue, xMaxValue]).range([0, graphWidth]).nice();
  const yScale = !yScaleLogAllowed
    ? scaleLinear()
        .domain([yMinValue > 0 ? 0 : yMinValue, yMaxValue])
        .range([graphHeight, 0])
        .nice()
    : scaleLog().domain([yMinValue, yMaxValue]).range([graphHeight, 0]).nice();
  const xTicks = !xScaleLogAllowed ? xScale.ticks(5) : xScale.ticks(3);
  const yTicks = !yScaleLogAllowed ? yScale.ticks(5) : yScale.ticks(3);
  const voronoiDiagram = Delaunay.from(
    dataFormatted,
    d => xScale(d.xVal as number),
    d => yScale(d.yVal as number),
  ).voronoi([0, 0, graphWidth, graphHeight]);

  let colorList: string[] =
    colorIndicator === 'Income Groups'
      ? UNDPColorModule.divergentColors.colorsx04
      : UNDPColorModule.categoricalColors.colors;

  if (colorIndicatorMetaData?.IsCategorical) {
    switch (colorIndicatorMetaData?.Categories.length) {
      case 5:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx05;
        break;
      case 6:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx06;
        break;
      case 7:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx07;
        break;
      case 8:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx08;
        break;
      case 9:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx09;
        break;
      default:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx10;
        break;
    }
  }

  if (colorIndicatorMetaData?.IsDivergent) {
    switch (colorIndicatorMetaData?.Categories.length) {
      case 4:
        colorList = UNDPColorModule.divergentColors.colorsx04;
        break;
      case 5:
        colorList = UNDPColorModule.divergentColors.colorsx05;
        break;
      case 7:
        colorList = UNDPColorModule.divergentColors.colorsx07;
        break;
      case 9:
        colorList = UNDPColorModule.divergentColors.colorsx09;
        break;
      default:
        colorList = UNDPColorModule.divergentColors.colorsx11;
        break;
    }
  }

  const colorDomain =
    colorIndicator === 'Continents'
      ? CONTINENTS
      : colorIndicator === 'Income Groups'
      ? INCOME_GROUPS
      : colorIndicator === 'Human Development Index'
      ? [0.55, 0.7, 0.8]
      : colorIndicatorMetaData?.Categories
      ? colorIndicatorMetaData?.Categories
      : [0, 0];

  const colorScale =
    colorIndicator === 'Human Development Index'
      ? scaleThreshold<string | number, string>()
          .domain(colorDomain)
          .range(UNDPColorModule.divergentColors.colorsx04)
          .unknown(UNDPColorModule.graphGray)
      : scaleOrdinal<string | number, string>()
          .domain(colorDomain)
          .range(colorList)
          .unknown(UNDPColorModule.graphGray);

  return (
    <div style={{ flexGrow: 1 }}>
      <svg width='100%' height='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g transform='translate(90,20)'>
          <text x={0} y={10} fontSize={14} fill='#212121'>
            {colorIndicatorMetaData?.IndicatorLabel
              ? colorIndicatorMetaData?.IndicatorLabel
              : colorIndicator}
          </text>
          {colorIndicator === 'Human Development Index'
            ? UNDPColorModule.divergentColors.colorsx04.map((d, i) => (
                <g
                  transform='translate(0,20)'
                  key={i}
                  onMouseOver={() => {
                    setSelectedColor(d);
                  }}
                  onMouseLeave={() => {
                    setSelectedColor(undefined);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={
                      (i * (graphWidth - 50)) /
                        UNDPColorModule.divergentColors.colorsx04.length +
                      1
                    }
                    y={1}
                    width={
                      (graphWidth - 50) /
                        UNDPColorModule.divergentColors.colorsx04.length -
                      2
                    }
                    height={8}
                    fill={d}
                    stroke={selectedColor === d ? '#212121' : d}
                  />
                  <text
                    x={
                      (i * (graphWidth - 50)) /
                        UNDPColorModule.divergentColors.colorsx04.length +
                      (graphWidth - 50) /
                        2 /
                        UNDPColorModule.divergentColors.colorsx04.length
                    }
                    y={25}
                    textAnchor='middle'
                    fontSize={12}
                    fill='#212121'
                  >
                    {HDI_LEVELS[i]}
                  </text>
                </g>
              ))
            : colorDomain.map((d, i) => (
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
                  x1={0}
                  x2={graphWidth}
                  y1={yScale(d)}
                  y2={yScale(d)}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                  opacity={yScaleLogAllowed && i === 0 ? 0 : 1}
                />
                <text
                  x={0}
                  y={yScale(d)}
                  fill={UNDPColorModule.graphGray}
                  textAnchor='end'
                  fontSize={12}
                  dy={4}
                  dx={-3}
                >
                  {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                </text>
              </g>
            ))}
            <line
              x1={0}
              x2={graphWidth}
              y1={yScaleLogAllowed ? graphHeight : yScale(0)}
              y2={yScaleLogAllowed ? graphHeight : yScale(0)}
              stroke={UNDPColorModule.graphGray}
              strokeWidth={1}
            />
            <text
              x={0}
              y={yScaleLogAllowed ? graphHeight : yScale(0)}
              fill={UNDPColorModule.graphGray}
              textAnchor='end'
              fontSize={12}
              dy={4}
              dx={-3}
            >
              {yScaleLogAllowed ? '' : 0}
            </text>
            <text
              transform={`translate(-50, ${graphHeight / 2}) rotate(-90)`}
              fill='#212121'
              textAnchor='middle'
              fontSize={
                yIndicatorMetaData.IndicatorLabel.length > MAX_TEXT_LENGTH
                  ? 10
                  : 12
              }
            >
              {yIndicatorMetaData.IndicatorLabel.length >
              TRUNCATE_MAX_TEXT_LENGTH
                ? `${yIndicatorMetaData.IndicatorLabel.substring(
                    0,
                    TRUNCATE_MAX_TEXT_LENGTH,
                  )}...`
                : yIndicatorMetaData.IndicatorLabel}
              {yScaleLogAllowed ? ' (Log scale)' : ''}
            </text>
          </g>
          <g>
            {xTicks.map((d, i) => (
              <g key={i} opacity={d === 0 ? 0 : 1}>
                <line
                  y1={0}
                  y2={graphHeight}
                  x1={xScale(d)}
                  x2={xScale(d)}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                  opacity={xScaleLogAllowed && i === 0 ? 0 : 1}
                />
                <text
                  x={xScale(d)}
                  y={graphHeight}
                  fill={UNDPColorModule.graphGray}
                  textAnchor='middle'
                  fontSize={12}
                  dy={15}
                >
                  {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                </text>
              </g>
            ))}
            <line
              y1={0}
              y2={graphHeight}
              x1={xScaleLogAllowed ? 0 : xScale(0)}
              x2={xScaleLogAllowed ? 0 : xScale(0)}
              stroke={UNDPColorModule.graphGray}
              strokeWidth={1}
            />
            <text
              x={xScaleLogAllowed ? 0 : xScale(0)}
              y={graphHeight}
              fill={UNDPColorModule.graphGray}
              textAnchor='middle'
              fontSize={12}
              dy={15}
            >
              {xScaleLogAllowed ? '' : 0}
            </text>
            <text
              transform={`translate(${graphWidth / 2}, ${graphHeight})`}
              fill='#212121'
              textAnchor='middle'
              fontSize={
                yIndicatorMetaData.IndicatorLabel.length > MAX_TEXT_LENGTH
                  ? 10
                  : 12
              }
              dy={30}
            >
              {xIndicatorMetaData.IndicatorLabel.length >
              TRUNCATE_MAX_TEXT_LENGTH
                ? `${xIndicatorMetaData.IndicatorLabel.substring(
                    0,
                    TRUNCATE_MAX_TEXT_LENGTH,
                  )}...`
                : xIndicatorMetaData.IndicatorLabel}
              {xScaleLogAllowed ? ' (Log scale)' : ''}
            </text>
          </g>

          {refXVal && showReference ? (
            <g>
              <line
                style={{
                  stroke: 'var(--gray-700)',
                  strokeWidth: 1.5,
                }}
                strokeDasharray='4,4'
                x1={xScale(refXVal)}
                x2={xScale(refXVal)}
                y1={0}
                y2={graphHeight + 10}
              />
              <text
                y={graphHeight + 7}
                x={xScale(refXVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                dx={5}
                dy={-11}
                textAnchor={xScale(refXVal) > svgWidth / 2 ? 'end' : 'start'}
                fontWeight='bold'
              >
                {regionData?.['Alpha-3 code']}
              </text>
              <text
                y={graphHeight + 7}
                x={xScale(refXVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                fontWeight='bold'
                dx={5}
                dy={6}
                textAnchor={xScale(refXVal) > svgWidth / 2 ? 'end' : 'start'}
              >
                {Math.abs(refXVal) < 1
                  ? refXVal
                  : format('~s')(refXVal).replace('G', 'B')}
              </text>
            </g>
          ) : null}
          {refYVal && showReference ? (
            <g>
              <line
                style={{
                  stroke: 'var(--gray-700)',
                  strokeWidth: 1.5,
                }}
                strokeDasharray='4,4'
                y1={yScale(refYVal)}
                y2={yScale(refYVal)}
                x1={0}
                x2={graphWidth}
              />
              <text
                x={graphWidth}
                y={yScale(refYVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                dy={-5}
                dx={0}
                fontWeight='bold'
                textAnchor='end'
              >
                {regionData?.['Alpha-3 code']}
              </text>
              <text
                x={graphWidth}
                fontWeight='bold'
                y={yScale(refYVal)}
                style={{
                  fill: 'var(--gray-700)',
                }}
                fontSize={12}
                dy={15}
                dx={0}
                textAnchor='end'
              >
                {Math.abs(refYVal) < 1
                  ? refYVal
                  : format('~s')(refYVal).replace('G', 'B')}
              </text>
            </g>
          ) : null}
          {dataFormatted.map((d, i) => {
            const countryData =
              data[data.findIndex(el => el['Alpha-3 code'] === d.countryCode)];
            const incomeGroupOpacity =
              selectedIncomeGroups.length === 0 ||
              selectedIncomeGroups.indexOf(countryData['Income group']) !== -1;
            const countryOpacity =
              selectedCountries.length === 0 ||
              selectedCountries.indexOf(countryData['Country or Area']) !== -1;
            const selectedColorOpacity =
              d.colorVal !== undefined
                ? !selectedColor ||
                  selectedColor === (colorScale(d.colorVal) as string)
                : !selectedColor;
            const rowData: HoverRowDataType[] = [
              {
                title:
                  indicators[
                    indicators.findIndex(el => el.DataKey === xAxisIndicator)
                  ].IndicatorLabel,
                value: d.xVal !== undefined ? d.xVal : 'NA',
                type: 'x-axis',
                year: d.xYear,
                prefix: xIndicatorMetaData?.LabelPrefix,
                suffix: xIndicatorMetaData?.LabelSuffix,
              },
              {
                title:
                  indicators[
                    indicators.findIndex(el => el.DataKey === yAxisIndicator)
                  ].IndicatorLabel,
                value: d.yVal !== undefined ? d.yVal : 'NA',
                type: 'y-axis',
                year: d.yYear,
                prefix: yIndicatorMetaData?.LabelPrefix,
                suffix: yIndicatorMetaData?.LabelSuffix,
              },
            ];
            if (sizeIndicator) {
              rowData.push({
                title:
                  indicators[
                    indicators.findIndex(el => el.DataKey === sizeIndicator)
                  ].IndicatorLabel,
                value: d.radiusValue !== undefined ? d.radiusValue : 'NA',
                type: 'size',
                year: d.radiusYear,
                prefix: sizeIndicatorMetaData?.LabelPrefix,
                suffix: sizeIndicatorMetaData?.LabelSuffix,
              });
            }
            if (
              colorIndicator !== 'Continents' &&
              colorIndicator !== 'Income Groups'
            ) {
              rowData.push({
                title:
                  indicators[
                    indicators.findIndex(el => el.DataKey === colorIndicator)
                  ].IndicatorLabel,
                value: d.colorVal !== undefined ? d.colorVal : 'NA',
                type: 'color',
                year:
                  colorIndicator === 'Income Groups' ? undefined : d.colorYear,
                color: d.colorVal
                  ? (colorScale(d.colorVal) as string)
                  : UNDPColorModule.graphGray,
                prefix: colorIndicatorMetaData?.LabelPrefix,
                suffix: colorIndicatorMetaData?.LabelSuffix,
              });
            }
            if (
              d.xVal === undefined ||
              d.yVal === undefined ||
              d.radiusValue === undefined
            )
              return null;
            return (
              <g key={i}>
                <g
                  opacity={
                    !hoverData
                      ? incomeGroupOpacity &&
                        countryOpacity &&
                        selectedColorOpacity
                        ? 1
                        : 0.1
                      : hoverData.country === countryData['Country or Area']
                      ? 1
                      : 0.1
                  }
                  transform={`translate(${xScale(d.xVal)},${yScale(d.yVal)})`}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={!radiusScale ? 5 : radiusScale(d.radiusValue)}
                    fill={
                      d.colorVal
                        ? (colorScale(d.colorVal) as string)
                        : UNDPColorModule.graphGray
                    }
                    fillOpacity={0.6}
                    stroke={
                      d.colorVal
                        ? (colorScale(d.colorVal) as string)
                        : UNDPColorModule.graphGray
                    }
                  />
                  {showLabel &&
                  (selectedCountries.length === 0 ||
                    selectedCountries.indexOf(
                      countryData['Country or Area'],
                    ) !== -1) ? (
                    <text
                      fontSize={10}
                      fill={
                        d.colorVal
                          ? (colorScale(d.colorVal) as string)
                          : UNDPColorModule.graphGray
                      }
                      y={0}
                      x={!radiusScale ? 5 : radiusScale(d.radiusValue)}
                      dy={4}
                      dx={3}
                    >
                      {countryData['Alpha-3 code']}
                    </text>
                  ) : null}
                </g>
                <path
                  d={voronoiDiagram.renderCell(i)}
                  fill='#fff'
                  opacity={0}
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
                />
              </g>
            );
          })}
        </g>
      </svg>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </div>
  );
}
