import { useContext, useEffect, useRef, useState } from 'react';
import { geoEqualEarth } from 'd3-geo';
import { zoom } from 'd3-zoom';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import * as ss from 'simple-statistics';
import flatten from 'lodash.flatten';
import UNDPColorModule from 'undp-viz-colors';
import { scaleThreshold } from 'd3-scale';
import styled from 'styled-components';
import {
  CtxDataType,
  HoverDataType,
  HoverRowDataType,
  IndicatorNameType,
} from '../../Types';
import Context from '../../Context/Context';
import World from './MapData/worldMap.json';
import { Tooltip } from '../../Components/Tooltip';

const GraphDiv = styled.div`
  flex-grow: 1;
  @media (max-width: 960px) {
    height: 70vw;
    max-height: 31.25rem;
  }
`;

const GraphSVG = styled.svg`
  height: calc(80vh - 60px);
  min-height: calc(46.25rem - 60px);
  @media (max-width: 960px) {
    height: 70vw;
    max-height: 31.25rem;
    min-height: auto;
  }
`;

export function UnivariateMap() {
  const {
    year,
    data,
    indicator,
    spendByPerCapita,
    spendByYearly,
    spendByPPP,
    selectedRegions,
    selectedCountryIncomeGroups,
    selectedCountryGroup,
    selectedCountries,
    incomeRange,
    ageRange,
    gender,
  } = useContext(Context) as CtxDataType;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const svgWidth = 960;
  const svgHeight = 678;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoEqualEarth()
    .rotate([0, 0])
    .scale(180)
    .translate([470, 315]);
  const indicatorName: IndicatorNameType =
    indicator === 'headCount'
      ? 'headcount'
      : `expenditure_${spendByPPP ? 'ppp' : 'nominal'}${
          spendByPerCapita ? '_per_capita' : ''
        }${spendByYearly ? '' : '_daily'}`;
  const d1 = flatten(data.map(d => d.data.map(el => el[indicatorName])));
  const numClasses = 8;
  const bins = ss.jenks(d1, numClasses).slice(1, -1);
  const valueArray = bins.map(d => parseInt(format('.2r')(d), 10));
  const colorArray = UNDPColorModule.sequentialColors.neutralColorsx08;
  const colorScale = scaleThreshold<number, string>()
    .domain(valueArray)
    .range(colorArray);

  useEffect(() => {
    const mapGSelect = select(mapG.current);
    const mapSvgSelect = select(mapSvg.current);
    const zoomBehavior = zoom()
      .scaleExtent([0.75, 6])
      .translateExtent([
        [-20, 0],
        [svgWidth + 20, svgHeight],
      ])
      .on('zoom', ({ transform }) => {
        mapGSelect.attr('transform', transform);
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSvgSelect.call(zoomBehavior as any);
  }, [svgHeight, svgWidth]);
  return (
    <GraphDiv>
      <GraphSVG
        width='100%'
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ref={mapSvg}
      >
        <g ref={mapG}>
          {(World as any).features.map((d: any, i: number) => {
            const index = data.findIndex(
              (el: any) => el['Alpha-3 code'] === d.properties.ISO3,
            );
            if (index !== -1 || d.properties.NAME === 'Antarctica') return null;
            return (
              <g key={i} opacity={!selectedColor ? 1 : 0.3}>
                {d.geometry.type === 'MultiPolygon'
                  ? d.geometry.coordinates.map((el: any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [
                            number,
                            number,
                          ];
                          if (k !== geo.length - 1)
                            path = `${path}${point[0]} ${point[1]}L`;
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
                          fill={UNDPColorModule.graphNoData}
                        />
                      );
                    })
                  : d.geometry.coordinates.map((el: any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [
                          number,
                          number,
                        ];
                        if (k !== el.length - 1)
                          path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill={UNDPColorModule.graphNoData}
                        />
                      );
                    })}
              </g>
            );
          })}
          {data.map((d, i: number) => {
            const index = (World as any).features.findIndex(
              (el: any) => d['Alpha-3 code'] === el.properties.ISO3,
            );
            const val =
              d.data.findIndex(el => el.year === year) === -1
                ? undefined
                : d.data[d.data.findIndex(el => el.year === year)][
                    indicatorName
                  ];
            const color =
              val !== undefined ? colorScale(val) : UNDPColorModule.graphNoData;

            const regionOpacity =
              selectedRegions.length === 0 ||
              selectedRegions.indexOf(d['Group 2']) !== -1;
            const incomeGroupOpacity =
              selectedCountryIncomeGroups.length === 0 ||
              selectedCountryIncomeGroups.indexOf(d['Income group']) !== -1;
            const countryOpacity =
              selectedCountries.length === 0 ||
              selectedCountries.indexOf(d['Country or Area']) !== -1;
            const countryGroupOpacity =
              selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];

            const rowData: HoverRowDataType[] = [
              {
                title:
                  indicator === 'headCount'
                    ? 'Head count'
                    : spendByPerCapita
                    ? 'Expenditure (per capita)'
                    : 'Expenditure (total)',
                value: val === undefined ? 'NA' : val,
                type: 'color',
                year,
                color,
                prefix: indicator === 'headCount' ? undefined : 'US$',
                suffix:
                  indicator === 'headCount'
                    ? undefined
                    : spendByYearly
                    ? 'per year'
                    : 'per day',
              },
            ];
            return (
              <g
                key={i}
                opacity={
                  selectedColor
                    ? selectedColor === color
                      ? 1
                      : 0.1
                    : regionOpacity &&
                      incomeGroupOpacity &&
                      countryOpacity &&
                      countryGroupOpacity
                    ? 1
                    : 0.1
                }
                onMouseEnter={event => {
                  setHoverData({
                    country: d['Country or Area'],
                    continent: d['Group 1'],
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseMove={event => {
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
                {index === -1 || d['Country or Area'] === 'Antarctica'
                  ? null
                  : (World as any).features[index].geometry.type ===
                    'MultiPolygon'
                  ? (World as any).features[index].geometry.coordinates.map(
                      (el: any, j: any) => {
                        let masterPath = '';
                        el.forEach((geo: number[][]) => {
                          let path = ' M';
                          geo.forEach((c: number[], k: number) => {
                            const point = projection([c[0], c[1]]) as [
                              number,
                              number,
                            ];
                            if (k !== geo.length - 1)
                              path = `${path}${point[0]} ${point[1]}L`;
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
                            fill={color}
                          />
                        );
                      },
                    )
                  : (World as any).features[index].geometry.coordinates.map(
                      (el: any, j: number) => {
                        let path = 'M';
                        el.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [
                            number,
                            number,
                          ];
                          if (k !== el.length - 1)
                            path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        return (
                          <path
                            key={j}
                            d={path}
                            stroke='#AAA'
                            strokeWidth={0.25}
                            fill={color}
                          />
                        );
                      },
                    )}
              </g>
            );
          })}
          {hoverData
            ? (World as any).features
                .filter(
                  (d: any) =>
                    d.properties.ISO3 ===
                    data[
                      data.findIndex(
                        el => el['Country or Area'] === hoverData?.country,
                      )
                    ]['Alpha-3 code'],
                )
                .map((d: any, i: number) => (
                  <g
                    style={{ pointerEvents: 'none' }}
                    opacity={!selectedColor ? 1 : 0}
                    key={i}
                  >
                    {d.geometry.type === 'MultiPolygon'
                      ? d.geometry.coordinates.map((el: any, j: any) => {
                          let masterPath = '';
                          el.forEach((geo: number[][]) => {
                            let path = ' M';
                            geo.forEach((c: number[], k: number) => {
                              const point = projection([c[0], c[1]]) as [
                                number,
                                number,
                              ];
                              if (k !== geo.length - 1)
                                path = `${path}${point[0]} ${point[1]}L`;
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
                              fill={UNDPColorModule.graphNoData}
                            />
                          );
                        })
                      : d.geometry.coordinates.map((el: any, j: number) => {
                          let path = 'M';
                          el.forEach((c: number[], k: number) => {
                            const point = projection([c[0], c[1]]) as [
                              number,
                              number,
                            ];
                            if (k !== el.length - 1)
                              path = `${path}${point[0]} ${point[1]}L`;
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
                        })}
                  </g>
                ))
            : null}
        </g>
      </GraphSVG>
      <div
        style={{ position: 'sticky', bottom: '0px' }}
        className='bivariate-legend-container'
      >
        <div className='univariate-legend-el'>
          <div className='univariate-map-color-legend-element'>
            <div>
              <div className='univariate-map-legend-text'>
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
              </div>
              <svg width='100%' viewBox='0 0 320 30'>
                <g>
                  {valueArray.map((d, i) => (
                    <g
                      key={i}
                      onMouseOver={() => {
                        setSelectedColor(colorArray[i]);
                      }}
                      onMouseLeave={() => {
                        setSelectedColor(undefined);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <rect
                        x={(i * 320) / colorArray.length + 1}
                        y={1}
                        width={320 / colorArray.length - 2}
                        height={8}
                        fill={colorArray[i]}
                        stroke={
                          selectedColor === colorArray[i]
                            ? '#212121'
                            : colorArray[i]
                        }
                      />
                      <text
                        x={((i + 1) * 320) / colorArray.length}
                        y={25}
                        textAnchor='middle'
                        fontSize={12}
                        fill='#212121'
                      >
                        {Math.abs(d) < 1
                          ? d
                          : format('~s')(d).replace('G', 'B')}
                      </text>
                    </g>
                  ))}
                  <g>
                    <rect
                      onMouseOver={() => {
                        setSelectedColor(colorArray[valueArray.length]);
                      }}
                      onMouseLeave={() => {
                        setSelectedColor(undefined);
                      }}
                      x={(valueArray.length * 320) / colorArray.length + 1}
                      y={1}
                      width={320 / colorArray.length - 2}
                      height={8}
                      fill={colorArray[valueArray.length]}
                      stroke={
                        selectedColor === colorArray[valueArray.length]
                          ? '#212121'
                          : colorArray[valueArray.length]
                      }
                      strokeWidth={1}
                      style={{ cursor: 'pointer' }}
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className='bivariate-legend-container'
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          marginRight: 'var(--spacing-05)',
          marginBottom: 0,
        }}
      >
        <div
          className='bivariate-legend-el'
          style={{ alignItems: 'flex-start', marginBottom: 0 }}
        >
          <div className='flex-div' style={{ alignItems: 'flex-end' }}>
            <div
              style={{
                display: 'flex',
                pointerEvents: 'auto',
                padding: 'var(--spacing-01)',
                paddingRight: 'var(--spacing-05)',
                backgroundColor: 'rgba(255,255,255,0.4)',
              }}
            >
              <p
                className='undp-typography italics margin-bottom-00'
                style={{ fontSize: '0.5rem' }}
              >
                The boundaries and names and the designations used do not imply
                official endorsement by the UN
              </p>
            </div>
          </div>
        </div>
      </div>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </GraphDiv>
  );
}
