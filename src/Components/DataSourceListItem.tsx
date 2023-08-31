import { CSVLink } from 'react-csv';
import flattenDeep from 'lodash.flattendeep';
import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import orderBy from 'lodash.orderby';
import { CountryGroupDataType, IndicatorMetaDataType } from '../Types';
import DownloadExcel from './DownloadExcel';
import { GetYearsArray } from '../Utils/GetYearsArray';

interface Props {
  indicatorData: IndicatorMetaDataType;
  data: CountryGroupDataType[];
}

const dataTable = (
  data: CountryGroupDataType[],
  indicator: IndicatorMetaDataType,
) => {
  const table: any = [];
  data.forEach(d => {
    const country = d['Country or Area'];
    const countryCode = d['Alpha-3 code'];
    GetYearsArray(data, indicator).forEach(year => {
      if (
        d.indicators.findIndex(ind => ind.indicator === indicator.DataKey) !==
        -1
      ) {
        const indicatorIndex = d.indicators.findIndex(
          ind => ind.indicator === indicator.DataKey,
        );
        if (indicatorIndex !== -1) {
          const yearIndex = d.indicators[indicatorIndex].yearlyData.findIndex(
            yr => year === yr.year,
          );
          const value =
            d.indicators[indicatorIndex].yearlyData[yearIndex]?.value;
          table.push({
            country,
            countryCode,
            year,
            value,
          });
        }
      }
    });
  });
  return table;
};

const dataTableForExcel = (
  data: CountryGroupDataType[],
  indicator: IndicatorMetaDataType,
) => {
  const table: any = [];
  const yrs: number[][] = [];
  data.forEach(d => {
    const indicatorIndx = d.indicators.findIndex(
      el => el.indicator === indicator.DataKey,
    );
    if (indicatorIndx !== -1) {
      const yrsArray = d.indicators[indicatorIndx].yearlyData.map(
        el => el.year,
      );
      yrs.push(yrsArray);
    }
  });
  const yearList = orderBy(
    uniqBy(flattenDeep(yrs), el => el),
    el => el,
  );
  data.forEach(d => {
    const country = d['Country or Area'];
    const countryCode = d['Alpha-3 code'];
    yearList.forEach(year => {
      if (
        d.indicators.findIndex(ind => ind.indicator === indicator.DataKey) !==
        -1
      ) {
        const indicatorIndex = d.indicators.findIndex(
          ind => ind.indicator === indicator.DataKey,
        );
        if (indicatorIndex !== -1) {
          const yearIndex = d.indicators[indicatorIndex].yearlyData.findIndex(
            yr => year === yr.year,
          );
          const value =
            d.indicators[indicatorIndex].yearlyData[yearIndex]?.value;
          table.push({
            country,
            countryCode,
            year,
            value,
          });
        }
      }
    });
  });
  return table;
};

export function DataSourceListItem(props: Props) {
  const { indicatorData, data } = props;
  return (
    <div className='padding-top-07 padding-bottom-05'>
      <h5 className='bold undp-typography'>
        {indicatorData.IndicatorLabelTable}
      </h5>
      <div
        className='flex-div margin-bottom-07'
        style={{ alignItems: 'baseline' }}
      >
        <h6
          className='undp-typography margin-top-00 margin-bottom-00'
          style={{ width: '15%', flexShrink: 0 }}
        >
          Description
        </h6>
        <div>{indicatorData.IndicatorDescription}</div>
      </div>
      <div
        className='flex-div margin-bottom-07'
        style={{ alignItems: 'baseline' }}
      >
        <h6
          className='undp-typography margin-top-00 margin-bottom-00'
          style={{ width: '15%', flexShrink: 0 }}
        >
          Years Available
        </h6>
        <div className='flex-div flex-wrap'>
          {GetYearsArray(data, indicatorData).map((d, i) => (
            <div className='undp-chip undp-chip-small' key={i}>
              {d}
            </div>
          ))}
        </div>
      </div>
      <div
        className='flex-div margin-bottom-07'
        style={{ alignItems: 'baseline' }}
      >
        <h6
          className='undp-typography margin-top-00 margin-bottom-00'
          style={{ width: '15%', flexShrink: 0 }}
        >
          Data By
        </h6>
        <div>{indicatorData.DataSourceName}</div>
      </div>
      <div
        className='flex-div margin-bottom-07'
        style={{ alignItems: 'baseline' }}
      >
        <h6
          className='undp-typography margin-top-00 margin-bottom-00'
          style={{ width: '15%', flexShrink: 0 }}
        >
          Data Link
        </h6>
        {indicatorData.DataSourceLink !== '' ? (
          <div>
            {indicatorData.DataSourceLink.split(';').map((d, i) => (
              <div key={i}>
                <a
                  href={d}
                  target='_blank'
                  rel='noreferrer'
                  className='undp-style'
                >
                  {d}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className='flex-div margin-bottom-00 gap-07'>
        <DownloadExcel
          data={dataTableForExcel(data, indicatorData)}
          indicatorTitle={indicatorData.IndicatorLabelTable}
        />
        <CSVLink
          headers={[
            { label: 'Country or Area', key: 'country' },
            { label: 'Alpha-3 code', key: 'countryCode' },
            { label: 'Year', key: 'year' },
            { label: indicatorData.IndicatorLabelTable, key: 'value' },
          ]}
          enclosingCharacter=''
          separator=';'
          data={dataTable(data, indicatorData)}
          filename={`${indicatorData.IndicatorLabelTable.replaceAll(
            ',',
            '',
          ).replaceAll('.', ' ')}.csv`}
          asyncOnClick
          target='_blank'
          style={{ backgroundImage: 'none' }}
        >
          <div className='undp-button button-tertiary button-arrow'>
            Download Data as CSV
          </div>
        </CSVLink>
      </div>
    </div>
  );
}

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

export function DataSourceListMinifiedItem(props: Props) {
  const { indicatorData, data } = props;
  return (
    <div
      className='margin-bottom-05'
      style={{
        backgroundColor: 'var(--gray-200)',
        padding:
          'var(--spacing-07) var(--spacing-05) var(--spacing-07) var(--spacing-07)',
      }}
    >
      <p className='undp-typography'>{indicatorData.IndicatorLabelTable}</p>
      <div className='flex-div margin-bottom-00 gap-05'>
        <DownloadExcel
          minified
          data={dataTableForExcel(data, indicatorData)}
          indicatorTitle={indicatorData.IndicatorLabelTable}
        />
        <CSVLink
          headers={[
            { label: 'Country or Area', key: 'country' },
            { label: 'Alpha-3 code', key: 'countryCode' },
            { label: 'Year', key: 'year' },
            { label: indicatorData.IndicatorLabelTable, key: 'value' },
          ]}
          enclosingCharacter=''
          separator=';'
          data={dataTable(data, indicatorData)}
          filename={`${indicatorData.IndicatorLabelTable.replaceAll(
            ',',
            '',
          ).replaceAll('.', ' ')}.csv`}
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
