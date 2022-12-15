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

export const INCOME_GROUPS = ['Low income', 'Lower middle income', 'Upper middle income', 'High income'];

export const HDI_LEVELS = ['Low', 'Medium', 'High', 'Very High'];

export const COLOR_SCALES = {
  Null: '#FFF',
  Linear: {
    RedColor4: ['#ffffcc', '#a1dab4', '#41b6c4', '#225ea8'],
    RedColor5: ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'],
    RedColor6: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'],
    RedColor7: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'],
    RedColor8: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'],
    RedColor9: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    RedColor10: ['#ffffd9', '#e4f4cb', '#c4e6c3', '#9dd4c0', '#69c1c1', '#3ea2bd', '#347cab', '#265994', '#173978', '#081d58'],
    GreenColor4: ['#ffffcc', '#c2e699', '#78c679', '#238443'],
    GreenColor5: ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
    GreenColor6: ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#31a354', '#006837'],
    GreenColor7: ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'],
    GreenColor8: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'],
    GreenColor9: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    GreenColor10: [
      'rgb(250, 250, 110)',
      'rgb(217, 233, 101)',
      'rgb(186, 216, 94)',
      'rgb(157, 198, 87)',
      'rgb(129, 180, 81)',
      'rgb(103, 162, 76)',
      'rgb(78, 144, 70)',
      'rgb(55, 126, 64)',
      'rgb(31, 108, 57)',
      'rgb(0, 90, 50)',
    ],
  },
  Divergent: {
    Color4: [
      '#d7191c',
      '#fdae61',
      '#abdda4',
      '#2b83ba',
    ],
    Color5: [
      '#d7191c',
      '#fdae61',
      '#ffffbf',
      '#abdda4',
      '#2b83ba',
    ],
    Color6: [
      '#d53e4f',
      '#fc8d59',
      '#fee08b',
      '#e6f598',
      '#99d594',
      '#3288bd',
    ],
    Color7: [
      '#d53e4f',
      '#fc8d59',
      '#fee08b',
      '#ffffbf',
      '#e6f598',
      '#99d594',
      '#3288bd',
    ],
    Color8: [
      '#d53e4f',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#e6f598',
      '#abdda4',
      '#66c2a5',
      '#3288bd',
    ],
    Color9: [
      '#d53e4f',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#ffffbf',
      '#e6f598',
      '#abdda4',
      '#66c2a5',
      '#3288bd',
    ],
    Color10: [
      '#9e0142',
      '#d53e4f',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#e6f598',
      '#abdda4',
      '#66c2a5',
      '#3288bd',
      '#5e4fa2',
    ],
    Color11: [
      '#9e0142',
      '#d53e4f',
      '#f46d43',
      '#fdae61',
      '#fee08b',
      '#ffffbf',
      '#e6f598',
      '#abdda4',
      '#66c2a5',
      '#3288bd',
      '#5e4fa2',
    ],
  },
  Categorical: [
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#a65628',
    '#e41a1c',
    '#f781bf',
    '#ffff33',
  ],
  Bivariate5x5: [
    ['#e5e5e5', '#BAE7F6', '#7FDCF9', '#41D0FC', '#0BC6FF'],
    ['#F6C5D4', '#BFBEDD', '#88B8E5', '#57B2ED', '#21ABF5'],
    ['#F99FBA', '#C89BC6', '#9697D3', '#6494DF', '#3690EB'],
    ['#F782A5', '#D180B3', '#9F7DC5', '#727AD4', '#4978E3'],
    ['#F4618D', '#D2619F', '#A961B3', '#8061C8', '#5C61DA'],
  ],
  Bivariate4x4: [
    ['#e5e5e5', '#BAE7F6', '#7FDCF9', '#41D0FC'],
    ['#F6C5D4', '#BFBEDD', '#88B8E5', '#57B2ED'],
    ['#F99FBA', '#C89BC6', '#9697D3', '#6494DF'],
    ['#F782A5', '#D180B3', '#9F7DC5', '#727AD4'],
  ],
  Bivariate5x4: [
    ['#e5e5e5', '#BAE7F6', '#7FDCF9', '#41D0FC'],
    ['#F6C5D4', '#BFBEDD', '#88B8E5', '#57B2ED'],
    ['#F99FBA', '#C89BC6', '#9697D3', '#6494DF'],
    ['#F782A5', '#D180B3', '#9F7DC5', '#727AD4'],
    ['#F4618D', '#D2619F', '#A961B3', '#8061C8'],
  ],
  Bivariate4x5: [
    ['#e5e5e5', '#BAE7F6', '#7FDCF9', '#41D0FC', '#0BC6FF'],
    ['#F6C5D4', '#BFBEDD', '#88B8E5', '#57B2ED', '#21ABF5'],
    ['#F99FBA', '#C89BC6', '#9697D3', '#6494DF', '#3690EB'],
    ['#F782A5', '#D180B3', '#9F7DC5', '#727AD4', '#4978E3'],
  ],
};

export const SIGNATURE_SOLUTIONS_LIST: ('All' | 'Energy' | 'Environment' | 'Gender' | 'Governance' | 'Poverty and Inequality' | 'Resilience')[] = ['All', 'Energy', 'Environment', 'Gender', 'Governance', 'Poverty and Inequality', 'Resilience'];

export const DATALINK = process.env.NODE_ENV === 'production' ? 'https://data.undp.org/pillar-insights/data/' : 'http://localhost:3000/data/';
export const METADATALINK = process.env.NODE_ENV === 'production' ? 'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/main/indicatorMetaData.json' : 'http://localhost:3000/data/indicatorMetaData.json';
export const COUNTRYTAXONOMYLINK = process.env.NODE_ENV === 'production' ? 'https://raw.githubusercontent.com/UNDP-Data/Country-Taxonomy/main/country-territory-groups.json' : 'http://localhost:3000/data/country-taxonomy.json';
