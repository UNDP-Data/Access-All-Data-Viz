import { useContext, useState } from 'react';
import { Checkbox, Radio } from 'antd';
import {
  ChevronDownCircle,
  ChevronRightCircle,
  Database,
  FileDown,
} from 'lucide-react';
import sortBy from 'lodash.sortby';
import {
  CountryListType,
  CtxDataType,
  DisaggregationMetaDataType,
} from '../../Types';
import { Filters } from './Filters';
import Context from '../../Context/Context';
import DisaggregatedIndicatorSelector from '../../Components/DisaggregatedIndicatorSelector';

interface Props {
  setShowDownloadModal: (_d: boolean) => void;
  setShowSourceModal: (_d: boolean) => void;
  disaggregationMetaData: DisaggregationMetaDataType[];
  countries: CountryListType[];
  regions?: string[];
}

export function DisaggregationSettings(props: Props) {
  const {
    setShowSourceModal,
    setShowDownloadModal,
    disaggregationMetaData,
    countries,
    regions,
  } = props;
  const {
    showMostRecentData,
    disaggregationOrder,
    selectedCountryOrRegion,
    updateShowMostRecentData,
    reverseOrder,
    disaggregationGraphType,
    disaggregationIndicator,
    updateDisaggregationGraphType,
    updateDisaggregationIndicator,
    updateDisaggregationOrder,
    updateReverseOrder,
  } = useContext(Context) as CtxDataType;
  const disaggregationDataMetaDataSorted = sortBy(disaggregationMetaData, [
    'DisaggregationType',
    'Indicator',
  ]);
  const [settingsExpanded, setSettingsExpanded] = useState(true);
  return (
    <div>
      <div className='settings-sections-container'>
        <div className='settings-option-div'>
          <DisaggregatedIndicatorSelector
            title='Choose an indicator'
            indicators={disaggregationDataMetaDataSorted}
            selectedIndicator={
              disaggregationIndicator as DisaggregationMetaDataType
            }
            updateIndicator={updateDisaggregationIndicator}
          />
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
          className='gap-05'
          style={{
            display: settingsExpanded ? 'flex' : 'none',
            flexDirection: 'column',
          }}
        >
          <div>
            <p className='label'>Visualization Type</p>
            <Radio.Group
              onChange={d => {
                updateDisaggregationGraphType(d.target.value);
              }}
              value={disaggregationGraphType}
            >
              <Radio className='undp-radio' value='global'>
                Global/Region
              </Radio>
              <Radio className='undp-radio' value='country'>
                Country Level
              </Radio>
            </Radio.Group>
          </div>
          {disaggregationGraphType === 'global' ? (
            <div className='settings-sections-options-container'>
              {disaggregationIndicator &&
              (disaggregationIndicator.DisaggregationType === 'Gender' ||
                disaggregationIndicator.DisaggregationType ===
                  'Urban/Rural') ? (
                <div>
                  <p className='label'>Order by</p>
                  <Radio.Group
                    onChange={d => {
                      updateDisaggregationOrder(d.target.value);
                    }}
                    value={disaggregationOrder}
                  >
                    <Radio className='undp-radio' value='first'>
                      {disaggregationIndicator.DisaggregationType === 'Gender'
                        ? 'Female'
                        : 'Urban'}
                    </Radio>
                    <Radio className='undp-radio' value='second'>
                      {disaggregationIndicator.DisaggregationType === 'Gender'
                        ? 'Male'
                        : 'Rural'}
                    </Radio>
                    <Radio className='undp-radio' value='diff'>
                      Diff. (
                      {disaggregationIndicator.DisaggregationType === 'Gender'
                        ? 'Female - Male'
                        : 'Urban - Rural'}
                      )
                    </Radio>
                  </Radio.Group>
                </div>
              ) : null}
              {disaggregationIndicator &&
              (disaggregationIndicator.DisaggregationType === 'Gender' ||
                disaggregationIndicator.DisaggregationType ===
                  'Urban/Rural') ? (
                <Checkbox
                  style={{ margin: 0 }}
                  className='undp-checkbox'
                  checked={reverseOrder}
                  onChange={e => {
                    updateReverseOrder(e.target.checked);
                  }}
                >
                  Show Largest First
                </Checkbox>
              ) : null}
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
          ) : null}
        </div>
      </div>
      {!selectedCountryOrRegion &&
      countries.length > 1 &&
      disaggregationGraphType === 'global' ? (
        <Filters regions={regions} countries={countries} />
      ) : null}
    </div>
  );
}
