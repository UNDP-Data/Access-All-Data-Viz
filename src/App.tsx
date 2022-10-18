/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect, useReducer } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { json } from 'd3-request';
import { nest } from 'd3-collection';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import {
  DataType, CountryGroupDataType, IndicatorMetaDataType, IndicatorMetaDataWithYear,
} from './Types';
import { GrapherComponent } from './GrapherComponent';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import { DATALINK, DEFAULT_VALUES } from './Constants';

const GlobalStyle = createGlobalStyle`
  :root {
    --white: #FFFFFF;
    --primary-blue: #006EB5;
    --blue-medium: #4F95DD;
    --blue-bg: #94C4F5;
    --navy: #082753;
    --black-100: #FAFAFA;
    --black-200: #f5f9fe;
    --black-300: #EDEFF0;
    --black-400: #E9ECF6;
    --black-450: #DDD;
    --black-500: #A9B1B7;
    --black-550: #666666;
    --black-600: #212121;
    --black-700: #000000;
    --blue-very-light: #F2F7FF;
    --yellow: #FBC412;
    --yellow-bg: #FFE17E;
    --red: #D12800;
    --red-bg: #FFBCB7;
    --shadow:0px 10px 30px -10px rgb(9 105 250 / 15%);
    --shadow-bottom: 0 10px 13px -3px rgb(9 105 250 / 5%);
    --shadow-top: 0 -10px 13px -3px rgb(9 105 250 / 15%);
    --shadow-right: 10px 0px 13px -3px rgb(9 105 250 / 5%);
    --shadow-left: -10px 0px 13px -3px rgb(9 105 250 / 15%);
  }
  
  html { 
    font-size: 62.5%; 
  }

  .react-dropdown-select-option{
    color:var(--black) !important;
    background-color:var(--primary-color-light) !important;
  }
  .react-dropdown-select-option-label, .react-dropdown-select-option-remove{
    font-weight: 400;
    background-color:var(--primary-color-light);
    padding: 0.5rem;
  }

  body {
    font-family: "proxima-nova", "Helvetica Neue", "sans-serif";
    color: var(--black-600);
    background-color: var(--white);
    margin: 0;
    padding: 1rem 0;
    font-size: 1.6rem;
    font-weight: normal;
    line-height: 2.56rem;
  }

  a {
    text-decoration: none;
    color: var(--primary-blue);
  }

  h1 {
    color: var(--primary-blue);
    font-size: 3.2rem;
    font-weight: 700;
    
    @media (max-width: 760px) {
      font-size: 2.4rem;
    }
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
  
  button.primary {
    border-radius: 0.2rem !important;
    font-size: 1.4rem !important;
    font-weight: normal !important;
    color: var(--white) !important;
    background-color: var(--primary-blue) !important;
    border: 1px solid var(--primary-blue) !important;
    cursor: pointer !important;
    padding: 0.4rem 1rem !important;
    &:hover {
      border: 1px solid var(--blue-medium) !important;
      background-color: var(--blue-medium) !important;
    }
    &:active{
      border: 1px solid var(--blue-medium) !important;
      background-color: var(--blue-medium) !important;
    }
  }

  button.secondary {
    border-radius: 0.2rem !important;
    font-size: 1.4rem !important;
    font-weight: normal !important;
    color: var(--black-600) !important;
    border: 1px solid var(--black-450) !important;
    cursor: pointer !important;
    padding: 0.4rem 1rem !important;
    background-color: var(--white) !important;
    &:hover {
      border: 1px solid var(--primary-blue) !important;
      color: var(--primary-blue) !important;
    }
    &:active{
      border: 1px solid var(--primary-blue) !important;
      color: var(--primary-blue) !important;
    }
  }

  a:hover {
    font-weight: bold;
  }

  .bold{
    font-weight: 700;
  }
  
  .italics{
    font-style: italic;
  }

  .ant-modal-close {
    display: none !important;
  }

  .ant-select-item-option-content {
    white-space: normal;
  }

  .ant-select-selector {
    border-radius: 0.5rem !important;
    background-color: var(--black-200) !important;
  }
  .ant-slider-mark-text {
    font-size: 1rem !important;
    display: none;
    &:first-of-type {
      display: inline;
    }
    &:last-of-type {
      display: inline;
    }
  }
  .ant-slider-tooltip{
    padding: 0 !important;
  }
  .ant-tooltip-inner{
    font-size: 1.4rem !important;
    background-color: var(--black-550) !important;
    border-radius: 0.4rem;
  }
  .ant-tooltip-arrow-content{
    background-color: var(--black-550) !important;
  }
`;

const VizAreaEl = styled.div`
  display: flex;
  max-width: 1220px;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 10rem;
`;

const App = () => {
  const [finalData, setFinalData] = useState<DataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<IndicatorMetaDataWithYear[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<string[] | undefined>(undefined);
  const queryParams = new URLSearchParams(window.location.search);
  const initialState = {
    graphType: queryParams.get('graphType') || 'map',
    selectedRegions: queryParams.get('regions')?.split('~') || [],
    selectedCountries: queryParams.get('countries')?.split('~') || [],
    selectedIncomeGroups: queryParams.get('incomeGroups')?.split('~') || [],
    year: 2021,
    selectedCountryGroup: queryParams.get('countryGroup') || 'All',
    xAxisIndicator: queryParams.get('firstMetric') || DEFAULT_VALUES.firstMetric,
    yAxisIndicator: queryParams.get('secondMetric') || DEFAULT_VALUES.secondMetric,
    colorIndicator: queryParams.get('colorMetric') || DEFAULT_VALUES.colorMetric,
    sizeIndicator: queryParams.get('sizeMetric') || undefined,
    showMostRecentData: queryParams.get('showMostRecentData') === 'true',
    showLabel: queryParams.get('showLabel') === 'true',
    showSource: false,
    trendChartCountry: queryParams.get('trendChartCountry') || undefined,
    multiCountrytrendChartCountries: queryParams.get('multiCountrytrendChartCountries')?.split('~') || ['China', 'India', 'United States of America', 'Indonesia', 'Pakistan'],
    useSameRange: queryParams.get('useSameRange') === 'true',
    reverseOrder: queryParams.get('reverseOrder') === 'true',
    verticalBarLayout: queryParams.get('verticalBarLayout') !== 'false',
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateGraphType = (graphType: 'scatterPlot' | 'map' | 'barGraph' | 'trendLine') => {
    dispatch({
      type: 'UPDATE_GRAPH_TYPE',
      payload: graphType,
    });
  };

  const updateMultiCountrytrendChartCountries = (multiCountrytrendChartCountries: string[]) => {
    dispatch({
      type: 'UPDATE_MULTI_COUNTRY_TREND_CHART_COUNTRIES',
      payload: multiCountrytrendChartCountries,
    });
  };

  const updateReverseOrder = (reverseOrder: boolean) => {
    dispatch({
      type: 'UPDATE_REVERSE_ORDER',
      payload: reverseOrder,
    });
  };

  const updateTrendChartCountry = (trendChartCountry: string) => {
    dispatch({
      type: 'UPDATE_TREND_CHART_COUNTRY',
      payload: trendChartCountry,
    });
  };

  const updateSelectedRegions = (selectedRegions: string[]) => {
    dispatch({
      type: 'UPDATE_SELECTED_REGIONS',
      payload: selectedRegions,
    });
  };

  const updateSelectedCountries = (selectedCountries: string[]) => {
    dispatch({
      type: 'UPDATE_SELECTED_COUNTRIES',
      payload: selectedCountries,
    });
  };
  const updateYear = (year: number) => {
    dispatch({
      type: 'UPDATE_YEAR',
      payload: year,
    });
  };

  const updateSelectedCountryGroup = (selectedCountryGroup: 'All' | 'SIDS' | 'LLDC' | 'LDC') => {
    dispatch({
      type: 'UPDATE_SELECTED_COUNTRY_GROUP',
      payload: selectedCountryGroup,
    });
  };

  const updateXAxisIndicator = (xAxisIndicator: string) => {
    dispatch({
      type: 'UPDATE_X_AXIS_INDICATOR',
      payload: xAxisIndicator,
    });
  };

  const updateYAxisIndicator = (yAxisIndicator?: string) => {
    dispatch({
      type: 'UPDATE_Y_AXIS_INDICATOR',
      payload: yAxisIndicator,
    });
  };

  const updateColorIndicator = (colorIndicator?: string) => {
    dispatch({
      type: 'UPDATE_COLOR_INDICATOR',
      payload: colorIndicator,
    });
  };

  const updateSizeIndicator = (sizeIndicator?: string) => {
    dispatch({
      type: 'UPDATE_SIZE_INDICATOR',
      payload: sizeIndicator,
    });
  };

  const updateSelectedIncomeGroups = (selectedIncomeGroups?: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_INCOME_GROUPS',
      payload: selectedIncomeGroups,
    });
  };

  const updateShowMostRecentData = (selectedIncomeGroups: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_MOST_RECENT_DATA',
      payload: selectedIncomeGroups,
    });
  };

  const updateShowLabel = (showLabel: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_LABEL',
      payload: showLabel,
    });
  };

  const updateShowSource = (showSource: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_SOURCE',
      payload: showSource,
    });
  };

  const updateUseSameRange = (useSameRange: boolean) => {
    dispatch({
      type: 'UPDATE_USE_SAME_RANGE',
      payload: useSameRange,
    });
  };
  const updateBarLayout = (varticalBarLayout: boolean) => {
    dispatch({
      type: 'UPDATE_BAR_LAYOUT',
      payload: varticalBarLayout,
    });
  };

  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}ALL-DATA.json`)
      .defer(json, 'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/main/indicatorMetaData.json')
      .defer(json, 'https://raw.githubusercontent.com/UNDP-Data/Country-Taxonomy/main/country-territory-groups.json')
      .await((err: any, data: any[], indicatorMetaData: IndicatorMetaDataType[], countryGroupData: CountryGroupDataType[]) => {
        if (err) throw err;
        const dataWithYear = data.map((d: any) => {
          const Year = new Date(d.Year).getFullYear();
          return { ...d, Year };
        });

        const topic = queryParams.get('topic');

        const groupedData = nest()
          .key((d: any) => d['Alpha-3 code'])
          .entries(dataWithYear);
        const indicators: string[] = [];
        dataWithYear.forEach((d: any) => {
          const keys = Object.keys(d);
          keys.forEach((key) => {
            if (indicators.indexOf(key) === -1 && key !== 'Alpha-3 code' && key !== 'Country or Area' && key !== 'Year') { indicators.push(key); }
          });
        });
        const countryIndicatorObj = indicators.map((d: string) => {
          const yearList: number[] = [];
          dataWithYear.forEach((el: any) => {
            if (el[d] && yearList.indexOf(el.Year) === -1) {
              yearList.push(el.Year);
            }
          });
          return ({
            indicator: d,
            yearAvailable: sortBy(yearList),
            yearlyData: sortBy(yearList).map((year) => ({
              year,
              value: undefined,
            })),
          });
        });
        const countryData = groupedData.map((d) => {
          const countryGroup = countryGroupData[countryGroupData.findIndex((el) => el['Alpha-3 code-1'] === d.key)];
          const indTemp = countryIndicatorObj.map((indicatorObj) => {
            const yearlyData = indicatorObj.yearlyData.map((year) => {
              const indx = d.values.findIndex((val: { Year: string; }) => parseInt(val.Year, 10) === year.year);
              const value: undefined | number = indx !== -1 ? d.values[indx][indicatorObj.indicator] : undefined;
              return (
                {
                  ...year,
                  value,
                }
              );
            }).filter((val) => val.value !== undefined);
            return (
              {
                ...indicatorObj,
                yearlyData,
              }
            );
          });
          return ({
            ...countryGroup,
            indicatorAvailable: indTemp.map((ind) => ind.indicator),
            indicators: indTemp,
          });
        });
        setFinalData(countryData);
        setCountryList(countryData.map((d) => d['Country or Area']));
        setRegionList(uniqBy(countryData, (d) => d['Group 2']).map((d) => d['Group 2']));
        const indicatorsFiltered = topic ? indicatorMetaData.filter((d) => d.SSTopics.indexOf(topic) !== -1) : indicatorMetaData;
        const indicatorWithYears: IndicatorMetaDataWithYear[] = indicatorsFiltered.map((d) => ({
          ...d,
          years: countryIndicatorObj[countryIndicatorObj.findIndex((el) => el.indicator === d.DataKey)].yearAvailable,
        }));
        setIndicatorsList(indicatorWithYears);
      });
  }, []);
  return (
    <>
      <GlobalStyle />
      {
        indicatorsList && finalData && regionList && countryList
          ? (
            <>
              <Context.Provider
                value={{
                  ...state,
                  updateGraphType,
                  updateSelectedRegions,
                  updateYear,
                  updateSelectedCountries,
                  updateSelectedCountryGroup,
                  updateXAxisIndicator,
                  updateYAxisIndicator,
                  updateColorIndicator,
                  updateSizeIndicator,
                  updateSelectedIncomeGroups,
                  updateShowMostRecentData,
                  updateShowLabel,
                  updateShowSource,
                  updateTrendChartCountry,
                  updateMultiCountrytrendChartCountries,
                  updateUseSameRange,
                  updateReverseOrder,
                  updateBarLayout,
                }}
              >
                <GrapherComponent
                  data={finalData}
                  indicators={indicatorsList}
                  regions={regionList}
                  countries={countryList}
                />
              </Context.Provider>
            </>
          )
          : (
            <VizAreaEl>
              <Spin size='large' />
            </VizAreaEl>
          )
      }
    </>
  );
};

export default App;
