/* eslint-disable jsx-a11y/iframe-has-title */
import { useReducer } from 'react';
import {
  CountryGroupDataType,
  CountryListType,
  IndicatorMetaDataType,
} from '../Types';
import { DataExplorerGraphingEl } from '../GrapherComponent/GraphingEl';
import Reducer from '../Context/Reducer';
import Context from '../Context/Context';
import { DEFAULT_VIEWS } from '../DefaultViewsForDataExplorer';

interface Props {
  indicatorsList: IndicatorMetaDataType[];
  finalData: CountryGroupDataType[];
  countryList: CountryListType[];
  region?: string;
  defaultViewId: string;
}

function RegionalHomePageContext(props: Props) {
  const { indicatorsList, finalData, countryList, region, defaultViewId } =
    props;
  const defaultViewsIndx = defaultViewId
    ? DEFAULT_VIEWS.findIndex(d => d.id === defaultViewId) >= 0
      ? DEFAULT_VIEWS.findIndex(d => d.id === defaultViewId)
      : 0
    : 0;

  const firstMetric =
    indicatorsList.findIndex(
      d => d.DataKey === DEFAULT_VIEWS[defaultViewsIndx].firstMetric,
    ) === -1
      ? indicatorsList[0].DataKey
      : DEFAULT_VIEWS[defaultViewsIndx].firstMetric;
  const secondMetric =
    indicatorsList.findIndex(
      d => d.DataKey === DEFAULT_VIEWS[defaultViewsIndx].secondMetric,
    ) === -1
      ? indicatorsList.length > 1
        ? indicatorsList[1].DataKey
        : undefined
      : DEFAULT_VIEWS[defaultViewsIndx].secondMetric;
  const initialState = {
    graphType: 'dataList',
    selectedRegions: [],
    selectedCountries: [],
    selectedIncomeGroups: [],
    year: 2022,
    selectedCountryGroup: 'All',
    xAxisIndicator: firstMetric,
    yAxisIndicator: firstMetric === secondMetric ? undefined : secondMetric,
    colorIndicator: DEFAULT_VIEWS[defaultViewsIndx].colorMetric,
    sizeIndicator: undefined,
    showMostRecentData: false,
    showLabel: false,
    trendChartCountry: undefined,
    dataListCountry: undefined,
    multiCountryTrendChartCountries: [
      'China',
      'India',
      'United States of America',
      'Indonesia',
      'Pakistan',
    ],
    useSameRange: false,
    reverseOrder: false,
    verticalBarLayout: true,
    selectedCountryOrRegion: region,
    signatureSolution: undefined,
    signatureSolutionForDataList: 'All',
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateGraphType = (
    graphType: 'dataList' | 'map' | 'barGraph' | 'trendLine',
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
        <DataExplorerGraphingEl
          data={finalData}
          indicators={indicatorsList}
          countries={countryList}
          loading={false}
          regionData={undefined}
        />
      </div>
    </Context.Provider>
  );
}

export default RegionalHomePageContext;
