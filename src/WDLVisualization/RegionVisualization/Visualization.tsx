/* eslint-disable jsx-a11y/iframe-has-title */
import { useReducer } from 'react';
import {
  CountryDisaggregatedDataType,
  CountryGroupDataType,
  CountryListType,
  CountryTaxonomyDataType,
  CtxStateDataType,
  DisaggregationSettingsDataType,
  GenderTypes,
  GraphTypes,
} from '../Types';
import Reducer from '../Context/Reducer';
import Context from '../Context/Context';
import { GrapherComponent } from '../GrapherComponent';

interface Props {
  taxonomyData: CountryTaxonomyDataType[];
  regionList: string[];
  countryList: CountryListType[];
  countryCode?: string;
}

function VisualizationEl(props: Props) {
  const { taxonomyData, regionList, countryList, countryCode } = props;
  const multiCountryTrendChartCountries = [
    'China',
    'India',
    'United States of America',
    'Indonesia',
    'Pakistan',
  ];
  const initialState: CtxStateDataType = {
    graphType: countryCode ? 'countryLineChart' : 'map',
    data: [],
    indicator: 'headCount',
    year: 2024,
    spendByPerCapita: false,
    spendByYearly: true,
    spendByPPP: true,
    colorIndicator: 'Continents',
    reverseOrder: true,
    showReference: false,
    multiCountryTrendChartCountries,
    verticalBarLayout: true,
    trendChartCountry: countryCode
      ? taxonomyData[
          taxonomyData.findIndex(d => d['Alpha-3 code'] === countryCode)
        ]['Country or Area']
      : undefined,
    showLabel: false,
    selectedCountryGroup: 'All',
    selectedRegions: [],
    selectedCountries: [],
    selectedCountryIncomeGroups: [],
    ageRange: [0, 80],
    incomeRange: [0, 999],
    gender: 'All',
    disaggregationGraphType: 'country',
    disaggregationSettings: [
      {
        gender: 'Male',
        ageRange: [0, 80],
        incomeRange: [0, 999],
      },
      {
        gender: 'Female',
        ageRange: [0, 80],
        incomeRange: [0, 999],
      },
    ],
    orderDisaggregatedDataBy: 'Male 0-80 0-999',
    worldData: {
      'Alpha-3 code': 'WLD',
      'Country or Area': 'World',
      'Group 1': '',
      'Group 2': '',
      LDC: false,
      LLDC: false,
      'Latitude (average)': 0,
      'Longitude (average)': 0,
      SIDS: false,
      'Income group': '',
      data: [],
    },
    disaggregatedData: [],
    disaggregationIsLoading: true,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateGraphType = (graphType: GraphTypes) => {
    dispatch({
      type: 'UPDATE_GRAPH_TYPE',
      payload: graphType,
    });
  };
  const updateShowReference = (showReference: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_REFERENCE',
      payload: showReference,
    });
  };

  const updateMultiCountryTrendChartCountries = (d: string[]) => {
    dispatch({
      type: 'UPDATE_MULTI_COUNTRY_TREND_CHART_COUNTRIES',
      payload: d,
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

  const updateSelectedCountryGroup = (
    selectedCountryGroup: 'All' | 'SIDS' | 'LLDC' | 'LDC',
  ) => {
    dispatch({
      type: 'UPDATE_SELECTED_COUNTRY_GROUP',
      payload: selectedCountryGroup,
    });
  };

  const updateSelectedCountryIncomeGroups = (
    selectedIncomeGroups: string[],
  ) => {
    dispatch({
      type: 'UPDATE_SELECTED_COUNTRY_INCOME_GROUPS',
      payload: selectedIncomeGroups,
    });
  };

  const updateShowLabel = (showLabel: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_LABEL',
      payload: showLabel,
    });
  };

  const updateBarLayout = (verticalBarLayout: boolean) => {
    dispatch({
      type: 'UPDATE_BAR_LAYOUT',
      payload: verticalBarLayout,
    });
  };

  const updateSpendByPerCapita = (d: boolean) => {
    dispatch({
      type: 'UPDATE_SPEND_BY_PER_CAPITA',
      payload: d,
    });
  };

  const updateIndicator = (d: 'headCount' | 'spending') => {
    dispatch({
      type: 'UPDATE_INDICATOR',
      payload: d,
    });
  };

  const updateSpendByYearly = (d: boolean) => {
    dispatch({
      type: 'UPDATE_SPEND_BY_YEARLY',
      payload: d,
    });
  };

  const updateSpendByPPP = (d: boolean) => {
    dispatch({
      type: 'UPDATE_SPEND_BY_PPP',
      payload: d,
    });
  };

  const updateColorIndicator = (d: 'Continents' | 'Income Groups') => {
    dispatch({
      type: 'UPDATE_COLOR_INDICATOR',
      payload: d,
    });
  };

  const updateAgeRange = (d: [number, number]) => {
    dispatch({
      type: 'UPDATE_AGE_RANGE',
      payload: d,
    });
  };

  const updateIncomeRange = (d: [number, number]) => {
    dispatch({
      type: 'UPDATE_INCOME_RANGE',
      payload: d,
    });
  };

  const updateGender = (d: GenderTypes) => {
    dispatch({
      type: 'UPDATE_GENDER',
      payload: d,
    });
  };

  const updateDisaggregationGraphType = (d: 'country' | 'region') => {
    dispatch({
      type: 'UPDATE_DISAGGREGATION_GRAPH_TYPE',
      payload: d,
    });
  };

  const updateDisaggregationSettings = (
    d: DisaggregationSettingsDataType[],
  ) => {
    dispatch({
      type: 'UPDATE_DISAGGREGATION_SETTINGS',
      payload: d,
    });
  };

  const updateData = (d: CountryGroupDataType[]) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: d,
    });
  };

  const updateWorldData = (d: CountryGroupDataType) => {
    dispatch({
      type: 'UPDATE_WORLD_DATA',
      payload: d,
    });
  };

  const updateDisaggregatedData = (d: CountryDisaggregatedDataType[]) => {
    dispatch({
      type: 'UPDATE_DISAGGREGATED_DATA',
      payload: d,
    });
  };

  const updateDisaggregationIsLoading = (d: boolean) => {
    dispatch({
      type: 'UPDATE_DISAGGREGATION_IS_LOADING',
      payload: d,
    });
  };

  const updateOrderDisaggregatedDataBy = (d: string) => {
    dispatch({
      type: 'UPDATE_ORDER_DISAGGREGATED_DATA_BY',
      payload: d,
    });
  };

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...state,
        updateGraphType,
        updateSpendByPerCapita,
        updateIndicator,
        updateSpendByYearly,
        updateSpendByPPP,
        updateColorIndicator,
        updateShowReference,
        updateReverseOrder,
        updateMultiCountryTrendChartCountries,
        updateYear,
        updateBarLayout,
        updateTrendChartCountry,
        updateShowLabel,
        updateSelectedCountryGroup,
        updateSelectedRegions,
        updateSelectedCountries,
        updateSelectedCountryIncomeGroups,
        updateGender,
        updateIncomeRange,
        updateAgeRange,
        updateDisaggregationGraphType,
        updateDisaggregationSettings,
        updateData,
        updateWorldData,
        updateDisaggregatedData,
        updateDisaggregationIsLoading,
        updateOrderDisaggregatedDataBy,
      }}
    >
      <div>
        <GrapherComponent
          regions={regionList}
          countries={countryList}
          taxonomyData={taxonomyData}
          countryCode={countryCode}
        />
      </div>
    </Context.Provider>
  );
}

export default VisualizationEl;
