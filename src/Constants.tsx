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
                  ({d.adm0_name})
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
                  ({d.adm0_name})
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
                  ({d.adm0_name})
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
                  ({d.adm0_name})
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
                  ({d.adm0_name})
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
      'pmtiles://../data/PMTiles/adm_Export_jso_FeaturesToJSO.pmtiles',
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
