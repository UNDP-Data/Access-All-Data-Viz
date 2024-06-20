import { ChevronDown, ChevronRight, XSquare, FileDown } from 'lucide-react';
import { useContext, useState } from 'react';
import { Checkbox, Modal, Radio, Slider, SliderSingleProps } from 'antd';
import {
  CountryListType,
  CtxDataType,
  DisaggregationSettingsDataType,
} from '../../Types';
import { Filters } from './Filters';
import Context from '../../Context/Context';

interface Props {
  setShowDownloadModal: (_d: boolean) => void;
  countries: CountryListType[];
  regions?: string[];
  countrySettings?: boolean;
}

const incomeMarks: SliderSingleProps['marks'] = {
  0: '0',
  2: ' ',
  5: ' ',
  8: ' ',
  12: ' ',
  16: ' ',
  20: ' ',
  25: ' ',
  30: ' ',
  35: ' ',
  40: ' ',
  45: ' ',
  50: ' ',
  55: ' ',
  60: ' ',
  65: ' ',
  70: ' ',
  75: ' ',
  80: ' ',
  85: ' ',
  90: ' ',
  95: ' ',
  100: ' ',
  105: ' ',
  110: ' ',
  120: ' ',
  125: '>120',
};

const ageMarks: SliderSingleProps['marks'] = {
  0: '0',
  5: ' ',
  10: ' ',
  15: ' ',
  18: ' ',
  21: ' ',
  25: ' ',
  30: ' ',
  35: ' ',
  40: ' ',
  45: ' ',
  50: ' ',
  55: ' ',
  60: ' ',
  65: ' ',
  70: ' ',
  75: ' ',
  80: '>75',
};

export function DisaggregationSettings(props: Props) {
  const { setShowDownloadModal, countries, regions, countrySettings } = props;
  const {
    disaggregationGraphType,
    updateDisaggregationGraphType,
    disaggregationSettings,
    updateDisaggregationSettings,
    updateOrderDisaggregatedDataBy,
    orderDisaggregatedDataBy,
    updateReverseOrder,
    reverseOrder,
  } = useContext(Context) as CtxDataType;
  const [settingsExpanded, setSettingsExpanded] = useState(true);
  const [isEditDisaggregationModalOpen, setIsEditDisaggregationModalOpen] =
    useState(false);
  const [disaggregationSettingsInModal, updateDisaggregationSettingsInModal] =
    useState(disaggregationSettings);
  return (
    <div>
      {countrySettings ? null : (
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
                <Radio className='undp-radio' value='region'>
                  Global/Region
                </Radio>
                <Radio className='undp-radio' value='country'>
                  Country Level
                </Radio>
              </Radio.Group>
            </div>
            {disaggregationGraphType === 'region' ? (
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
          </div>
        </div>
      )}
      <div className='settings-sections-container'>
        <h6 className='undp-typography'>Disaggregations</h6>
        <div className='flex-div gap-03' style={{ flexDirection: 'column' }}>
          {disaggregationSettings.map((d, i) => (
            <button
              type='button'
              key={i}
              style={{
                width: '100%',
                padding: '1rem',
                border:
                  `${d.gender} ${d.ageRange[0]}-${d.ageRange[1]} ${d.incomeRange[0]}-${d.incomeRange[1]}` ===
                    orderDisaggregatedDataBy &&
                  disaggregationGraphType === 'region'
                    ? '1px solid var(--blue-600)'
                    : '1px solid var(--gray-300)',
                borderRadius: '2px',
                backgroundColor:
                  `${d.gender} ${d.ageRange[0]}-${d.ageRange[1]} ${d.incomeRange[0]}-${d.incomeRange[1]}` ===
                    orderDisaggregatedDataBy &&
                  disaggregationGraphType === 'region'
                    ? 'var(--gray-200)'
                    : 'var(--gray-100)',
                textAlign: 'left',
              }}
              onClick={() => {
                if (disaggregationGraphType === 'region') {
                  updateOrderDisaggregatedDataBy(
                    `${d.gender} ${d.ageRange[0]}-${d.ageRange[1]} ${d.incomeRange[0]}-${d.incomeRange[1]}`,
                  );
                }
              }}
            >
              <div className='flex-div gap-03'>
                <div style={{ flexGrow: 1 }}>
                  <p className='undp-typography small-font margin-bottom-01'>
                    Gender
                  </p>
                  <p className='undp-typography small-font margin-bottom-00 bold'>
                    {d.gender}
                  </p>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <p className='undp-typography small-font margin-bottom-01'>
                    Age group
                  </p>
                  <p className='undp-typography small-font margin-bottom-00 bold'>
                    {d.ageRange[1] === 80
                      ? `> ${d.ageRange[0]}`
                      : `${d.ageRange[0]}-${d.ageRange[0]}`}
                  </p>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <p className='undp-typography small-font margin-bottom-01'>
                    Income group
                  </p>
                  <p className='undp-typography small-font margin-bottom-00 bold'>
                    {d.incomeRange[1] === 999
                      ? `> USD$ ${d.incomeRange[0]}`
                      : `USD$ ${d.incomeRange[0]}-${d.incomeRange[0]}`}
                  </p>
                </div>
              </div>
              {disaggregationGraphType === 'region' ? (
                <p
                  className='undp-typography small-font italics margin-bottom-00 margin-top-03'
                  style={{ color: 'var(--gray-600)' }}
                >
                  {`${d.gender} ${d.ageRange[0]}-${d.ageRange[1]} ${d.incomeRange[0]}-${d.incomeRange[1]}` ===
                  orderDisaggregatedDataBy
                    ? 'Order by this disaggregation'
                    : 'Click to order by this setting'}
                </p>
              ) : null}
            </button>
          ))}
          <button
            className='undp-button button-secondary'
            type='button'
            onClick={() => {
              setIsEditDisaggregationModalOpen(true);
            }}
          >
            Update disaggregations
          </button>
        </div>
      </div>
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
      {countries.length > 1 &&
      disaggregationGraphType === 'region' &&
      !countrySettings ? (
        <Filters regions={regions} countries={countries} />
      ) : null}
      <Modal
        open={isEditDisaggregationModalOpen}
        className='undp-modal'
        title='Add or Remove Disaggregation'
        onOk={() => {
          setIsEditDisaggregationModalOpen(false);
          updateDisaggregationSettings(disaggregationSettingsInModal);
        }}
        onCancel={() => {
          setIsEditDisaggregationModalOpen(false);
        }}
        width='75%'
        destroyOnClose
      >
        <div className='flex-div' style={{ flexDirection: 'column' }}>
          {disaggregationSettingsInModal.map((d, i) => (
            <div
              key={i}
              style={{
                width: 'calc(100% - 2rem)',
                padding: '1rem',
                border: '1px solid var(--gray-400)',
                borderRadius: '2px',
              }}
            >
              <div
                className='flex-div margin-bottom-05'
                style={{ flexDirection: 'column' }}
              >
                <div style={{ flexGrow: 1 }}>
                  <p className='undp-typography small-font margin-bottom-01'>
                    Gender
                  </p>
                  <Radio.Group
                    className='undp-radio'
                    value={d.gender}
                    style={{ width: '100%' }}
                    onChange={el => {
                      const arr: DisaggregationSettingsDataType[] = [];
                      for (
                        let j = 0;
                        j < disaggregationSettingsInModal.length;
                        j += 1
                      ) {
                        if (j === i) {
                          arr.push({
                            ...disaggregationSettingsInModal[j],
                            gender: el.target.value,
                          });
                        } else {
                          arr.push(disaggregationSettingsInModal[j]);
                        }
                      }
                      updateDisaggregationSettingsInModal(arr);
                    }}
                  >
                    <Radio key='All' value='All'>
                      All
                    </Radio>
                    <Radio key='Male' value='Male'>
                      Male
                    </Radio>
                    <Radio key='Female' value='Female'>
                      Female
                    </Radio>
                  </Radio.Group>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <p className='undp-typography small-font margin-bottom-08'>
                    Age range
                  </p>
                  <Slider
                    range
                    marks={ageMarks}
                    value={d.ageRange}
                    step={null}
                    className='undp-slider'
                    onChange={el => {
                      const arr: DisaggregationSettingsDataType[] = [];
                      for (
                        let j = 0;
                        j < disaggregationSettingsInModal.length;
                        j += 1
                      ) {
                        if (j === i) {
                          arr.push({
                            ...disaggregationSettingsInModal[j],
                            ageRange: el as [number, number],
                          });
                        } else {
                          arr.push(disaggregationSettingsInModal[j]);
                        }
                      }
                      updateDisaggregationSettingsInModal(arr);
                    }}
                    dots
                    min={0}
                    max={80}
                    tooltip={{
                      open: true,
                      placement: 'top', // this value can be 'top' or 'bottom'
                      prefixCls: 'undp-slider-tooltip',
                      getPopupContainer: triggerNode =>
                        triggerNode.parentNode as HTMLElement,
                    }}
                    style={{
                      marginBottom: 0,
                    }}
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <p className='undp-typography small-font margin-bottom-08'>
                    Income range
                  </p>
                  <Slider
                    range
                    marks={incomeMarks}
                    step={null}
                    value={[
                      d.incomeRange[0],
                      d.incomeRange[1] === 999 ? 125 : d.incomeRange[1],
                    ]}
                    className='undp-slider'
                    onChange={el => {
                      const arr: DisaggregationSettingsDataType[] = [];
                      for (
                        let j = 0;
                        j < disaggregationSettingsInModal.length;
                        j += 1
                      ) {
                        if (j === i) {
                          arr.push({
                            ...disaggregationSettingsInModal[j],
                            incomeRange: [el[0], el[1] === 125 ? 999 : el[1]],
                          });
                        } else {
                          arr.push(disaggregationSettingsInModal[j]);
                        }
                      }
                      updateDisaggregationSettingsInModal(arr);
                    }}
                    dots
                    min={0}
                    max={125}
                    tooltip={{
                      open: true,
                      placement: 'top', // this value can be 'top' or 'bottom'
                      prefixCls: 'undp-slider-tooltip',
                      getPopupContainer: triggerNode =>
                        triggerNode.parentNode as HTMLElement,
                    }}
                    style={{
                      marginBottom: 0,
                    }}
                  />
                </div>
              </div>
              {i === 0 ? null : (
                <button
                  className='undp-button button-tertiary margin-top-05 margin-bottom-05'
                  type='button'
                  style={{ color: 'var(--dark-red)', padding: 0 }}
                  onClick={() => {
                    const arr: DisaggregationSettingsDataType[] = [];
                    for (
                      let j = 0;
                      j < disaggregationSettingsInModal.length;
                      j += 1
                    ) {
                      if (j !== i) {
                        arr.push(disaggregationSettingsInModal[j]);
                      }
                    }
                    updateDisaggregationSettingsInModal(arr);
                  }}
                >
                  <XSquare
                    strokeWidth={1.25}
                    stroke='var(--dark-red)'
                    style={{ marginRight: '0.25rem' }}
                  />
                  Remove disaggregation
                </button>
              )}
            </div>
          ))}
        </div>
        <div
          className='margin-top-07 flex-div'
          style={{ justifyContent: 'space-between' }}
        >
          <button
            className='undp-button button-secondary'
            type='button'
            onClick={() => {
              const arr = [...disaggregationSettingsInModal];
              arr.push({
                gender: 'All',
                incomeRange: [0, 999],
                ageRange: [0, 80],
              });
              updateDisaggregationSettingsInModal(arr);
            }}
          >
            Add Disaggregation
          </button>
          <button
            className='undp-button button-secondary'
            type='button'
            onClick={() => {
              setIsEditDisaggregationModalOpen(false);
              const ids = disaggregationSettingsInModal.map(
                d =>
                  `${d.gender} ${d.ageRange[0]}-${d.ageRange[1]} ${d.incomeRange[0]}-${d.incomeRange[1]}`,
              );
              if (ids.indexOf(orderDisaggregatedDataBy) === -1) {
                updateOrderDisaggregatedDataBy(
                  `${disaggregationSettingsInModal[0].gender} ${disaggregationSettingsInModal[0].ageRange[0]}-${disaggregationSettingsInModal[0].ageRange[1]} ${disaggregationSettingsInModal[0].incomeRange[0]}-${disaggregationSettingsInModal[0].incomeRange[1]}`,
                );
              }
              updateDisaggregationSettings(disaggregationSettingsInModal);
            }}
          >
            Update Disaggregation
          </button>
        </div>
      </Modal>
    </div>
  );
}
