export type GraphTypes =
  | 'map'
  | 'barGraph'
  | 'multiCountryTrendLine'
  | 'disaggregation'
  | 'countryLineChart';

export type GenderTypes = 'All' | 'Male' | 'Female';

export type IndicatorNameType =
  | 'headcount'
  | 'expenditure_nominal'
  | 'expenditure_ppp'
  | 'expenditure_nominal_per_capita'
  | 'expenditure_ppp_per_capita'
  | 'expenditure_nominal_daily'
  | 'expenditure_ppp_daily'
  | 'expenditure_nominal_per_capita_daily'
  | 'expenditure_ppp_per_capita_daily';

export interface IndicatorDataTypeFromFile {
  year: number;
  headcount: number;
  expenditure_nominal: number;
  expenditure_ppp: number;
}

export interface IndicatorDataType extends IndicatorDataTypeFromFile {
  expenditure_nominal_per_capita: number;
  expenditure_ppp_per_capita: number;
  expenditure_nominal_daily: number;
  expenditure_ppp_daily: number;
  expenditure_nominal_per_capita_daily: number;
  expenditure_ppp_per_capita_daily: number;
}

export interface CountryTaxonomyDataType {
  'Alpha-3 code': string;
  'Country or Area': string;
  'Group 1': string;
  'Group 2': string;
  LDC: boolean;
  LLDC: boolean;
  'Latitude (average)': number;
  'Longitude (average)': number;
  SIDS: boolean;
  'Income group': string;
}

export interface CountryGroupDataType extends CountryTaxonomyDataType {
  data: IndicatorDataType[];
}

export interface HoverRowDataType {
  title?: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
  type: 'x-axis' | 'y-axis' | 'color' | 'size';
  year?: number;
  color?: string;
}

export interface HoverDataType {
  country: string;
  continent: string;
  rows: HoverRowDataType[];
  xPosition: number;
  yPosition: number;
}

export interface DisaggregationSettingsDataType {
  gender: GenderTypes;
  ageRange: [number, number];
  incomeRange: [number, number];
}

export interface DisaggregationDataType extends DisaggregationSettingsDataType {
  data: IndicatorDataType[];
}

export interface CountryDisaggregatedDataType extends CountryTaxonomyDataType {
  disaggregation: DisaggregationDataType[];
}

export interface CtxStateDataType {
  graphType: GraphTypes;
  data: CountryGroupDataType[];
  indicator: 'headCount' | 'spending';
  spendByPerCapita: boolean;
  spendByYearly: boolean;
  spendByPPP: boolean;
  colorIndicator: 'Continents' | 'Income Groups';
  reverseOrder: boolean;
  showLabel: boolean;
  showReference: boolean;
  multiCountryTrendChartCountries: string[];
  year: number;
  trendChartCountry?: string;
  verticalBarLayout: true;
  selectedRegions: string[];
  selectedCountries: string[];
  selectedCountryIncomeGroups: string[];
  selectedCountryGroup: 'All' | 'SIDS' | 'LLDC' | 'LDC';
  ageRange: [number, number];
  incomeRange: [number, number];
  gender: GenderTypes;
  disaggregationGraphType: 'country' | 'region';
  disaggregationSettings: DisaggregationSettingsDataType[];
  worldData: CountryGroupDataType;
  disaggregatedData: CountryDisaggregatedDataType[];
  disaggregationIsLoading: boolean;
  orderDisaggregatedDataBy: string;
}

export interface CtxDataType extends CtxStateDataType {
  updateGraphType: (_d: GraphTypes) => void;
  updateIndicator: (_d: 'headCount' | 'spending') => void;
  updateSpendByPerCapita: (_d: boolean) => void;
  updateSpendByYearly: (_d: boolean) => void;
  updateSpendByPPP: (_d: boolean) => void;
  updateColorIndicator: (_d: 'Continents' | 'Income Groups') => void;
  updateReverseOrder: (_d: boolean) => void;
  updateShowReference: (_d: boolean) => void;
  updateMultiCountryTrendChartCountries: (_d: string[]) => void;
  updateYear: (_d: number) => void;
  updateBarLayout: (_d: boolean) => void;
  updateTrendChartCountry: (_d: string) => void;
  updateShowLabel: (_d: boolean) => void;
  updateSelectedCountryGroup: (_d: 'All' | 'SIDS' | 'LLDC' | 'LDC') => void;
  updateSelectedRegions: (_d: string[]) => void;
  updateSelectedCountries: (_d: string[]) => void;
  updateSelectedCountryIncomeGroups: (_d: string[]) => void;
  updateAgeRange: (_d: [number, number]) => void;
  updateIncomeRange: (_d: [number, number]) => void;
  updateGender: (_d: GenderTypes) => void;
  updateDisaggregationGraphType: (_d: 'country' | 'region') => void;
  updateDisaggregationSettings: (_d: DisaggregationSettingsDataType[]) => void;
  updateData: (_d: CountryGroupDataType[]) => void;
  updateWorldData: (_d: CountryGroupDataType) => void;
  updateDisaggregatedData: (_d: CountryDisaggregatedDataType[]) => void;
  updateDisaggregationIsLoading: (_d: boolean) => void;
  updateOrderDisaggregatedDataBy: (_d: string) => void;
}

export interface CountryListType {
  code: string;
  name: string;
}

export interface SubRegionsDataType {
  key: string;
  region: string;
}

export interface ValuesDataType {
  year: number;
  value: number;
  label?: string;
}

export interface CoordinateDataType {
  lat: number;
  lon: number;
}

export interface BoundingBoxDataType {
  sw: CoordinateDataType;
  ne: CoordinateDataType;
}

export interface CountryBoundingBoxDataType {
  country: string;
  bbox: BoundingBoxDataType;
}

export interface TimeSeriesProps {
  year: number;
  value: number;
  data?: object;
}

export interface VerticalBarGraphDataType {
  label: string;
  height: number;
  color?: string;
  data?: object;
}

export interface VerticalGroupedBarGraphDataType {
  label: string;
  height: number[];
  data?: object;
}

export interface HorizontalBarGraphDataType {
  width: number;
  label: string;
  color?: string;
  data?: object;
}

export interface HorizontalGroupedBarGraphDataType {
  width: number[];
  label: string;
  data?: object;
}

export interface DumbbellChartDataType {
  x: number[];
  label: string;
  data?: object;
}

export interface DonutChartDataType {
  value: number;
  label: string;
  data?: object;
}

export interface ChoroplethMapDataType {
  x: number;
  countryCode: string;
  data?: object;
}

export interface BivariateMapDataType {
  x: number;
  y: number;
  countryCode: string;
  data?: object;
}

export interface LineChartDataType {
  date: number | string;
  y: number;
  data?: object;
}

export interface MultiLineChartDataType {
  date: number | string;
  y: (number | undefined)[];
  data?: object;
}

export interface AreaChartDataType {
  date: number | string;
  y: number[];
  data?: object;
}

export interface ScatterPlotDataType {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  label: string;
  data?: object;
}
