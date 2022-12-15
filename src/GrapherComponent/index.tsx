import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import {
  CountryListType, CtxDataType, DataType, IndicatorMetaDataWithYear,
} from '../Types';
import {
  ScatterPlotIcon, BarGraphIcon, MapIcon, DualAxesChartIcon, MultiLineChartIcon, Logo,
} from '../Icons';
import Context from '../Context/Context';
import { Settings } from './Settings';
import { Graph } from './Graph';
import { DataSources } from './DataSources';
import { GetEmbedParams } from '../Components/GetEmbedParams';
import { CopyLinkWithParamButton } from '../Components/CopyLinkWithParamButton';

import '../style/buttonStyle.css';
import '../style/modalStyle.css';
import { CountrySummary } from './CountrySummary';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataWithYear[];
  regions: string[];
  countries: CountryListType[];
}
interface SelectedData {
  selected?: boolean;
}

const TabsEl = styled.button<SelectedData>`
  font-size: 0.875rem;
  padding: var(--spacing-04) 0;
  min-width: 6.25rem;
  flex-grow: 1;
  width: 15%;
  max-width: 17.5rem;
  text-transform: uppercase;
  justify-content: center;
  background-color:${(props) => (props.selected ? 'var(--white)' : 'transparent')};
  color:${(props) => (props.selected ? 'var(--blue-600)' : 'var(--gray-700)')};
  text-align: center;
  border: 0;
  border-right: 1px solid var(--gray-500);
  opacity :${(props) => (props.selected ? 1 : 0.8)};
  cursor: pointer;
  div{
    margin-bottom: 0.5rem;
  }
  &:hover {
    opacity: 1;
  }
  @media (max-width: 1172px) {
    width: 20%;
    font-size: 0.75rem;
    &:last-of-type {
      border-right: 0 solid var(--gray-500);
    }
  }
  @media (max-width: 900px) {
    width: fit-content;
    font-size: 0.75rem;
    min-width: 0;
    padding: var(--spacing-04) var(--spacing-06);
    &:last-of-type {
      border-right: 1px solid var(--gray-500);
    }
  }
  @media (max-width: 700px) {
    font-size: 0.75rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const GraphEl = styled.div`
  display: flex;
  align-items: stretch;
  @media (max-width: 960px) {
    display: inline;
  }  
`;

const IconEl = styled.div`
  display: inline;
  @media (max-width: 980px) {
    display: none;
  }
`;

export const GrapherComponent = (props: Props) => {
  const {
    data,
    indicators,
    regions,
    countries,
  } = props;
  const {
    graphType,
    showSource,
    selectedCountry,
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
        {
          selectedCountry && queryParams.get('featuredIndicator') !== 'false' ? <CountrySummary data={data} indicators={indicators} countries={countries} /> : null
        }
        {
          queryParams.get('accessAllData') !== 'false' ? (
            <>
              <div className='flex-div flex-space-between flex-vert-align-center margin-bottom-05 flex-wrap'>
                <div className='flex-div flex-vert-align-center'>
                  <Logo height={75} />
                  <div>
                    <h3 className='undp-typography margin-bottom-00' style={{ color: 'var(--blue-600)' }}>Data Futures Platform</h3>
                    <h6 className='undp-typography margin-bottom-00'>
                      Explore All Data
                      {queryParams.get('topic') ? ` for ${queryParams.get('topic')}` : null}
                      {selectedCountry ? ` for ${countries[countries.findIndex((d) => d.code === selectedCountry)].name}` : null}
                      {signatureSolution ? ` for ${signatureSolution}` : null}
                    </h6>
                  </div>
                </div>
                <div className='flex-div'>
                  {
                    queryParams.get('embeded') === 'true' ? null
                      : (
                        <CopyLinkWithParamButton />
                      )
                  }
                  <button className='undp-button button-primary' type='button' onClick={() => { setModalVisibility(true); }}>
                    {
                      window.innerWidth < 600 ? '</>' : 'Embed'
                    }
                  </button>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'var(--gray-100)',
                  border: '1px solid var(--gray-400)',
                }}
              >
                {
                  queryParams.get('showSettings') === 'false' ? null
                    : (
                      <div className='flex-div' style={{ backgroundColor: 'var(--gray-200)', gap: '0' }}>
                        {
                          selectedCountry ? null
                            : (
                              <TabsEl selected={graphType === 'map'} onClick={() => { updateGraphType('map'); }}>
                                <IconEl>
                                  <MapIcon size={48} fill={graphType === 'map' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Maps</>
                              </TabsEl>
                            )
                        }
                        {
                          selectedCountry ? null
                            : (
                              <TabsEl selected={graphType === 'scatterPlot'} onClick={() => { updateGraphType('scatterPlot'); }}>
                                <IconEl>
                                  <ScatterPlotIcon size={48} fill={graphType === 'scatterPlot' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Correlation</>
                              </TabsEl>
                            )
                        }
                        {
                          selectedCountry ? (
                            <>
                              <TabsEl selected={graphType === 'dataList'} onClick={() => { updateGraphType('dataList'); }}>
                                <IconEl>
                                  <DualAxesChartIcon size={48} fill={graphType === 'dataList' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Data List</>
                              </TabsEl>
                              <TabsEl selected={graphType === 'trendLine'} onClick={() => { updateGraphType('trendLine'); }}>
                                <IconEl>
                                  <DualAxesChartIcon size={48} fill={graphType === 'trendLine' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Dual Axes Line Chart</>
                              </TabsEl>
                              <TabsEl selected={graphType === 'barGraph'} onClick={() => { updateGraphType('barGraph'); }}>
                                <IconEl>
                                  <BarGraphIcon size={48} fill={graphType === 'barGraph' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Ranks</>
                              </TabsEl>
                            </>
                          ) : (
                            <>
                              <TabsEl selected={graphType === 'barGraph'} onClick={() => { updateGraphType('barGraph'); }}>
                                <IconEl>
                                  <BarGraphIcon size={48} fill={graphType === 'barGraph' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Ranks</>
                              </TabsEl>
                              <TabsEl selected={graphType === 'trendLine'} onClick={() => { updateGraphType('trendLine'); }}>
                                <IconEl>
                                  <DualAxesChartIcon size={48} fill={graphType === 'trendLine' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Dual Axes Line Chart</>
                              </TabsEl>
                            </>
                          )
                        }
                        {
                          selectedCountry ? null
                            : (
                              <TabsEl selected={graphType === 'multiCountryTrendLine'} onClick={() => { updateGraphType('multiCountryTrendLine'); }}>
                                <IconEl>
                                  <MultiLineChartIcon size={48} fill={graphType === 'multiCountryTrendLine' ? 'var(--blue-600)' : 'var(--gray-500)'} />
                                </IconEl>
                                <>Multi Country Trends</>
                              </TabsEl>
                            )
                        }
                      </div>
                    )
                }
                <GraphEl>
                  {
                    queryParams.get('showSettings') === 'false' ? null
                      : (
                        <Settings
                          indicators={indicators}
                          regions={regions}
                          countries={countries}
                        />
                      )
                  }
                  {
                    showSource
                      ? (
                        <DataSources
                          indicators={indicators}
                          data={data}
                        />
                      )
                      : (
                        <Graph
                          data={data}
                          indicators={indicators}
                          countries={countries}
                          fullWidth={queryParams.get('showSettings') === 'false'}
                        />
                      )
                  }
                </GraphEl>
              </div>
            </>
          ) : null
        }
      </div>
      <Modal
        open={modalVisibility}
        className='undp-modal'
        title='Embed Code'
        onOk={() => { setModalVisibility(false); }}
        onCancel={() => { setModalVisibility(false); }}
        width='75%'
      >
        <GetEmbedParams />
      </Modal>
    </>
  );
};
