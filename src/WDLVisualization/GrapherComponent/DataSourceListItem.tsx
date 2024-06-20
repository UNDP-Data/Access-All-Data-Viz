import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import { useContext } from 'react';
import {
  CountryDisaggregatedDataType,
  CountryGroupDataType,
  GenderTypes,
} from '../Types';
import DownloadExcel from './DownloadExcel';
import Context from '../Context/Context';

const dataTable = (
  data: CountryGroupDataType[],
  ageRange: [number, number],
  incomeRange: [number, number],
  gender: GenderTypes,
) => {
  const table: any = [];
  data.forEach(d => {
    const country = d['Country or Area'];
    const countryCode = d['Alpha-3 code'];
    d.data.forEach(el => {
      table.push({
        country,
        countryCode,
        year: el.year,
        gender,
        incomeRange:
          incomeRange[1] === 999
            ? `> USD$ ${incomeRange[0]}`
            : `USD$ ${incomeRange[0]}-${incomeRange[0]}`,
        ageRange:
          ageRange[1] === 80
            ? `>${ageRange[0]}`
            : `${ageRange[0]}-${ageRange[0]}`,
        headCount: el.headcount,
        expenditure_nominal: el.expenditure_nominal,
        expenditure_ppp: el.expenditure_ppp,
        expenditure_nominal_per_capita: el.expenditure_nominal_per_capita,
        expenditure_ppp_per_capita: el.expenditure_ppp_per_capita,
        expenditure_nominal_daily: el.expenditure_nominal_daily,
        expenditure_ppp_daily: el.expenditure_ppp_daily,
        expenditure_nominal_per_capita_daily:
          el.expenditure_nominal_per_capita_daily,
        expenditure_ppp_per_capita_daily: el.expenditure_ppp_per_capita_daily,
      });
    });
  });
  return table;
};

const dataTableForDisaggregation = (data: CountryDisaggregatedDataType[]) => {
  const table: any = [];
  data.forEach(d => {
    const country = d['Country or Area'];
    const countryCode = d['Alpha-3 code'];
    d.disaggregation.forEach(el => {
      el.data.forEach(dt => {
        table.push({
          country,
          countryCode,
          year: dt.year,
          gender: el.gender,
          incomeRange:
            el.incomeRange[1] === 999
              ? `> USD$ ${el.incomeRange[0]}`
              : `USD$ ${el.incomeRange[0]}-${el.incomeRange[0]}`,
          ageRange:
            el.ageRange[1] === 80
              ? `>${el.ageRange[0]}`
              : `${el.ageRange[0]}-${el.ageRange[0]}`,
          headCount: dt.headcount,
          expenditure_nominal: dt.expenditure_nominal,
          expenditure_ppp: dt.expenditure_ppp,
          expenditure_nominal_per_capita: dt.expenditure_nominal_per_capita,
          expenditure_ppp_per_capita: dt.expenditure_ppp_per_capita,
          expenditure_nominal_daily: dt.expenditure_nominal_daily,
          expenditure_ppp_daily: dt.expenditure_ppp_daily,
          expenditure_nominal_per_capita_daily:
            dt.expenditure_nominal_per_capita_daily,
          expenditure_ppp_per_capita_daily: dt.expenditure_ppp_per_capita_daily,
        });
      });
    });
  });
  return table;
};

const MinifiedButton = styled.div`
  background-color: var(--gray-300);
  padding: var(--spacing-05);
  font-size: 0.875rem;
  font-weight: bold;
  color: var(--gray-700);
  border: 0;
  text-align: left;
  display: flex;
  gap: var(--spacing-05);
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--gray-400);
  }
`;

export function DataSourceListMinifiedItem() {
  const { data, ageRange, incomeRange, gender, graphType, disaggregatedData } =
    useContext(Context);
  return (
    <div
      className='margin-bottom-05'
      style={{
        backgroundColor: 'var(--gray-200)',
        padding:
          'var(--spacing-07) var(--spacing-05) var(--spacing-07) var(--spacing-07)',
      }}
    >
      <p className='undp-typography'>Download data</p>
      <div className='flex-div margin-bottom-00 gap-05'>
        <DownloadExcel
          data={
            graphType === 'disaggregation'
              ? dataTableForDisaggregation(disaggregatedData)
              : dataTable(data, ageRange, incomeRange, gender)
          }
        />
        <CSVLink
          headers={[
            { label: 'Country or Area', key: 'country' },
            { label: 'Alpha-3 code', key: 'countryCode' },
            { label: 'Year', key: 'year' },
            { label: 'Gender', key: 'gender' },
            { label: 'Age range', key: 'ageRange' },
            { label: 'Income range', key: 'incomeRange' },
            { label: 'headcount', key: 'headCount' },
            { label: 'Expenditure (nominal)', key: 'expenditure_nominal' },
            { label: 'Expenditure (US$ PPP)', key: 'expenditure_ppp' },
            {
              label: 'Expenditure per day (nominal)',
              key: 'expenditure_nominal_daily',
            },
            {
              label: 'Expenditure per day (US$ PPP)',
              key: 'expenditure_ppp_daily',
            },
            {
              label: 'Expenditure per capita (nominal)',
              key: 'expenditure_nominal_per_capita',
            },
            {
              label: 'Expenditure per capita (US$ PPP)',
              key: 'expenditure_ppp_per_capita',
            },
            {
              label: 'Expenditure per capita per day (nominal)',
              key: 'expenditure_nominal_per_capita_daily',
            },
            {
              label: 'Expenditure per capita per day (US$ PPP)',
              key: 'expenditure_ppp_per_capita_daily',
            },
          ]}
          enclosingCharacter=''
          separator=','
          data={
            graphType === 'disaggregation'
              ? dataTableForDisaggregation(disaggregatedData)
              : dataTable(data, ageRange, incomeRange, gender)
          }
          filename='data.csv'
          asyncOnClick
          target='_blank'
          style={{ backgroundImage: 'none' }}
        >
          <MinifiedButton>Download CSV</MinifiedButton>
        </CSVLink>
      </div>
    </div>
  );
}
