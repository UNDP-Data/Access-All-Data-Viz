import { format } from 'd3-format';
import UNDPColorModule from 'undp-viz-colors';

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

export const SDGDATASOURCELINK =
  'https://raw.githubusercontent.com/UNDP-Data/SDG-Accelerator/production/public';

export const REGION_ACRONYMS = ['AP', 'AS', 'ECA', 'LAC', 'SSA'];

export const MAP_SETTINGS = [
  {
    region: 'WLD',
    center: [420, 365],
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
  'Populaton and Demographic Change',
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
    noOfIndicators: 26,
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
    noOfIndicators: 17,
  },
  {
    sdg: 9,
    noOfTargets: 8,
    noOfIndicators: 12,
  },
  {
    sdg: 10,
    noOfTargets: 10,
    noOfIndicators: 12,
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
    noOfIndicators: 9,
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
    noOfIndicators: 23,
  },
  {
    sdg: 17,
    noOfTargets: 19,
    noOfIndicators: 25,
  },
];

export const SUB_NATIONAL_DATA_OPTIONS = [
  {
    id: 'electricityAccess',
    title: 'Electricity Access',
    countryID: 'iso_3',
    regionID: 'adm2_name',
    pmTilesSource:
      'pmtiles://https://undpngddlsgeohubdev01.blob.core.windows.net/admin/rural_urban_District_Electricity_Access_20230421004438.pmtiles',
    options: [
      {
        label: 'Access to Reliable Energy Services (%)',
        id: 'percentAccess',
        sourceLayer: 'tmpl3ue0da4',
        hasID: 'PopAccess2020',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: [...UNDPColorModule.divergentColors.colorsx10].reverse(),
        fillSettings: [
          'let',
          'percentAccess',
          ['/', ['get', 'PopAccess2020'], ['get', 'TotPopulation']],
          [
            'interpolate',
            ['linear'],
            ['var', 'percentAccess'],
            0,
            UNDPColorModule.divergentColors.colorsx10[9],
            0.0999,
            UNDPColorModule.divergentColors.colorsx10[9],
            0.1,
            UNDPColorModule.divergentColors.colorsx10[8],
            0.1999,
            UNDPColorModule.divergentColors.colorsx10[8],
            0.2,
            UNDPColorModule.divergentColors.colorsx10[7],
            0.2999,
            UNDPColorModule.divergentColors.colorsx10[7],
            0.3,
            UNDPColorModule.divergentColors.colorsx10[6],
            0.3999,
            UNDPColorModule.divergentColors.colorsx10[6],
            0.4,
            UNDPColorModule.divergentColors.colorsx10[5],
            0.4999,
            UNDPColorModule.divergentColors.colorsx10[5],
            0.5,
            UNDPColorModule.divergentColors.colorsx10[4],
            0.5999,
            UNDPColorModule.divergentColors.colorsx10[4],
            0.6,
            UNDPColorModule.divergentColors.colorsx10[3],
            0.6999,
            UNDPColorModule.divergentColors.colorsx10[3],
            0.7,
            UNDPColorModule.divergentColors.colorsx10[2],
            0.7999,
            UNDPColorModule.divergentColors.colorsx10[2],
            0.8,
            UNDPColorModule.divergentColors.colorsx10[1],
            0.8999,
            UNDPColorModule.divergentColors.colorsx10[1],
            0.9,
            UNDPColorModule.divergentColors.colorsx10[0],
            1,
            UNDPColorModule.divergentColors.colorsx10[0],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {((d.PopAccess2020 / d.TotPopulation) * 100).toFixed(1)}%
              </p>
            </div>
          );
        },
      },
      {
        label: 'No. People With No Access to Reliable Energy Services',
        id: 'popNoAccess',
        hasID: 'PopAccess2020',
        sourceLayer: 'tmpl3ue0da4',
        binning: [100, 1000, 100000, 500000, 1000000, 1000000000],
        colorScale: UNDPColorModule.sequentialColors.negativeColorsx06,
        fillSettings: [
          'let',
          'popNoAccess',
          ['-', ['get', 'TotPopulation'], ['get', 'PopAccess2020']],
          [
            'interpolate',
            ['linear'],
            ['var', 'popNoAccess'],
            0,
            UNDPColorModule.sequentialColors.negativeColorsx06[0],
            99.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[0],
            100,
            UNDPColorModule.sequentialColors.negativeColorsx06[1],
            999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[1],
            1000,
            UNDPColorModule.sequentialColors.negativeColorsx06[2],
            99999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[2],
            100000,
            UNDPColorModule.sequentialColors.negativeColorsx06[3],
            499999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[3],
            500000,
            UNDPColorModule.sequentialColors.negativeColorsx06[4],
            999999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[4],
            1000000,
            UNDPColorModule.sequentialColors.negativeColorsx06[5],
            1000000000,
            UNDPColorModule.sequentialColors.negativeColorsx06[5],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {format('~s')(d.TotPopulation - d.PopAccess2020).replace(
                  'G',
                  'B',
                )}
              </p>
            </div>
          );
        },
      },
    ],
    countries: [
      'STP',
      'GNQ',
      'CMR',
      'GAB',
      'COG',
      'CAF',
      'COD',
      'UGA',
      'KEN',
      'SSD',
      'ETH',
      'SOM',
      'IDN',
      'MYS',
      'AGO',
      'NAM',
      'BWA',
      'ZAF',
      'ZMB',
      'RWA',
      'BDI',
      'TZA',
      'MWI',
      'ZWE',
      'MOZ',
      'COM',
      'MDG',
      'LSO',
      'SWZ',
      'SYC',
      'MUS',
      'TLS',
      'PNG',
      'SLB',
      'VUT',
      'ECU',
      'COL',
      'GUY',
      'SUR',
      'PER',
      'BOL',
      'ARG',
      'PRY',
      'URY',
      'MAR',
      'DZA',
      'MLI',
      'BFA',
      'CIV',
      'GHA',
      'TGO',
      'TUN',
      'LBY',
      'NER',
      'TCD',
      'BEN',
      'NGA',
      'SDN',
      'EGY',
      'JOR',
      'IRQ',
      'ERI',
      'DJI',
      'TJK',
      'MNG',
      'PAK',
      'IND',
      'NPL',
      'BTN',
      'BGD',
      'LKA',
      'MMR',
      'LAO',
      'VNM',
      'THA',
      'KHM',
      'HKG',
      'KOR',
      'PHL',
      'FSM',
      'MHL',
      'MEX',
      'GTM',
      'SLV',
      'BLZ',
      'HND',
      'NIC',
      'PAN',
      'JAM',
      'HTI',
      'DOM',
      'PRI',
      'LCA',
      'GRD',
      'TTO',
      'CPV',
      'MRT',
      'SEN',
      'GMB',
      'GNB',
      'GIN',
      'SLE',
      'LBR',
    ],
  },
  {
    id: 'populationData',
    title: 'Population Data',
    countryID: 'iso_3',
    regionID: 'adm2_name',
    pmTilesSource:
      'pmtiles://https://undpngddlsgeohubdev01.blob.core.windows.net/admin/rural_urban_District_Electricity_Access_20230421004438.pmtiles',
    options: [
      {
        label: 'Population (2015)',
        id: 'TotPopulation',
        sourceLayer: 'tmpl3ue0da4',
        hasID: 'TotPopulation',
        binning: [
          10000, 50000, 100000, 500000, 1000000, 2500000, 5000000, 7500000,
          10000000, 1000000000,
        ],
        colorScale: UNDPColorModule.sequentialColors.neutralColorsx10,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'TotPopulation'],
          0,
          UNDPColorModule.sequentialColors.neutralColorsx10[0],
          9999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[0],
          10000,
          UNDPColorModule.sequentialColors.neutralColorsx10[1],
          49999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[1],
          50000,
          UNDPColorModule.sequentialColors.neutralColorsx10[2],
          99999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[2],
          100000,
          UNDPColorModule.sequentialColors.neutralColorsx10[3],
          499999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[3],
          500000,
          UNDPColorModule.sequentialColors.neutralColorsx10[4],
          999999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[4],
          1000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[5],
          2499999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[5],
          2500000,
          UNDPColorModule.sequentialColors.neutralColorsx10[6],
          4999999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[6],
          5000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[7],
          7499999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[7],
          7500000,
          UNDPColorModule.sequentialColors.neutralColorsx10[8],
          9999999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[8],
          10000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[9],
          1000000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[9],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {format('~s')(d.TotPopulation).replace('G', 'B')}
              </p>
            </div>
          );
        },
      },
      {
        label: 'Rural Population % (2015)',
        id: 'percentRuralPop',
        sourceLayer: 'tmpl3ue0da4',
        hasID: 'TotPopRural',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.sequentialColors.neutralColorsx10,
        fillSettings: [
          'let',
          'percentRuralPop',
          ['/', ['get', 'TotPopRural'], ['get', 'TotPopulation']],
          [
            'interpolate',
            ['linear'],
            ['var', 'percentRuralPop'],
            0,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.0999,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.1,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.1999,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.2,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.2999,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.3,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.3999,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.4,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.4999,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.5,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.5999,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.6,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.6999,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.7,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.7999,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.8,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.8999,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.9,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
            1,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {((d.TotPopRural / d.TotPopulation) * 100).toFixed(1)}%
              </p>
            </div>
          );
        },
      },
      {
        label: 'Urban Population % (2015)',
        id: 'percentUrbanPop',
        hasID: 'TotPopUrban',
        sourceLayer: 'tmpl3ue0da4',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.sequentialColors.neutralColorsx10,
        fillSettings: [
          'let',
          'percentUrbanPop',
          ['/', ['get', 'TotPopUrban'], ['get', 'TotPopulation']],
          [
            'interpolate',
            ['linear'],
            ['var', 'percentUrbanPop'],
            0,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.0999,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.1,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.1999,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.2,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.2999,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.3,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.3999,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.4,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.4999,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.5,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.5999,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.6,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.6999,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.7,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.7999,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.8,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.8999,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.9,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
            1,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {((d.TotPopUrban / d.TotPopulation) * 100).toFixed(1)}%
              </p>
            </div>
          );
        },
      },
    ],
    countries: [
      'STP',
      'GNQ',
      'CMR',
      'GAB',
      'COG',
      'CAF',
      'COD',
      'UGA',
      'KEN',
      'SSD',
      'ETH',
      'SOM',
      'IDN',
      'MYS',
      'AGO',
      'NAM',
      'BWA',
      'ZAF',
      'ZMB',
      'RWA',
      'BDI',
      'TZA',
      'MWI',
      'ZWE',
      'MOZ',
      'COM',
      'MDG',
      'LSO',
      'SWZ',
      'SYC',
      'MUS',
      'TLS',
      'PNG',
      'SLB',
      'VUT',
      'ECU',
      'COL',
      'GUY',
      'SUR',
      'PER',
      'BOL',
      'ARG',
      'PRY',
      'URY',
      'MAR',
      'DZA',
      'MLI',
      'BFA',
      'CIV',
      'GHA',
      'TGO',
      'TUN',
      'LBY',
      'NER',
      'TCD',
      'BEN',
      'NGA',
      'SDN',
      'EGY',
      'JOR',
      'IRQ',
      'ERI',
      'DJI',
      'TJK',
      'MNG',
      'PAK',
      'IND',
      'NPL',
      'BTN',
      'BGD',
      'LKA',
      'MMR',
      'LAO',
      'VNM',
      'THA',
      'KHM',
      'HKG',
      'KOR',
      'PHL',
      'FSM',
      'MHL',
      'MEX',
      'GTM',
      'SLV',
      'BLZ',
      'HND',
      'NIC',
      'PAN',
      'JAM',
      'HTI',
      'DOM',
      'PRI',
      'LCA',
      'GRD',
      'TTO',
      'CPV',
      'MRT',
      'SEN',
      'GMB',
      'GNB',
      'GIN',
      'SLE',
      'LBR',
    ],
  },
  {
    id: 'mpi',
    title: 'Multidimensional Poverty',
    countryID: 'ISO',
    regionID: 'region',
    pmTilesSource:
      'pmtiles://https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Viz/production/public/data/PMTiles/adm_Export_jso_FeaturesToJSO.pmtiles',
    options: [
      {
        label: 'Multidimensional Poverty Index',
        id: 'MPI',
        binning: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
        hasID: 'MPI',
        sourceLayer: 'adm_Export_jso_FeaturesToJSO',
        colorScale: UNDPColorModule.sequentialColors.negativeColorsx07,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'MPI'],
          0,
          UNDPColorModule.sequentialColors.negativeColorsx07[0],
          0.0999,
          UNDPColorModule.sequentialColors.negativeColorsx07[0],
          0.1,
          UNDPColorModule.sequentialColors.negativeColorsx07[1],
          0.1999,
          UNDPColorModule.sequentialColors.negativeColorsx07[1],
          0.2,
          UNDPColorModule.sequentialColors.negativeColorsx07[2],
          0.2999,
          UNDPColorModule.sequentialColors.negativeColorsx07[2],
          0.3,
          UNDPColorModule.sequentialColors.negativeColorsx07[3],
          0.3999,
          UNDPColorModule.sequentialColors.negativeColorsx07[3],
          0.4,
          UNDPColorModule.sequentialColors.negativeColorsx07[4],
          0.4999,
          UNDPColorModule.sequentialColors.negativeColorsx07[4],
          0.5,
          UNDPColorModule.sequentialColors.negativeColorsx07[5],
          0.5999,
          UNDPColorModule.sequentialColors.negativeColorsx07[5],
          0.6,
          UNDPColorModule.sequentialColors.negativeColorsx07[6],
          1,
          UNDPColorModule.sequentialColors.negativeColorsx07[6],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.region}{' '}
                <span style={{ color: 'var(--gray-500)' }}>({d.country})</span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.MPI}
              </p>
            </div>
          );
        },
      },
      {
        label: 'Headcount Ratio (%)',
        id: 'headcountRatio',
        hasID: 'Headcount Ratio (H, %)',
        sourceLayer: 'adm_Export_jso_FeaturesToJSO',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.sequentialColors.negativeColorsx10,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'Headcount Ratio (H, %)'],
          0,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          9.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          10,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          19.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          20,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          29.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          30,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          39.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          40,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          49.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          50,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          59.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          60,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          69.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          70,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          79.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          80,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          89.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          90,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
          100,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.region}{' '}
                <span style={{ color: 'var(--gray-500)' }}>({d.country})</span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d['Headcount Ratio (H, %)']}%
              </p>
            </div>
          );
        },
      },
      {
        label: 'Poverty Intensity (%)',
        id: 'intensity',
        hasID: 'Intensity (A, %)',
        sourceLayer: 'adm_Export_jso_FeaturesToJSO',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.divergentColors.colorsx10,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'Intensity (A, %)'],
          0,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          9.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          10,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          19.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          20,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          29.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          30,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          39.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          40,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          49.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          50,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          59.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          60,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          69.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          70,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          79.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          80,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          89.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          90,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
          100,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.region}{' '}
                <span style={{ color: 'var(--gray-500)' }}>({d.country})</span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d['Intensity (A, %)']}%
              </p>
            </div>
          );
        },
      },
    ],
    countries: [
      'AFG',
      'MRT',
      'WSM',
      'NGA',
      'UGA',
      'IND',
      'LKA',
      'MWI',
      'NPL',
      'PRY',
      'NAM',
      'AGO',
      'GHA',
      'PSE',
      'MDV',
      'SYC',
      'THA',
      'SLE',
      'NPL',
      'BTN',
      'PAK',
      'GIN',
      'KEN',
      'LSO',
      'LBR',
      'LBY',
      'MDG',
      'MLI',
      'MAR',
      'MOZ',
      'NER',
      'BTN',
    ],
  },
];

export const ABOUT_TEXT_LINKS = [
  {
    title: 'Poverty and Inequality',
    id: 'Poverty and Inequality',
    bodyText: (
      <div>
        <p className='undp-typography'>
          Eradicating poverty, reducing inequality within and between countries
          and ensuring that no one is left behind are central to the 2030 Agenda
          for Sustainable Development and UNDP&apos;s work.
        </p>
        <p className='undp-typography'>
          Data suggests that the challenge ahead is increasingly daunting. The
          on-going polycrisis the world finds itself, not least the climate and
          debt crises, are reversing decades of progress. After thirty years of
          continuous decline, the global share of people experiencing extreme
          poverty - living on less than $2.15 a day- surged from 8.4 percent in
          2019 to 9.3 percent in 2020<sup>1</sup> as a result of COVID-19, while
          the combined effects of the pandemic, the war in Ukraine and ensuing
          cost-of-living crisis, might have pushed 75 million more people into
          extreme poverty between 2020 and the end of 2023.<sup>2</sup>
        </p>
        <p className='undp-typography'>
          If current trends continue, 575 million people will still be living in
          extreme poverty in 2030<sup>3</sup>. Furthermore, 1.1 billion people
          in 110 developing countries continue to live in multidimensional
          poverty.<sup>4</sup> Human development has fallen back to its 2016
          levels while the average global loss in human development achievements
          - health, education, and income - due to inequality is 19.4 percent
          <sup>5</sup>.
        </p>
        <p className='undp-typography'>
          Global income inequality, as measured by the global Gini Index dropped
          from about 70 in 1990 to 62 in 2019, but rose by 0.7 in 2020, as
          poorer countries were hit harder than richer countries and less able
          to provide social protection for the most vulnerable and preserve jobs
          and livelihoods<sup>6</sup>. Inequalities of opportunity continue to
          persist due to gender, age and other factors, both within and between
          countries.
        </p>
        <p className='undp-typography'>
          Climate change worsens both poverty and inequality. The income losses
          from climate hazards of the bottom 40% are estimated to be 70% larger
          than the average in low- and middle-income countries.
          <sup>7</sup>
        </p>
        <p className='undp-typography'>
          Despite increased vulnerabilities, only 28.9 percent of people in need
          - all children, along with people of working age and older people not
          covered by social insurance - receive social assistance<sup>8</sup>.
          Prior to COVID-19, 70 percent of workers in developing and low-income
          countries were informal workers. In 2022, informal employment in least
          developed countries (LDCs) stood at 89.7 percent in 2022 - against 58
          percent globally, with no improvement since 2015<sup>9</sup>. This
          underscores the urgency of inclusive and shock-responsive social
          protection systems.
        </p>
        <p className='undp-typography'>
          Poverty and inequality reduction prospects are further undermined by
          soaring debt levels. About 60% of low-income developing countries are
          in debt distress or at high risk of debt distress<sup>10</sup>. The
          average low-income country spends about 2.3 times more on interest
          payments than on social assistance
          <sup>11</sup>.
        </p>
        <p className='undp-typography'>
          <ol>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              World Bank, 2023,{' '}
              <a
                href='https://www.worldbank.org/en/topic/poverty/overview'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://www.worldbank.org/en/topic/poverty/overview
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              UNDP Development Futures Series, 2023, The Human Cost of Inaction:
              Poverty, Social Protection and Debt Servicing, 2020-2023{' '}
              <a
                href='https://www.undp.org/sites/g/files/zskgke326/files/2023-07/the-human-cost-of-inaction-poverty-social-protection-and-debt-servicing-2020-2023.pdf'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://www.undp.org/sites/g/files/zskgke326/files/2023-07/the-human-cost-of-inaction-poverty-social-protection-and-debt-servicing-2020-2023.pdf
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              <a
                href='https://unstats.un.org/sdgs/report/2023/Goal-01/'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://unstats.un.org/sdgs/report/2023/Goal-01/
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              <a
                href=' https://hdr.undp.org/content/2023-global-multidimensional-poverty-index-mpi#/indicies/MPI. '
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://hdr.undp.org/content/2023-global-multidimensional-poverty-index-mpi#/indicies/MPI.
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              UNDP, Human Development Report 2021/2022,{' '}
              <a
                href='https://hdr.undp.org/system/files/documents/global-report-document/hdr2021-22overviewenpdf.pdf'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://hdr.undp.org/system/files/documents/global-report-document/hdr2021-22overviewenpdf.pdf
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              <a
                href='https://datatopics.worldbank.org/sdgatlas/goal-10-reduced-inequalities/'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://datatopics.worldbank.org/sdgatlas/goal-10-reduced-inequalities/
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              Climate Inequality Report 2023,{' '}
              <a
                href='https://wid.world/wp-content/uploads/2023/01/CBV2023-ClimateInequalityReport-2.pdf'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://wid.world/wp-content/uploads/2023/01/CBV2023-ClimateInequalityReport-2.pdf
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              ILO - World Social Protection Report 2020-2022: social protection
              at the crossroads - in pursuit of a better future,{' '}
              <a
                href='https://www.ilo.org/wcmsp5/groups/public/---ed_protect/---soc_sec/documents/publication/wcms_817572.pdf'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://www.ilo.org/wcmsp5/groups/public/---ed_protect/---soc_sec/documents/publication/wcms_817572.pdf
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              <a
                href='https://unstats.un.org/sdgs/report/2023/Goal-08/'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://unstats.un.org/sdgs/report/2023/Goal-08/
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              As of December 2022; IMF, 2023, Are We Heading for Another Debt
              Crisis in Low-Income Countries? Debt Vulnerabilities: Today vs the
              pre-HIPC Era,{' '}
              <a
                href='https://www.elibrary.imf.org/view/journals/001/2023/079/article-A001-en.xml'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://www.elibrary.imf.org/view/journals/001/2023/079/article-A001-en.xml
              </a>
            </li>
            <li className='undp-list-item' style={{ fontSize: '0.75rem' }}>
              <a
                href='https://www.undp.org/publications/dfs-human-cost-inaction-poverty-social-protection-and-debt-servicing-2020-2023'
                target='_blank'
                rel='noreferrer'
                style={{ fontSize: '0.75rem' }}
              >
                https://www.undp.org/publications/dfs-human-cost-inaction-poverty-social-protection-and-debt-servicing-2020-2023
              </a>
            </li>
          </ol>
        </p>
      </div>
    ),
    resource: [
      {
        source: "UNDP's Social Protection Offer",
        link: 'https://www.undp.org/publications/undps-social-protection-offer-20',
      },
      {
        source: 'All UNDP Publications',
        link: 'https://www.undp.org/publications',
      },
      {
        source: 'All Poverty and Inequality Related Content',
        link: 'https://www.undp.org/tag/poverty-reduction-and-inequality',
      },
    ],
  },
  {
    title: 'Gender Equality',
    id: 'Gender',
    bodyText: (
      <div>
        <p className='undp-typography'>
          Gender inequalities persist, and recent shocks, including planetary
          imbalances, the Covid-19 pandemic, the backlash against gender
          equality and economic crises, are aggravating the current scenario for
          women all over the world. The Gender Inequality Index (GII) reveals a
          lack of global improvement in its dimensions, with the world value
          stagnating at 0.465 for the past three years. Women&rsquo;s labour
          force participation is 46%, women face disparities in earnings,
          savings, and job security, and they are overrepresented in the
          informal sector. Women spend three times more hours on unpaid care
          work than men which, translated into labour market terms, would amount
          to 2.2 billion full-time jobs annually.
        </p>
        <p className='undp-typography'>
          Social norms help us understand imbalances and dynamics of power
          behind inequalities. Biased gender social norms are widespread
          worldwide: almost 90% of people have at least one bias. Almost half
          the world&rsquo;s people think that men make better political leaders
          than women do. Only 11% of heads of state are women, women hold only
          22% of ministerial posts and 25% of parliament seats. More than a
          quarter of the world&rsquo;s people believe that it is justifiable for
          a man to beat his wife and 26% of women over age 15 have experienced
          intimate partner violence.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'All UNDP Publications',
        link: 'https://www.undp.org/publications',
      },
    ],
  },
  {
    title: 'Energy',
    id: 'Energy',
    bodyText: (
      <div>
        <p className='undp-typography'>
          <span className='bold'>
            The biggest challenge of our time is to transform the global energy
            system into a low-carbon and net-zero emissions pathway
          </span>
          , fast enough to achieve the goals of the Paris Agreement, while
          meeting the Sustainable Development Goals (SDGs), and leaving no-one
          behind.
        </p>
        <p className='undp-typography'>
          <span className='bold'>
            UNDP&rsquo;s 2022-2025 Strategic Plan has put sustainable energy at
            the heart of UNDP&rsquo;s mission on sustainable development,
            aligned with the UN-Energy Plan of Action
          </span>
          : to catalyse unprecedented action and partnerships to provide access
          to sustainable, affordable, and reliable energy to 500 more million
          people by 2025 and accelerate the transition to renewable energy
          through systemic changes that lead to inclusive green economies.
        </p>
        <p className='undp-typography'>
          <span className='bold'>
            Given its scale, the energy transition requires an integrated
            approach that leverage synergies across SDG 7 and other SDGs
          </span>
          . This would make comprehensive links among climate change, the
          environment, gender, health, governance, the economy, finance, etc.
          Such a perspective helps to understand and manage complex
          interactions.
        </p>
        <p className='undp-typography'>
          <span className='bold'>
            UNDP&rsquo;s Sustainable Energy Hub is designed to respond to these
            challenges and harness networks, experience, and innovation
          </span>
          . It focuses on three pillars of sustainable energy for development:
          <br />
          <ul>
            <li className='undp-list-item'>
              <span className='bold'>Closing the gap in energy access</span> so
              that marginalized people and communities gain access to
              sustainable, clean energy and the dignity and opportunities it
              brings
            </li>
            <li className='undp-list-item'>
              <span className='bold'>accelerate a just energy transition</span>{' '}
              through system wide changes that support a green economy by
              bringing together the best ideas from the worlds of government,
              business, finance, digital, and most importantly, from people,
              communities and civil societies
            </li>
            <li className='undp-list-item'>
              <span className='bold'>Scale up energy finance</span> with the
              public and private sector, across global, regional and local
              ecosystems for finance, innovation and investment
            </li>
          </ul>
        </p>
      </div>
    ),
    resource: [
      {
        source: 'All UNDP Publications',
        link: 'https://www.undp.org/publications',
      },
      {
        source: 'All Energy Related Content',
        link: 'https://www.undp.org/tag/energy',
      },
    ],
  },
  {
    title: 'Environment',
    id: 'Environment',
    bodyText: (
      <div>
        <p className='undp-typography'>
          Sustainable development and environmental conservation are linked and
          critical to the present and future well-being of humanity. Despite the
          progress made over the years, there is a still a lot to do to achieve
          the 2030 goals and targets of SDGs 11, 12, 13, 14, and 15 aimed at
          conserving and preserving the environment. Global statistics show that
          atmospheric concentrations continue to increase and average
          temperatures over land have increased around twice as much as the
          ocean. UNDP and partners are committed to providing transformative
          environmental actions towards reducing global emissions and making the
          environment peaceful and prosperous for people by 2030.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'All UNDP Publications',
        link: 'https://www.undp.org/publications',
      },
      {
        source: 'All Environment Related Content',
        link: 'https://www.undp.org/tag/environment',
      },
    ],
  },
  {
    title: 'Resilience',
    id: 'Resilience',
    bodyText: (
      <div>
        <p className='undp-typography'>
          A region&rsquo;s and or country&rsquo;s ability to react, recover and
          adapt to changing circumstances is at the core of resilience.
          Globally, resilience is needed more than ever because the scale,
          complexity and interconnectedness of risks facing humankind is
          unprecedented. Data related to disaster risk reduction and recovery
          for building resilience (DRT); governance and peace-building and human
          mobility is key in understanding risk better and applying a resilience
          building approach.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'Resilience Guidance',
        link: 'https://www.sparkblue.org/resilience-guidance',
      },
      {
        source: 'All UNDP Publications',
        link: 'https://www.undp.org/publications',
      },
      {
        source: 'All Resilience Related Content',
        link: 'https://www.undp.org/tag/resilience',
      },
    ],
  },
  {
    title: 'Governance',
    id: 'Governance',
    bodyText: (
      <div>
        <p className='undp-typography'>
          Sustainable development is built within strong institutions.
          Governance incorporates the exercise of power and related
          decision-making processes involving different state and non-state
          actors in the provision of public goods and services. UNDP invests in
          helping countries address emerging complexities by “future-proofing”
          governance systems through anticipatory approaches and better
          management of risk. The workstreams include: Inclusive and
          future-smart public goods and services; Democratic institutions and
          processes; Inclusive public sphere; and Integrating governance
          principles in development. The portal presents some governance
          indicators, recognizing that further investment is required to produce
          harmonized, timely and comparable evidence on all dimensions of
          governance which includes, Nondiscrimination and equality,
          Participation, openness, access to and quality of justice,
          responsiveness, absence of corruption, trust, safety and security. We
          further inform that the the indicators presented do not reflect an
          institutional endorsement to the indicators and producing entities.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'All UNDP Publications',
        link: 'https://www.undp.org/publications',
      },
      {
        source: 'All Governance Related Content',
        link: 'https://www.undp.org/tag/governance',
      },
    ],
  },
  {
    title: 'Arab States',
    id: 'AS',
    bodyText: (
      <div>
        <p className='undp-typography'>
          The Arab States region comprises 20 countries with diverse economies-
          including high-income, middle-income, least-developed, and
          crisis-affected countries- and varying human development patterns with
          countries in the very high human development group, including KSA,
          UAE, Bahrain, and Qatar, and countries in the low human development
          countries - including Sudan, Djibouti, and Yemen. Despite facing
          conflicts, political and economic instability, and forced
          displacement, the region had been, before COVID-19, on a positive
          human development trajectory with a consistently increasing Human
          Development Index since 1990. Nonetheless, the pandemic compounded
          socio-economic vulnerabilities and reversed this progress, with the
          HDI dropping from 0.715 in 2019 to 0.708 in 2021, below the global HDI
          of 0.732. The unemployment rate also rose to 12.6% in the Arab States
          region, more than double the world average of 6.2%. The youth
          unemployment rate (15-24 years old), at 28.6 percent was the highest
          in the world, rising steeply from 25.3 percent in 2019.
        </p>
        <p className='undp-typography'>
          Furthermore, despite advancements in girls&rsquo; school enrolment and
          women&rsquo;s educational achievements in the region over the past
          three decades, the Arab States region still has the second widest
          gender gap in the world after South Asia as measured by the Gender
          Development Index (GDI), with women achieving 12.9 % less in human
          development than men in 2021. Women&rsquo;s political and economic
          participation is still very limited across the region, with, on
          average, less than one in five women in parliament and only 19.3%
          participating in the labor force, 3.6 times lower than men.
        </p>
        <p className='undp-typography'>
          The Regional Bureau for Arab States (RBAS) based in New York serves as
          the headquarters for UNDP regional programmes and country offices in
          17 Arab countries, with the 18th located in the occupied Palestinian
          territory. An additional hub in Amman, Jordan brings support and
          expertise closer to the country offices. RBAS supports work at the
          country level, by leveraging regional approaches guided by UNDP
          regionality principles to address regional and cross-border challenges
          while responding to diverse sub-regional needs. Priority areas in the
          region include anti-corruption and integrity, climate action for human
          security, regional economic integration, and women and youth
          empowerment.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'UNDP Regional Bureau for Arab States (RBAS)',
        link: 'https://www.undp.org/arab-states',
      },
    ],
  },
  {
    title: 'Asia and the Pacific',
    id: 'AP',
    bodyText: (
      <div>
        <p className='undp-typography'>
          The Asia and the Pacific region is home to 4.6 billion people - 60% of
          the global population. As per IMF projections, the region will
          contribute around 70 percent of global growth in 2023 as its expansion
          accelerates to 4.6 percent from 3.8 percent in last year. While there
          has been considerable development progress in the Asia and Pacific
          region over the last three decades on many indexes and indicators
          (viz. Gross National Income per capita), the region marks alarming
          data on environmental challenges, nutrition supply chain etc. The
          region is already responsible for over 80% of global plastic waste
          leakage in oceans; and of the 20 most polluted cities in the world, 18
          are in South Asia — with massive associated societal & economic
          impacts. Furthermore, inequalities continue to take away from some of
          the important gains in development and the income gained by women is
          still lagging significantly behind that generated by men.
        </p>
        <p className='undp-typography'>
          24 UNDP country offices covering work in 36 countries in Asia and the
          Pacific, and the UNDP Regional Bureau for Asia and the Pacific (RBAP)
          headquartered in New York City and regionally located in Bangkok,
          Thailand. We work with local partners to identify relevant solutions
          to today&rsquo;s complex and trans-boundary development challenges.
          UNDP&rsquo;s work in the region supports them in designing and
          implementing large scale development initiatives that deliver lasting
          social, economic, and environmental improvements in the region.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'UNDP Regional Bureau for Asia and the Pacific (RBAP)',
        link: 'https://www.undp.org/asia-pacific',
      },
    ],
  },
  {
    title: 'Europe and Central Asia',
    id: 'ECA',
    bodyText: (
      <div>
        <p className='undp-typography'>
          While extreme poverty in Europe & Central Asia has largely been
          eradicated, countries in the Western Balkans, South Caucasus and
          Central Asia continue to face multiple development challenges. Gender
          Inequality remains a key impediment to development, with the Gross
          National Income per capita for women just over half than that of men.
          Outward and transit migration flows are among the highest globally and
          many countries in the region are experiencing extensive depletion of
          human capital. In addition, climate change is already exerting
          pressure on the shared natural resources and is triggering devastating
          weather events, bringing additional strain to the conflicts and
          governance issues in the region.
        </p>
        <p className='undp-typography'>
          The goal of UNDP&rsquo;s 19 country offices in the region and the
          Regional Bureau for Europe and Central Asia, headquartered in New
          York, is to help eradicate poverty in all its forms, accelerate the
          transition to sustainable development, and make sure countries and
          people are able to withstand crises and shocks. We work to make sure
          the most vulnerable and excluded are not left behind, develop
          game-changing solutions to accelerate sustainable development, and
          promote prevention and preparedness.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'UNDP Regional Bureau for Europe and Central Asia (RBEC)',
        link: 'https://www.undp.org/eurasia',
      },
    ],
  },
  {
    title: 'Latin America and the Caribbean',
    id: 'LAC',
    bodyText: (
      <div>
        <p className='undp-typography'>
          Despite significant leaps in development, challenges related to
          inequality and economic opportunity in the region of Latin America and
          the Caribbean remain. Across the region, the income generated by women
          is less than 60 percent of the income generated by men. The region has
          been hard-hit by the COVID-19 pandemic, which has stalled and in some
          cases reversed some of the hard-earned progress in education, health,
          and economic opportunity.
        </p>
        <p className='undp-typography'>
          UNDP&rsquo;s 27 country and multi-country offices in the region and
          the Regional Bureau for Latin America and the Caribbean support
          countries in helping people out and preventing them from getting back
          into poverty, boosting democratic governance and inclusive societies
          marked by gender equality, supporting countries sustainably manage
          natural resources and promoting climate change resilience.
        </p>
      </div>
    ),
    resource: [
      {
        source:
          'UNDP Regional Bureau for Latin America and the Caribbean (RBLAC)',
        link: 'https://www.undp.org/latin-america',
      },
    ],
  },
  {
    title: 'Africa',
    id: 'SSA',
    bodyText: (
      <div>
        <p className='undp-typography'>
          Overall, countries in Sub-Saharan Africa have achieved considerable
          development progress in the past two decades. Yet significant
          challenges remain. Sub-Saharan Africa&rsquo;s Human Development Index
          (HDI) is 30% lower due to inequality and 5 points higher for men than
          for women. Progress in education has been stalled as a result of the
          COVID-19 pandemic with schooling duration significantly lower than in
          other regions, and economic growth as measured by Gross National
          Income per capita (2017 PPP$) has been stagnant since 2015.
        </p>
        <p className='undp-typography'>
          UNDP&rsquo;s Sub-Saharan African 46 country offices and the Regional
          Bureau for Africa (RBA) supports Africa&rsquo;s people, its
          governments, and institutions as they seek to consolidate and
          accelerate development gains to overcome the lingering effects of the
          global pandemic, and effectively address the challenges that remain,
          including: jobless growth, persistent inequalities, weak governance,
          climate change, and persistent violent conflict.
        </p>
      </div>
    ),
    resource: [
      {
        source: 'UNDP Regional Bureau for Africa (RBA)',
        link: 'https://www.undp.org/africa',
      },
    ],
  },
];

export const TOP_CARDS = [
  {
    id: 'Default',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'stackedLineChart',
        settings: {
          dataKey: ['Rural Population, total', 'Urban Population, total'],
          strokeWidth: 1,
          lineColors: [
            UNDPColorModule.categoricalColors.locationColors.rural,
            UNDPColorModule.categoricalColors.locationColors.rural,
          ],
          graphTitle: 'Urban and Rural Population',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GHG emission',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Greenhouse Gas Emission',
          suffix: 'MtC02e',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Access to electricity (% of population)',
          graphTitle: 'People with access to electricity',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          suffix: 'kWh',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
    ],
  },
  {
    id: 'Poverty and Inequality',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Vulnerable persons covered by social assistance',
          graphTitle: 'Vulnerable persons covered by social assistance',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Inequality-adjusted HDI',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Inequality-adjusted Human Development Index',
        },
      },
    ],
  },
  {
    id: 'Energy',
    cards: [
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Access to electricity (% of population)',
          graphTitle: 'People with access to electricity',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Access to clean fuels and technologies for cooking  (% of population)',
          graphTitle:
            'People with access to clean fuels and technologies for cooking',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Renewable energy consumption (% of total final energy consumption)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Renewable energy consumption (% of total final energy consumption)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Energy imports, net (% of energy use)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Energy imports (% of energy use)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          suffix: 'kWh',
        },
      },
    ],
  },
  {
    id: 'Environment',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GHG emission',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Greenhouse Gas Emission',
          suffix: 'MtC02e',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Emission levels associated with GHG target set by (I)NDCs',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Emission levels associated with GHG target set by (I)NDCs',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Reduced Mean Daily CO2 Emissions; percent change',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Reduced Mean Daily CO2 Emissions; percent change',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'stackedLineChart',
        settings: {
          dataKey: ['Rural Population, total', 'Urban Population, total'],
          strokeWidth: 1,
          lineColors: [
            UNDPColorModule.categoricalColors.locationColors.rural,
            UNDPColorModule.categoricalColors.locationColors.rural,
          ],
          graphTitle: 'Urban and Rural Population',
        },
      },
    ],
  },
  {
    id: 'Gender',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Gender Inequality Index-Labour force participation rate, female (% ages 15 and older)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Labour force participation rate, female (% ages 15 and older)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Gender Inequality Index-Share of seats in parliament (% held by women)',
          graphTitle: 'Share of seats in parliament (% held by women)',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Proportion of women subjected to physical and/or sexual violence in the last 12 months (% of women age 15-49)',
          dotColor: 'var(--dark-red)',
          graphTitle: 'No. of women subjected to violence in last 12 months ',
        },
      },
    ],
  },
  {
    id: 'Governance',
    cards: [
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Individuals using the Internet (% of population)',
          graphTitle: 'People with access to internet',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Inequality in income',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Inequality in income',
          suffix: '',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Inequality in life expectancy',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Inequality in life expectancy',
          suffix: '',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA Public sector management and institutions',
          graphTitle: 'Public Sector Management and Institutions Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Strength of legal rights index (0=weak to 12=strong)',
          graphTitle: 'Strength of legal rights index',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Youth Unemployment (% of total labor force ages 15-24)',
          suffix: '%',
        },
      },
    ],
  },
  {
    id: 'Resilience',
    cards: [
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Country Fragility',
          graphTitle: 'Fragile States Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey:
            'Score of adoption and implementation of national DRR strategies in line with the Sendai Framework',
          graphTitle:
            'Score of adoption and implementation of national disaster risk reduction (DRR) strategies in line with the Sendai Framework',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey:
            'Proportion of local governments that adopt and implement local disaster risk reduction (DRR) strategies in line with national disaster risk reduction strategies (%)',
          graphTitle:
            'Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies (%)',
          description: false,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'External Peace',
          graphTitle: 'External Peace Score',
          description: false,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Global Peace Index Rank',
          graphTitle: 'Global Peace Index Rank',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Refugees and Internally Displaced People as Percentage of the Population',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Refugees and Internally Displaced People as Percentage of the Population',
          suffix: '%',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Refugees and IDPs Pressure on State',
          graphTitle: 'Refugees and IDPs Pressure on State',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Country Fragility',
          graphTitle: 'Country Fragility',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'COVID-19 Government Response Stringency',
          graphTitle: 'COVID-19 Government Response Stringency',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Fiscal Response',
          graphTitle: 'Fiscal Response',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Monetary Response',
          graphTitle: 'Monetary Response',
          description: true,
          prefix: 'US $',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'International migrant stock at mid-year (both sexes)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'International migrant stock at mid-year (both sexes)',
          suffix: '%',
        },
      },
    ],
  },
  {
    id: 'AP',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Multidimensional Poverty Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Multidimensional Poverty Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Individuals using the Internet (% of population)',
          graphTitle: 'People with access to internet',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Gender Inequality Index-Labour force participation rate, female (% ages 15 and older)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Female labour force participation rate',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Youth Unemployment (% of total labor force ages 15-24)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Access to clean fuels and technologies for cooking  (% of population)',
          graphTitle:
            'People with access to clean fuels and technologies for cooking',
        },
      },
    ],
  },
  {
    id: 'SSA',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gross National Income Per Capita (2017 PPP$)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gross National Income Per Capita (2017 PPP$)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GINI index (World Bank estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GINI Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
    ],
  },
  {
    id: 'LAC',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GDP per capita, PPP (current international $)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP per capita, PPP (current international $)',
          suffix: 'MtC02e',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gross domestic product, constant prices, percent change',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP, Percent change',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GINI index (World Bank estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GINI Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
    ],
  },
  {
    id: 'ECA',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'stackedLineChart',
        settings: {
          dataKey: ['Rural Population, total', 'Urban Population, total'],
          strokeWidth: 1,
          lineColors: [
            UNDPColorModule.categoricalColors.locationColors.rural,
            UNDPColorModule.categoricalColors.locationColors.rural,
          ],
          graphTitle: 'Urban and Rural Population',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GHG emission',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Greenhouse Gas Emission',
          suffix: 'MtC02e',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Access to electricity (% of population)',
          graphTitle: 'People with access to electricity',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          suffix: 'kWh',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
    ],
  },
  {
    id: 'AS',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human development index (HDI)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Development Index (value)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Development Index (GDI)',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Gender Inequality Index-Share of seats in parliament (% held by women)',
          graphTitle: 'Share of seats in parliament (% held by women)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Youth Unemployment (% of total labor force ages 15-24)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Poor persons covered by social protection systems',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Percentage of poor persons covered by social protection systems',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
    ],
  },
  {
    id: 'PAK',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Rule of Law: Estimate',
          graphTitle: 'Rule of Law Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA Public sector management and institutions',
          graphTitle: 'Public Sector Management and Institutions Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA policies for social inclusion/equity cluster average',
          graphTitle: 'Social Inclusion and Equity Index',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Labor force with advanced education (% of total working-age population with advanced education)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Proportion of Labour Force with Advanced Education',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA structural policies cluster average (1=low to 6=high)',
          graphTitle: 'Structural Policies Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Government Effectiveness: Estimate',
          graphTitle: 'Government Effectiveness Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Voice and Accountability (estimate)',
          graphTitle: 'Voice and Accountability Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Refugees and IDPs Pressure on State',
          graphTitle: 'Refugees and IDPs Score',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Natural Capital, USD per capita',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Natural capital',
          prefix: 'US $',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Government Debt',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Net debt as percent of GDP',
          suffix: '%',
        },
      },
    ],
  },
];
