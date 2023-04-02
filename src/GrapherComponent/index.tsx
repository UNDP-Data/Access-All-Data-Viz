import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import {
  CountryGroupDataType,
  CountryListType,
  CtxDataType,
  IndicatorMetaDataWithYear,
} from '../Types';
import {
  ScatterPlotIcon,
  BarGraphIcon,
  MapIcon,
  DualAxesChartIcon,
  MultiLineChartIcon,
  Logo,
} from '../Icons';
import Context from '../Context/Context';
import { Settings } from './Settings';
import { Graph } from './Graph';
import { DataSources } from './DataSources';
import { GetEmbedParams } from '../Components/GetEmbedParams';
import { CopyLinkWithParamButton } from '../Components/CopyLinkWithParamButton';
import { COUNTRIES_BY_UNDP_REGIONS } from '../Constants';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
  regions?: string[];
  countries: CountryListType[];
  region?: string;
}

const IconEl = styled.div`
  display: inline;
  @media (max-width: 980px) {
    display: none;
  }
`;

export function GrapherComponent(props: Props) {
  const { data, indicators, regions, countries, region } = props;
  const {
    graphType,
    showSource,
    selectedCountryOrRegion,
    signatureSolution,
    updateGraphType,
    updateShowSource,
  } = useContext(Context) as CtxDataType;
  const [modalVisibility, setModalVisibility] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    updateShowSource(false);
  }, [graphType]);
  return (
    <>
      <div className='margin-top-06 margin-bottom-06'>
        {queryParams.get('accessAllData') !== 'false' ? (
          <>
            <div className='flex-div flex-space-between flex-vert-align-center margin-bottom-05 flex-wrap'>
              <div className='flex-div flex-vert-align-center'>
                <Logo height={75} />
                <div>
                  <h3
                    className='undp-typography margin-bottom-00'
                    style={{ color: 'var(--blue-600)' }}
                  >
                    Data Futures Platform
                  </h3>
                  <h6 className='undp-typography margin-bottom-00'>
                    Explore All Data
                    {queryParams.get('topic')
                      ? ` for ${queryParams.get('topic')}`
                      : null}
                    {region
                      ? ` for ${
                          COUNTRIES_BY_UNDP_REGIONS[
                            COUNTRIES_BY_UNDP_REGIONS.findIndex(
                              d => d.region === `UNDP_${region}`,
                            )
                          ].name
                        }`
                      : null}
                    {selectedCountryOrRegion
                      ? ` for ${
                          countries[
                            countries.findIndex(
                              d => d.code === selectedCountryOrRegion,
                            )
                          ].name
                        }`
                      : null}
                    {signatureSolution ? ` for ${signatureSolution}` : null}
                  </h6>
                </div>
              </div>
              <div className='flex-div'>
                {queryParams.get('embeded') === 'true' ? null : (
                  <CopyLinkWithParamButton />
                )}
                <button
                  className='undp-button button-primary'
                  type='button'
                  onClick={() => {
                    setModalVisibility(true);
                  }}
                >
                  {window.innerWidth < 600 ? '</>' : 'Embed'}
                </button>
              </div>
            </div>
            <div className='dashboard-container'>
              {queryParams.get('showSettings') === 'false' ? null : (
                <div className='tabs-for-graphing-interface-container'>
                  {selectedCountryOrRegion || region ? null : (
                    <button
                      type='button'
                      className={`tabs-for-graphing-interface${
                        graphType === 'map' ? ' selected' : ''
                      }`}
                      onClick={() => {
                        updateGraphType('map');
                      }}
                    >
                      <IconEl>
                        <MapIcon
                          size={48}
                          fill={
                            graphType === 'map'
                              ? 'var(--blue-600)'
                              : 'var(--gray-500)'
                          }
                        />
                      </IconEl>
                      Maps
                    </button>
                  )}
                  {selectedCountryOrRegion ? null : (
                    <button
                      type='button'
                      className={`tabs-for-graphing-interface${
                        graphType === 'scatterPlot' ? ' selected' : ''
                      }`}
                      onClick={() => {
                        updateGraphType('scatterPlot');
                      }}
                    >
                      <IconEl>
                        <ScatterPlotIcon
                          size={48}
                          fill={
                            graphType === 'scatterPlot'
                              ? 'var(--blue-600)'
                              : 'var(--gray-500)'
                          }
                        />
                      </IconEl>
                      Correlation
                    </button>
                  )}
                  {selectedCountryOrRegion ? (
                    <>
                      <button
                        type='button'
                        className={`tabs-for-graphing-interface${
                          graphType === 'dataList' ? ' selected' : ''
                        }`}
                        onClick={() => {
                          updateGraphType('dataList');
                        }}
                      >
                        <IconEl>
                          <DualAxesChartIcon
                            size={48}
                            fill={
                              graphType === 'dataList'
                                ? 'var(--blue-600)'
                                : 'var(--gray-500)'
                            }
                          />
                        </IconEl>
                        Data List
                      </button>
                      <button
                        type='button'
                        className={`tabs-for-graphing-interface${
                          graphType === 'trendLine' ? ' selected' : ''
                        }`}
                        onClick={() => {
                          updateGraphType('trendLine');
                        }}
                      >
                        <IconEl>
                          <DualAxesChartIcon
                            size={48}
                            fill={
                              graphType === 'trendLine'
                                ? 'var(--blue-600)'
                                : 'var(--gray-500)'
                            }
                          />
                        </IconEl>
                        Dual Axes Line Chart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type='button'
                        className={`tabs-for-graphing-interface${
                          graphType === 'barGraph' ? ' selected' : ''
                        }`}
                        onClick={() => {
                          updateGraphType('barGraph');
                        }}
                      >
                        <IconEl>
                          <BarGraphIcon
                            size={48}
                            fill={
                              graphType === 'barGraph'
                                ? 'var(--blue-600)'
                                : 'var(--gray-500)'
                            }
                          />
                        </IconEl>
                        Ranks
                      </button>
                      <button
                        type='button'
                        className={`tabs-for-graphing-interface${
                          graphType === 'trendLine' ? ' selected' : ''
                        }`}
                        onClick={() => {
                          updateGraphType('trendLine');
                        }}
                      >
                        <IconEl>
                          <DualAxesChartIcon
                            size={48}
                            fill={
                              graphType === 'trendLine'
                                ? 'var(--blue-600)'
                                : 'var(--gray-500)'
                            }
                          />
                        </IconEl>
                        Dual Axes Line Chart
                      </button>
                    </>
                  )}
                  {selectedCountryOrRegion ? null : (
                    <>
                      <button
                        type='button'
                        className={`tabs-for-graphing-interface${
                          graphType === 'multiCountryTrendLine'
                            ? ' selected'
                            : ''
                        }`}
                        onClick={() => {
                          updateGraphType('multiCountryTrendLine');
                        }}
                      >
                        <IconEl>
                          <MultiLineChartIcon
                            size={48}
                            fill={
                              graphType === 'multiCountryTrendLine'
                                ? 'var(--blue-600)'
                                : 'var(--gray-500)'
                            }
                          />
                        </IconEl>
                        Multi Country Trends
                      </button>
                      <button
                        type='button'
                        className={`tabs-for-graphing-interface${
                          graphType === 'dataList' ? ' selected' : ''
                        }`}
                        onClick={() => {
                          updateGraphType('dataList');
                        }}
                      >
                        <IconEl>
                          <DualAxesChartIcon
                            size={48}
                            fill={
                              graphType === 'dataList'
                                ? 'var(--blue-600)'
                                : 'var(--gray-500)'
                            }
                          />
                        </IconEl>
                        Data List
                      </button>
                    </>
                  )}
                </div>
              )}
              <div className='graph-container'>
                {queryParams.get('showSettings') === 'false' ? null : (
                  <Settings
                    indicators={indicators}
                    regions={regions}
                    countries={countries}
                  />
                )}
                <Graph
                  data={data}
                  indicators={indicators}
                  countries={countries}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
      <Modal
        open={modalVisibility}
        className='undp-modal'
        title='Embed Code'
        onOk={() => {
          setModalVisibility(false);
        }}
        onCancel={() => {
          setModalVisibility(false);
        }}
        width='75%'
      >
        <GetEmbedParams />
      </Modal>
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
      >
        <DataSources indicators={indicators} data={data} />
      </Modal>
    </>
  );
}
