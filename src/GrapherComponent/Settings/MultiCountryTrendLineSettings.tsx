import { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import {
  ChevronDownCircle,
  ChevronRightCircle,
  Database,
  FileDown,
} from 'lucide-react';
import { CtxDataType, IndicatorMetaDataType } from '../../Types';
import Context from '../../Context/Context';
import IndicatorSelector from '../../Components/IndicatorSelector';

interface Props {
  indicators: IndicatorMetaDataType[];
  setShowDownloadModal: (_d: boolean) => void;
  setShowSourceModal: (_d: boolean) => void;
}

export function MultiCountryTrendLineSettings(props: Props) {
  const { indicators, setShowDownloadModal, setShowSourceModal } = props;
  const {
    xAxisIndicator,
    showLabel,
    showReference,
    updateXAxisIndicator,
    updateShowLabel,
    updateShowReference,
  } = useContext(Context) as CtxDataType;
  const allIndicators = indicators;
  const options = indicators.map(d => d.DataKey);
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
              indicators={allIndicators}
              selectedIndicator={
                indicators[
                  indicators.findIndex(d => d.DataKey === xAxisIndicator)
                ]
              }
              updateIndicator={updateXAxisIndicator}
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
              strokeWidth={1.25}
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
              strokeWidth={1.25}
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
            checked={showLabel}
            onChange={e => {
              updateShowLabel(e.target.checked);
            }}
          >
            Show Label
          </Checkbox>
          {updateShowReference ? (
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
          ) : null}
        </div>
      </div>
    </>
  );
}
