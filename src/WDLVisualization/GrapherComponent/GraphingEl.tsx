import { useContext } from 'react';
import {
  BarChart3,
  LineChart,
  LineChartIcon,
  Map,
  Ungroup,
} from 'lucide-react';
import styled from 'styled-components';
import { CountryListType, CtxDataType } from '../Types';
import Context from '../Context/Context';
import { Settings } from './Settings';
import { Graph } from './Graph';

interface Props {
  regions?: string[];
  countries: CountryListType[];
  loading: boolean;
  countryCode?: string;
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
  const { regions, countries, loading, countryCode } = props;
  const {
    graphType,
    updateGraphType,
    data,
    worldData,
    disaggregationIsLoading,
  } = useContext(Context) as CtxDataType;
  return (
    <div className='margin-top-06 margin-bottom-06'>
      <div className='dashboard-container'>
        {countryCode ? null : (
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
                  graphType === 'barGraph'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <TabText>Ranks</TabText>
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
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'countryLineChart' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('countryLineChart');
              }}
              style={{
                flexWrap: 'wrap',
              }}
              title='Country line chart'
            >
              <LineChartIcon
                size={40}
                strokeWidth={1.25}
                stroke={
                  graphType === 'countryLineChart'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <TabText>Country Line Chart</TabText>
            </button>
          </div>
        )}
        <div className='graph-container'>
          <Settings regions={regions} countries={countries} />
          {loading || worldData.data.length === 0 || data.length === 0 ? (
            <div className='undp-loader-container undp-container'>
              <div className='undp-loader' />
            </div>
          ) : graphType !== 'disaggregation' &&
            graphType !== 'countryLineChart' ? (
            <Graph countries={countries} countryCode={countryCode} />
          ) : disaggregationIsLoading ? (
            <div className='undp-loader-container undp-container'>
              <div className='undp-loader' />
            </div>
          ) : (
            <Graph countries={countries} countryCode={countryCode} />
          )}
        </div>
      </div>
    </div>
  );
}
