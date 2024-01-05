export interface IndicatorDataType {
  indicator: string;
  yearlyData: {
    year: number;
    value: number;
  }[];
}

export interface IndicatorSimplifiedDataType {
  indicator: string;
  countryData: {
    'Alpha-3 code': string;
    'Country or Area': string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
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
  indicators: IndicatorDataType[];
}

export interface CountryGroupDataFromCountryFileType {
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
  indicators: IndicatorDataType[];
}

export interface DataType extends CountryGroupDataType {
  indicators: IndicatorDataType[];
}

export interface IndicatorOptionsDataType {
  'Data source link': string;
  'Data source name': string;
  Indicator: string;
  'Indicator Description': string;
  'Time period': string;
  Year: string;
  Categorical: boolean;
}

export interface IndicatorMetaDataType {
  IndicatorLabel: string;
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
  IsCategorical: boolean;
  IsDivergent: boolean;
  Sizing: boolean;
  RegionalAggregation: boolean;
  SSTopics: string[];
  SignatureSolution: string[];
  id: string;
  SDGs: string[];
  Tags: string[];
}

export interface DisaggregationMetaDataType {
  Indicator: string;
  DisaggregationType: string;
  DisaggregatedIndicators: {
    key: string;
    id: string;
    DataKey: string;
  }[];
  SignatureSolution: string[];
  SSTopics: string[];
}

export interface SubNationalMetaDataType {
  indicator_id: string;
  indicator_name: string;
  group: string;
  sourceLayer: string;
  pmtilesURL: string;
  hasId: string;
  countryId: string;
  regionId: string;
  useCountryLookup: boolean;
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

export interface CtxDataType {
  graphType:
    | 'scatterPlot'
    | 'map'
    | 'barGraph'
    | 'trendLine'
    | 'multiCountryTrendLine'
    | 'dataList'
    | 'disaggregation';
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
  trendChartCountry: undefined | string;
  dataListCountry: undefined | string;
  multiCountryTrendChartCountries: string[];
  useSameRange: boolean;
  reverseOrder: boolean;
  verticalBarLayout: boolean;
  selectedCountryOrRegion?: string;
  disaggregationIndicator?: DisaggregationMetaDataType;
  disaggregationGraphType: 'global' | 'country';
  disaggregationOrder: 'first' | 'second' | 'diff';
  signatureSolution?: string;
  showReference: boolean;
  signatureSolutionForDataList:
    | 'All'
    | 'Energy'
    | 'Environment'
    | 'Gender'
    | 'Governance'
    | 'Poverty and Inequality'
    | 'Resilience';
  updateGraphType: (
    _d:
      | 'scatterPlot'
      | 'map'
      | 'barGraph'
      | 'trendLine'
      | 'multiCountryTrendLine'
      | 'dataList'
      | 'disaggregation',
  ) => void;
  updateSelectedRegions: (_d: string[]) => void;
  updateSelectedCountries: (_d: string[]) => void;
  updateSelectedIncomeGroups: (_d: string[]) => void;
  updateYear: (_d: number) => void;
  updateSelectedCountryGroup: (_d: 'All' | 'SIDS' | 'LLDC' | 'LDC') => void;
  updateDisaggregationIndicator: (_d: DisaggregationMetaDataType) => void;
  updateDisaggregationGraphType: (_d: 'global' | 'country') => void;
  updateDisaggregationOrder: (_d: 'first' | 'second' | 'diff') => void;
  updateXAxisIndicator: (_d?: string) => void;
  updateYAxisIndicator: (_d?: string) => void;
  updateColorIndicator: (_d?: string) => void;
  updateSizeIndicator: (_d?: string) => void;
  updateShowMostRecentData: (_d: boolean) => void;
  updateShowLabel: (_d: boolean) => void;
  updateUseSameRange: (_d: boolean) => void;
  updateReverseOrder: (_d: boolean) => void;
  updateTrendChartCountry: (_d: string) => void;
  updateDataListCountry: (_d: string) => void;
  updateMultiCountryTrendChartCountries: (_d: string[]) => void;
  updateBarLayout: (_d: boolean) => void;
  updateShowReference: (_d: boolean) => void;
  updateSignatureSolutionForDataList: (
    _d:
      | 'All'
      | 'Energy'
      | 'Environment'
      | 'Gender'
      | 'Governance'
      | 'Poverty and Inequality'
      | 'Resilience',
  ) => void;
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

export type StatusType = 'On Track' | 'Identified Gap' | 'For Review';

export interface GoalStatusType {
  goal: number;
  noOfIndicatorsWithData: number;
  status: StatusType | null;
}

export interface IndicatorStatusType {
  goal: string;
  target: string;
  indicator: string;
  status: StatusType | null;
}

export interface TargetStatusType {
  goal: string;
  target: string;
  status: StatusType | null;
}

export interface StatusesType {
  goalStatus: GoalStatusType[];
  targetStatus: TargetStatusType[];
  indicatorStatus: IndicatorStatusType[];
}

export interface TimeSeriesDataType {
  series: string;
  goal: string;
  target: string;
  indicator: string;
  seriesDescription: string;
  values: ValuesDataType[];
  methodology?: {
    targetValue?: number;
    normativeDirection?:
      | 'increase'
      | 'decrease'
      | 'not increase'
      | 'not decrease';
    value?: number;
    CAGRLimit?: number[];
    trendMethodology:
      | 'CAGRR'
      | 'CAGRA'
      | 'Binary'
      | 'Likert'
      | 'AARRR'
      | 'CAGRR+AARRR'
      | 'Doubling'
      | 'Halfing'
      | 'SpecialGINI';
    baselineYear: number;
    baseYear: null | number;
  };
  Age?:
    | 'ALLAGE'
    | '<1Y'
    | '<5Y'
    | '15-49'
    | '<1M'
    | '30-70'
    | '15+'
    | '10-14'
    | '15-19'
    | '16-65'
    | '10+'
    | '15-24'
    | '18-29'
    | '20-24'
    | '18-24'
    | '25-44'
    | '45-59'
    | '60+'
    | '7-17';
  Location?: 'ALLAREA' | 'URBAN' | 'RURAL';
  Sex?: 'BOTHSEX' | 'FEMALE' | 'MALE';
  'Reporting Type'?: string;
  Quantile?: 'B50' | '_T';
  'Name of international institution'?:
    | 'UNGA'
    | 'WTO'
    | 'IFC'
    | 'IMF'
    | 'ECOSOC'
    | 'IBRD'
    | 'UNSC'
    | 'AFDB'
    | 'FSB';
  'Type of product'?: 'CLO' | 'MEO' | 'NFO' | 'ARM' | 'AGR' | 'TEX' | 'ALP';
  'Food Waste Sector'?: 'HHS';
  Activity?: 'ISIC4_C' | 'TOTAL' | 'INDUSTRIES' | 'ISIC4_C10T32X19' | 'ISIC4_A';
  'Level of requirement'?: 'TOTAL';
  'Frequency of Chlorophyll-a concentration'?: 'High';
  'Mountain Elevation'?: '5';
  'Type of speed'?: 'ANYS';
  'Name of non-communicable disease'?: 'CAR';
  'Type of occupation'?:
    | 'DENT'
    | '_T'
    | 'isco08-6'
    | 'isco08-3'
    | 'isco08-9'
    | 'isco08-8'
    | 'isco08-1'
    | 'isco08-4'
    | 'isco08-7'
    | 'isco08-5'
    | 'isco08-2'
    | 'isco08-0'
    | 'isco08-X';
  'IHR Capacity'?: 'IHR09';
  'Education level'?: 'LOWSEC' | 'UPPSEC' | 'SECOND' | 'GRAD23' | 'PRIMAR';
  'Type of skill'?: 'PCPR' | 'LITE' | 'SKILL_READ';
  'Level/Status'?: '_T';
  'Deviation Level'?: 'EXTREME' | 'MEDIUM';
  'Mode of transportation'?: 'AIR' | 'ROA' | 'SEA';
  'Type of renewable technology'?: 'SOLAR';
  'Fiscal intervention stage'?: 'POSTFIS_CON_INC';
  Counterpart?: 'ZM';
  Cities?: 'JOHANNESBURG';
  'Sampling Stations'?: 'ALGOA';
  status?:
    | 'Target Achieved'
    | 'On Track'
    | 'Target Not Achieved'
    | 'Fair progress but acceleration needed'
    | 'Limited or No Progress'
    | 'Insufficient Data'
    | 'No Data After 2015'
    | 'Deterioration';
  'Custodian_Agency(ies)': string;
  'Partner_Agency(ies)': string;
  Tier_Classification: string;
}

export interface TimeSeriesDataTypeWithStatusCode extends TimeSeriesDataType {
  statusCode: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface CountryDataType {
  countryCode: string;
  goalStatus: GoalStatusType[];
  targetStatus: TargetStatusType[];
  indicatorStatus: IndicatorStatusType[];
  tsData: TimeSeriesDataType[];
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

export interface MapLayerOptionDataType {
  id: string;
  binning: number[];
  colorScale: string[];
  fillSettings: any;
  mouseOverInfoFunction?: (_d: any) => JSX.Element;
}
