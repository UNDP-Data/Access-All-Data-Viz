import { createContext } from 'react';
import {
  CountryDisaggregatedDataType,
  CountryGroupDataType,
  CtxDataType,
  DisaggregationSettingsDataType,
  GenderTypes,
  GraphTypes,
} from '../Types';

const Context = createContext<CtxDataType>({
  graphType: 'map',
  indicator: 'headCount',
  spendByPerCapita: false,
  spendByYearly: true,
  spendByPPP: true,
  colorIndicator: 'Continents',
  showReference: false,
  reverseOrder: true,
  ageRange: [0, 80],
  incomeRange: [0, 999],
  gender: 'All',
  multiCountryTrendChartCountries: [
    'China',
    'India',
    'United States of America',
    'Indonesia',
    'Pakistan',
  ],
  year: 2024,
  verticalBarLayout: true,
  trendChartCountry: undefined,
  showLabel: false,
  selectedCountryGroup: 'All',
  selectedRegions: [],
  selectedCountries: [],
  selectedCountryIncomeGroups: [],
  disaggregationGraphType: 'country',
  disaggregationSettings: [],
  data: [],
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
  orderDisaggregatedDataBy: '',
  updateGraphType: (_d: GraphTypes) => {},
  updateIndicator: (_d: 'headCount' | 'spending') => {},
  updateSpendByPerCapita: (_d: boolean) => {},
  updateSpendByYearly: (_d: boolean) => {},
  updateSpendByPPP: (_d: boolean) => {},
  updateColorIndicator: (_d: 'Continents' | 'Income Groups') => {},
  updateShowReference: (_d: boolean) => {},
  updateReverseOrder: (_d: boolean) => {},
  updateMultiCountryTrendChartCountries: (_d: string[]) => {},
  updateYear: (_d: number) => {},
  updateBarLayout: (_d: boolean) => {},
  updateTrendChartCountry: (_d: string) => {},
  updateShowLabel: (_d: boolean) => {},
  updateSelectedCountryGroup: (_d: 'All' | 'SIDS' | 'LLDC' | 'LDC') => {},
  updateSelectedRegions: (_d: string[]) => {},
  updateSelectedCountries: (_d: string[]) => {},
  updateSelectedCountryIncomeGroups: (_d: string[]) => {},
  updateAgeRange: (_d: [number, number]) => {},
  updateIncomeRange: (_d: [number, number]) => {},
  updateGender: (_d: GenderTypes) => {},
  updateDisaggregationGraphType: (_d: 'country' | 'region') => {},
  updateDisaggregationSettings: (_d: DisaggregationSettingsDataType[]) => {},
  updateData: (_d: CountryGroupDataType[]) => {},
  updateWorldData: (_d: CountryGroupDataType) => {},
  updateDisaggregatedData: (_d: CountryDisaggregatedDataType[]) => {},
  updateDisaggregationIsLoading: (_d: boolean) => {},
  updateOrderDisaggregatedDataBy: (_d: string) => {},
});

export default Context;
