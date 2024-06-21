import { useContext, useState } from 'react';
import { Modal, Radio, Slider, SliderSingleProps } from 'antd';
import { CountryListType, CtxDataType } from '../../Types';
import Context from '../../Context/Context';
import { MapSettings } from './MapSettings';
import { BarGraphSettings } from './BarGraphSettings';
import { MultiCountryTrendLineSettings } from './MultiCountryTrendLineSettings';
import { DisaggregationSettings } from './DisaggregationSettings';
import { DownloadModal } from '../DownloadModal';
import { CountryLineChartSettings } from './CountryLineChartSettings';

interface Props {
  regions?: string[];
  countries: CountryListType[];
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

export function Settings(props: Props) {
  const { regions, countries } = props;
  const {
    indicator,
    graphType,
    updateIndicator,
    spendByYearly,
    spendByPPP,
    spendByPerCapita,
    updateSpendByPPP,
    updateSpendByPerCapita,
    updateSpendByYearly,
    updateGender,
    gender,
    ageRange,
    updateAgeRange,
    incomeRange,
    updateIncomeRange,
  } = useContext(Context) as CtxDataType;
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [incomeGroup, setIncomeGroup] = useState(incomeRange);
  const [ageGroup, setAgeGroup] = useState(ageRange);
  return (
    <div className='undp-scrollbar settings-container'>
      <div
        className='settings-sections-container flex-div'
        style={{ flexDirection: 'column' }}
      >
        <div>
          <p className='label'>Indicator</p>
          <Radio.Group
            className='undp-radio'
            value={indicator}
            style={{ width: '100%' }}
            onChange={d => {
              updateIndicator(d.target.value);
            }}
          >
            <Radio key='headCount' value='headCount'>
              Headcount
            </Radio>
            <Radio key='spending' value='spending'>
              Spending
            </Radio>
          </Radio.Group>
        </div>
        {indicator === 'spending' ? (
          <>
            <div>
              <p className='label'>Spending</p>
              <Radio.Group
                className='undp-radio'
                value={spendByPerCapita ? 'perCapita' : 'total'}
                style={{ width: '100%' }}
                onChange={d => {
                  updateSpendByPerCapita(d.target.value === 'perCapita');
                }}
              >
                <Radio key='perCapita' value='perCapita'>
                  Per capita
                </Radio>
                <Radio key='total' value='total'>
                  Total
                </Radio>
              </Radio.Group>
            </div>
            <div>
              <p className='label'>Spending</p>
              <Radio.Group
                className='undp-radio'
                value={spendByYearly ? 'yearly' : 'daily'}
                style={{ width: '100%' }}
                onChange={d => {
                  updateSpendByYearly(d.target.value === 'yearly');
                }}
              >
                <Radio key='yearly' value='yearly'>
                  Per year
                </Radio>
                <Radio key='daily' value='daily'>
                  Per day
                </Radio>
              </Radio.Group>
            </div>
            <div>
              <p className='label'>Currency</p>
              <Radio.Group
                className='undp-radio'
                value={spendByPPP ? 'ppp' : 'nominal'}
                style={{ width: '100%' }}
                onChange={d => {
                  updateSpendByPPP(d.target.value === 'ppp');
                }}
              >
                <Radio key='nominal' value='nominal'>
                  Nominal dollars
                </Radio>
                <Radio key='ppp' value='ppp'>
                  2017 PPP USD
                </Radio>
              </Radio.Group>
            </div>
          </>
        ) : null}
        {graphType === 'disaggregation' ||
        graphType === 'countryLineChart' ? null : (
          <>
            <div>
              <p className='label'>Gender</p>
              <Radio.Group
                className='undp-radio'
                value={gender}
                style={{ width: '100%' }}
                onChange={d => {
                  updateGender(d.target.value);
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
            <div>
              <p className='label margin-bottom-08'>Age range</p>
              <Slider
                range
                marks={ageMarks}
                value={ageGroup}
                step={null}
                className='undp-slider'
                onChange={d => {
                  setAgeGroup(d as [number, number]);
                }}
                onAfterChange={d => {
                  updateAgeRange(d as [number, number]);
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
            <div>
              <p className='label margin-bottom-08'>Income group</p>
              <Slider
                range
                marks={incomeMarks}
                step={null}
                value={incomeGroup}
                className='undp-slider'
                onChange={d => {
                  setIncomeGroup(d as [number, number]);
                }}
                onAfterChange={d => {
                  updateIncomeRange(
                    d[1] === 125 ? [d[0], 999] : (d as [number, number]),
                  );
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
          </>
        )}
      </div>
      {graphType === 'map' ? (
        <MapSettings
          regions={regions}
          countries={countries}
          setShowDownloadModal={setShowDownloadModal}
        />
      ) : graphType === 'barGraph' ? (
        <BarGraphSettings
          regions={regions}
          countries={countries}
          setShowDownloadModal={setShowDownloadModal}
        />
      ) : graphType === 'multiCountryTrendLine' ? (
        <MultiCountryTrendLineSettings
          setShowDownloadModal={setShowDownloadModal}
        />
      ) : graphType === 'disaggregation' ? (
        <DisaggregationSettings
          setShowDownloadModal={setShowDownloadModal}
          regions={regions}
          countries={countries}
        />
      ) : graphType === 'countryLineChart' ? (
        <CountryLineChartSettings setShowDownloadModal={setShowDownloadModal} />
      ) : null}
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
        <DownloadModal />
      </Modal>
    </div>
  );
}
