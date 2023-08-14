import { useContext, useEffect } from 'react';
import { Modal } from 'antd';
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
import { DataSources } from './DataSources';
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
  const { graphType, showSource, updateGraphType, updateShowSource } =
    useContext(Context) as CtxDataType;
  useEffect(() => {
    updateShowSource(false);
  }, [graphType]);
  return (
    <>
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
              <div style={{ width: '100%' }}>Maps</div>
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
              <div style={{ width: '100%' }}>Correlation</div>
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
                  graphType === 'barGraph'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <div style={{ width: '100%' }}>Ranks</div>
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
              <div style={{ width: '100%' }}>Dual Axes Line Chart</div>
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
              <div style={{ width: '100%' }}>Multi Country Trends</div>
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
                  graphType === 'dataList'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <div style={{ width: '100%' }}>Data List</div>
            </button>
          </div>
          <div className='graph-container'>
            <Settings
              indicators={indicators}
              regions={regions}
              countries={countries}
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
      <Modal
        open={showSource}
        className='undp-modal'
        title='Data Sources'
        onOk={() => {
          updateShowSource(false);
        }}
        onCancel={() => {
          updateShowSource(false);
        }}
        width='75%'
        destroyOnClose
      >
        <DataSources indicators={indicators} data={data} />
      </Modal>
    </>
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
  const { graphType, showSource, updateGraphType, updateShowSource } =
    useContext(Context) as CtxDataType;
  useEffect(() => {
    updateShowSource(false);
  }, [graphType]);
  return (
    <>
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
              <div style={{ width: '100%' }}>Dual Axes Line Chart</div>
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
                  graphType === 'dataList'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <div style={{ width: '100%' }}>Data List</div>
            </button>
          </div>
          <div className='graph-container'>
            <Settings
              indicators={indicators}
              regions={regions}
              countries={countries}
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
      <Modal
        open={showSource}
        className='undp-modal'
        title='Data Sources'
        onOk={() => {
          updateShowSource(false);
        }}
        onCancel={() => {
          updateShowSource(false);
        }}
        width='75%'
        destroyOnClose
      >
        <DataSources indicators={indicators} data={data} />
      </Modal>
    </>
  );
}

interface AggregatedGraphingElProps {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  region: string;
}

export function AggregatedGraphingEl(props: AggregatedGraphingElProps) {
  const { indicators, data, region } = props;
  const { graphType, showSource, updateGraphType, updateShowSource } =
    useContext(Context) as CtxDataType;
  useEffect(() => {
    updateShowSource(false);
  }, [graphType]);
  return (
    <>
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
              <div style={{ width: '100%' }}>Dual Axes Line Chart</div>
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
                  graphType === 'dataList'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <div style={{ width: '100%' }}>Data List</div>
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
      <Modal
        open={showSource}
        className='undp-modal'
        title='Data Sources'
        onOk={() => {
          updateShowSource(false);
        }}
        onCancel={() => {
          updateShowSource(false);
        }}
        width='75%'
        destroyOnClose
      >
        <DataSources indicators={indicators} data={data} />
      </Modal>
    </>
  );
}