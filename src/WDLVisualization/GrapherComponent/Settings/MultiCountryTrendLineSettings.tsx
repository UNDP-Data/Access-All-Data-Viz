import { useContext, useState } from 'react';
import { Checkbox } from 'antd';
import { ChevronDown, ChevronRight, FileDown } from 'lucide-react';
import { CtxDataType } from '../../Types';
import Context from '../../Context/Context';

interface Props {
  setShowDownloadModal: (_d: boolean) => void;
}

export function MultiCountryTrendLineSettings(props: Props) {
  const { setShowDownloadModal } = props;
  const { showLabel, showReference, updateShowLabel, updateShowReference } =
    useContext(Context) as CtxDataType;
  const [settingsExpanded, setSettingsExpanded] = useState(true);
  return (
    <>
      <div className='settings-sections-container'>
        <div className='flex-div flex-wrap margin-top-03 margin-bottom-03 gap-06'>
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
            <ChevronDown stroke='#212121' size={18} />
          ) : (
            <ChevronRight stroke='#212121' size={18} />
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
