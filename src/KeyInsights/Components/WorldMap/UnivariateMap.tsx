import { useEffect, useRef, useState } from 'react';
import { geoWinkel3 } from 'd3-geo-projection';
import { zoom } from 'd3-zoom';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import UNDPColorModule from 'undp-viz-colors';
import { scaleThreshold } from 'd3-scale';
import styled from 'styled-components';
import { IndicatorSimplifiedDataType } from '../../../Types';
import World from '../../../Data/worldMap.json';
import { MAP_SETTINGS } from '../../../Constants';

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 8;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  top: ${props =>
    props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40}px;
  left: ${props =>
    props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20}px;
  max-width: 24rem;
  transform: ${props =>
    `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${
      props.verticalAlignment === 'top' ? '-100%' : '0%'
    })`};
`;
interface Props {
  data: IndicatorSimplifiedDataType;
  colorArray: string[];
  valueArray: number[];
  title: string;
  height: number;
}

interface HoverProps {
  country: string;
  val: number | 'Not Available';
  xPosition: number;
  yPosition: number;
}

export function UnivariateMap(props: Props) {
  const { data, colorArray, valueArray, title, height } = props;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [hoverData, setHoverData] = useState<HoverProps | undefined>(undefined);
  const svgWidth = 960;
  const svgHeight = 678;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoWinkel3()
    .rotate([0, 0])
    .scale(MAP_SETTINGS[MAP_SETTINGS.findIndex(d => d.region === 'WLD')].scale)
    .translate([420, 350]);
  const colorScale = scaleThreshold<number, string>()
    .domain(valueArray)
    .range(colorArray);

  useEffect(() => {
    const mapGSelect = select(mapG.current);
    const mapSvgSelect = select(mapSvg.current);
    const zoomBehaviour = zoom()
      .scaleExtent([0.75, 6])
      .translateExtent([
        [-20, 0],
        [svgWidth + 20, svgHeight],
      ])
      .on('zoom', ({ transform }) => {
        mapGSelect.attr('transform', transform);
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSvgSelect.call(zoomBehaviour as any);
  }, [svgHeight, svgWidth]);
  return (
    <>
      <svg
        width='100%'
        style={{
          height: `${height}px`,
        }}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ref={mapSvg}
      >
        <g ref={mapG}>
          {(World as any).features.map((d: any, i: number) => {
            const index = data.countryData.findIndex(
              el => el['Alpha-3 code'] === d.properties.ISO3,
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
          {data.countryData.map((d, i: number) => {
            const index = (World as any).features.findIndex(
              (el: any) => d['Alpha-3 code'] === el.properties.ISO3,
            );
            const val = d.data[d.data.length - 1]?.value;
            const color =
              val !== undefined ? colorScale(val) : UNDPColorModule.graphNoData;
            return (
              <g
                key={i}
                opacity={
                  selectedColor ? (selectedColor === color ? 1 : 0.1) : 1
                }
                onMouseEnter={event => {
                  setHoverData({
                    country: d['Country or Area'],
                    val: val || 'Not Available',
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseMove={event => {
                  setHoverData({
                    country: d['Country or Area'],
                    val: val || 'Not Available',
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
                    data.countryData[
                      data.countryData.findIndex(
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
      </svg>
      <div
        style={{ position: 'sticky', bottom: '0px' }}
        className='bivariate-legend-container'
      >
        <div
          className='univariate-legend-el'
          style={{
            padding: '0',
            margin: 0,
          }}
        >
          <div
            className='univariate-map-color-legend-element'
            style={{
              padding: '0',
            }}
          >
            <div>
              <div className='univariate-map-legend-text'>{title}</div>
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
      {hoverData ? (
        <TooltipEl
          x={hoverData.xPosition}
          y={hoverData.yPosition}
          verticalAlignment={
            hoverData.yPosition > window.innerHeight / 2 ? 'top' : 'bottom'
          }
          horizontalAlignment={
            hoverData.xPosition > window.innerWidth / 2 ? 'left' : 'right'
          }
        >
          <div style={{ padding: 'var(--spacing-03)' }}>
            <p className='undp-typography bold margin-bottom-01 small-font'>
              {hoverData.country}
            </p>
            <p className='undp-typography margin-bottom-00 small-font'>
              {hoverData.val}
            </p>
          </div>
        </TooltipEl>
      ) : null}
    </>
  );
}
