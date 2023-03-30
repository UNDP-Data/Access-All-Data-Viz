import { useContext, useState } from 'react';
import sortBy from 'lodash.sortby';
import { format } from 'd3-format';
import { Input, Select } from 'antd';
import {
  CountryGroupDataType,
  CountryListType,
  CtxDataType,
  IndicatorMetaDataWithYear,
} from '../../Types';
import Context from '../../Context/Context';
import { TrendChartSmall } from './TrendChartSmall';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
  countries: CountryListType[];
}

export const DataList = (props: Props) => {
  const {
    data,
    indicators,
    countries,
  } = props;
  const {
    selectedCountryOrRegion,
    dataListCountry,
    signatureSolutionForDataList,
    updateDataListCountry,
  } = useContext(Context) as CtxDataType;
  const [search, updateSearch] = useState<string | undefined>(undefined);
  const filteredIndicatorsBySearch = search ? indicators.filter((d) => d.IndicatorLabelTable.toLowerCase().includes(search || '')) : indicators;
  const filteredIndicators = signatureSolutionForDataList === 'All' ? filteredIndicatorsBySearch : filteredIndicatorsBySearch.filter((d) => d.SignatureSolution.indexOf(signatureSolutionForDataList) !== -1);
  const countryName = selectedCountryOrRegion ? countries[countries.findIndex((d) => d.code === selectedCountryOrRegion)].name : dataListCountry;
  const dataFilteredByCountry = selectedCountryOrRegion
    ? data.filter((d) => d['Alpha-3 code'] === selectedCountryOrRegion)[0].indicators.map((d) => ({ ...d, yearlyData: sortBy(d.yearlyData.filter((el) => el.value !== undefined), 'year') }))
    : dataListCountry
      ? data.filter((d) => d['Country or Area'] === dataListCountry)[0].indicators.map((d) => ({ ...d, yearlyData: sortBy(d.yearlyData.filter((el) => el.value !== undefined), 'year') }))
      : undefined;
  const dataFiltered = signatureSolutionForDataList === 'All' || dataFilteredByCountry === undefined
    ? dataFilteredByCountry
    : dataFilteredByCountry.filter((d) => filteredIndicators.findIndex((el) => el.DataKey === d.indicator) !== -1);
  const dataFilteredByMetaData = dataFiltered?.filter((d) => indicators.findIndex((el) => el.DataKey === d.indicator) !== -1);
  return (
    <>
      {
        (selectedCountryOrRegion || dataListCountry) && dataFilteredByMetaData && countryName
          ? (
            <>
              <div style={{
                padding: 'var(--spacing-06)', backgroundColor: 'var(--white)', borderBottom: '1px solid var(--gray-400)', position: 'sticky', top: 0,
              }}
              >
                <Input
                  className='undp-input'
                  placeholder='Search an indicator'
                  onChange={(d) => { updateSearch(d.target.value); }}
                  value={search}
                />
              </div>
              <div>
                <div className='undp-table-head undp-table-head-sticky' style={{ top: '101px' }}>
                  <div style={{ width: '50%' }} className='undp-table-head-cell undp-sticky-head-column'>
                    Indicator
                  </div>
                  <div style={{ width: '20%' }} className='undp-table-head-cell undp-sticky-head-column align-right'>
                    Recent Value
                  </div>
                  <div style={{ width: '30%' }} className='undp-table-head-cell undp-sticky-head-column'>
                    Trend
                  </div>
                </div>
                {
                  sortBy(dataFilteredByMetaData.filter((d) => (search ? indicators[indicators.findIndex((el) => el.DataKey === d.indicator)].IndicatorLabelTable.toLowerCase().includes(search.toLowerCase()) : d)), (d) => indicators[indicators.findIndex((el) => el.DataKey === d.indicator)].IndicatorLabelTable).map((d, i) => (indicators.findIndex((el) => el.DataKey === d.indicator) !== -1
                    ? (
                      <div key={i} className='undp-table-row'>
                        <div style={{ width: '50%', fontSize: '1rem' }} className='undp-table-row-cell'>
                          {indicators[indicators.findIndex((el) => el.DataKey === d.indicator)].IndicatorLabelTable}
                        </div>
                        <div style={{ width: '20%' }} className='undp-table-row-cell align-right'>
                          {
                            d.yearlyData.length === 0 ? 'NA' : (
                              <>
                                <span className='bold'>
                                  {
                                    indicators[indicators.findIndex((el) => el.DataKey === d.indicator)].LabelPrefix ? `${indicators[indicators.findIndex((el) => el.DataKey === d.indicator)].LabelPrefix} ` : ''
                                  }
                                  {d.yearlyData[d.yearlyData.length - 1].value !== undefined ? (d.yearlyData[d.yearlyData.length - 1].value as number) < 1000000 ? format(',')(parseFloat((d.yearlyData[d.yearlyData.length - 1].value as number).toFixed(2))).replace(',', ' ') : format('.3s')(d.yearlyData[d.yearlyData.length - 1].value as number).replace('G', 'B') : d.yearlyData[d.yearlyData.length - 1].value }
                                  {
                                    indicators[indicators.findIndex((el) => el.DataKey === d.indicator)].LabelSuffix ? ` ${indicators[indicators.findIndex((el) => el.DataKey === d.indicator)].LabelSuffix}` : ''
                                  }
                                </span>
                                <br />
                                <span style={{ fontSize: '1rem', color: 'var(--gray-500)' }}>
                                  (
                                  {d.yearlyData[d.yearlyData.length - 1].year}
                                  )
                                </span>
                              </>
                            )
                          }
                        </div>
                        <div style={{ width: '30%' }} className='undp-table-row-cell'>
                          <TrendChartSmall
                            countryName={countryName}
                            data={d.yearlyData}
                            indicator={indicators[indicators.findIndex((el) => el.DataKey === d.indicator)]}
                          />
                        </div>
                      </div>
                    )
                    : null))
                }
              </div>
            </>
          ) : (
            <div className='center-area-info-el'>
              <h5 className='undp-typography'>Please select countries to see their trends</h5>
              <Select
                showSearch
                className='undp-select'
                placeholder='Please select a country'
                onChange={(d) => { updateDataListCountry(d); }}
                value={dataListCountry}
                maxTagCount='responsive'
              >
                {
                  countries.map((d) => d.name).map((d) => (
                    <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>
                  ))
                }
              </Select>
            </div>
          )
      }
    </>
  );
};
