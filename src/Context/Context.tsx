import { createContext } from 'react';
import { CtxDataType } from '../Types';

const Context = createContext<CtxDataType>({
  graphType: 'map',
  selectedRegions: [],
  selectedCountries: [],
  selectedIncomeGroups: [],
  selectedCountryGroup: 'All',
  showMostRecentData: false,
  year: 2022,
  xAxisIndicator: '',
  yAxisIndicator: '',
  colorIndicator: '',
  sizeIndicator: '',
  showLabel: false,
  trendChartCountry: undefined,
  dataListCountry: 'Afghanistan',
  useSameRange: false,
  reverseOrder: true,
  verticalBarLayout: true,
  multiCountryTrendChartCountries: [
    'China',
    'India',
    'United States of America',
    'Indonesia',
    'Pakistan',
  ],
  selectedCountryOrRegion: undefined,
  signatureSolution: undefined,
  signatureSolutionForDataList: 'All',
  showReference: false,
  updateGraphType: (
    _d:
      | 'scatterPlot'
      | 'map'
      | 'barGraph'
      | 'trendLine'
      | 'multiCountryTrendLine'
      | 'dataList',
  ) => {},
  updateSelectedRegions: (_d: string[]) => {},
  updateSelectedCountries: (_d: string[]) => {},
  updateSelectedIncomeGroups: (_d: string[]) => {},
  updateYear: (_d: number) => {},
  updateSelectedCountryGroup: (_d: 'All' | 'SIDS' | 'LLDC' | 'LDC') => {},
  updateXAxisIndicator: (_d?: string) => {},
  updateYAxisIndicator: (_d?: string) => {},
  updateColorIndicator: (_d?: string) => {},
  updateSizeIndicator: (_d?: string) => {},
  updateShowMostRecentData: (_d: boolean) => {},
  updateShowLabel: (_d: boolean) => {},
  updateUseSameRange: (_d: boolean) => {},
  updateTrendChartCountry: (_d: string) => {},
  updateDataListCountry: (_d: string) => {},
  updateMultiCountryTrendChartCountries: (_d: string[]) => {},
  updateReverseOrder: (_d: boolean) => {},
  updateBarLayout: (_d: boolean) => {},
  updateShowReference: (_d: boolean) => {},
  updateSignatureSolutionForDataList: (
    _d:
      | 'All'
      | 'Energy'
      | 'Environment'
      | 'Gender'
      | 'Governance'
      | 'Poverty and Inequality'
      | 'Resilience',
  ) => {},
});

export default Context;
