export const CONTINENTS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const MAX_TEXT_LENGTH = 100;

export const TRUNCATE_MAX_TEXT_LENGTH = 125;

export const EMBED_LINK_ROOT = 'https://data.undp.org/access-all-data-viz-v2/';

export const PARENT_LINK_ROOT = 'https://data.undp.org/explore-all-data/';

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

export const METADATALINK =
  'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/for-redesign/indicatorMetaData.json';

export const SUBNATIONALMETADATALINK =
  'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/for-redesign//subNationDataMetaDataByCountries/';

export const DATALINK =
  'https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main';

export const COUNTRYTAXONOMYLINK =
  'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json';

export const SDGDATASOURCELINK =
  'https://raw.githubusercontent.com/UNDP-Data/SDG-Accelerator/production/public';

export const REGION_ACRONYMS = ['AP', 'AS', 'ECA', 'LAC', 'SSA'];

export const MAP_SETTINGS = [
  {
    region: 'WLD',
    center: [420, 395],
    scale: 220,
  },
  {
    region: 'AP',
    center: [-175, 445],
    scale: 450,
  },
  {
    region: 'AS',
    center: [275, 625],
    scale: 700,
  },
  {
    region: 'ECA',
    center: [-100, 1125],
    scale: 1000,
  },
  {
    region: 'LAC',
    center: [800, 275],
    scale: 375,
  },
  {
    region: 'SSA',
    center: [325, 325],
    scale: 525,
  },
];

export const COUNTRIES_BY_UNDP_REGIONS = [
  {
    region: 'UNDP_AP',
    name: 'Asia and the Pacific',
    Countries: [
      'AFG',
      'BGD',
      'BRN',
      'BTN',
      'CHN',
      'FJI',
      'FSM',
      'IDN',
      'IND',
      'IRN',
      'KHM',
      'KIR',
      'LAO',
      'LKA',
      'MDV',
      'MHL',
      'MMR',
      'MNG',
      'MYS',
      'NPL',
      'NRU',
      'PAK',
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
    region: 'UNDP_SSA',
    name: 'Africa',
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

export const COUNTRIES_FULL_NAME_BY_UNDP_REGION = [
  {
    region: 'SSA',
    countries: [
      'Angola',
      'Burundi',
      'Benin',
      'Burkina Faso',
      'Botswana',
      'Central African Republic',
      "Cote d'Ivoire",
      'Cameroon',
      'Congo (Democratic Republic of the)',
      'Congo',
      'Comoros',
      'Cabo Verde',
      'Eritrea',
      'Ethiopia',
      'Gabon',
      'Ghana',
      'Guinea',
      'Gambia',
      'Guinea-Bissau',
      'Equatorial Guinea',
      'Kenya',
      'Liberia',
      'Lesotho',
      'Madagascar',
      'Mali',
      'Mozambique',
      'Mauritania',
      'Mauritius',
      'Malawi',
      'Namibia',
      'Niger',
      'Nigeria',
      'Rwanda',
      'Senegal',
      'Sierra Leone',
      'South Sudan',
      'Sao Tome and Principe',
      'Eswatini (Kingdom of)',
      'Seychelles',
      'Chad',
      'Togo',
      'Tanzania (United Republic of)',
      'Uganda',
      'South Africa',
      'Zambia',
      'Zimbabwe',
    ],
  },
  {
    region: 'LAC',
    countries: [
      'Argentina',
      'Antigua and Barbuda',
      'Bahamas',
      'Belize',
      'Bolivia (Plurinational State of)',
      'Brazil',
      'Barbados',
      'Chile',
      'Colombia',
      'Costa Rica',
      'Cuba',
      'Dominica',
      'Dominican Republic',
      'Ecuador',
      'Grenada',
      'Guatemala',
      'Guyana',
      'Honduras',
      'Haiti',
      'Jamaica',
      'Saint Kitts and Nevis',
      'Saint Lucia',
      'Mexico',
      'Nicaragua',
      'Panama',
      'Peru',
      'Paraguay',
      'El Salvador',
      'Suriname',
      'Trinidad and Tobago',
      'Uruguay',
      'Saint Vincent and the Grenadines',
      'Venezuela (Bolivarian Republic of)',
    ],
  },
  {
    region: 'ECA',
    countries: [
      'Albania',
      'Armenia',
      'Azerbaijan',
      'Bosnia and Herzegovina',
      'Belarus',
      'Georgia',
      'Kazakhstan',
      'Kyrgyzstan',
      'Moldova (Republic of)',
      'North Macedonia',
      'Montenegro',
      'Serbia',
      'Tajikistan',
      'Turkmenistan',
      'Turkiye',
      'Ukraine',
      'Uzbekistan',
    ],
  },
  {
    region: 'AS',
    countries: [
      'United Arab Emirates',
      'Bahrain',
      'Djibouti',
      'Algeria',
      'Egypt',
      'Iraq',
      'Jordan',
      'Kuwait',
      'Lebanon',
      'Libya',
      'Morocco',
      'Oman',
      'Palestine, State of',
      'Qatar',
      'Saudi Arabia',
      'Sudan',
      'Somalia',
      'Syrian Arab Republic',
      'Tunisia',
      'Yemen',
    ],
  },
  {
    region: 'AP',
    countries: [
      'Afghanistan',
      'Bangladesh',
      'Bhutan',
      'Brunei Darussalam',
      'Cambodia',
      'China',
      'Fiji',
      'India',
      'Indonesia',
      'Iran (Islamic Republic of)',
      'Kiribati',
      "Korea (Democratic People's Rep. of)",
      "Lao People's Democratic Republic",
      'Malaysia',
      'Maldives',
      'Marshall Islands',
      'Micronesia (Federated States of)',
      'Mongolia',
      'Myanmar',
      'Nauru',
      'Nepal',
      'Pakistan',
      'Palau',
      'Papua New Guinea',
      'Philippines',
      'Samoa',
      'Singapore',
      'Solomon Islands',
      'Sri Lanka',
      'Thailand',
      'Timor-Leste',
      'Tonga',
      'Tuvalu',
      'Vanuatu',
      'Viet Nam',
    ],
  },
];

export const SDG_GOALS = [
  'SDG 1: No Poverty',
  'SDG 2: Zero Hunger',
  'SDG 3: Good Health And Well-Being',
  'SDG 4: Quality Education',
  'SDG 5: Gender Equality',
  'SDG 6: Clean Water And Sanitation',
  'SDG 7: Affordable And Clean Energy',
  'SDG 8: Decent Work And Economic Growth',
  'SDG 9: Industry, Innovation And Infrastructure',
  'SDG 10: Reduced Inequalities',
  'SDG 11: Sustainable Cities And Communities',
  'SDG 12: Responsible Consumption And Production',
  'SDG 13: Climate Action',
  'SDG 14: Life Below Water',
  'SDG 15: Life On Land',
  'SDG 16: Peace, Justice And Strong Institution',
  'SDG 17: Partnership For The Goals',
];

export const TAGS_LIST = [
  'Climate Change',
  'Economic Development',
  'Education',
  'Energy',
  'Environment',
  'Food and Agriculture',
  'Health',
  'Health and HIV',
  'Human Rights and Democracy',
  'Labour',
  'Living Conditions',
  'Pollution',
  'Population and Demographic Change',
  'Poverty',
  'Science and Technological Change',
  'Violence and War',
];

export const KEYS_TO_AVOID = [
  'Reporting Type',
  'series',
  'goal',
  'target',
  'indicator',
  'seriesDescription',
  'values',
  'methodology',
  'status',
  'statusCode',
  'UNStats Methodology',
];

export const SERIES_TAGS_LABELS = [
  {
    key: 'ALLAGE',
    label: 'All ages',
  },
  {
    key: '<1Y',
    label: '< 1 Yr',
  },
  {
    key: '<5Y',
    label: '< 5 Yrs',
  },
  {
    key: '15-49',
    label: '15-49',
  },
  {
    key: '<1M',
    label: '< 1 Month',
  },
  {
    key: '30-70',
    label: '30-70',
  },
  {
    key: '15+',
    label: '15+',
  },
  {
    key: '10-14',
    label: '10-14',
  },
  {
    key: '15-19',
    label: '15-19',
  },
  {
    key: '16-65',
    label: '16-65',
  },
  {
    key: '10+',
    label: '10+',
  },
  {
    key: '15-24',
    label: '15-24',
  },
  {
    key: '18-29',
    label: '18-29',
  },
  {
    key: '20-24',
    label: '20-24',
  },
  {
    key: '18-24',
    label: '18-24',
  },
  {
    key: '25-44',
    label: '25-44',
  },
  {
    key: '45-59',
    label: '45-59',
  },
  {
    key: '60+',
    label: '60+',
  },
  {
    key: '7-17',
    label: '7-17',
  },
  {
    key: 'ALLAREA',
    label: 'All Areas',
  },
  {
    key: 'URBAN',
    label: 'Urban',
  },
  {
    key: 'RURAL',
    label: 'Rural',
  },
  {
    key: 'BOTHSEX',
    label: 'Both sexes',
  },
  {
    key: 'FEMALE',
    label: 'Female',
  },
  {
    key: 'MALE',
    label: 'Male',
  },
  {
    key: 'LOWSEC',
    label: 'Low. Sec.',
  },
  {
    key: 'UPPSEC',
    label: 'Upp. Sec.',
  },
  {
    key: 'SECOND',
    label: 'Secondary',
  },
  {
    key: 'GRAD23',
    label: 'Graduate',
  },
  {
    key: 'PRIMAR',
    label: 'Primary',
  },
  {
    key: 'EXTREME',
    label: 'Extreme',
  },
  {
    key: 'MEDIUM',
    label: 'Medium',
  },
  {
    key: 'AIR',
    label: 'Air',
  },
  {
    key: 'ROA',
    label: 'Road',
  },
  {
    key: 'SEA',
    label: 'Sea',
  },
  {
    key: 'SOLAR',
    label: 'Solar',
  },
  {
    key: 'JOHANNESBURG',
    label: 'Johannesburg',
  },
  {
    key: '_T',
    label: 'Total',
  },
  {
    key: 'Custodian_Agency(ies)',
    label: 'Custodian Agency(ies)',
  },
  {
    key: 'Partner_Agency(ies)',
    label: 'Partner Agency(ies)',
  },
  {
    key: 'Tier_Classification',
    label: 'Tier Classification',
  },
  {
    key: 'currentLevelAssessment',
    label: 'Current Level Assessment',
  },
];

export const TargetIndicatorCount = [
  {
    sdg: 1,
    noOfTargets: 7,
    noOfIndicators: 13,
  },
  {
    sdg: 2,
    noOfTargets: 8,
    noOfIndicators: 14,
  },
  {
    sdg: 3,
    noOfTargets: 13,
    noOfIndicators: 28,
  },
  {
    sdg: 4,
    noOfTargets: 10,
    noOfIndicators: 12,
  },
  {
    sdg: 5,
    noOfTargets: 9,
    noOfIndicators: 14,
  },
  {
    sdg: 6,
    noOfTargets: 8,
    noOfIndicators: 11,
  },
  {
    sdg: 7,
    noOfTargets: 5,
    noOfIndicators: 6,
  },
  {
    sdg: 8,
    noOfTargets: 12,
    noOfIndicators: 16,
  },
  {
    sdg: 9,
    noOfTargets: 8,
    noOfIndicators: 12,
  },
  {
    sdg: 10,
    noOfTargets: 10,
    noOfIndicators: 14,
  },
  {
    sdg: 11,
    noOfTargets: 10,
    noOfIndicators: 15,
  },
  {
    sdg: 12,
    noOfTargets: 11,
    noOfIndicators: 13,
  },
  {
    sdg: 13,
    noOfTargets: 5,
    noOfIndicators: 8,
  },
  {
    sdg: 14,
    noOfTargets: 10,
    noOfIndicators: 10,
  },
  {
    sdg: 15,
    noOfTargets: 12,
    noOfIndicators: 14,
  },
  {
    sdg: 16,
    noOfTargets: 12,
    noOfIndicators: 24,
  },
  {
    sdg: 17,
    noOfTargets: 19,
    noOfIndicators: 24,
  },
];

export const COUNTRY_LOOKUP_TABLE = [
  {
    countryName: 'Afghanistan',
    isoCode: 'AFG',
  },
  {
    countryName: 'Albania',
    isoCode: 'ALB',
  },
  {
    countryName: 'Angola',
    isoCode: 'AGO',
  },
  {
    countryName: 'Armenia',
    isoCode: 'ARM',
  },
  {
    countryName: 'Azerbaijan',
    isoCode: 'AZE',
  },
  {
    countryName: 'Bangladesh',
    isoCode: 'BGD',
  },
  {
    countryName: 'Benin',
    isoCode: 'BEN',
  },
  {
    countryName: 'Bolivia',
    isoCode: 'BOL',
  },
  {
    countryName: 'Botswana',
    isoCode: 'BWA',
  },
  {
    countryName: 'Brazil',
    isoCode: 'BRA',
  },
  {
    countryName: 'Burkina Faso',
    isoCode: 'BFA',
  },
  {
    countryName: 'Burundi',
    isoCode: 'BDI',
  },
  {
    countryName: 'Cambodia',
    isoCode: 'KHM',
  },
  {
    countryName: 'Cameroon',
    isoCode: 'CMR',
  },
  {
    countryName: 'Cape Verde',
    isoCode: 'CPV',
  },
  {
    countryName: 'Central African Republic',
    isoCode: 'CAF',
  },
  {
    countryName: 'Chad',
    isoCode: 'TCD',
  },
  {
    countryName: 'Colombia',
    isoCode: 'COL',
  },
  {
    countryName: 'Comoros',
    isoCode: 'COM',
  },
  {
    countryName: 'Congo',
    isoCode: 'COG',
  },
  {
    countryName: 'Congo Democratic Republic',
    isoCode: 'COD',
  },
  {
    countryName: "Cote d'Ivoire",
    isoCode: 'CIV',
  },
  {
    countryName: 'Dominican Republic',
    isoCode: 'DOM',
  },
  {
    countryName: 'Ecuador',
    isoCode: 'ECU',
  },
  {
    countryName: 'Egypt',
    isoCode: 'EGY',
  },
  {
    countryName: 'El Salvador',
    isoCode: 'SLV',
  },
  {
    countryName: 'Equatorial Guinea',
    isoCode: 'GNQ',
  },
  {
    countryName: 'Eritrea',
    isoCode: 'ERI',
  },
  {
    countryName: 'Eswatini',
    isoCode: 'SWZ',
  },
  {
    countryName: 'Ethiopia',
    isoCode: 'ETH',
  },
  {
    countryName: 'Gabon',
    isoCode: 'GAB',
  },
  {
    countryName: 'Gambia',
    isoCode: 'GMB',
  },
  {
    countryName: 'Ghana',
    isoCode: 'GHA',
  },
  {
    countryName: 'Guatemala',
    isoCode: 'GTM',
  },
  {
    countryName: 'Guinea',
    isoCode: 'GIN',
  },
  {
    countryName: 'Guyana',
    isoCode: 'GUY',
  },
  {
    countryName: 'Haiti',
    isoCode: 'HTI',
  },
  {
    countryName: 'Honduras',
    isoCode: 'HND',
  },
  {
    countryName: 'India',
    isoCode: 'IND',
  },
  {
    countryName: 'Indonesia',
    isoCode: 'IDN',
  },
  {
    countryName: 'Jordan',
    isoCode: 'JOR',
  },
  {
    countryName: 'Kazakhstan',
    isoCode: 'KAZ',
  },
  {
    countryName: 'Kenya',
    isoCode: 'KEN',
  },
  {
    countryName: 'Kyrgyz Republic',
    isoCode: 'KGZ',
  },
  {
    countryName: "Lao People's Democratic Republic",
    isoCode: 'LAO',
  },
  {
    countryName: 'Lesotho',
    isoCode: 'LSO',
  },
  {
    countryName: 'Liberia',
    isoCode: 'LBR',
  },
  {
    countryName: 'Madagascar',
    isoCode: 'MDG',
  },
  {
    countryName: 'Malawi',
    isoCode: 'MWI',
  },
  {
    countryName: 'Maldives',
    isoCode: 'MDV',
  },
  {
    countryName: 'Mali',
    isoCode: 'MLI',
  },
  {
    countryName: 'Mauritania',
    isoCode: 'MRT',
  },
  {
    countryName: 'Mexico',
    isoCode: 'MEX',
  },
  {
    countryName: 'Moldova',
    isoCode: 'MDA',
  },
  {
    countryName: 'Morocco',
    isoCode: 'MAR',
  },
  {
    countryName: 'Mozambique',
    isoCode: 'MOZ',
  },
  {
    countryName: 'Myanmar',
    isoCode: 'MMR',
  },
  {
    countryName: 'Namibia',
    isoCode: 'NAM',
  },
  {
    countryName: 'Nepal',
    isoCode: 'NPL',
  },
  {
    countryName: 'Nicaragua',
    isoCode: 'NIC',
  },
  {
    countryName: 'Niger',
    isoCode: 'NER',
  },
  {
    countryName: 'Nigeria',
    isoCode: 'NGA',
  },
  {
    countryName: 'Pakistan',
    isoCode: 'PAK',
  },
  {
    countryName: 'Papua New Guinea',
    isoCode: 'PNG',
  },
  {
    countryName: 'Paraguay',
    isoCode: 'PRY',
  },
  {
    countryName: 'Peru',
    isoCode: 'PER',
  },
  {
    countryName: 'Philippines',
    isoCode: 'PHL',
  },
  {
    countryName: 'Rwanda',
    isoCode: 'RWA',
  },
  {
    countryName: 'Samoa',
    isoCode: 'WSM',
  },
  {
    countryName: 'Sao Tome and Principe',
    isoCode: 'STP',
  },
  {
    countryName: 'Senegal',
    isoCode: 'SEN',
  },
  {
    countryName: 'Sierra Leone',
    isoCode: 'SLE',
  },
  {
    countryName: 'South Africa',
    isoCode: 'ZAF',
  },
  {
    countryName: 'Sri Lanka',
    isoCode: 'LKA',
  },
  {
    countryName: 'Sudan',
    isoCode: 'SDN',
  },
  {
    countryName: 'Tajikistan',
    isoCode: 'TJK',
  },
  {
    countryName: 'Tanzania',
    isoCode: 'TZA',
  },
  {
    countryName: 'Thailand',
    isoCode: 'THA',
  },
  {
    countryName: 'Timor-Leste',
    isoCode: 'TLS',
  },
  {
    countryName: 'Togo',
    isoCode: 'TGO',
  },
  {
    countryName: 'Trinidad and Tobago',
    isoCode: 'TTO',
  },
  {
    countryName: 'Tunisia',
    isoCode: 'TUN',
  },
  {
    countryName: 'Turkey',
    isoCode: 'TUR',
  },
  {
    countryName: 'Turkmenistan',
    isoCode: 'TKM',
  },
  {
    countryName: 'Uganda',
    isoCode: 'UGA',
  },
  {
    countryName: 'Ukraine',
    isoCode: 'UKR',
  },
  {
    countryName: 'Uzbekistan',
    isoCode: 'UZB',
  },
  {
    countryName: 'Vietnam',
    isoCode: 'VNM',
  },
  {
    countryName: 'Yemen',
    isoCode: 'YEM',
  },
  {
    countryName: 'Zambia',
    isoCode: 'ZMB',
  },
  {
    countryName: 'Zimbabwe',
    isoCode: 'ZWE',
  },
];
