/* eslint-disable jsx-a11y/iframe-has-title */
import { useReducer } from 'react';
import {
  CountryGroupDataType,
  IndicatorMetaDataWithYear,
  CountryListType,
} from '../Types';
import { GrapherComponent } from '../GrapherComponent';
import Reducer from '../Context/Reducer';
import Context from '../Context/Context';
import { DEFAULT_VALUES } from '../Constants';

interface Props {
  signatureSolution?: string;
  indicatorsList: IndicatorMetaDataWithYear[];
  finalData: CountryGroupDataType[];
  regionList: string[];
  countryList: CountryListType[];
  region?: string;
}

function HomePageContext(props: Props) {
  const {
    signatureSolution,
    indicatorsList,
    finalData,
    regionList,
    countryList,
    region,
  } = props;
  const queryParams = new URLSearchParams(window.location.search);
  const firstMetric =
    indicatorsList.findIndex(
      d => d.IndicatorLabelTable === DEFAULT_VALUES.firstMetric,
    ) === -1
      ? indicatorsList[0].IndicatorLabelTable
      : DEFAULT_VALUES.firstMetric;
  const secondMetric =
    indicatorsList.findIndex(
      d => d.IndicatorLabelTable === DEFAULT_VALUES.secondMetric,
    ) === -1
      ? indicatorsList.length > 1
        ? indicatorsList[1].IndicatorLabelTable
        : undefined
      : DEFAULT_VALUES.secondMetric;
  const countryListForMultiLineChart = region
    ? finalData.filter((_d, i) => i < 5).map(d => d['Country or Area'])
    : ['China', 'India', 'United States of America', 'Indonesia', 'Pakistan'];
  const initialState = {
    graphType: queryParams.get('graphType')
      ? queryParams.get('graphType')
      : region
      ? 'barGraph'
      : 'map',
    selectedRegions: queryParams.get('regions')?.split('~') || [],
    selectedCountries: queryParams.get('countries')?.split('~') || [],
    selectedIncomeGroups: queryParams.get('incomeGroups')?.split('~') || [],
    year: 2022,
    selectedCountryGroup: queryParams.get('countryGroup') || 'All',
    xAxisIndicator: queryParams.get('firstMetric') || firstMetric,
    yAxisIndicator: queryParams.get('secondMetric') || secondMetric,
    colorIndicator:
      queryParams.get('colorMetric') || DEFAULT_VALUES.colorMetric,
    sizeIndicator: queryParams.get('sizeMetric') || undefined,
    showMostRecentData: queryParams.get('showMostRecentData') === 'true',
    showLabel: queryParams.get('showLabel') === 'true',
    showSource: false,
    trendChartCountry: queryParams.get('trendChartCountry') || undefined,
    dataListCountry: queryParams.get('dataListCountry') || undefined,
    multiCountryTrendChartCountries:
      queryParams.get('multiCountryTrendChartCountries')?.split('~') ||
      countryListForMultiLineChart,
    useSameRange: queryParams.get('useSameRange') === 'true',
    reverseOrder: queryParams.get('reverseOrder') === 'true',
    verticalBarLayout: queryParams.get('verticalBarLayout') !== 'false',
    selectedCountryOrRegion: undefined,
    signatureSolution,
    signatureSolutionForDataList: 'All',
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateGraphType = (
    graphType: 'scatterPlot' | 'map' | 'barGraph' | 'trendLine',
  ) => {
    dispatch({
      type: 'UPDATE_GRAPH_TYPE',
      payload: graphType,
    });
  };

  const updateMultiCountryTrendChartCountries = (
    multiCountryTrendChartCountries: string[],
  ) => {
    dispatch({
      type: 'UPDATE_MULTI_COUNTRY_TREND_CHART_COUNTRIES',
      payload: multiCountryTrendChartCountries,
    });
  };

  const updateSignatureSolutionForDataList = (
    ss:
      | 'All'
      | 'Energy'
      | 'Environment'
      | 'Gender'
      | 'Governance'
      | 'Poverty and Inequality'
      | 'Resilience',
  ) => {
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

  const updateDataListCountry = (dataListCountry: string) => {
    dispatch({
      type: 'UPDATE_DATA_LIST_COUNTRY',
      payload: dataListCountry,
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

  const updateSelectedCountryGroup = (
    selectedCountryGroup: 'All' | 'SIDS' | 'LLDC' | 'LDC',
  ) => {
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
  const updateBarLayout = (verticalBarLayout: boolean) => {
    dispatch({
      type: 'UPDATE_BAR_LAYOUT',
      payload: verticalBarLayout,
    });
  };
  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
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
        updateDataListCountry,
        updateMultiCountryTrendChartCountries,
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
          region={region}
        />
      </div>
    </Context.Provider>
  );
}

export default HomePageContext;
