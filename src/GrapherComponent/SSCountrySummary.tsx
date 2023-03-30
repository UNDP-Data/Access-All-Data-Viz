import { useContext, useState } from 'react';
import { Modal } from 'antd';
import sortBy from 'lodash.sortby';
import { format } from 'd3-format';
import {
  CountryListType, CtxDataType, CountryGroupDataType, IndicatorMetaDataWithYear,
} from '../Types';
import Context from '../Context/Context';
import { GetEmbedParamsForCountrySummary } from '../Components/GetEmbedParams';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
  countries: CountryListType[];
}

interface IndicatorDataType {
  yearlyData: {
      year: number;
      value: number;
  }[];
  indicator: string;
  yearAvailable: number[];
  signatureSolutions: string[];
}

const getValue = (data: IndicatorDataType[], dataKey: string) => {
  const indx = data.findIndex((el) => el.indicator === dataKey);
  if (indx === -1) return null;
  if (data[indx].yearlyData.length === 0) return null;
  const { value } = data[indx].yearlyData[data[indx].yearlyData.length - 1];
  return value;
};

const getYear = (data: IndicatorDataType[], dataKey: string) => {
  const indx = data.findIndex((el) => el.indicator === dataKey);
  if (indx === -1) return null;
  if (data[indx].yearlyData.length === 0) return null;
  const { year } = data[indx].yearlyData[data[indx].yearlyData.length - 1];
  return year;
};

const getAnnualGrowth = (data: IndicatorDataType[], dataKey: string) => {
  const indx = data.findIndex((el) => el.indicator === dataKey);
  if (indx === -1) return null;
  if (data[indx].yearlyData.length === 0) return null;
  const { year } = data[indx].yearlyData[data[indx].yearlyData.length - 1];
  const prevYearIndx = data[indx].yearlyData.findIndex((d) => d.year === year - 1);
  if (prevYearIndx === -1) return null;
  const { value } = data[indx].yearlyData[data[indx].yearlyData.length - 1];
  const valuePrevYear = data[indx].yearlyData[prevYearIndx].value;
  const annualGrowth = ((value - valuePrevYear) * 100) / valuePrevYear;
  return annualGrowth;
};

export const CountrySummary = (props: Props) => {
  const {
    data,
    indicators,
    countries,
  } = props;
  const {
    selectedCountryOrRegion,
  } = useContext(Context) as CtxDataType;
  const [modalVisibility, setModalVisibility] = useState(false);
  const countryName = countries[countries.findIndex((d) => d.code === selectedCountryOrRegion)].name;
  const dataFiltered = data.filter((d) => d['Alpha-3 code'] === selectedCountryOrRegion)[0]
    .indicators.map((d) => ({ ...d, yearlyData: sortBy(d.yearlyData.filter((el) => el.value !== undefined), 'year') }));
  const population = {
    value: getValue(dataFiltered as IndicatorDataType[], 'Population, total'),
    year: getYear(dataFiltered as IndicatorDataType[], 'Population, total'),
    annualGrowth: getAnnualGrowth(dataFiltered as IndicatorDataType[], 'Population, total'),
  };
  const gdp = {
    value: getValue(dataFiltered as IndicatorDataType[], 'GDP per capita, PPP (current international $)'),
    year: getYear(dataFiltered as IndicatorDataType[], 'GDP per capita, PPP (current international $)'),
    annualGrowth: getAnnualGrowth(dataFiltered as IndicatorDataType[], 'GDP per capita, PPP (current international $)'),
  };
  const hdi = {
    value: getValue(dataFiltered as IndicatorDataType[], 'Human development index (HDI)'),
    year: getYear(dataFiltered as IndicatorDataType[], 'Human development index (HDI)'),
  };
  const gii = {
    value: getValue(dataFiltered as IndicatorDataType[], 'Gender Inequality Index-Gender Inequality Index'),
    year: getYear(dataFiltered as IndicatorDataType[], 'Gender Inequality Index-Gender Inequality Index'),
  };
  const gini = {
    value: getValue(dataFiltered as IndicatorDataType[], 'GINI index (World Bank estimate)'),
    year: getYear(dataFiltered as IndicatorDataType[], 'GINI index (World Bank estimate)'),
  };
  const ghg = {
    value: getValue(dataFiltered as IndicatorDataType[], 'GHG emission'),
    year: getYear(dataFiltered as IndicatorDataType[], 'GHG emission'),
    annualGrowth: getAnnualGrowth(dataFiltered as IndicatorDataType[], 'GHG emission'),
  };
  return (
    <div className='margin-bottom-13'>
      <div className='flex-div flex-space-between flex-wrap margin-bottom-07 flex-vert-align-center'>
        <h4 className='undp-typography bold margin-bottom-00'>
          Selected Indicators for
          {' '}
          {countryName}
        </h4>
        <button className='undp-button button-primary' type='button' onClick={() => { setModalVisibility(true); }}>
          {
            window.innerWidth < 600 ? '</>' : 'Embed'
          }
        </button>
      </div>
      <div className='flex-div flex-wrap stat-container'>
        {
          population.value
            ? (
              <div className='stat-card' style={{ width: 'calc(33.33% - 4.67rem)', minWidth: '20rem' }}>
                <div>
                  <h3>{format('.3s')(population.value).replace('G', 'B')}</h3>
                  {
                      population.annualGrowth ? (
                        <p className='bold large-font' style={{ color: population.annualGrowth < 0 ? 'var(--dark-red)' : 'var(--dark-green)' }}>
                          Annual Growth:
                          {' '}
                          {population.annualGrowth.toFixed(2)}
                          %
                        </p>
                      ) : null
                    }
                </div>
                <p className='small-font' style={{ color: 'var(--gray-500)' }}>{population.year}</p>
                <p>{indicators[indicators.findIndex((el) => el.DataKey === 'Population, total')].IndicatorLabelTable}</p>
              </div>
            ) : null
        }
        {
          gdp.value
            ? (
              <div className='stat-card' style={{ width: 'calc(33.33% - 4.67rem)', minWidth: '20rem' }}>
                <div>
                  <h3>{format('.3s')(gdp.value)}</h3>
                  {
                      gdp.annualGrowth ? (
                        <p className='bold large-font' style={{ color: gdp.annualGrowth < 0 ? 'var(--dark-red)' : 'var(--dark-green)' }}>
                          Annual Growth:
                          {' '}
                          {gdp.annualGrowth.toFixed(2)}
                          %
                        </p>
                      ) : null
                    }
                </div>
                <p className='small-font' style={{ color: 'var(--gray-500)' }}>{gdp.year}</p>
                <p>{indicators[indicators.findIndex((el) => el.DataKey === 'GDP per capita, PPP (current international $)')].IndicatorLabelTable}</p>
              </div>
            ) : null
        }
        {
          hdi.value
            ? (
              <div className='stat-card' style={{ width: 'calc(33.33% - 4.67rem)', minWidth: '20rem' }}>
                <div>
                  <h3>{hdi.value}</h3>
                  <p className='bold large-font' style={{ color: hdi.value >= 0.7 ? 'var(--dark-green)' : hdi.value >= 0.55 ? 'var(--dark-yellow)' : 'var(--dark-red)' }}>
                    {hdi.value >= 0.8 ? 'Very High' : hdi.value >= 0.7 ? 'High' : hdi.value >= 0.55 ? 'Medium' : 'Low'}
                  </p>
                </div>
                <p className='small-font' style={{ color: 'var(--gray-500)' }}>{hdi.year}</p>
                <p>{indicators[indicators.findIndex((el) => el.DataKey === 'Human development index (HDI)')].IndicatorLabelTable}</p>
              </div>
            ) : null
        }
        {
          gii.value
            ? (
              <div className='stat-card' style={{ width: 'calc(33.33% - 4.67rem)', minWidth: '20rem' }}>
                <div>
                  <h3>{gii.value}</h3>
                  <p className='bold large-font' style={{ color: gii.value <= 0.45 ? 'var(--dark-green)' : gii.value <= 0.72 ? 'var(--dark-yellow)' : 'var(--dark-red)' }}>
                    {gii.value <= 0.45 ? 'High Equality' : gii.value <= 0.72 ? 'Medium Equality' : 'Low Equality'}
                  </p>
                </div>
                <p className='small-font' style={{ color: 'var(--gray-500)' }}>{gii.year}</p>
                <p>{indicators[indicators.findIndex((el) => el.DataKey === 'Gender Inequality Index-Gender Inequality Index')].IndicatorLabelTable}</p>
              </div>
            ) : null
        }
        {
          gini.value
            ? (
              <div className='stat-card' style={{ width: 'calc(33.33% - 4.67rem)', minWidth: '20rem' }}>
                <div>
                  <h3>{gini.value}</h3>
                  <p className='bold large-font' style={{ color: gini.value > 50 ? 'var(--dark-red)' : gini.value > 45 ? 'var(--light-red)' : gini.value > 40 ? 'var(--dark-yellow)' : gini.value > 30 ? 'var(--light-green)' : 'var(--dark-green)' }}>
                    {gini.value > 50 ? 'Very High Inequality' : gini.value > 45 ? 'High Inequality' : gini.value > 40 ? 'Medium Inequality' : gini.value > 30 ? 'Low Inequality' : 'Very Low Inequality'}
                  </p>
                </div>
                <p className='small-font' style={{ color: 'var(--gray-500)' }}>{gini.year}</p>
                <p>{indicators[indicators.findIndex((el) => el.DataKey === 'GINI index (World Bank estimate)')].IndicatorLabelTable}</p>
              </div>
            ) : null
        }
        {
          ghg.value
            ? (
              <div className='stat-card' style={{ width: 'calc(33.33% - 4.67rem)', minWidth: '20rem' }}>
                <div>
                  <h3>{ghg.value}</h3>
                  {
                      ghg.annualGrowth ? (
                        <p className='bold large-font' style={{ color: ghg.annualGrowth >= 0 ? 'var(--dark-red)' : 'var(--dark-green)' }}>
                          Annual Growth:
                          {' '}
                          {ghg.annualGrowth.toFixed(2)}
                          %
                        </p>
                      ) : null
                    }
                </div>
                <p className='small-font' style={{ color: 'var(--gray-500)' }}>{ghg.year}</p>
                <p>{indicators[indicators.findIndex((el) => el.DataKey === 'GHG emission')].IndicatorLabelTable}</p>
              </div>
            ) : null
        }
      </div>
      <Modal
        open={modalVisibility}
        className='undp-modal'
        title='Embed Code'
        onOk={() => { setModalVisibility(false); }}
        onCancel={() => { setModalVisibility(false); }}
        width='75%'
      >
        <GetEmbedParamsForCountrySummary />
      </Modal>
    </div>
  );
};
