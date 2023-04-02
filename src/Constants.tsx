export const CONTINENTS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const MAX_TEXT_LENGTH = 100;

export const TRUNCATE_MAX_TEXT_LENGTH = 125;

export const EMBED_LINK_ROOT = 'https://data.undp.org/access-all-data-viz-v2/';

export const PARENT_LINK_ROOT = 'https://data.undp.org/explore-all-data/';

export const DEFAULT_VALUES = {
  firstMetric: 'GDP per capita, PPP (current international $)',
  secondMetric: 'Human development index (HDI)',
  colorMetric: 'Continents',
};

export const INCOME_GROUPS = [
  'Low income',
  'Lower middle income',
  'Upper middle income',
  'High income',
];

export const HDI_LEVELS = ['Low', 'Medium', 'High', 'Very High'];

export const SIGNATURE_SOLUTIONS_LIST: (
  | 'All'
  | 'Energy'
  | 'Environment'
  | 'Gender'
  | 'Governance'
  | 'Poverty and Inequality'
  | 'Resilience'
)[] = [
  'All',
  'Energy',
  'Environment',
  'Gender',
  'Governance',
  'Poverty and Inequality',
  'Resilience',
];

export const DATALINK =
  process.env.NODE_ENV === 'production'
    ? 'https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/output_minified.json'
    : 'https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/output_minified.json';
export const METADATALINK =
  process.env.NODE_ENV === 'production'
    ? 'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/for-redesign/indicatorMetaData.json'
    : 'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/for-redesign/indicatorMetaData.json';
export const COUNTRYTAXONOMYLINK =
  process.env.NODE_ENV === 'production'
    ? 'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json'
    : 'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json';
export const homeLink = 'data.test-undp.acsitefactory.com';

export const COUNTRIES_BY_UNDP_REGIONS = [
  {
    region: 'UNDP_AS',
    name: 'Arab States',
    Countries: [
      'ARE',
      'BHR',
      'DJI',
      'DZA',
      'EGY',
      'IRQ',
      'JOR',
      'KWT',
      'LBN',
      'LBY',
      'MAR',
      'OMN',
      'PSE',
      'QAT',
      'SAU',
      'SDN',
      'SOM',
      'SYR',
      'TUN',
      'YEM',
    ],
  },
  {
    region: 'UNDP_EAP',
    name: 'East Asia and the Pacific',
    Countries: [
      'BRN',
      'CHN',
      'FJI',
      'FSM',
      'IDN',
      'KHM',
      'KIR',
      'LAO',
      'MHL',
      'MMR',
      'MNG',
      'MYS',
      'NRU',
      'PHL',
      'PLW',
      'PNG',
      'PRK',
      'SGP',
      'SLB',
      'THA',
      'TLS',
      'TON',
      'TUV',
      'VNM',
      'VUT',
      'WSM',
    ],
  },
  {
    region: 'UNDP_ECA',
    name: 'Europe and Central Asia',
    Countries: [
      'ALB',
      'ARM',
      'AZE',
      'BIH',
      'BLR',
      'GEO',
      'KAZ',
      'KGZ',
      'MDA',
      'MKD',
      'MNE',
      'SRB',
      'TJK',
      'TKM',
      'TUR',
      'UKR',
      'UZB',
    ],
  },
  {
    region: 'UNDP_LAC',
    name: 'Latin America and the Caribbean',
    Countries: [
      'ARG',
      'ATG',
      'BHS',
      'BLZ',
      'BOL',
      'BRA',
      'BRB',
      'CHL',
      'COL',
      'CRI',
      'CUB',
      'DMA',
      'DOM',
      'ECU',
      'GRD',
      'GTM',
      'GUY',
      'HND',
      'HTI',
      'JAM',
      'KNA',
      'LCA',
      'MEX',
      'NIC',
      'PAN',
      'PER',
      'PRY',
      'SLV',
      'SUR',
      'TTO',
      'URY',
      'VCT',
      'VEN',
    ],
  },
  {
    region: 'UNDP_SA',
    name: 'South Asia',
    Countries: ['AFG', 'BGD', 'BTN', 'IND', 'IRN', 'LKA', 'MDV', 'NPL', 'PAK'],
  },
  {
    region: 'UNDP_SSA',
    name: 'Sun-Saharan Africa',
    Countries: [
      'AGO',
      'BDI',
      'BEN',
      'BFA',
      'BWA',
      'CAF',
      'CIV',
      'CMR',
      'COD',
      'COG',
      'COM',
      'CPV',
      'ERI',
      'ETH',
      'GAB',
      'GHA',
      'GIN',
      'GMB',
      'GNB',
      'GNQ',
      'KEN',
      'LBR',
      'LSO',
      'MDG',
      'MLI',
      'MOZ',
      'MRT',
      'MUS',
      'MWI',
      'NAM',
      'NER',
      'NGA',
      'RWA',
      'SEN',
      'SLE',
      'SSD',
      'STP',
      'SWZ',
      'SYC',
      'TCD',
      'TGO',
      'TZA',
      'UGA',
      'ZAF',
      'ZMB',
      'ZWE',
    ],
  },
];
