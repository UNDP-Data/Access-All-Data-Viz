import { useContext, useState } from 'react';
import { Checkbox, Radio } from 'antd';
import { ChevronDown, ChevronRight, FileDown } from 'lucide-react';
import { CountryListType, CtxDataType } from '../../Types';
import Context from '../../Context/Context';
import { Filters } from './Filters';

interface Props {
  regions?: string[];
  countries: CountryListType[];
  setShowDownloadModal: (_d: boolean) => void;
}

export function BarGraphSettings(props: Props) {
  const { regions, countries, setShowDownloadModal } = props;
  const {
    colorIndicator,
    reverseOrder,
    showReference,
    updateColorIndicator,
    updateReverseOrder,
    verticalBarLayout,
    updateBarLayout,
    updateShowReference,
  } = useContext(Context) as CtxDataType;
  const colorOptions = ['Continents', 'Income Groups'];
  const [settingsExpanded, setSettingsExpanded] = useState(true);
  return (
    <>
      <div className='settings-sections-container'>
        <div className='settings-sections-options-container'>
          <div className='settings-option-div'>
            <p className='label'>Color By</p>
            <Radio.Group
              className='undp-radio'
              value={colorIndicator}
              style={{ width: '100%' }}
              onChange={d => {
                updateColorIndicator(d.target.value);
              }}
              defaultValue='Continents'
            >
              {colorOptions.map(d => (
                <Radio key={d} value={d}>
                  {d}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className='flex-div flex-wrap margin-top-06 margin-bottom-03 gap-06'>
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
      {countries.length > 1 ? (
        <Filters regions={regions} countries={countries} />
      ) : null}
    </>
  );
}
