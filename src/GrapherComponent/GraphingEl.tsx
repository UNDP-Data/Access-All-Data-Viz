import { useContext } from 'react';
import {
  BarChart3,
  LineChart,
  List,
  Map,
  ScatterChart,
  Ungroup,
} from 'lucide-react';
import styled from 'styled-components';
import {
  CountryGroupDataType,
  CountryListType,
  CtxDataType,
  DisaggregationMetaDataType,
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
  disaggregationMetaData: DisaggregationMetaDataType[];
}

const TabText = styled.div`
  width: 100%;
  font-family: var(--fontFamily);
  font-size: 0.875rem !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function DataExplorerGraphingEl(props: Props) {
  const {
    data,
    indicators,
    regions,
    countries,
    UNDPRegion,
    loading,
    regionData,
    disaggregationMetaData,
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
            title='Maps'
          >
            <Map
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'map' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <TabText>Maps</TabText>
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
            title='Correlation'
          >
            <ScatterChart
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'scatterPlot'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <TabText>Correlation</TabText>
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
            title='Ranks'
          >
            <BarChart3
              size={40}
              strokeWidth={1.25}
              color={
                graphType === 'barGraph' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <TabText>Ranks</TabText>
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
            title='Dual Axes Line Chart'
          >
            <LineChart
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'trendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <TabText>Dual Axes Line Chart</TabText>
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
            title='Multi Country Trends'
          >
            <LineChart
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'multiCountryTrendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <TabText>Multi Country Trends</TabText>
          </button>
          {disaggregationMetaData.length > 0 ? (
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'disaggregation' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('disaggregation');
              }}
              style={{
                flexWrap: 'wrap',
              }}
              title='Disaggregation'
            >
              <Ungroup
                size={40}
                strokeWidth={1.25}
                stroke={
                  graphType === 'disaggregation'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <TabText>Disaggregation</TabText>
            </button>
          ) : null}
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
            title='Data List'
          >
            <List
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'dataList' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <TabText>Data List</TabText>
          </button>
        </div>
        <div className='graph-container'>
          <Settings
            indicators={indicators}
            regions={regions}
            countries={countries}
            data={data}
            disaggregationMetaData={disaggregationMetaData}
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
  disaggregationMetaData: DisaggregationMetaDataType[];
  regions?: string[];
  countries: CountryListType[];
  UNDPRegion?: string;
  loading: boolean;
}

export function CountryGraphingEl(props: CountryGraphingElProps) {
  const {
    data,
    indicators,
    regions,
    countries,
    UNDPRegion,
    loading,
    disaggregationMetaData,
  } = props;
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
            title='Dual Axis Line Chart'
          >
            <LineChart
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'trendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <TabText>Dual Axes Line Chart</TabText>
          </button>
          {disaggregationMetaData.length > 0 ? (
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'disaggregation' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('disaggregation');
              }}
              style={{
                flexWrap: 'wrap',
              }}
              title='Disaggregation'
            >
              <Ungroup
                size={40}
                strokeWidth={1.25}
                stroke={
                  graphType === 'disaggregation'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <TabText>Disaggregation</TabText>
            </button>
          ) : null}
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
            title='Data List'
          >
            <List
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'dataList' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <TabText>Data List</TabText>
          </button>
        </div>
        <div className='graph-container'>
          <Settings
            indicators={indicators}
            regions={regions}
            countries={countries}
            data={data}
            disaggregationMetaData={disaggregationMetaData}
            countrySettings
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
            title='Dual Axis Line Chart'
          >
            <LineChart
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'trendLine'
                  ? 'var(--blue-600)'
                  : 'var(--gray-500)'
              }
            />
            <TabText>Dual Axes Line Chart</TabText>
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
            title='Data List'
          >
            <List
              size={40}
              strokeWidth={1.25}
              stroke={
                graphType === 'dataList' ? 'var(--blue-600)' : 'var(--gray-500)'
              }
            />
            <TabText>Data List</TabText>
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
