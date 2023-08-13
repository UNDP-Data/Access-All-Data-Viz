/* eslint-disable jsx-a11y/iframe-has-title */
import { useReducer } from 'react';
import {
  IndicatorMetaDataType,
  CountryListType,
  CountryTaxonomyDataType,
  CountryGroupDataType,
} from '../Types';
import Reducer from '../Context/Reducer';
import Context from '../Context/Context';
import { DEFAULT_VALUES } from '../Constants';
import { GrapherComponent } from '../GrapherComponent';
import { OverviewViz } from '../SSOverviewVisualizations/OverviewViz';
import { EnergyOverviewViz } from '../SSOverviewVisualizations/EnergyOverviewViz';
import { EnvironmentOverviewViz } from '../SSOverviewVisualizations/EnvironmentOverviewViz';
import { GenderOverviewViz } from '../SSOverviewVisualizations/GenderOverviewViz';
import { GovernanceOverviewViz } from '../SSOverviewVisualizations/GovernanceOverviewViz';
import { PovertyAndInequalityOverviewViz } from '../SSOverviewVisualizations/PovertyAndInequalityOverviewViz';
import { ResilienceOverviewViz } from '../SSOverviewVisualizations/ResilienceOverviewViz';

interface Props {
  signatureSolution?: string;
  taxonomyData: CountryTaxonomyDataType[];
  indicatorsList: IndicatorMetaDataType[];
  regionList: string[];
  countryList: CountryListType[];
  UNDPRegion?: string;
  regionData: CountryGroupDataType[];
}

function VisualizationEl(props: Props) {
  const {
    signatureSolution,
    taxonomyData,
    indicatorsList,
    regionList,
    countryList,
    UNDPRegion,
    regionData,
  } = props;
  const firstMetric =
    indicatorsList.findIndex(d => d.DataKey === DEFAULT_VALUES.firstMetric) ===
    -1
      ? indicatorsList[0].DataKey
      : DEFAULT_VALUES.firstMetric;
  const secondMetric =
    indicatorsList.findIndex(d => d.DataKey === DEFAULT_VALUES.secondMetric) ===
    -1
      ? indicatorsList.length > 1
        ? indicatorsList[1].DataKey
        : undefined
      : DEFAULT_VALUES.secondMetric;
  const countryListForMultiLineChart = UNDPRegion
    ? countryList.filter((_d, i) => i < 5).map(d => d.name)
    : ['China', 'India', 'United States of America', 'Indonesia', 'Pakistan'];
  const initialState = {
    graphType: 'map',
    selectedRegions: [],
    selectedCountries: [],
    selectedIncomeGroups: [],
    year: 2022,
    selectedCountryGroup: 'All',
    xAxisIndicator: firstMetric,
    yAxisIndicator: firstMetric === secondMetric ? undefined : secondMetric,
    colorIndicator: DEFAULT_VALUES.colorMetric,
    sizeIndicator: undefined,
    showMostRecentData: false,
    showLabel: false,
    showSource: false,
    trendChartCountry: undefined,
    dataListCountry: undefined,
    multiCountryTrendChartCountries: countryListForMultiLineChart,
    useSameRange: false,
    reverseOrder: false,
    verticalBarLayout: true,
    selectedCountryOrRegion: undefined,
    signatureSolution,
    signatureSolutionForDataList: 'All',
    showReference: false,
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
  const updateShowReference = (showReference: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_REFERENCE',
      payload: showReference,
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
        updateShowReference,
      }}
    >
      <div>
        {new URLSearchParams(window.location.search).get('topic') ? null : (
          <div>
            {signatureSolution === 'Poverty and Inequality' ? (
              <PovertyAndInequalityOverviewViz
                indicators={indicatorsList}
                data={regionData[0]}
              />
            ) : signatureSolution === 'Environment' ? (
              <EnvironmentOverviewViz
                indicators={indicatorsList}
                data={regionData[0]}
              />
            ) : signatureSolution === 'Gender' ? (
              <GenderOverviewViz
                indicators={indicatorsList}
                data={regionData[0]}
              />
            ) : signatureSolution === 'Governance' ? (
              <GovernanceOverviewViz
                indicators={indicatorsList}
                data={regionData[0]}
              />
            ) : signatureSolution === 'Resilience' ? (
              <ResilienceOverviewViz
                indicators={indicatorsList}
                data={regionData[0]}
              />
            ) : signatureSolution === 'Energy' ? (
              <EnergyOverviewViz
                indicators={indicatorsList}
                data={regionData[0]}
              />
            ) : (
              <OverviewViz indicators={indicatorsList} data={regionData[0]} />
            )}
          </div>
        )}
        <GrapherComponent
          indicators={indicatorsList}
          regions={regionList}
          countries={countryList}
          UNDPRegion={UNDPRegion}
          taxonomyData={taxonomyData}
        />
      </div>
    </Context.Provider>
  );
}

export default VisualizationEl;
