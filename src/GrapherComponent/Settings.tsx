import { useContext, useEffect, useState } from 'react';
import { Select, Radio, Checkbox } from 'antd';
import domtoimage from 'dom-to-image';
import { CountryListType, CtxDataType, IndicatorMetaDataWithYear } from '../Types';
import Context from '../Context/Context';
import { DEFAULT_VALUES, INCOME_GROUPS, SIGNATURE_SOLUTIONS_LIST } from '../Constants';
import {
  ChevronDown, ChevronLeft,
} from '../Icons';

interface Props {
  indicators: IndicatorMetaDataWithYear[];
  regions: string[];
  countries: CountryListType[];
}

export const Settings = (props: Props) => {
  const {
    indicators,
    regions,
    countries,
  } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    showLabel,
    useSameRange,
    showMostRecentData,
    selectedCountryGroup,
    selectedCountries,
    selectedIncomeGroups,
    selectedRegions,
    reverseOrder,
    selectedCountry,
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
  } = useContext(Context) as CtxDataType;
  const options = graphType === 'scatterPlot'
    ? indicators.filter((d) => d.ScatterPlot).map((d) => d.IndicatorLabelTable)
    : graphType === 'map'
      ? indicators.filter((d) => d.Map).map((d) => d.IndicatorLabelTable)
      : graphType === 'barGraph'
        ? indicators.filter((d) => d.BarGraph).map((d) => d.IndicatorLabelTable)
        : indicators.filter((d) => d.years.length > 0).map((d) => d.IndicatorLabelTable);
  const sizeOptions = indicators.filter((d) => d.Sizing).map((d) => d.IndicatorLabelTable);
  const colorOptions = indicators.filter((d) => d.IsCategorical).map((d) => d.IndicatorLabelTable);
  colorOptions.unshift('Human Development Index');
  colorOptions.unshift('Income Groups');
  colorOptions.unshift('Continents');
  const [settingExpanded, setSettingsExpanded] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(true);
  useEffect(() => {
    if (options.findIndex((d) => d === xAxisIndicator) === -1) {
      updateXAxisIndicator(options[0]);
    }
    if (options.findIndex((d) => d === yAxisIndicator) === -1 && (graphType === 'scatterPlot')) {
      updateYAxisIndicator(options[0]);
    }
  }, [graphType, options]);
  return (
    <div className='undp-scrollbar settings-container'>
      <div className='settings-sections-container'>
        <div className='settings-sections-options-container'>
          {
            graphType !== 'dataList'
              ? (
                <div className='settings-option-div'>
                  <p className='label'>
                    {
                  graphType === 'scatterPlot'
                    ? 'X-Axis'
                    : graphType === 'map'
                      ? 'Primary Indicator to color region'
                      : 'Primary Indicator'
                }
                  </p>
                  <Select
                    showSearch
                    maxTagCount='responsive'
                    className='undp-select'
                    placeholder='Please select'
                    value={xAxisIndicator}
                    onChange={(d) => { updateXAxisIndicator(d); }}
                    defaultValue={DEFAULT_VALUES.firstMetric}
                  >
                    {
                  options.map((d) => (
                    <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                  ))
                }
                  </Select>
                </div>
              )
              : (
                <>
                  <div className='settings-option-div'>
                    <p className='label'>
                      Select a Country
                    </p>
                    <Select
                      showSearch
                      className='undp-select'
                      placeholder='Please select a country'
                      value={selectedCountry || dataListCountry}
                      onChange={(d) => { updateDataListCountry(d); }}
                      disabled={selectedCountry !== undefined}
                    >
                      {
                        countries.map((d) => d.name).map((d) => (
                          <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className='settings-option-div'>
                    <p className='label'>
                      Filter by Signature Solutions
                    </p>
                    <Select
                      showSearch
                      className='undp-select'
                      placeholder='Please select'
                      value={signatureSolution || signatureSolutionForDataList}
                      disabled={signatureSolution !== undefined}
                      onChange={(d) => { updateSignatureSolutionForDataList(d as 'All' | 'Energy' | 'Environment' | 'Gender' | 'Governance' | 'Poverty and Inequality' | 'Resilience'); }}
                    >
                      {
                        SIGNATURE_SOLUTIONS_LIST.map((d) => (
                          <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                        ))
                      }
                    </Select>
                  </div>
                </>
              )
          }
          {
            graphType === 'scatterPlot'
              ? (
                <div className='settings-option-div'>
                  <p className='label'>
                    Y-Axis
                  </p>
                  <Select
                    className='undp-select'
                    showSearch
                    maxTagCount='responsive'
                    style={{ width: '100%' }}
                    value={yAxisIndicator}
                    placeholder='Please select'
                    onChange={(d) => { updateYAxisIndicator(d); }}
                  >
                    {
                      options.map((d) => (
                        <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                      ))
                    }
                  </Select>
                </div>
              ) : graphType === 'map' ? (
                <div className='settings-option-div'>
                  <p className='label'>
                    Secondary Indicator (optional)
                  </p>
                  <Select
                    className='undp-select'
                    showSearch
                    allowClear
                    maxTagCount='responsive'
                    clearIcon={<div className='clearIcon' />}
                    style={{ width: '100%' }}
                    value={yAxisIndicator}
                    placeholder='Please select'
                    onChange={(d) => { updateYAxisIndicator(d); }}
                  >
                    {
                      options.map((d) => (
                        <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                      ))
                    }
                  </Select>
                </div>
              ) : graphType === 'trendLine' ? (
                <div className='settings-option-div'>
                  <p className='label'>
                    Secondary Indicator (optional)
                  </p>
                  <Select
                    className='undp-select'
                    showSearch
                    allowClear
                    clearIcon={<div className='clearIcon' />}
                    style={{ width: '100%' }}
                    value={yAxisIndicator}
                    placeholder='Please select'
                    onChange={(d) => { updateYAxisIndicator(d); }}
                  >
                    {
                      options.map((d) => (
                        <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                      ))
                    }
                  </Select>
                </div>
              ) : null
          }
          {
            graphType === 'map' || graphType === 'scatterPlot' ? (
              <div className='settings-option-div'>
                <p className='label'>
                  {graphType === 'map' ? 'Choose an indicator to overlay' : 'Size By'}
                  {' '}
                  (optional)
                </p>
                <Select
                  className='undp-select'
                  allowClear
                  maxTagCount='responsive'
                  clearIcon={<div className='clearIcon' />}
                  showSearch
                  style={{ width: '100%' }}
                  placeholder='Size By'
                  onChange={(d) => { updateSizeIndicator(d); }}
                >
                  {
                    sizeOptions.map((d) => (
                      <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                    ))
                  }
                </Select>
              </div>
            ) : null
          }
          {
            graphType === 'barGraph' || graphType === 'scatterPlot'
              ? selectedCountry ? null : (
                <div className='settings-option-div'>
                  <p className='label'>
                    Color By
                  </p>
                  <Select
                    className='undp-select'
                    showSearch
                    maxTagCount='responsive'
                    style={{ width: '100%' }}
                    placeholder='Color By'
                    onChange={(d) => { updateColorIndicator(d); }}
                    defaultValue={DEFAULT_VALUES.colorMetric}
                  >
                    {
                    colorOptions.map((d) => (
                      <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                    ))
                  }
                  </Select>
                </div>
              ) : null
          }
          {
            graphType !== 'dataList'
              ? (
                <div className='flex-div flex-wrap'>
                  <button className='undp-button button-primary' type='button' onClick={() => { updateShowSource(true); }}>Download Data</button>
                  <button
                    className='undp-button button-secondary'
                    type='button'
                    onClick={() => {
                      const node = document.getElementById('graph-node') as HTMLElement;
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
                    Download Graph
                  </button>
                </div>
              ) : null
          }
        </div>
      </div>
      {
        graphType !== 'dataList' ? (
          <div className='settings-sections-container'>
            <button type='button' aria-label='Expand or collapse settings' className='settings-sections-container-title' onClick={() => { setSettingsExpanded(!settingExpanded); }}>
              <div>
                {
                  settingExpanded
                    ? <ChevronDown fill='#212121' size={18} /> : <ChevronLeft fill='#212121' size={18} />
                }
              </div>
              <h6 className='undp-typography margin-bottom-00'>
                Settings
                {' '}
                &
                {' '}
                Options
              </h6>
            </button>
            <div className='settings-sections-options-container' style={{ display: settingExpanded ? 'flex' : 'none' }}>
              {
                graphType !== 'trendLine' && graphType !== 'multiCountryTrendLine'
                  ? (
                    <>
                      {
                        graphType === 'scatterPlot'
                          ? (
                            <Checkbox style={{ margin: 0 }} className='undp-checkbox' checked={showLabel} onChange={(e) => { updateShowLabel(e.target.checked); }}>Show Label</Checkbox>
                          )
                          : null
                      }
                      <Checkbox style={{ margin: 0 }} className='undp-checkbox' checked={showMostRecentData} onChange={(e) => { updateShowMostRecentData(e.target.checked); }}>Show Most Recent Available Data</Checkbox>
                      {
                        graphType === 'barGraph'
                          ? (
                            <>
                              <Checkbox style={{ margin: 0 }} className='undp-checkbox' checked={!verticalBarLayout} onChange={(e) => { updateBarLayout(!e.target.checked); }}>Show Horizontal</Checkbox>
                              <Checkbox style={{ margin: 0 }} className='undp-checkbox' disabled={!verticalBarLayout} checked={reverseOrder} onChange={(e) => { updateReverseOrder(e.target.checked); }}>Show Largest First</Checkbox>
                            </>
                          )
                          : null
                      }
                    </>
                  ) : null
              }
              {
                graphType === 'trendLine'
                  ? (
                    <>
                      <Checkbox style={{ margin: 0 }} className='undp-checkbox' checked={showLabel} onChange={(e) => { updateShowLabel(e.target.checked); }}>Show Label</Checkbox>
                      <Checkbox style={{ margin: 0 }} className='undp-checkbox' checked={useSameRange} disabled={!yAxisIndicator} onChange={(e) => { updateUseSameRange(e.target.checked); }}>Use Same Range for Both Y-Axes</Checkbox>
                    </>
                  ) : null
              }
              {
                graphType === 'multiCountryTrendLine'
                  ? (
                    <Checkbox style={{ margin: 0 }} className='undp-checkbox' checked={showLabel} onChange={(e) => { updateShowLabel(e.target.checked); }}>Show Label</Checkbox>
                  ) : null
              }
            </div>
          </div>
        ) : null
      }
      {
        graphType !== 'trendLine' && graphType !== 'multiCountryTrendLine' && !selectedCountry && graphType !== 'dataList'
          ? (
            <div className='settings-sections-container'>
              <button type='button' aria-label='Expand or collapse filters' className='settings-sections-container-title' onClick={() => { setFilterExpanded(!filterExpanded); }}>
                <div>
                  {
                    filterExpanded
                      ? <ChevronDown fill='#212121' size={18} /> : <ChevronLeft fill='#212121' size={18} />
                  }
                </div>
                <h6 className='undp-typography margin-bottom-00'>
                  Filter or Highlight By
                </h6>
              </button>
              <div className='settings-sections-options-container' style={{ display: filterExpanded ? 'flex' : 'none' }}>
                <div className='settings-option-div'>
                  <p className='label'>
                    Region
                  </p>
                  <Select
                    className='undp-select'
                    mode='multiple'
                    maxTagCount='responsive'
                    allowClear
                    clearIcon={<div className='clearIcon' />}
                    style={{ width: '100%' }}
                    placeholder='Filter By Regions'
                    value={selectedRegions}
                    onChange={(d: string[]) => { updateSelectedRegions(d); }}
                  >
                    {
                  regions.map((d) => (
                    <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                  ))
                }
                  </Select>
                </div>
                <div className='settings-option-div'>
                  <p className='label'>
                    Income Group
                  </p>
                  <Select
                    className='undp-select'
                    mode='multiple'
                    maxTagCount='responsive'
                    allowClear
                    clearIcon={<div className='clearIcon' />}
                    style={{ width: '100%' }}
                    placeholder='Filter By Income Group'
                    value={selectedIncomeGroups}
                    onChange={(d: string[]) => { updateSelectedIncomeGroups(d); }}
                  >
                    {
                  INCOME_GROUPS.map((d) => (
                    <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                  ))
                }
                  </Select>
                </div>
                <div>
                  <p className='label'>
                    Country Groups
                  </p>
                  <Radio.Group onChange={(d) => { updateSelectedCountryGroup(d.target.value); }} value={selectedCountryGroup}>
                    <Radio className='undp-radio' value='All'>All</Radio>
                    <Radio className='undp-radio' value='LDC'>LDC</Radio>
                    <Radio className='undp-radio' value='LLDC'>LLDC</Radio>
                    <Radio className='undp-radio' value='SIDS'>SIDS</Radio>
                  </Radio.Group>
                </div>
                <div className='settings-option-div'>
                  <p className='label'>
                    Countries
                  </p>
                  <Select
                    className='undp-select'
                    mode='multiple'
                    maxTagCount='responsive'
                    allowClear
                    clearIcon={<div className='clearIcon' />}
                    style={{ width: '100%' }}
                    value={selectedCountries}
                    placeholder='Filter By Countries'
                    onChange={(d: string[]) => { updateSelectedCountries(d); updateMultiCountryTrendChartCountries(d); }}
                  >
                    {
                      countries.map((d) => d.name).map((d) => (
                        <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                      ))
                    }
                  </Select>
                </div>
              </div>
            </div>
          ) : null
      }
    </div>
  );
};
