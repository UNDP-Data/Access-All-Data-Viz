import { useContext, useEffect, useState } from 'react';
import { Select, Radio, Checkbox } from 'antd';
import domtoimage from 'dom-to-image';
import {
  ChevronDownCircle,
  ChevronRightCircle,
  Database,
  FileDown,
} from 'lucide-react';
import sortBy from 'lodash.sortby';
import { CountryListType, CtxDataType, IndicatorMetaDataType } from '../Types';
import Context from '../Context/Context';
import {
  DEFAULT_VALUES,
  INCOME_GROUPS,
  SIGNATURE_SOLUTIONS_LIST,
} from '../Constants';
import IndicatorSelector from '../Components/IndicatorSelector';

interface Props {
  indicators: IndicatorMetaDataType[];
  regions?: string[];
  countries: CountryListType[];
}

export function Settings(props: Props) {
  const { indicators, regions, countries } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    showLabel,
    useSameRange,
    showMostRecentData,
    selectedCountryGroup,
    selectedCountries,
    selectedIncomeGroups,
    selectedRegions,
    reverseOrder,
    selectedCountryOrRegion,
    showReference,
    dataListCountry,
    signatureSolution,
    signatureSolutionForDataList,
    updateSelectedCountryGroup,
    updateColorIndicator,
    updateXAxisIndicator,
    updateYAxisIndicator,
    updateSizeIndicator,
    updateSelectedRegions,
    updateSelectedCountries,
    updateSelectedIncomeGroups,
    updateShowLabel,
    updateShowMostRecentData,
    updateShowSource,
    updateUseSameRange,
    updateMultiCountryTrendChartCountries,
    updateReverseOrder,
    verticalBarLayout,
    updateBarLayout,
    updateDataListCountry,
    updateSignatureSolutionForDataList,
    updateShowReference,
  } = useContext(Context) as CtxDataType;
  const scatterPlotIndicators = indicators.filter(d => d.ScatterPlot);
  const mapIndicators = indicators.filter(d => d.Map);
  const barGraphIndicators = indicators.filter(d => d.BarGraph);
  const allIndicators = indicators;
  const sizeIndicators = indicators.filter(d => d.Sizing);
  const options =
    graphType === 'scatterPlot'
      ? indicators.filter(d => d.ScatterPlot).map(d => d.DataKey)
      : graphType === 'map'
      ? indicators.filter(d => d.Map).map(d => d.DataKey)
      : graphType === 'barGraph'
      ? indicators.filter(d => d.BarGraph).map(d => d.DataKey)
      : indicators.map(d => d.DataKey);
  const colorOptions = indicators
    .filter(d => d.IsCategorical)
    .map(d => d.DataKey);
  colorOptions.unshift('Income Groups');
  colorOptions.unshift('Continents');
  const [settingExpanded, setSettingsExpanded] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(true);
  useEffect(() => {
    if (options.findIndex(d => d === xAxisIndicator) === -1) {
      updateXAxisIndicator(
        indicators[indicators.findIndex(d => d.DataKey === options[0])].DataKey,
      );
    }
    if (
      options.findIndex(d => d === yAxisIndicator) === -1 &&
      graphType === 'scatterPlot'
    ) {
      updateYAxisIndicator(
        indicators[indicators.findIndex(d => d.DataKey === options[0])].DataKey,
      );
    }
  }, [graphType, options]);
  return (
    <div className='undp-scrollbar settings-container'>
      <div className='settings-sections-container'>
        <div className='settings-sections-options-container'>
          {graphType !== 'dataList' ? (
            <div className='settings-option-div'>
              <IndicatorSelector
                title={
                  graphType === 'scatterPlot'
                    ? 'X-Axis'
                    : graphType === 'map'
                    ? 'Primary Indicator to color region'
                    : 'Primary Indicator'
                }
                indicators={
                  graphType === 'scatterPlot'
                    ? scatterPlotIndicators
                    : graphType === 'map'
                    ? mapIndicators
                    : graphType === 'barGraph'
                    ? barGraphIndicators
                    : allIndicators
                }
                selectedIndicator={xAxisIndicator}
                updateIndicator={updateXAxisIndicator}
              />
            </div>
          ) : (
            <>
              {selectedCountryOrRegion === undefined && countries.length > 1 ? (
                <div className='settings-option-div'>
                  <p className='label'>Select a Country</p>
                  <Select
                    showSearch
                    className='undp-select'
                    placeholder='Please select a country'
                    value={selectedCountryOrRegion || dataListCountry}
                    onChange={d => {
                      updateDataListCountry(d);
                    }}
                    disabled={selectedCountryOrRegion !== undefined}
                  >
                    {countries
                      .map(d => d.name)
                      .map(d => (
                        <Select.Option className='undp-select-option' key={d}>
                          {d}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              ) : null}
              <div className='settings-option-div'>
                <p className='label'>Filter by Signature Solutions</p>
                <Select
                  showSearch
                  className='undp-select'
                  placeholder='Please select'
                  value={signatureSolution || signatureSolutionForDataList}
                  disabled={signatureSolution !== undefined}
                  onChange={d => {
                    updateSignatureSolutionForDataList(
                      d as
                        | 'All'
                        | 'Energy'
                        | 'Environment'
                        | 'Gender'
                        | 'Governance'
                        | 'Poverty and Inequality'
                        | 'Resilience',
                    );
                  }}
                >
                  {SIGNATURE_SOLUTIONS_LIST.map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </>
          )}
          {graphType === 'scatterPlot' ||
          graphType === 'map' ||
          graphType === 'trendLine' ? (
            <div className='settings-option-div'>
              <IndicatorSelector
                title={
                  graphType === 'scatterPlot'
                    ? 'Y-Axis'
                    : 'Secondary Indicator (optional)'
                }
                indicators={
                  graphType === 'scatterPlot'
                    ? scatterPlotIndicators
                    : graphType === 'map'
                    ? mapIndicators
                    : allIndicators
                }
                selectedIndicator={yAxisIndicator}
                updateIndicator={updateYAxisIndicator}
                isOptional={graphType !== 'scatterPlot'}
              />
            </div>
          ) : null}
          {graphType === 'map' || graphType === 'scatterPlot' ? (
            <div className='settings-option-div'>
              <IndicatorSelector
                title={
                  graphType === 'map'
                    ? 'Choose an indicator to overlay (optional)'
                    : 'Size by (optional)'
                }
                indicators={sizeIndicators}
                selectedIndicator={sizeIndicator}
                updateIndicator={updateSizeIndicator}
                isOptional
              />
            </div>
          ) : null}
          {graphType === 'barGraph' || graphType === 'scatterPlot' ? (
            selectedCountryOrRegion ? null : (
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
                      indicator => indicator.IndicatorLabelTable === d,
                    );
                    updateColorIndicator(
                      indx === -1 ? d : indicators[indx].DataKey,
                    );
                  }}
                  defaultValue={DEFAULT_VALUES.colorMetric}
                >
                  {colorOptions.map(d => (
                    <Select.Option
                      className='undp-select-option'
                      key={
                        indicators.findIndex(el => el.DataKey === d) === -1
                          ? d
                          : indicators[
                              indicators.findIndex(el => el.DataKey === d)
                            ].IndicatorLabelTable
                      }
                    >
                      {indicators.findIndex(el => el.DataKey === d) === -1
                        ? d
                        : indicators[
                            indicators.findIndex(el => el.DataKey === d)
                          ].IndicatorLabelTable}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )
          ) : null}
        </div>
        {graphType !== 'dataList' ? (
          <div className='flex-div flex-wrap margin-top-06 margin-bottom-03 gap-06'>
            <button
              className='undp-button button-tertiary'
              type='button'
              style={{ color: 'var(--blue-600)', padding: 0 }}
              onClick={() => {
                updateShowSource(true);
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
                const node = document.getElementById(
                  'graph-node',
                ) as HTMLElement;
                domtoimage
                  .toPng(node, { height: node.scrollHeight })
                  .then((dataUrl: any) => {
                    const link = document.createElement('a');
                    link.download = 'graph.png';
                    link.href = dataUrl;
                    link.click();
                  });
              }}
            >
              <FileDown
                strokeWidth={1.5}
                stroke='var(--blue-600)'
                style={{ marginRight: '0.25rem' }}
              />
              Download Graph
            </button>
          </div>
        ) : null}
      </div>
      {graphType !== 'dataList' ? (
        <div className='settings-sections-container'>
          <button
            type='button'
            aria-label='Expand or collapse settings'
            className='settings-sections-container-title'
            onClick={() => {
              setSettingsExpanded(!settingExpanded);
            }}
          >
            {settingExpanded ? (
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
            style={{ display: settingExpanded ? 'flex' : 'none' }}
          >
            {graphType !== 'trendLine' &&
            graphType !== 'multiCountryTrendLine' ? (
              <>
                {graphType === 'scatterPlot' ? (
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
                {graphType === 'scatterPlot' ? (
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
                {graphType === 'barGraph' ? (
                  <>
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
                  </>
                ) : null}
              </>
            ) : null}
            {graphType === 'trendLine' ? (
              <>
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
                <Checkbox
                  style={{ margin: 0 }}
                  className='undp-checkbox'
                  checked={useSameRange}
                  disabled={!yAxisIndicator}
                  onChange={e => {
                    updateUseSameRange(e.target.checked);
                  }}
                >
                  Use Same Range for Both Y-Axes
                </Checkbox>
              </>
            ) : null}
            {graphType === 'multiCountryTrendLine' ? (
              <>
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
              </>
            ) : null}
          </div>
        </div>
      ) : null}
      {graphType !== 'trendLine' &&
      graphType !== 'multiCountryTrendLine' &&
      !selectedCountryOrRegion &&
      graphType !== 'dataList' &&
      countries.length > 1 ? (
        <div className='settings-sections-container'>
          <button
            type='button'
            aria-label='Expand or collapse filters'
            className='settings-sections-container-title'
            onClick={() => {
              setFilterExpanded(!filterExpanded);
            }}
          >
            {filterExpanded ? (
              <ChevronDownCircle stroke='#212121' size={18} />
            ) : (
              <ChevronRightCircle stroke='#212121' size={18} />
            )}
            <h6 className='undp-typography margin-bottom-00'>
              Filter or Highlight By
            </h6>
          </button>
          <div
            className='settings-sections-options-container'
            style={{ display: filterExpanded ? 'flex' : 'none' }}
          >
            {regions ? (
              <div className='settings-option-div'>
                <p className='label'>Filter by regions</p>
                <Select
                  className='undp-select'
                  mode='multiple'
                  maxTagCount='responsive'
                  allowClear
                  clearIcon={<div className='clearIcon' />}
                  style={{ width: '100%' }}
                  placeholder='All regions'
                  value={selectedRegions}
                  onChange={(d: string[]) => {
                    updateSelectedRegions(d);
                  }}
                >
                  {regions
                    .filter(d => d !== '')
                    .map((d, i) => (
                      <Select.Option
                        className='undp-select-option'
                        value={d}
                        key={i}
                      >
                        {d}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            ) : null}
            <div className='settings-option-div'>
              <p className='label'>Filter by income group</p>
              <Select
                className='undp-select'
                mode='multiple'
                maxTagCount='responsive'
                allowClear
                clearIcon={<div className='clearIcon' />}
                style={{ width: '100%' }}
                placeholder='All Income Groups'
                value={selectedIncomeGroups}
                onChange={(d: string[]) => {
                  updateSelectedIncomeGroups(d);
                }}
              >
                {INCOME_GROUPS.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <p className='label'>Filter by country group</p>
              <Radio.Group
                onChange={d => {
                  updateSelectedCountryGroup(d.target.value);
                }}
                value={selectedCountryGroup}
              >
                <Radio className='undp-radio' value='All'>
                  All
                </Radio>
                <Radio className='undp-radio' value='LDC'>
                  LDC
                </Radio>
                <Radio className='undp-radio' value='LLDC'>
                  LLDC
                </Radio>
                <Radio className='undp-radio' value='SIDS'>
                  SIDS
                </Radio>
              </Radio.Group>
            </div>
            <div className='settings-option-div'>
              <p className='label'>Filter by countries</p>
              <Select
                className='undp-select'
                mode='multiple'
                maxTagCount='responsive'
                allowClear
                clearIcon={<div className='clearIcon' />}
                style={{ width: '100%' }}
                value={selectedCountries}
                placeholder='All Countries'
                onChange={(d: string[]) => {
                  updateSelectedCountries(d);
                  updateMultiCountryTrendChartCountries(d);
                }}
              >
                {sortBy(countries, d => d.name)
                  .map(d => d.name)
                  .map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
              </Select>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
