import { CtxStateDataType } from '../Types';

export default (state: CtxStateDataType, action: any) => {
  switch (action.type) {
    case 'UPDATE_GRAPH_TYPE':
      return { ...state, graphType: action.payload };
    case 'UPDATE_INDICATOR':
      return { ...state, indicator: action.payload };
    case 'UPDATE_SPEND_BY_PER_CAPITA':
      return { ...state, spendByPerCapita: action.payload };
    case 'UPDATE_SPEND_BY_YEARLY':
      return { ...state, spendByYearly: action.payload };
    case 'UPDATE_SPEND_BY_PPP':
      return { ...state, spendByPPP: action.payload };
    case 'UPDATE_COLOR_INDICATOR':
      return { ...state, colorIndicator: action.payload };
    case 'UPDATE_YEAR':
      return { ...state, year: action.payload };
    case 'UPDATE_SELECTED_COUNTRIES':
      return { ...state, selectedCountries: action.payload };
    case 'UPDATE_SELECTED_COUNTRY_INCOME_GROUPS':
      return { ...state, selectedCountryIncomeGroups: action.payload };
    case 'UPDATE_SHOW_LABEL':
      return { ...state, showLabel: action.payload };
    case 'UPDATE_TREND_CHART_COUNTRY':
      return { ...state, trendChartCountry: action.payload };
    case 'UPDATE_MULTI_COUNTRY_TREND_CHART_COUNTRIES':
      return { ...state, multiCountryTrendChartCountries: action.payload };
    case 'UPDATE_REVERSE_ORDER':
      return { ...state, reverseOrder: action.payload };
    case 'UPDATE_BAR_LAYOUT':
      return { ...state, verticalBarLayout: action.payload };
    case 'UPDATE_SHOW_REFERENCE':
      return { ...state, showReference: action.payload };
    case 'UPDATE_SELECTED_COUNTRY_GROUP':
      return { ...state, selectedCountryGroup: action.payload };
    case 'UPDATE_SELECTED_REGIONS':
      return { ...state, selectedRegions: action.payload };
    case 'UPDATE_AGE_RANGE':
      return { ...state, ageRange: action.payload };
    case 'UPDATE_INCOME_RANGE':
      return { ...state, incomeRange: action.payload };
    case 'UPDATE_GENDER':
      return { ...state, gender: action.payload };
    case 'UPDATE_DISAGGREGATION_GRAPH_TYPE':
      return { ...state, disaggregationGraphType: action.payload };
    case 'UPDATE_DISAGGREGATION_SETTINGS':
      return { ...state, disaggregationSettings: action.payload };
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
    case 'UPDATE_WORLD_DATA':
      return { ...state, worldData: action.payload };
    case 'UPDATE_DISAGGREGATED_DATA':
      return { ...state, disaggregatedData: action.payload };
    case 'UPDATE_DISAGGREGATION_IS_LOADING':
      return { ...state, disaggregationIsLoading: action.payload };
    case 'UPDATE_ORDER_DISAGGREGATED_DATA_BY':
      return { ...state, orderDisaggregatedDataBy: action.payload };
    default:
      return { ...state };
  }
};
