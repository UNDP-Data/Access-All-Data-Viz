/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';
import styled from 'styled-components';
import { select } from 'd3-selection';
import { format } from 'd3-format';
import { Modal } from 'antd';
import CountriesBoundingBoxData from '../../../Data/CountryBoundingBoxData.json';
import {
  MapLayerOptionDataType,
  SubNationalMetaDataType,
} from '../../../Types';
import { COUNTRY_LOOKUP_TABLE } from '../../../Constants';

interface Props {
  countryId: string;
  mapLayer: MapLayerOptionDataType;
  subNationalDataMetaData: SubNationalMetaDataType[];
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
  const { countryId, mapLayer, subNationalDataMetaData } = props;
  const metaData =
    subNationalDataMetaData[
      subNationalDataMetaData.findIndex(d => d.indicator_id === mapLayer.id)
    ];
  const countryIdToLookUp = metaData.useCountryLookup
    ? COUNTRY_LOOKUP_TABLE[
        COUNTRY_LOOKUP_TABLE.findIndex(d => d.isoCode === countryId)
      ].countryName
    : countryId;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const protocol = new pmtiles.Protocol();
  const [hoverData, setHoverData] = useState<HoverDataProps | null>(null);
  const defaultMouseOver = (d: any) => (
    <div
      style={{
        fontSize: '0.875rem',
      }}
    >
      <p
        className='undp-typography margin-bottom-00'
        style={{
          fontSize: '0.875rem',
        }}
      >
        {d.AdminName}{' '}
        <span style={{ color: 'var(--gray-500)' }}>({d.Country})</span>
      </p>
      <p
        className='undp-typography bold margin-bottom-02'
        style={{
          fontSize: '0.875rem',
        }}
      >
        {d.Value.toFixed(1)}
      </p>
      <p
        className='undp-typography italics margin-bottom-00'
        style={{
          fontSize: '0.875rem',
          color: 'var(--gray-500)',
        }}
      >
        Survey type and year: {d.SurveyType} ({d.SurveyYear})
      </p>
    </div>
  );
  useEffect(() => {
    if (map.current) {
      const mapDiv = select('div.map');
      mapDiv.selectAll('div').remove();
      setLoading(true);
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
        url: 'pmtiles://https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Viz/production/public/data/PMTiles/geoBADM0.pmtiles',
      },
    };
    sources[mapLayer.id as string] = {
      type: 'vector',
      url: metaData.pmtilesURL,
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
            filter: ['==', metaData.countryId, countryIdToLookUp],
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
            source: mapLayer.id,
            'source-layer': metaData.sourceLayer,
            filter: ['==', metaData.countryId, countryIdToLookUp],
            paint: {
              'fill-color': '#EDEFF0',
              'fill-outline-color': '#fff',
            },
          },
          {
            id: `layer_${mapLayer.id}`,
            type: 'fill',
            source: mapLayer.id,
            'source-layer': metaData.sourceLayer,
            filter: [
              'all',
              ['==', metaData.countryId, countryIdToLookUp],
              ['has', metaData.hasId],
            ],
            paint: {
              'fill-color': mapLayer.fillSettings,
              'fill-outline-color': '#fff',
            },
          },
        ],
      },
      minZoom: 1.5,
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
    (map as any).current.scrollZoom.disable();
    (map as any).current.on('wheel', (event: any) => {
      if (event.originalEvent.ctrlKey) {
        // Check if CTRL key is pressed
        event.originalEvent.preventDefault(); // Prevent chrome/firefox default behavior
        if (!(map as any).current.scrollZoom._enabled)
          (map as any).current.scrollZoom.enable(); // Enable zoom only if it's disabled
      } else {
        if ((map as any).current.scrollZoom._enabled)
          (map as any).current.scrollZoom.disable(); // Disable zoom only if it's enabled
      }
    });
    /*
    (map as any).current.addControl(
      new maplibreGl.NavigationControl(),
      'top-right',
    );
    */
    let districtHoveredStateId: string | null = null;
    (map as any).current.on('mousemove', `layer_${mapLayer.id}`, (e: any) => {
      (map as any).current.getCanvas().style.cursor = 'pointer';
      if (e.features.length > 0) {
        if (districtHoveredStateId) {
          (map as any).current.setFeatureState(
            {
              source: mapLayer.id,
              id: districtHoveredStateId,
              sourceLayer: metaData.sourceLayer,
            },
            { hover: false },
          );
        }
        districtHoveredStateId = e.features[0].id;
        setHoverData({
          mouseOverDiv: mapLayer.mouseOverInfoFunction
            ? mapLayer.mouseOverInfoFunction(e.features[0].properties)
            : defaultMouseOver(e.features[0].properties),
          xPosition: e.originalEvent.clientX,
          yPosition: e.originalEvent.clientY,
        });
        (map as any).current.setFeatureState(
          {
            source: mapLayer.id,
            id: districtHoveredStateId,
            sourceLayer: metaData.sourceLayer,
          },
          { hover: true },
        );
      }
    });
    (map as any).current.on('mouseleave', `layer_${mapLayer.id}`, () => {
      if (districtHoveredStateId) {
        setHoverData(null);
        (map as any).current.setFeatureState(
          {
            source: mapLayer.id,
            id: districtHoveredStateId,
            sourceLayer: metaData.sourceLayer,
          },
          { hover: false },
        );
      }
      districtHoveredStateId = null;
    });
    (map as any).current.on('load', () => {
      setLoading(false);
    });
  }, [mapLayer]);
  return (
    <div className='max-width-1980' style={{ padding: '0 var(--spacing-06)' }}>
      <div
        style={{
          height: 'calc(100vh - 175px)',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            paddingTop: '1rem',
            marginLeft: '1rem',
            position: 'absolute',
            zIndex: '10',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '1rem',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          >
            <p className='undp-typography small-font italics margin-bottom-00'>
              Use ctrl (or cmd for mac) + scroll to zoom the map
            </p>
          </div>
        </div>
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
                  {metaData.indicator_name}
                </div>
                <svg width='100%' viewBox='0 0 320 30'>
                  <g>
                    {mapLayer.binning.map((d, i) => (
                      <g key={i}>
                        <rect
                          x={(i * 320) / mapLayer.colorScale.length + 1}
                          y={1}
                          width={320 / mapLayer.colorScale.length - 2}
                          height={8}
                          fill={mapLayer.colorScale[i]}
                        />
                        {i === mapLayer.binning.length - 1 ? null : (
                          <text
                            x={((i + 1) * 320) / mapLayer.colorScale.length}
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
      <Modal className='undp-modal' open={loading} destroyOnClose>
        <h6 className='undp-typography' style={{ textAlign: 'center' }}>
          Use ctrl (or cmd for mac) + scroll to zoom the map
        </h6>
        <h6 className='undp-typography' style={{ textAlign: 'center' }}>
          Loading Map...
        </h6>
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      </Modal>
    </div>
  );
}
