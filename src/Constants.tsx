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

export const SIGNATURE_SOLUTIONS_LIST: ('All' | 'Energy' | 'Environment' | 'Gender' | 'Governance' | 'Poverty and Inequality' | 'Resilience')[] = ['All', 'Energy', 'Environment', 'Gender', 'Governance', 'Poverty and Inequality', 'Resilience'];

export const DATALINK = process.env.NODE_ENV === 'production' ? 'https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/output_minified.json' : 'https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/output_minified.json';
export const METADATALINK = process.env.NODE_ENV === 'production' ? 'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/for-redesign/indicatorMetaData.json' : 'https://raw.githubusercontent.com/UNDP-Data/Indicators-MetaData/for-redesign/indicatorMetaData.json';
export const COUNTRYTAXONOMYLINK = process.env.NODE_ENV === 'production' ? 'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json' : 'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json';
export const homeLink = 'data.test-undp.acsitefactory.com';
