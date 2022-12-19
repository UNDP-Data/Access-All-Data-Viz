/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect, useReducer } from 'react';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import styled from 'styled-components';
import { json } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import { useParams } from 'react-router-dom';
import {
  CountryGroupDataType, IndicatorMetaDataType, IndicatorMetaDataWithYear, CountryListType,
} from './Types';
import { GrapherComponent } from './GrapherComponent';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import {
  DEFAULT_VALUES, METADATALINK,
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
  const [finalData, setFinalData] = useState<CountryGroupDataType[] | undefined>(undefined);
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
      .defer(json, 'https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/output.json')
      .defer(json, METADATALINK)
      .await((err: any, data: CountryGroupDataType[], indicatorMetaData: IndicatorMetaDataType[]) => {
        if (err) throw err;
        const topic = queryParams.get('topic');
        setFinalData(data);
        setCountryList(data.map((d) => ({ name: d['Country or Area'], code: d['Alpha-3 code-1'] })));
        setRegionList(uniqBy(data, (d) => d['Group 2']).map((d) => d['Group 2']));
        const indicatorsFilteredBySS = signatureSolution ? indicatorMetaData.filter((d) => d.SignatureSolution.indexOf(signatureSolution) !== -1) : indicatorMetaData;
        const indicatorsFiltered = topic ? indicatorsFilteredBySS.filter((d) => d.SSTopics.indexOf(topic) !== -1) : indicatorsFilteredBySS;
        const indicatorWithYears: IndicatorMetaDataWithYear[] = indicatorsFiltered.map((d) => {
          const years: number[][] = [];
          data.forEach((el) => {
            console.log(el);
            el.indicators.forEach((indicator) => {
              years.push(indicator.yearlyData.map((year) => year.year));
            });
          });
          return {
            ...d,
            years: sortedUniq(flattenDeep(years)),
          };
        });
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
