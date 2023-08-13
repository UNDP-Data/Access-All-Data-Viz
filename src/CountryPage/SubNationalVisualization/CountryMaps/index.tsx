/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';
import styled from 'styled-components';
import { select } from 'd3-selection';
import { format } from 'd3-format';
import CountriesBoundingBoxData from '../../../Data/CountryBoundingBoxData.json';
import { MapLayerOptionDataType } from '../../../Types';

interface Props {
  countryId: string;
  mapLayer: MapLayerOptionDataType;
}

interface HoverDataProps {
  mouseOverDiv: JSX.Element;
  xPosition: number;
  yPosition: number;
}

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
  padding: var(--spacing-03);
  background-color: var(--gray-100);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  top: ${props =>
    props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40}px;
  left: ${props =>
    props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20}px;
  transform: ${props =>
    `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${
      props.verticalAlignment === 'top' ? '-100%' : '0%'
    })`};
`;

export function CountryMap(props: Props) {
  const { countryId, mapLayer } = props;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const protocol = new pmtiles.Protocol();
  const [hoverData, setHoverData] = useState<HoverDataProps | null>(null);
  useEffect(() => {
    if (map.current) {
      const mapDiv = select('div.map');
      mapDiv.selectAll('div').remove();
    }
    maplibreGl.addProtocol('pmtiles', protocol.tile);
    // initiate map and add base layer
    const countryBoundingBox =
      CountriesBoundingBoxData[
        CountriesBoundingBoxData.findIndex(d => d['Alpha-3 code'] === countryId)
      ];
    const lon =
      (countryBoundingBox.boundingBox.ne.lon +
        countryBoundingBox.boundingBox.sw.lon) /
      2;
    const lat =
      (countryBoundingBox.boundingBox.ne.lat +
        countryBoundingBox.boundingBox.sw.lat) /
      2;
    const sources: any = {
      admin0: {
        type: 'vector',
        url: 'pmtiles://../data/PMTiles/geoBADM0.pmtiles',
      },
    };
    sources[mapLayer.mapId as string] = {
      type: 'vector',
      url: mapLayer.pmTiles,
    };
    (map as any).current = new maplibreGl.Map({
      container: mapContainer.current as any,
      style: {
        version: 8,
        sources,
        layers: [
          {
            id: 'admin0fill',
            type: 'fill',
            source: 'admin0',
            'source-layer': 'geoBADM0',
            filter: ['==', mapLayer.countryID, countryId],
            paint: {
              'fill-color': '#EDEFF0',
              'fill-outline-color': '#fff',
            },
            minzoom: 0,
            maxzoom: 22,
          },
          {
            id: 'bg',
            type: 'fill',
            source: mapLayer.mapId,
            'source-layer': mapLayer.mapLayerDetails.sourceLayer,
            filter: ['==', mapLayer.countryID, countryId],
            paint: {
              'fill-color': '#EDEFF0',
              'fill-outline-color': '#fff',
            },
          },
          /* mpi layers */
          {
            id: mapLayer.mapLayerDetails.id,
            type: 'fill',
            source: mapLayer.mapId,
            'source-layer': mapLayer.mapLayerDetails.sourceLayer,
            filter: [
              'all',
              ['==', mapLayer.countryID, countryId],
              ['has', mapLayer.mapLayerDetails.hasID],
            ],
            paint: {
              'fill-color': mapLayer.mapLayerDetails.fillSettings,
              'fill-outline-color': '#fff',
            },
          },
        ],
      },
      center: [lon, lat],
      bounds: [
        [
          countryBoundingBox.boundingBox.sw.lon,
          countryBoundingBox.boundingBox.sw.lat,
        ],
        [
          countryBoundingBox.boundingBox.ne.lon,
          countryBoundingBox.boundingBox.ne.lat,
        ],
      ],
    });
    (map as any).current.fitBounds([
      [
        countryBoundingBox.boundingBox.sw.lon,
        countryBoundingBox.boundingBox.sw.lat,
      ],
      [
        countryBoundingBox.boundingBox.ne.lon,
        countryBoundingBox.boundingBox.ne.lat,
      ],
    ]);
    (map as any).current.addControl(new maplibreGl.NavigationControl());
    (map as any).current.scrollZoom.disable();
    let districtHoveredStateId: string | null = null;
    (map as any).current.on(
      'mousemove',
      mapLayer.mapLayerDetails.id,
      (e: any) => {
        (map as any).current.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if (districtHoveredStateId) {
            (map as any).current.setFeatureState(
              {
                source: mapLayer.mapId,
                id: districtHoveredStateId,
                sourceLayer: mapLayer.mapLayerDetails.sourceLayer,
              },
              { hover: false },
            );
          }
          districtHoveredStateId = e.features[0].id;
          setHoverData({
            mouseOverDiv: mapLayer.mapLayerDetails.mouseOverInfoFunction(
              e.features[0].properties,
            ),
            xPosition: e.originalEvent.clientX,
            yPosition: e.originalEvent.clientY,
          });
          (map as any).current.setFeatureState(
            {
              source: mapLayer.mapId,
              id: districtHoveredStateId,
              sourceLayer: mapLayer.mapLayerDetails.sourceLayer,
            },
            { hover: true },
          );
        }
      },
    );
    (map as any).current.on('mouseleave', mapLayer.mapLayerDetails.id, () => {
      if (districtHoveredStateId) {
        setHoverData(null);
        (map as any).current.setFeatureState(
          {
            source: mapLayer.mapId,
            id: districtHoveredStateId,
            sourceLayer: mapLayer.mapLayerDetails.sourceLayer,
          },
          { hover: false },
        );
      }
      districtHoveredStateId = null;
    });
  }, [mapLayer]);
  return (
    <div
      style={{
        height: 'calc(100vh - 180px)',
        margin: '0 auto',
      }}
    >
      <div
        ref={mapContainer}
        className='map'
        style={{ width: '100%', height: '100%' }}
      />
      <div
        style={{ position: 'sticky', bottom: '0px' }}
        className='bivariate-legend-container'
      >
        <div className='univariate-legend-el'>
          <div className='univariate-map-color-legend-element'>
            <div>
              <div className='univariate-map-legend-text'>
                {mapLayer.mapLayerDetails.label}
              </div>
              <svg width='100%' viewBox='0 0 320 30'>
                <g>
                  {mapLayer.mapLayerDetails.binning.map((d, i) => (
                    <g key={i}>
                      <rect
                        x={
                          (i * 320) /
                            mapLayer.mapLayerDetails.colorScale.length +
                          1
                        }
                        y={1}
                        width={
                          320 / mapLayer.mapLayerDetails.colorScale.length - 2
                        }
                        height={8}
                        fill={mapLayer.mapLayerDetails.colorScale[i]}
                      />
                      {i ===
                      mapLayer.mapLayerDetails.binning.length - 1 ? null : (
                        <text
                          x={
                            ((i + 1) * 320) /
                            mapLayer.mapLayerDetails.colorScale.length
                          }
                          y={25}
                          textAnchor='middle'
                          fontSize={12}
                          fill='#212121'
                        >
                          {Math.abs(d) < 1
                            ? d
                            : format('~s')(d).replace('G', 'B')}
                        </text>
                      )}
                    </g>
                  ))}
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
          {hoverData.mouseOverDiv}
        </TooltipEl>
      ) : null}
    </div>
  );
}
