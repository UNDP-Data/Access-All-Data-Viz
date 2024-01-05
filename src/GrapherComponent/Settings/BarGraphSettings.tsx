import { useContext, useEffect, useState } from 'react';
import { Select, Checkbox } from 'antd';
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

export function BarGraphSettings(props: Props) {
  const {
    indicators,
    regions,
    countries,
    setShowDownloadModal,
    setShowSourceModal,
  } = props;
  const {
    xAxisIndicator,
    showMostRecentData,
    reverseOrder,
    selectedCountryOrRegion,
    showReference,
    updateColorIndicator,
    updateXAxisIndicator,
    updateShowMostRecentData,
    updateReverseOrder,
    verticalBarLayout,
    updateBarLayout,
    updateShowReference,
  } = useContext(Context) as CtxDataType;
  const barGraphIndicators = indicators.filter(d => !d.IsCategorical);
  const options = barGraphIndicators.map(d => d.DataKey);
  const colorOptions = indicators
    .filter(d => d.IsCategorical)
    .map(d => d.DataKey);
  colorOptions.unshift('Income Groups');
  colorOptions.unshift('Continents');
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
              title='Primary Indicator'
              indicators={barGraphIndicators}
              selectedIndicator={
                indicators[
                  indicators.findIndex(d => d.DataKey === xAxisIndicator)
                ]
              }
              updateIndicator={updateXAxisIndicator}
            />
          </div>
          {selectedCountryOrRegion ? null : (
            <div className='settings-option-div'>
              <p className='label'>Color By</p>
              <Select
                className='undp-select'
                showSearch
                maxTagCount='responsive'
                style={{ width: '100%' }}
                placeholder='Color By'
                onChange={d => {
                  const indx = indicators.findIndex(
                    indicator => indicator.IndicatorLabel === d,
                  );
                  updateColorIndicator(
                    indx === -1 ? d : indicators[indx].DataKey,
                  );
                }}
                defaultValue='Continent'
              >
                {colorOptions.map(d => (
                  <Select.Option
                    className='undp-select-option'
                    key={
                      indicators.findIndex(el => el.DataKey === d) === -1
                        ? d
                        : indicators[
                            indicators.findIndex(el => el.DataKey === d)
                          ].IndicatorLabel
                    }
                  >
                    {indicators.findIndex(el => el.DataKey === d) === -1
                      ? d
                      : indicators[indicators.findIndex(el => el.DataKey === d)]
                          .IndicatorLabel}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
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
          <Checkbox
            style={{ margin: 0 }}
            className='undp-checkbox'
            checked={!verticalBarLayout}
            onChange={e => {
              updateBarLayout(!e.target.checked);
            }}
          >
            Show Horizontal
          </Checkbox>
          <Checkbox
            style={{ margin: 0 }}
            className='undp-checkbox'
            disabled={!verticalBarLayout}
            checked={reverseOrder}
            onChange={e => {
              updateReverseOrder(e.target.checked);
            }}
          >
            Show Largest First
          </Checkbox>
          <Checkbox
            style={{ margin: 0 }}
            className='undp-checkbox'
            checked={showReference}
            onChange={e => {
              updateShowReference(e.target.checked);
            }}
          >
            Show World/Regional Reference
          </Checkbox>
        </div>
      </div>
      {!selectedCountryOrRegion && countries.length > 1 ? (
        <Filters regions={regions} countries={countries} />
      ) : null}
    </>
  );
}
