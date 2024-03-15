/* eslint-disable jsx-a11y/iframe-has-title */
import { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import {
  CountryGroupDataType,
  IndicatorMetaDataType,
  CountryListType,
  DisaggregationMetaDataType,
  GraphType,
  SSTypes,
} from '../Types';
import { CountryGraphingEl } from '../GrapherComponent/GraphingEl';
import Reducer from '../Context/Reducer';
import Context from '../Context/Context';
import { OverviewViz } from '../OverviewVisualizations/OverviewViz';
import { DEFAULT_VIEWS } from '../DefaultViewsForDataExplorer';

interface Props {
  indicatorsList: IndicatorMetaDataType[];
  disaggregationMetaData: DisaggregationMetaDataType[];
  finalData: CountryGroupDataType[];
  regionList: string[];
  countryList: CountryListType[];
  countryId?: string;
  loading: boolean;
  signatureSolution?: string;
  idForOverview: string;
  defaultViewId: string;
}

function CountryVisualization(props: Props) {
  const {
    indicatorsList,
    finalData,
    regionList,
    countryList,
    countryId,
    signatureSolution,
    loading,
    idForOverview,
    defaultViewId,
    disaggregationMetaData,
  } = props;
  const signatureSolutionFromLink = useParams().signatureSolution;
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
    graphType: 'trendLine',
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
    showReference: false,
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
    selectedCountryOrRegion: countryId,
    signatureSolution: signatureSolutionFromLink || signatureSolution,
    signatureSolutionForDataList: 'All',
    disaggregationIndicator:
      disaggregationMetaData.length > 0 ? disaggregationMetaData[0] : undefined,
    disaggregationGraphType: 'country',
    disaggregationOrder: 'first',
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateGraphType = (graphType: GraphType) => {
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
  const updateShowReference = (showReference: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_REFERENCE',
      payload: showReference,
    });
  };
  const updateSignatureSolutionForDataList = (ss: SSTypes) => {
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
  const updateDisaggregationIndicator = (
    disaggregationIndicator: DisaggregationMetaDataType,
  ) => {
    dispatch({
      type: 'UPDATE_DISAGGREGATION_INDICATOR',
      payload: disaggregationIndicator,
    });
  };
  const updateDisaggregationGraphType = (
    disaggregationGraphType: 'global' | 'country',
  ) => {
    dispatch({
      type: 'UPDATE_DISAGGREGATION_GRAPH_TYPE',
      payload: disaggregationGraphType,
    });
  };
  const updateDisaggregationOrder = (
    disaggregationOrder: 'first' | 'second' | 'diff',
  ) => {
    dispatch({
      type: 'UPDATE_DISAGGREGATION_ORDER',
      payload: disaggregationOrder,
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
        updateShowReference,
        updateDisaggregationIndicator,
        updateDisaggregationGraphType,
        updateDisaggregationOrder,
      }}
    >
      <div className='undp-container'>
        {new URLSearchParams(window.location.search).get('topic') ? null : (
          <OverviewViz
            indicators={indicatorsList}
            data={finalData[0]}
            id={idForOverview}
          />
        )}
        <CountryGraphingEl
          data={finalData}
          indicators={indicatorsList}
          disaggregationMetaData={disaggregationMetaData}
          regions={regionList}
          countries={countryList}
          loading={loading}
        />
      </div>
    </Context.Provider>
  );
}

export default CountryVisualization;
