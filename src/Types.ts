export interface CountryGroupDataType {
  'Alpha-2 code': string;
  'Alpha-3 code-1': string;
  'Country or Area': string;
  'Development classification': string;
  'Group 1': string;
  'Group 2': string;
  'Group 3': string;
  'LDC': boolean;
  'LLDC': boolean;
  'Latitude (average)': number;
  'Longitude (average)': number;
  'Numeric code': number;
  'SIDS': boolean;
  'Income group': string;
}

export interface IndicatorDataType {
  indicator: string;
  yearAvailable: number[];
  yearlyData: {
      year: number;
      value?: number;
    }[];
}
export interface DataType extends CountryGroupDataType {
  indicators: IndicatorDataType[];
  indicatorAvailable: string[];
}

export interface IndicatorOptionsDataType {
  'Data source link': string;
  'Data source name': string;
  'Indicator': string;
  'Indicator Description': string;
  'Time period': string;
  'Year': string;
  'Categorical': boolean;
}

export interface IndicatorMetaDataType {
  Pillar: string[];
  Goal: string[];
  Indicator: string;
  IndicatorLabelTable: string;
  IndicatorDescription: string;
  DataKey: string;
  DataSourceName: string;
  DataSourceLink: string;
  LabelSuffix?: string;
  LabelPrefix?: string;
  LabelFormat?: string;
  BinningRange5: number[];
  BinningRangeLarge: number[];
  Categories: number[];
  CategorizeByRanking?: boolean;
  IsCategorical?: boolean;
  IsDivergent?: boolean;
  ScatterPlot?: boolean;
  Map?: boolean;
  BarGraph?: boolean;
  Sizing?: boolean;
  Color?: boolean;
  SSTopics: string[];
  SignatureSolution: string[];
}

export interface IndicatorMetaDataWithYear extends IndicatorMetaDataType {
  years: number[];
}
export interface HoverRowDataType {
  title?: string;
  value?: string | number;
  prefix?: string;
  suffix?:string;
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

export interface CtxDataType {
  graphType: 'scatterPlot' | 'map' | 'barGraph' | 'trendLine' | 'multiCountryTrendLine';
  selectedRegions: string[];
  selectedCountries: string[];
  selectedIncomeGroups: string[];
  year: number;
  selectedCountryGroup: 'All' | 'SIDS' | 'LLDC' | 'LDC';
  xAxisIndicator: string;
  yAxisIndicator?: string;
  colorIndicator: string;
  sizeIndicator?: string;
  showMostRecentData: boolean;
  showLabel: boolean;
  showSource: boolean;
  trendChartCountry: undefined | string;
  multiCountrytrendChartCountries: string[];
  useSameRange: boolean;
  reverseOrder: boolean;
  verticalBarLayout: boolean;
  selectedCountry?: string;
  signatureSolution?: string;
  updateGraphType: (_d: 'scatterPlot' | 'map' | 'barGraph' | 'trendLine' | 'multiCountryTrendLine') => void;
  updateSelectedRegions: (_d: string[]) => void;
  updateSelectedCountries: (_d: string[]) => void;
  updateSelectedIncomeGroups: (_d: string[]) => void;
  updateYear: (_d: number) => void;
  updateSelectedCountryGroup: (_d: 'All' | 'SIDS' | 'LLDC' | 'LDC') => void;
  updateXAxisIndicator: (_d: string) => void;
  updateYAxisIndicator: (_d?: string) => void;
  updateColorIndicator: (_d?: string) => void;
  updateSizeIndicator: (_d?: string) => void;
  updateShowMostRecentData: (_d: boolean) => void;
  updateShowSource: (_d: boolean) => void;
  updateShowLabel: (_d: boolean) => void;
  updateUseSameRange: (_d: boolean) => void;
  updateReverseOrder: (_d: boolean) => void;
  updateTrendChartCountry: (_d: string) => void;
  updateMultiCountrytrendChartCountries: (_d: string[]) => void;
  updateBarLayout: (_d: boolean) => void;
}
