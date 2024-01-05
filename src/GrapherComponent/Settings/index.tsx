import { useContext, useState } from 'react';
import { Modal } from 'antd';
import {
  CountryGroupDataType,
  CountryListType,
  CtxDataType,
  DisaggregationMetaDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import { DataSources } from '../DataSources';
import { DownloadModal } from '../DownloadModal';
import { MapSettings } from './MapSettings';
import { BarGraphSettings } from './BarGraphSettings';
import { DataListSettings } from './DataListSettings';
import { MultiCountryTrendLineSettings } from './MultiCountryTrendLineSettings';
import { ScatterPlotSettings } from './ScatterPlotSettings';
import { TrendLineSettings } from './TrendLineSettings';
import { DisaggregationSettings } from './DisaggregationSettings';

interface Props {
  indicators: IndicatorMetaDataType[];
  regions?: string[];
  countries: CountryListType[];
  data: CountryGroupDataType[];
  disaggregationMetaData?: DisaggregationMetaDataType[];
}

export function Settings(props: Props) {
  const { indicators, regions, countries, data, disaggregationMetaData } =
    props;
  const { graphType } = useContext(Context) as CtxDataType;
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  return (
    <div className='undp-scrollbar settings-container'>
      {graphType === 'map' ? (
        <MapSettings
          indicators={indicators}
          regions={regions}
          countries={countries}
          setShowDownloadModal={setShowDownloadModal}
          setShowSourceModal={setShowSourceModal}
        />
      ) : graphType === 'barGraph' ? (
        <BarGraphSettings
          indicators={indicators}
          regions={regions}
          countries={countries}
          setShowDownloadModal={setShowDownloadModal}
          setShowSourceModal={setShowSourceModal}
        />
      ) : graphType === 'dataList' ? (
        <DataListSettings countries={countries} />
      ) : graphType === 'multiCountryTrendLine' ? (
        <MultiCountryTrendLineSettings
          indicators={indicators}
          setShowDownloadModal={setShowDownloadModal}
          setShowSourceModal={setShowSourceModal}
        />
      ) : graphType === 'scatterPlot' ? (
        <ScatterPlotSettings
          indicators={indicators}
          regions={regions}
          countries={countries}
          setShowDownloadModal={setShowDownloadModal}
          setShowSourceModal={setShowSourceModal}
        />
      ) : graphType === 'trendLine' ? (
        <TrendLineSettings
          indicators={indicators}
          setShowDownloadModal={setShowDownloadModal}
          setShowSourceModal={setShowSourceModal}
        />
      ) : graphType === 'disaggregation' && disaggregationMetaData ? (
        <DisaggregationSettings
          disaggregationMetaData={disaggregationMetaData}
          setShowDownloadModal={setShowDownloadModal}
          setShowSourceModal={setShowSourceModal}
          regions={regions}
          countries={countries}
        />
      ) : null}
      <Modal
        open={showSourceModal}
        className='undp-modal'
        title='Data Sources'
        onOk={() => {
          setShowSourceModal(false);
        }}
        onCancel={() => {
          setShowSourceModal(false);
        }}
        width='75%'
        destroyOnClose
      >
        <DataSources indicators={indicators} data={data} />
      </Modal>
      <Modal
        open={showDownloadModal}
        className='undp-modal'
        title='Download'
        onOk={() => {
          setShowDownloadModal(false);
        }}
        onCancel={() => {
          setShowDownloadModal(false);
        }}
        width='75%'
        destroyOnClose
      >
        <DownloadModal indicators={indicators} data={data} />
      </Modal>
    </div>
  );
}
