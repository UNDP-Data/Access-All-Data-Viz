import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
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
  isEmbeded: boolean;
}

interface ElProps {
  isEmbeded: boolean;
}

const El = styled.div<ElProps>`
  width: 25%;
  max-width: 30rem;
  height: ${(props) => (props.isEmbeded ? '100vh' : 'calc(100vh - 4rem)')};
  min-height: 46.25rem;
  padding: var(--spacing-07);
  border-right: 1px solid var(--gray-400);
  overflow: auto;
  background-color: var(--white);
  @media (max-width: 960px) {
    width: calc(100% - 4rem);
    max-width: 960px;
    border-right: 0px solid var(--gray-400);
    border-bottom: 1px solid var(--gray-400);
    padding-bottom: 0;
    height: auto;
    min-height: 0;
  }  
`;

const FiltersEl = styled.div`
  padding: 1rem 0 0 0;
  border-top: 1px solid var(--black-400);
  @media (max-width: 960px) {
    padding: 2rem 0;
  }  
`;

const FilterTitle = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
`;

export const Settings = (props: Props) => {
  const {
    indicators,
    regions,
    countries,
    isEmbeded,
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
    updateMultiCountrytrendChartCountries,
    updateReverseOrder,
    verticalBarLayout,
    updateBarLayout,
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
    <El className='undp-scrollbar' isEmbeded={isEmbeded}>
      {
        graphType !== 'dataList'
          ? (
            <div>
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
            <div>
              <p className='label'>
                Filter by Signature Solutions
              </p>
              <Select
                showSearch
                className='undp-select'
                placeholder='Please select'
                value={signatureSolutionForDataList}
                onChange={(d) => { updateSignatureSolutionForDataList(d as 'All' | 'Energy' | 'Environment' | 'Gender' | 'Governance' | 'Poverty and Inequality' | 'Resilience'); }}
                defaultValue={DEFAULT_VALUES.firstMetric}
              >
                {
                  SIGNATURE_SOLUTIONS_LIST.map((d) => (
                    <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                  ))
                }
              </Select>
            </div>
          )
      }
      {
        graphType === 'scatterPlot'
          ? (
            <div className='margin-top-07'>
              <p className='label'>
                Y-Axis
              </p>
              <Select
                className='undp-select'
                showSearch
                style={{ width: '100%' }}
                value={yAxisIndicator}
                placeholder='Please select'
                onChange={(d) => { updateYAxisIndicator(d); }}
                defaultValue={DEFAULT_VALUES.secondMetric}
              >
                {
                  options.map((d) => (
                    <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                  ))
                }
              </Select>
            </div>
          ) : graphType === 'map' ? (
            <div className='margin-top-07'>
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
                defaultValue={DEFAULT_VALUES.secondMetric}
              >
                {
                  options.map((d) => (
                    <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                  ))
                }
              </Select>
            </div>
          ) : graphType === 'trendLine' ? (
            <div className='margin-top-07'>
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
                defaultValue={DEFAULT_VALUES.secondMetric}
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
          <div className='margin-top-07'>
            <p className='label'>
              {graphType === 'map' ? 'Choose an indicator to overlay' : 'Size By'}
              {' '}
              (optional)
            </p>
            <Select
              className='undp-select'
              allowClear
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
            <div className='margin-top-07'>
              <p className='label'>
                Color By
              </p>
              <Select
                className='undp-select'
                showSearch
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
            <div className='flex-div flex-wrap margin-top-07'>
              <button className='undp-button button-primary' type='button' onClick={() => { updateShowSource(true); }}>Data Description & Download</button>
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
      {
        graphType !== 'dataList' ? (
          <>
            <hr className='undp-style margin-top-07 margin-bottom-07' />
            <div>
              <FilterTitle className='flex-div flex-vert-align-center margin-bottom-06' style={{ gap: '0.25rem' }} onClick={() => { setSettingsExpanded(!settingExpanded); }}>
                <div>
                  {
                    settingExpanded
                      ? <ChevronDown fill='#212121' size={24} /> : <ChevronLeft fill='#212121' size={24} />
                  }
                </div>
                <h5 className='undp-typography bold margin-bottom-00'>
                  Settings
                  {' '}
                  &
                  {' '}
                  Options
                </h5>
              </FilterTitle>
              <div className='flex-wrap' style={{ display: settingExpanded ? 'flex' : 'none', gap: '1rem' }}>
                {
                  graphType !== 'trendLine' && graphType !== 'multiCountryTrendLine'
                    ? (
                      <div className='flex-div flex-wrap'>
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
                      </div>
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
          </>
        ) : null
      }
      {
        graphType !== 'trendLine' && graphType !== 'multiCountryTrendLine' && !selectedCountry && graphType !== 'dataList'
          ? (
            <>
              <hr className='undp-style margin-top-07' />
              <FiltersEl>
                <FilterTitle className='flex-div flex-vert-align-center margin-bottom-05' style={{ gap: '0.25rem' }} onClick={() => { setFilterExpanded(!filterExpanded); }}>
                  <div>
                    {
                      filterExpanded
                        ? <ChevronDown fill='#212121' size={24} /> : <ChevronLeft fill='#212121' size={24} />
                    }
                  </div>
                  <h5 className='undp-typography bold margin-bottom-00'>
                    Filter or Highlight By
                  </h5>
                </FilterTitle>
                <div style={{ display: filterExpanded ? 'inline' : 'none' }}>
                  <div className='margin-top-03'>
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
                  <div className='margin-top-05'>
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
                  <div className='margin-top-05'>
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
                  <div className='margin-top-05'>
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
                      onChange={(d: string[]) => { updateSelectedCountries(d); updateMultiCountrytrendChartCountries(d); }}
                    >
                      {
                      countries.map((d) => d.name).map((d) => (
                        <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                      ))
                    }
                    </Select>
                  </div>
                </div>
              </FiltersEl>
            </>
          ) : null
      }
    </El>
  );
};
