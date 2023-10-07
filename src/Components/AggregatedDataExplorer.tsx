/* eslint-disable jsx-a11y/iframe-has-title */
import { useReducer } from 'react';
import { Select } from 'antd';
import { CountryGroupDataType, IndicatorMetaDataType } from '../Types';
import Reducer from '../Context/Reducer';
import Context from '../Context/Context';
import { COUNTRIES_BY_UNDP_REGIONS } from '../Constants';
import { AggregatedGraphingEl } from '../GrapherComponent/GraphingEl';
import { DEFAULT_VIEWS } from '../DefaultViewsForDataExplorer';

interface Props {
  indicatorsList: IndicatorMetaDataType[];
  finalData: CountryGroupDataType[];
  regionId: string;
  defaultViewId: string;
}

function AggregatedDataExplorer(props: Props) {
  const { indicatorsList, finalData, regionId, defaultViewId } = props;

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
    selectedCountryOrRegion: regionId,
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
    <div>
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: 'var(--gray-400)',
          margin: '-2.5rem -1rem 2rem -1rem',
        }}
      >
        <div className='flex-div gap-03 flex-vert-align-center max-width-1980'>
          <h5
            className='undp-typography margin-bottom-00'
            style={{ flexShrink: 0 }}
          >
            Explore Aggregated Data for
          </h5>
          <Select
            className='undp-select'
            placeholder='Select A Country'
            style={{ flexGrow: 0 }}
            showSearch
            value={
              regionId === 'WLD'
                ? 'World'
                : COUNTRIES_BY_UNDP_REGIONS[
                    COUNTRIES_BY_UNDP_REGIONS.findIndex(
                      d => d.region === `UNDP_${regionId}`,
                    )
                  ].name
            }
          >
            <Select.Option className='undp-select-option' value={regionId}>
              {regionId === 'WLD'
                ? 'World'
                : COUNTRIES_BY_UNDP_REGIONS[
                    COUNTRIES_BY_UNDP_REGIONS.findIndex(
                      d => d.region === `UNDP_${regionId}`,
                    )
                  ].name}
            </Select.Option>
          </Select>
        </div>
      </div>
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
        <div className='undp-container max-width-1980'>
          <AggregatedGraphingEl
            data={finalData}
            indicators={indicatorsList}
            region={regionId}
          />
        </div>
      </Context.Provider>
    </div>
  );
}

export default AggregatedDataExplorer;
