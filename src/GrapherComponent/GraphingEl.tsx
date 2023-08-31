import { useContext } from 'react';
import { BarChart3, LineChart, List, Map, ScatterChart } from 'lucide-react';
import {
  CountryGroupDataType,
  CountryListType,
  CtxDataType,
  IndicatorMetaDataType,
} from '../Types';
import Context from '../Context/Context';
import { Settings } from './Settings';
import { Graph } from './Graph';
import { COUNTRIES_BY_UNDP_REGIONS } from '../Constants';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  regions?: string[];
  countries: CountryListType[];
  UNDPRegion?: string;
  loading: boolean;
  regionData?: CountryGroupDataType;
}

export function DataExplorerGraphingEl(props: Props) {
  const {
    data,
    indicators,
    regions,
    countries,
    UNDPRegion,
    loading,
    regionData,
  } = props;
  const { graphType, updateGraphType } = useContext(Context) as CtxDataType;
  return (
    <div className='margin-top-06 margin-bottom-06'>
      <div className='dashboard-container'>
        <div className='tabs-for-graphing-interface-container'>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'map' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('map');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <Map
              size={48}
              stroke={
                graphType === 'map' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Maps
            </div>
          </button>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'scatterPlot' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('scatterPlot');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <ScatterChart
              size={48}
              stroke={
                graphType === 'scatterPlot'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Correlation
            </div>
          </button>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'barGraph' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('barGraph');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <BarChart3
              size={48}
              color={
                graphType === 'barGraph' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Ranks
            </div>
          </button>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'trendLine' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('trendLine');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <LineChart
              size={48}
              stroke={
                graphType === 'trendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Dual Axes Line Chart
            </div>
          </button>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'multiCountryTrendLine' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('multiCountryTrendLine');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <LineChart
              size={48}
              stroke={
                graphType === 'multiCountryTrendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Multi Country Trends
            </div>
          </button>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'dataList' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('dataList');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <List
              size={48}
              stroke={
                graphType === 'dataList' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Data List
            </div>
          </button>
        </div>
        <div className='graph-container'>
          <Settings
            indicators={indicators}
            regions={regions}
            countries={countries}
            data={data}
          />
          {loading ? (
            <div className='undp-loader-container undp-container'>
              <div className='undp-loader' />
            </div>
          ) : (
            <Graph
              data={data}
              indicators={indicators}
              countries={countries}
              UNDPRegion={UNDPRegion}
              regionData={regionData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface CountryGraphingElProps {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  regions?: string[];
  countries: CountryListType[];
  UNDPRegion?: string;
  loading: boolean;
}

export function CountryGraphingEl(props: CountryGraphingElProps) {
  const { data, indicators, regions, countries, UNDPRegion, loading } = props;
  const { graphType, updateGraphType } = useContext(Context) as CtxDataType;
  return (
    <div className='margin-top-06 margin-bottom-06'>
      <div className='dashboard-container'>
        <div className='tabs-for-graphing-interface-container'>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'trendLine' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('trendLine');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <LineChart
              size={48}
              stroke={
                graphType === 'trendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Dual Axes Line Chart
            </div>
          </button>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'dataList' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('dataList');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <List
              size={48}
              stroke={
                graphType === 'dataList' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Data List
            </div>
          </button>
        </div>
        <div className='graph-container'>
          <Settings
            indicators={indicators}
            regions={regions}
            countries={countries}
            data={data}
          />
          {loading ? (
            <div className='undp-loader-container undp-container'>
              <div className='undp-loader' />
            </div>
          ) : (
            <Graph
              data={data}
              indicators={indicators}
              countries={countries}
              UNDPRegion={UNDPRegion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface AggregatedGraphingElProps {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  region: string;
}

export function AggregatedGraphingEl(props: AggregatedGraphingElProps) {
  const { indicators, data, region } = props;
  const { graphType, updateGraphType } = useContext(Context) as CtxDataType;
  return (
    <div className='margin-top-06 margin-bottom-06'>
      <div className='dashboard-container'>
        <div className='tabs-for-graphing-interface-container'>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'trendLine' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('trendLine');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <LineChart
              size={48}
              stroke={
                graphType === 'trendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Dual Axes Line Chart
            </div>
          </button>
          <button
            type='button'
            className={`tabs-for-graphing-interface${
              graphType === 'dataList' ? ' selected' : ''
            }`}
            onClick={() => {
              updateGraphType('dataList');
            }}
            style={{
              flexWrap: 'wrap',
            }}
          >
            <List
              size={48}
              stroke={
                graphType === 'dataList' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--fontFamily)',
                fontSize: '0.875rem',
              }}
            >
              Data List
            </div>
          </button>
        </div>
        <div className='graph-container'>
          <Settings
            indicators={indicators}
            countries={[
              {
                code: region,
                name:
                  region === 'WLD'
                    ? 'World'
                    : COUNTRIES_BY_UNDP_REGIONS[
                        COUNTRIES_BY_UNDP_REGIONS.findIndex(
                          d => d.region === `UNDP_${region}`,
                        )
                      ].name,
              },
            ]}
            data={data}
          />
          <Graph
            data={data}
            indicators={indicators}
            countries={[
              {
                code: region,
                name:
                  region === 'WLD'
                    ? 'World'
                    : COUNTRIES_BY_UNDP_REGIONS[
                        COUNTRIES_BY_UNDP_REGIONS.findIndex(
                          d => d.region === `UNDP_${region}`,
                        )
                      ].name,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
