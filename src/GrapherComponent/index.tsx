import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { CtxDataType, DataType, IndicatorMetaDataWithYear } from '../Types';
import {
  ScatterPlotIcon, BarGraphIcon, MapIcon, DualAxesChartIcon, MultiLineChartIcon, Logo,
} from '../Icons';
import Context from '../Context/Context';
import { Settings } from './Settings';
import { Graph } from './Graph';
import { DataSources } from './DataSources';
import { GetEmbedParams } from '../Components/GetEmbedParams';
import { CopyLinkWithParamButton } from '../Components/CopyLinkWithParamButton';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataWithYear[];
  regions: string[];
  countries: string[];
}

const Container = styled.div`
  max-width: 132rem;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const RootEl = styled.div`
  background-color: var(--white);
  color: var(--black-600);
  box-shadow: var(--shadow);
`;

const TabsContainerEl = styled.div`
  background-color: var(--black-200);
  display: flex;
`;

const HeadingEl = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  align-items: center;
`;

interface SelectedData {
  selected?: boolean;
}

const TitleEl = styled.div`
  display: flex;
  align-items: center;
`;

const TabsEl = styled.div<SelectedData>`
  font-size: 1.2rem;
  padding: 1rem 0;
  line-height: 1.4rem;
  min-width: 10rem;
  width: 15%;
  text-transform: uppercase;
  justify-content: center;
  background-color:${(props) => (props.selected ? 'var(--white)' : 'transparent')};
  color:${(props) => (props.selected ? 'var(--primary-blue)' : 'var(--black-600)')};
  text-align: center;
  border-right: 1px solid var(--black-450);
  opacity :${(props) => (props.selected ? 1 : 0.6)};
  cursor: pointer;
  div{
    margin-bottom: 0.5rem;
  }
  &:hover {
    opacity: 1;
  }
  @media (max-width: 1172px) {
    width: 20%;
    &:last-of-type {
      border-right: 0 solid var(--black-450);
    }
  }
  @media (max-width: 900px) {
    width: fit-content;
    min-width: 0;
    padding: 1rem 2rem;
    &:last-of-type {
      border-right: 1px solid var(--black-450);
    }
  }
  @media (max-width: 700px) {
    font-size: 1rem;
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

const ButtonsEl = styled.div`
  button{
    margin: 0 0.5rem 0 0.5rem;   
    &:last-of-type{
      margin-right: 0;
    }
  }
`;

const H1 = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-blue);
  line-height: 2rem;
  margin: 1rem 0 0.5rem 1rem;
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;
const H2 = styled.div`
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
  margin: 0 0 0.5rem 1rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
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
    updateGraphType,
  } = useContext(Context) as CtxDataType;
  const [modalVisibility, setModalVisibility] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  return (
    <>
      <Container>
        <HeadingEl>
          <TitleEl>
            <Logo height={50} />
            <div>
              <H1>Data Futures Platform</H1>
              <H2>
                Explore All Data
                {queryParams.get('topic') ? ` for ${queryParams.get('topic')}` : null}
              </H2>
            </div>
          </TitleEl>
          <ButtonsEl>
            {
              queryParams.get('embeded') === 'true' ? null
                : (
                  <CopyLinkWithParamButton />
                )
            }
            <button className='primary' type='button' onClick={() => { setModalVisibility(true); }}>
              {
                window.innerWidth < 600 ? '</>' : '</> Embed'
              }
            </button>
          </ButtonsEl>
        </HeadingEl>
        <RootEl>
          {
            queryParams.get('showSettings') === 'false' ? null
              : (
                <TabsContainerEl>
                  <TabsEl selected={graphType === 'map'} onClick={() => { updateGraphType('map'); }}>
                    <IconEl>
                      <MapIcon size={48} fill={graphType === 'map' ? 'var(--primary-blue)' : 'var(--black-500)'} />
                    </IconEl>
                    <>Maps</>
                  </TabsEl>
                  <TabsEl selected={graphType === 'scatterPlot'} onClick={() => { updateGraphType('scatterPlot'); }}>
                    <IconEl>
                      <ScatterPlotIcon size={48} fill={graphType === 'scatterPlot' ? 'var(--primary-blue)' : 'var(--black-500)'} />
                    </IconEl>
                    <>Correlation</>
                  </TabsEl>
                  <TabsEl selected={graphType === 'barGraph'} onClick={() => { updateGraphType('barGraph'); }}>
                    <IconEl>
                      <BarGraphIcon size={48} fill={graphType === 'barGraph' ? 'var(--primary-blue)' : 'var(--black-500)'} />
                    </IconEl>
                    <>Ranks</>
                  </TabsEl>
                  <TabsEl selected={graphType === 'trendLine'} onClick={() => { updateGraphType('trendLine'); }}>
                    <IconEl>
                      <DualAxesChartIcon size={48} fill={graphType === 'trendLine' ? 'var(--primary-blue)' : 'var(--black-500)'} />
                    </IconEl>
                    <>Dual Axes Line Chart</>
                  </TabsEl>
                  <TabsEl selected={graphType === 'multiCountryTrendLine'} onClick={() => { updateGraphType('multiCountryTrendLine'); }}>
                    <IconEl>
                      <MultiLineChartIcon size={48} fill={graphType === 'multiCountryTrendLine' ? 'var(--primary-blue)' : 'var(--black-500)'} />
                    </IconEl>
                    <>Multi Country Trends</>
                  </TabsEl>
                </TabsContainerEl>
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
        </RootEl>
      </Container>
      <Modal
        visible={modalVisibility}
        title='Embed Code'
        onOk={() => { setModalVisibility(false); }}
        onCancel={() => { setModalVisibility(false); }}
        footer={[
          <button className='primary' key='back' type='button' onClick={() => { setModalVisibility(false); }}>
            Close
          </button>,
        ]}
      >
        <GetEmbedParams />
      </Modal>
    </>
  );
};
