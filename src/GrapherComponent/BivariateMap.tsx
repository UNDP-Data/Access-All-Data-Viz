import {
  useContext, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { geoEqualEarth } from 'd3-geo';
import { zoom } from 'd3-zoom';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import maxBy from 'lodash.maxby';
import max from 'lodash.max';
import {
  scaleThreshold, scaleOrdinal, scaleSqrt,
} from 'd3-scale';
import {
  CtxDataType, CountryGroupDataType, HoverDataType, HoverRowDataType, IndicatorMetaDataWithYear,
} from '../Types';
import Context from '../Context/Context';
import World from '../Data/worldMap.json';
import { COLOR_SCALES } from '../Constants';
import { Tooltip } from '../Components/Tooltip';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
}

const El = styled.div`
  height: calc(100% - 89px);
  overflow-y: hidden;
`;

const LegendEl = styled.div`
  padding: 0.75rem;
  margin-left: 0.75rem;
  margin-top: -1.25rem;
  position: relative;
  z-index: 5;
  padding-right: 5rem;
`;

const LegendSizeEl = styled.div`
  padding: 0.75rem;
  margin-left: 0.75rem;
  width: 10rem;
  position: relative;
  z-index: 5;
`;

const TitleEl = styled.h6`
  width: 100%;
`;

const XLegendTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-size: 0.75rem !important;
  color: var(--gray-700);
  width:8.125rem;
`;

const YLegendTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-size: 0.75rem !important;
  width:8.125rem;
  color: var(--gray-700);    
  position: absolute;
  top: 80px;
  transform: translateY(-50%) translateX(50%) rotate(-90deg) translateY(100%);
`;

const LegendContainer = styled.div`
  display: flex;
  margin-top: -2rem;
  pointer-events: none;
  margin-left: 1rem;
  padding-top: 1rem;
  @media (min-width: 961px) {
    transform: translateY(-100%);
    width: fit-content;
    background-color: rgba(255,255,255, 0.75);
  }
`;

const G = styled.g`
  pointer-events: none;
`;

export const BivariateMap = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  const {
    year,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    showMostRecentData,
    selectedCountries,
    selectedRegions,
    selectedIncomeGroups,
    selectedCountryGroup,
  } = useContext(Context) as CtxDataType;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(undefined);
  const queryParams = new URLSearchParams(window.location.search);
  const svgWidth = queryParams.get('showSettings') === 'false' && window.innerWidth > 960 ? 1280 : 960;
  const svgHeight = 678;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoEqualEarth().rotate([0, 0]).scale(180).translate([470, 315]);
  const xIndicatorMetaData = indicators[indicators.findIndex((indicator) => indicator.IndicatorLabelTable === xAxisIndicator)];
  const yIndicatorMetaData = indicators[indicators.findIndex((indicator) => indicator.IndicatorLabelTable === yAxisIndicator)];

  const xDomain = xIndicatorMetaData.IsCategorical ? xIndicatorMetaData.Categories : xIndicatorMetaData.BinningRange5;
  const yDomain = yIndicatorMetaData.IsCategorical ? yIndicatorMetaData.Categories : yIndicatorMetaData.BinningRange5;

  const xRange = xIndicatorMetaData.IsCategorical || xIndicatorMetaData.Categories.length === 5
    ? xIndicatorMetaData.Categories.length === 10
      ? [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
      : xIndicatorMetaData.Categories.length === 7 ? [0, 0, 1, 2, 3, 4, 4] : [0, 1, 2, 3, 4]
    : [0, 1, 2, 3, 4];
  const xKey = xIndicatorMetaData.IsCategorical
    ? xIndicatorMetaData.Categories.length === 10
      ? ['1,2', '3,4', '5,6', '7,8', '9,10']
      : xIndicatorMetaData.Categories.length === 7 ? ['1,2', '3', '4', '5', '6,7'] : [1, 2, 3, 4, 5]
    : xIndicatorMetaData.BinningRange5;
  const yKey = yIndicatorMetaData.IsCategorical
    ? yIndicatorMetaData.Categories.length === 10
      ? ['1,2', '3,4', '5,6', '7,8', '9,10']
      : yIndicatorMetaData.Categories.length === 7 ? ['1,2', '3', '4', '5', '6,7'] : [1, 2, 3, 4, 5]
    : yIndicatorMetaData.BinningRange5;

  const yRange = yIndicatorMetaData.IsCategorical || yIndicatorMetaData.Categories.length === 5
    ? yIndicatorMetaData.Categories.length === 10
      ? [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
      : yIndicatorMetaData.Categories.length === 7 ? [0, 0, 1, 2, 3, 4, 4] : [0, 1, 2, 3, 4]
    : [0, 1, 2, 3, 4];

  const xScale = xIndicatorMetaData.IsCategorical ? scaleOrdinal<number, number>().domain(xDomain).range(xRange) : scaleThreshold<number, number>().domain(xDomain).range(xRange);
  const yScale = yIndicatorMetaData.IsCategorical ? scaleOrdinal<number, number>().domain(yDomain).range(yRange) : scaleThreshold<number, number>().domain(yDomain).range(yRange);
  const sizeIndicatorMetaData = indicators[indicators.findIndex((indicator) => indicator.IndicatorLabelTable === sizeIndicator)];
  const maxRadiusValue = [0];
  if (sizeIndicator) {
    data.forEach((d) => {
      const indicatorIndex = d.indicators.findIndex((el) => sizeIndicatorMetaData.DataKey === el.indicator);
      if (indicatorIndex !== -1) {
        if (maxBy(d.indicators[indicatorIndex].yearlyData, (el) => el.value)?.value !== undefined) { maxRadiusValue.push(maxBy(d.indicators[indicatorIndex].yearlyData, (el) => el.value)?.value as number); }
      }
    });
  }
  const radiusScale = scaleSqrt().domain([0, max(maxRadiusValue) as number]).range([0.25, 40]).nice();
  useEffect(() => {
    const mapGSelect = select(mapG.current);
    const mapSvgSelect = select(mapSvg.current);
    const zoomBehaviour = zoom()
      .scaleExtent([1, 6])
      .translateExtent([[-20, -50], [svgWidth + 20, svgHeight + 50]])
      .on('zoom', ({ transform }) => {
        mapGSelect.attr('transform', transform);
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSvgSelect.call(zoomBehaviour as any);
  }, [svgHeight, svgWidth]);
  return (
    <El>
      <svg width='100%' height='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`} ref={mapSvg}>
        <g ref={mapG}>
          {
            (World as any).features.map((d: any, i: number) => {
              const index = data.findIndex((el: any) => el['Alpha-3 code'] === d.properties.ISO3);
              if ((index !== -1) || d.properties.NAME === 'Antarctica') return null;
              return (
                <g
                  key={i}
                  opacity={!selectedColor ? 1 : 0.3}
                >
                  {
                  d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any, j: any) => {
                    let masterPath = '';
                    el.forEach((geo: number[][]) => {
                      let path = ' M';
                      geo.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      masterPath += path;
                    });
                    return (
                      <path
                        key={j}
                        d={masterPath}
                        stroke='#AAA'
                        strokeWidth={0.25}
                        fill={COLOR_SCALES.Null}
                      />
                    );
                  }) : d.geometry.coordinates.map((el:any, j: number) => {
                    let path = 'M';
                    el.forEach((c: number[], k: number) => {
                      const point = projection([c[0], c[1]]) as [number, number];
                      if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                      else path = `${path}${point[0]} ${point[1]}`;
                    });
                    return (
                      <path
                        key={j}
                        d={path}
                        stroke='#AAA'
                        strokeWidth={0.25}
                        fill={COLOR_SCALES.Null}
                      />
                    );
                  })
                }
                </g>
              );
            })
          }
          {
            data.map((d, i) => {
              const index = (World as any).features.findIndex((el: any) => d['Alpha-3 code'] === el.properties.ISO3);
              const xIndicatorIndex = d.indicators.findIndex((el) => xIndicatorMetaData.DataKey === el.indicator);
              const yIndicatorIndex = d.indicators.findIndex((el) => yIndicatorMetaData.DataKey === el.indicator);
              const xVal = xIndicatorIndex === -1 ? undefined
                : year !== -1 && !showMostRecentData ? d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
                  : d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.length - 1]?.value;
              const yVal = yIndicatorIndex === -1 ? undefined
                : year !== -1 && !showMostRecentData ? d.indicators[yIndicatorIndex].yearlyData[d.indicators[yIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
                  : d.indicators[yIndicatorIndex].yearlyData[d.indicators[yIndicatorIndex].yearlyData.length - 1]?.value;
              const xColorCoord = xVal !== undefined ? xScale(xIndicatorMetaData.IsCategorical ? Math.floor(xVal) : xVal) : undefined;
              const yColorCoord = yVal !== undefined ? yScale(yIndicatorMetaData.IsCategorical ? Math.floor(yVal) : yVal) : undefined;
              const color = xColorCoord !== undefined && yColorCoord !== undefined ? COLOR_SCALES[`Bivariate${Math.max(Math.min((yKey.length + 1), 5), 4) as 4 | 5}x${Math.max(Math.min((xKey.length + 1), 5), 4) as 4 | 5}`][yColorCoord][xColorCoord] : COLOR_SCALES.Null;

              const regionOpacity = selectedRegions.length === 0 || selectedRegions.indexOf(d['Group 2']) !== -1;
              const incomeGroupOpacity = selectedIncomeGroups.length === 0 || selectedIncomeGroups.indexOf(d['Income group']) !== -1;
              const countryOpacity = selectedCountries.length === 0 || selectedCountries.indexOf(d['Country or Area']) !== -1;
              const countryGroupOpacity = selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];

              const rowData: HoverRowDataType[] = [
                {
                  title: xAxisIndicator,
                  value: xVal === undefined ? 'NA' : xVal,
                  type: 'color',
                  year: xIndicatorIndex === -1 ? undefined : year === -1 || showMostRecentData ? d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.length - 1]?.year : year,
                  color,
                  prefix: xIndicatorMetaData?.LabelPrefix,
                  suffix: xIndicatorMetaData?.LabelSuffix,
                },
                {
                  title: yAxisIndicator,
                  value: yVal === undefined ? 'NA' : yVal,
                  type: 'color',
                  year: yIndicatorIndex === -1 ? undefined : year === -1 || showMostRecentData ? d.indicators[yIndicatorIndex].yearlyData[d.indicators[yIndicatorIndex].yearlyData.length - 1]?.year : year,
                  color,
                  prefix: yIndicatorMetaData?.LabelPrefix,
                  suffix: yIndicatorMetaData?.LabelSuffix,
                },
              ];
              if (sizeIndicatorMetaData) {
                const sizeIndicatorIndex = d.indicators.findIndex((el) => sizeIndicatorMetaData?.DataKey === el.indicator);
                const sizeVal = sizeIndicatorIndex === -1 ? undefined
                  : year !== -1 && !showMostRecentData ? d.indicators[sizeIndicatorIndex].yearlyData[d.indicators[sizeIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
                    : d.indicators[sizeIndicatorIndex].yearlyData[d.indicators[sizeIndicatorIndex].yearlyData.length - 1]?.value;
                rowData.push({
                  title: sizeIndicator,
                  value: sizeVal !== undefined ? sizeVal : 'NA',
                  type: 'size',
                  prefix: sizeIndicatorMetaData?.LabelPrefix,
                  suffix: sizeIndicatorMetaData?.LabelSuffix,
                  year: sizeIndicatorIndex === -1 ? undefined : year === -1 || showMostRecentData ? d.indicators[sizeIndicatorIndex].yearlyData[d.indicators[sizeIndicatorIndex].yearlyData.length - 1]?.year : year,
                });
              }

              return (
                <g
                  key={i}
                  opacity={
                    selectedColor
                      ? selectedColor === color ? 1 : 0.1
                      : regionOpacity && incomeGroupOpacity && countryOpacity && countryGroupOpacity ? 1 : 0.1
                  }
                  onMouseEnter={(event) => {
                    setHoverData({
                      country: d['Country or Area'],
                      continent: d['Group 1'],
                      rows: rowData,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseMove={(event) => {
                    setHoverData({
                      country: d['Country or Area'],
                      continent: d['Group 1'],
                      rows: rowData,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverData(undefined);
                  }}
                >
                  {
                    index === -1 || d['Country or Area'] === 'Antarctica' ? null
                      : (World as any).features[index].geometry.type === 'MultiPolygon' ? (World as any).features[index].geometry.coordinates.map((el:any, j: any) => {
                        let masterPath = '';
                        el.forEach((geo: number[][]) => {
                          let path = ' M';
                          geo.forEach((c: number[], k: number) => {
                            const point = projection([c[0], c[1]]) as [number, number];
                            if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                            else path = `${path}${point[0]} ${point[1]}`;
                          });
                          masterPath += path;
                        });
                        return (
                          <path
                            key={j}
                            d={masterPath}
                            stroke={color === COLOR_SCALES.Null ? '#AAA' : '#fff'}
                            strokeWidth={0.25}
                            fill={color}
                          />
                        );
                      }) : (World as any).features[index].geometry.coordinates.map((el:any, j: number) => {
                        let path = 'M';
                        el.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        return (
                          <path
                            key={j}
                            d={path}
                            stroke={color === COLOR_SCALES.Null ? '#AAA' : '#fff'}
                            strokeWidth={0.25}
                            fill={color}
                          />
                        );
                      })
                  }
                </g>
              );
            })
          }
          {
            hoverData
              ? (World as any).features.filter((d: any) => d.properties.ISO3 === data[data.findIndex((el) => el['Country or Area'] === hoverData?.country)]['Alpha-3 code']).map((d: any, i: number) => (
                <G
                  key={i}
                  opacity={!selectedColor ? 1 : 0}
                >
                  {
                    d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          stroke='#212121'
                          opacity={1}
                          strokeWidth={1}
                          fillOpacity={0}
                          fill={COLOR_SCALES.Null}
                        />
                      );
                    }) : d.geometry.coordinates.map((el:any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#212121'
                          opacity={1}
                          strokeWidth={1}
                          fillOpacity={0}
                          fill='none'
                        />
                      );
                    })
                  }
                </G>
              )) : null
          }
          {
            sizeIndicatorMetaData ? (
              <>
                {
                  data.map((d, i) => {
                    const sizeIndicatorIndex = d.indicators.findIndex((el) => sizeIndicatorMetaData.DataKey === el.indicator);
                    const sizeVal = sizeIndicatorIndex === -1 ? undefined
                      : year !== -1 && !showMostRecentData ? d.indicators[sizeIndicatorIndex].yearlyData[d.indicators[sizeIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
                        : d.indicators[sizeIndicatorIndex].yearlyData[d.indicators[sizeIndicatorIndex].yearlyData.length - 1]?.value;
                    const center = projection([d['Longitude (average)'], d['Latitude (average)']]) as [number, number];
                    const xIndicatorIndex = d.indicators.findIndex((el) => xIndicatorMetaData.DataKey === el.indicator);
                    const yIndicatorIndex = d.indicators.findIndex((el) => yIndicatorMetaData.DataKey === el.indicator);
                    const xVal = xIndicatorIndex === -1 ? undefined
                      : year !== -1 && !showMostRecentData ? d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
                        : d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.length - 1]?.value;
                    const yVal = yIndicatorIndex === -1 ? undefined
                      : year !== -1 && !showMostRecentData ? d.indicators[yIndicatorIndex].yearlyData[d.indicators[yIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
                        : d.indicators[yIndicatorIndex].yearlyData[d.indicators[yIndicatorIndex].yearlyData.length - 1]?.value;
                    const xColorCoord = xVal !== undefined ? xScale(xIndicatorMetaData.IsCategorical ? Math.floor(xVal) : xVal) : undefined;
                    const yColorCoord = yVal !== undefined ? yScale(yIndicatorMetaData.IsCategorical ? Math.floor(yVal) : yVal) : undefined;

                    const color = xColorCoord !== undefined && yColorCoord !== undefined ? COLOR_SCALES[`Bivariate${Math.max(Math.min((yKey.length + 1), 5), 4) as 4 | 5}x${Math.max(Math.min((xKey.length + 1), 5), 4) as 4 | 5}`][yColorCoord][xColorCoord] : COLOR_SCALES.Null;

                    const regionOpacity = selectedRegions.length === 0 || selectedRegions.indexOf(d['Group 2']) !== -1;
                    const incomeGroupOpacity = selectedIncomeGroups.length === 0 || selectedIncomeGroups.indexOf(d['Income group']) !== -1;
                    const countryOpacity = selectedCountries.length === 0 || selectedCountries.indexOf(d['Country or Area']) !== -1;
                    const countryGroupOpacity = selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];
                    const rowData: HoverRowDataType[] = [
                      {
                        title: xAxisIndicator,
                        value: xVal === undefined ? 'NA' : xVal,
                        type: 'color',
                        year: xIndicatorIndex === -1 ? undefined : year === -1 || showMostRecentData ? d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.length - 1]?.year : year,
                        color,
                        prefix: xIndicatorMetaData?.LabelPrefix,
                        suffix: xIndicatorMetaData?.LabelSuffix,
                      },
                      {
                        title: yAxisIndicator,
                        value: yVal === undefined ? 'NA' : yVal,
                        type: 'color',
                        year: yIndicatorIndex === -1 ? undefined : year === -1 || showMostRecentData ? d.indicators[yIndicatorIndex].yearlyData[d.indicators[yIndicatorIndex].yearlyData.length - 1]?.year : year,
                        color,
                        prefix: yIndicatorMetaData?.LabelPrefix,
                        suffix: yIndicatorMetaData?.LabelSuffix,
                      },
                    ];
                    if (sizeIndicatorMetaData) {
                      rowData.push({
                        title: sizeIndicator,
                        value: sizeVal !== undefined ? sizeVal : 'NA',
                        type: 'size',
                        prefix: sizeIndicatorMetaData?.LabelPrefix,
                        suffix: sizeIndicatorMetaData?.LabelSuffix,
                        year: sizeIndicatorIndex === -1 ? undefined : year === -1 || showMostRecentData ? d.indicators[sizeIndicatorIndex].yearlyData[d.indicators[sizeIndicatorIndex].yearlyData.length - 1]?.year : year,
                      });
                    }

                    return (
                      <circle
                        key={i}
                        onMouseEnter={(event) => {
                          setHoverData({
                            country: d['Country or Area'],
                            continent: d['Group 1'],
                            rows: rowData,
                            xPosition: event.clientX,
                            yPosition: event.clientY,
                          });
                        }}
                        onMouseMove={(event) => {
                          setHoverData({
                            country: d['Country or Area'],
                            continent: d['Group 1'],
                            rows: rowData,
                            xPosition: event.clientX,
                            yPosition: event.clientY,
                          });
                        }}
                        onMouseLeave={() => {
                          setHoverData(undefined);
                        }}
                        cx={center[0]}
                        cy={center[1]}
                        r={sizeVal !== undefined ? radiusScale(sizeVal) : 0}
                        stroke='#212121'
                        strokeWidth={1}
                        fill='none'
                        opacity={
                          !hoverData
                            ? selectedColor
                              ? selectedColor === color ? 1 : 0.1
                              : regionOpacity && incomeGroupOpacity && countryOpacity && countryGroupOpacity ? 1 : 0.1
                            : hoverData.country === d['Country or Area'] ? 1 : 0.1
                        }
                      />
                    );
                  })
                }
              </>
            ) : null
          }
        </g>
      </svg>
      <LegendContainer>
        <LegendEl>
          <div
            style={{
              display: 'flex',
              pointerEvents: 'auto',
            }}
          >
            <YLegendTitle>{yIndicatorMetaData.IndicatorLabelTable}</YLegendTitle>
            <div>
              <svg width='135px' viewBox='0 0 135 135'>
                <g>
                  {
                  COLOR_SCALES[`Bivariate${Math.max(Math.min((yKey.length + 1), 5), 4) as 4 | 5}x${Math.max(Math.min((xKey.length + 1), 5), 4) as 4 | 5}`].map((d, i) => (
                    <g
                      key={i}
                      transform={`translate(0,${100 - (i * 25)})`}
                    >
                      {
                        d.map((el, j) => (
                          <rect
                            key={j}
                            y={1}
                            x={(j * 25) + 1}
                            fill={el}
                            width={23}
                            height={23}
                            strokeWidth={selectedColor === el ? 2 : 0.25}
                            stroke={selectedColor === el ? '#212121' : '#fff'}
                            style={{ cursor: 'pointer' }}
                            onMouseOver={() => { setSelectedColor(el); }}
                            onMouseLeave={() => { setSelectedColor(undefined); }}
                          />
                        ))
                      }
                    </g>
                  ))
                }
                  <g
                    transform='translate(0,125)'
                  >
                    {
                      xKey.map((el, j) => (
                        <text
                          key={j}
                          y={10}
                          x={xKey.length === 5 ? (j * 25) + 12.5 : (j + 1) * 25}
                          fill='#212121'
                          fontSize={10}
                          textAnchor='middle'
                        >
                          {typeof el === 'string' || el < 1 ? el : format('~s')(el)}
                        </text>
                      ))
                    }
                  </g>
                  {
                    yKey.map((el, j) => (
                      <g
                        key={j}
                        transform={`translate(${(Math.max(Math.min((xKey.length + 1), 5), 4) * 25) + 10},${yKey.length !== 5 ? 100 - (j * 25) : 100 - (j * 25) + 12.5})`}
                      >
                        <text
                          x={0}
                          transform='rotate(-90)'
                          y={0}
                          fill='#212121'
                          fontSize={10}
                          textAnchor='middle'
                        >
                          {typeof el === 'string' || el < 1 ? el : format('~s')(el)}
                        </text>
                      </g>
                    ))
                  }
                </g>
              </svg>
              <XLegendTitle>{xIndicatorMetaData.IndicatorLabelTable}</XLegendTitle>
            </div>
          </div>
        </LegendEl>
        {
          sizeIndicator
            ? (
              <LegendSizeEl>
                <>
                  <TitleEl className='margin-bottom-00 margin-top-00'>{sizeIndicatorMetaData.IndicatorLabelTable}</TitleEl>
                  <svg width='135' height='90' viewBox='0 0 175 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <text fontSize={12} fontWeight={700} textAnchor='middle' fill='#212121' x={4} y={95}>0</text>
                    <text fontSize={12} fontWeight={700} textAnchor='middle' fill='#212121' x={130} y={95}>{radiusScale.invert(40) > 1 ? format('~s')(radiusScale.invert(40)) : radiusScale.invert(40)}</text>
                    <path d='M4 41L130 0V80L4 41Z' fill='#E9ECF6' />
                    <circle cx='4' cy='41' r='0.25' fill='white' stroke='#212121' strokeWidth='2' />
                    <circle cx='130' cy='41' r='40' fill='white' stroke='#212121' strokeWidth='2' />
                  </svg>
                </>
              </LegendSizeEl>
            )
            : null
        }
      </LegendContainer>
      {
        hoverData ? <Tooltip data={hoverData} /> : null
      }
    </El>
  );
};
