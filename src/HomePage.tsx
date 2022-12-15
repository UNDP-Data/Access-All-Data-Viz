/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { json } from 'd3-request';
import { nest } from 'd3-collection';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import { useParams } from 'react-router-dom';
import {
  DataType, CountryGroupDataType, IndicatorMetaDataType, IndicatorMetaDataWithYear, CountryListType,
} from './Types';
import { GrapherComponent } from './GrapherComponent';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import {
  COUNTRYTAXONOMYLINK, DATALINK, DEFAULT_VALUES, METADATALINK,
} from './Constants';

import './style/style.css';

const VizAreaEl = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 10rem;
`;

interface Props {
  countryId?: string;
  signatureSolution?: string;
}

const HomePage = (props:Props) => {
  const {
    countryId,
    signatureSolution,
  } = props;
  const countryFromLink = useParams().country;
  const signatureSolutionFromLink = useParams().signatureSolution;
  const [finalData, setFinalData] = useState<DataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<IndicatorMetaDataWithYear[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(undefined);
  const queryParams = new URLSearchParams(window.location.search);
  const initialState = {
    graphType: countryFromLink ? 'dataList' : queryParams.get('graphType') ? queryParams.get('graphType') : countryId ? 'trendLine' : 'map',
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
    selectedCountry: countryFromLink || countryId,
    signatureSolution: signatureSolutionFromLink || signatureSolution,
    signatureSolutionForDataList: 'All',
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

  const updateSignatureSolutionForDataList = (ss: 'All' | 'Energy' | 'Environment' | 'Gender' | 'Governance' | 'Poverty and Inequality' | 'Resilience') => {
    dispatch({
      type: 'UPDATE_SIGNATURE_SOLUTION_FOR_DATALIST',
      payload: ss,
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
      .defer(json, METADATALINK)
      .defer(json, COUNTRYTAXONOMYLINK)
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
        const indicators: {
          indicator: string;
          signatureSolutions: string[];
        }[] = [];
        dataWithYear.forEach((d: any) => {
          const keys = Object.keys(d);
          keys.forEach((key) => {
            let keySS: string[] = [];
            if (indicatorMetaData.findIndex((ind) => ind.DataKey === key) !== -1) { keySS = indicatorMetaData[indicatorMetaData.findIndex((ind) => ind.DataKey === key)].SignatureSolution; }
            if (indicators.findIndex((ind) => ind.indicator === key) === -1 && key !== 'Alpha-3 code' && key !== 'Country or Area' && key !== 'Year') { indicators.push({ indicator: key, signatureSolutions: keySS }); }
          });
        });
        const countryIndicatorObj = indicators.map((d) => {
          const yearList: number[] = [];
          dataWithYear.forEach((el: any) => {
            if (el[d.indicator] && yearList.indexOf(el.Year) === -1) {
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
              const value: undefined | number = indx !== -1 ? d.values[indx][indicatorObj.indicator.indicator] : undefined;
              return (
                {
                  ...year,
                  value,
                }
              );
            }).filter((val) => val.value !== undefined);
            return (
              {
                yearAvailable: indicatorObj.yearAvailable,
                signatureSolutions: indicatorObj.indicator.signatureSolutions,
                indicator: indicatorObj.indicator.indicator,
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
        setCountryList(countryData.map((d) => ({ name: d['Country or Area'], code: d['Alpha-3 code-1'] })));
        setRegionList(uniqBy(countryData, (d) => d['Group 2']).map((d) => d['Group 2']));

        const indicatorsFilteredBySS = signatureSolution ? indicatorMetaData.filter((d) => d.SignatureSolution.indexOf(signatureSolution) !== -1) : indicatorMetaData;
        const indicatorsFiltered = topic ? indicatorsFilteredBySS.filter((d) => d.SSTopics.indexOf(topic) !== -1) : indicatorsFilteredBySS;
        const indicatorWithYears: IndicatorMetaDataWithYear[] = indicatorsFiltered.map((d) => ({
          ...d,
          years: countryIndicatorObj[countryIndicatorObj.findIndex((el) => el.indicator.indicator === d.DataKey)].yearAvailable,
        }));
        setIndicatorsList(indicatorWithYears);
      });
  }, []);
  return (
    <>
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
                  updateSignatureSolutionForDataList,
                }}
              >
                <div className='undp-container'>
                  <GrapherComponent
                    data={finalData}
                    indicators={indicatorsList}
                    regions={regionList}
                    countries={countryList}
                  />
                </div>
              </Context.Provider>
            </>
          )
          : (
            <VizAreaEl className='undp-container'>
              <div className='undp-loader' />
            </VizAreaEl>
          )
      }
    </>
  );
};

export default HomePage;
