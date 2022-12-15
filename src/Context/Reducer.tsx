export default (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_GRAPH_TYPE':
      return { ...state, graphType: action.payload };
    case 'UPDATE_SELECTED_REGIONS':
      return { ...state, selectedRegions: action.payload };
    case 'UPDATE_YEAR':
      return { ...state, year: action.payload };
    case 'UPDATE_SELECTED_COUNTRIES':
      return { ...state, selectedCountries: action.payload };
    case 'UPDATE_SELECTED_COUNTRY_GROUP':
      return { ...state, selectedCountryGroup: action.payload };
    case 'UPDATE_X_AXIS_INDICATOR':
      return { ...state, xAxisIndicator: action.payload };
    case 'UPDATE_Y_AXIS_INDICATOR':
      return { ...state, yAxisIndicator: action.payload };
    case 'UPDATE_COLOR_INDICATOR':
      return { ...state, colorIndicator: action.payload };
    case 'UPDATE_SIZE_INDICATOR':
      return { ...state, sizeIndicator: action.payload };
    case 'UPDATE_SELECTED_INCOME_GROUPS':
      return { ...state, selectedIncomeGroups: action.payload };
    case 'UPDATE_SHOW_MOST_RECENT_DATA':
      return { ...state, showMostRecentData: action.payload };
    case 'UPDATE_SHOW_LABEL':
      return { ...state, showLabel: action.payload };
    case 'UPDATE_SHOW_SOURCE':
      return { ...state, showSource: action.payload };
    case 'UPDATE_TREND_CHART_COUNTRY':
      return { ...state, trendChartCountry: action.payload };
    case 'UPDATE_MULTI_COUNTRY_TREND_CHART_COUNTRIES':
      return { ...state, multiCountrytrendChartCountries: action.payload };
    case 'UPDATE_USE_SAME_RANGE':
      return { ...state, useSameRange: action.payload };
    case 'UPDATE_REVERSE_ORDER':
      return { ...state, reverseOrder: action.payload };
    case 'UPDATE_BAR_LAYOUT':
      return { ...state, verticalBarLayout: action.payload };
    case 'UPDATE_SIGNATURE_SOLUTION_FOR_DATALIST':
      return { ...state, signatureSolutionForDataList: action.payload };
    default:
      return { ...state };
  }
};
