import { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import {
  ChevronDownCircle,
  ChevronRightCircle,
  Database,
  FileDown,
} from 'lucide-react';
import {
  CountryListType,
  CtxDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import IndicatorSelector from '../../Components/IndicatorSelector';
import { Filters } from './Filters';

interface Props {
  indicators: IndicatorMetaDataType[];
  regions?: string[];
  countries: CountryListType[];
  setShowDownloadModal: (_d: boolean) => void;
  setShowSourceModal: (_d: boolean) => void;
}

export function MapSettings(props: Props) {
  const {
    indicators,
    regions,
    countries,
    setShowDownloadModal,
    setShowSourceModal,
  } = props;
  const {
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    showMostRecentData,
    selectedCountryOrRegion,
    updateXAxisIndicator,
    updateYAxisIndicator,
    updateSizeIndicator,
    updateShowMostRecentData,
  } = useContext(Context) as CtxDataType;
  const mapIndicators = [...indicators];
  const sizeIndicators = indicators.filter(d => d.Sizing);
  const options = mapIndicators.map(d => d.DataKey);
  const [settingsExpanded, setSettingsExpanded] = useState(true);
  useEffect(() => {
    if (options.findIndex(d => d === xAxisIndicator) === -1) {
      updateXAxisIndicator(
        indicators[indicators.findIndex(d => d.DataKey === options[0])].DataKey,
      );
    }
  }, [options]);
  return (
    <>
      <div className='settings-sections-container'>
        <div className='settings-sections-options-container'>
          <div className='settings-option-div'>
            <IndicatorSelector
              title='Primary Indicator to color region'
              indicators={mapIndicators}
              selectedIndicator={
                indicators[
                  indicators.findIndex(d => d.DataKey === xAxisIndicator)
                ]
              }
              updateIndicator={updateXAxisIndicator}
            />
          </div>
          <div className='settings-option-div'>
            <IndicatorSelector
              title='Secondary Indicator (optional)'
              indicators={mapIndicators}
              selectedIndicator={
                yAxisIndicator
                  ? indicators[
                      indicators.findIndex(d => d.DataKey === yAxisIndicator)
                    ]
                  : (yAxisIndicator as undefined)
              }
              updateIndicator={updateYAxisIndicator}
              isOptional
            />
          </div>
          <div className='settings-option-div'>
            <IndicatorSelector
              title='Size by (optional)'
              indicators={sizeIndicators}
              selectedIndicator={
                sizeIndicator
                  ? indicators[
                      indicators.findIndex(d => d.DataKey === sizeIndicator)
                    ]
                  : (sizeIndicator as undefined)
              }
              updateIndicator={updateSizeIndicator}
              isOptional
            />
          </div>
        </div>
        <div className='flex-div flex-wrap margin-top-06 margin-bottom-03 gap-06'>
          <button
            className='undp-button button-tertiary'
            type='button'
            style={{ color: 'var(--blue-600)', padding: 0 }}
            onClick={() => {
              setShowSourceModal(true);
            }}
          >
            <Database
              stroke='var(--blue-600)'
              style={{ marginRight: '0.25rem' }}
              strokeWidth={1.5}
            />
            Data Sources
          </button>
          <button
            className='undp-button button-tertiary'
            type='button'
            style={{ color: 'var(--blue-600)', padding: 0 }}
            onClick={() => {
              setShowDownloadModal(true);
            }}
          >
            <FileDown
              strokeWidth={1.5}
              stroke='var(--blue-600)'
              style={{ marginRight: '0.25rem' }}
            />
            Download
          </button>
        </div>
      </div>
      <div className='settings-sections-container'>
        <button
          type='button'
          aria-label='Expand or collapse settings'
          className='settings-sections-container-title'
          onClick={() => {
            setSettingsExpanded(!settingsExpanded);
          }}
        >
          {settingsExpanded ? (
            <ChevronDownCircle stroke='#212121' size={18} />
          ) : (
            <ChevronRightCircle stroke='#212121' size={18} />
          )}
          <h6 className='undp-typography margin-bottom-00'>
            Settings & Options
          </h6>
        </button>
        <div
          className='settings-sections-options-container'
          style={{ display: settingsExpanded ? 'flex' : 'none' }}
        >
          <Checkbox
            style={{ margin: 0 }}
            className='undp-checkbox'
            checked={showMostRecentData}
            onChange={e => {
              updateShowMostRecentData(e.target.checked);
            }}
          >
            Show Most Recent Available Data
          </Checkbox>
        </div>
      </div>
      {!selectedCountryOrRegion && countries.length > 1 ? (
        <Filters regions={regions} countries={countries} />
      ) : null}
    </>
  );
}
