import { CSVLink } from 'react-csv';
import { CountryGroupDataType, IndicatorMetaDataWithYear } from '../Types';
import DownloadExcel from './DownloadExcel';

interface Props {
  indicatorData: IndicatorMetaDataWithYear;
  data: CountryGroupDataType[];
}

const dataTable = (data: CountryGroupDataType[], indicator: IndicatorMetaDataWithYear) => {
  const table: any = [];
  data.forEach((d) => {
    const country = d['Country or Area'];
    const countryCode = d['Alpha-3 code'];
    indicator.years.forEach((year) => {
      if (d.indicators.findIndex((ind) => ind.indicator === indicator.DataKey) !== -1) {
        const indicatorIndex = d.indicators.findIndex((ind) => ind.indicator === indicator.DataKey);
        if (indicatorIndex !== -1) {
          const yearIndex = d.indicators[indicatorIndex].yearlyData.findIndex((yr) => year === yr.year);
          const value = d.indicators[indicatorIndex].yearlyData[yearIndex]?.value;
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

const dataTableForExcel = (data: CountryGroupDataType[], indicator: IndicatorMetaDataWithYear) => {
  const table: any = [];
  data.forEach((d) => {
    const country = d['Country or Area'];
    const countryCode = d['Alpha-3 code'];
    indicator.years.forEach((year) => {
      if (d.indicators.findIndex((ind) => ind.indicator === indicator.DataKey) !== -1) {
        const indicatorIndex = d.indicators.findIndex((ind) => ind.indicator === indicator.DataKey);
        if (indicatorIndex !== -1) {
          const yearIndex = d.indicators[indicatorIndex].yearlyData.findIndex((yr) => year === yr.year);
          const value = d.indicators[indicatorIndex].yearlyData[yearIndex]?.value;
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

export const DataSourceListItem = (props: Props) => {
  const {
    indicatorData,
    data,
  } = props;

  return (
    <div className='padding-top-07 padding-bottom-05'>
      <h5 className='bold undp-typography'>{indicatorData.IndicatorLabelTable}</h5>
      <div className='flex-div margin-bottom-07' style={{ alignItems: 'baseline' }}>
        <h6 className='undp-typography margin-top-00 margin-bottom-00' style={{ width: '15%', flexShrink: 0 }}>Description</h6>
        <div>{indicatorData.IndicatorDescription}</div>
      </div>
      <div className='flex-div margin-bottom-07' style={{ alignItems: 'baseline' }}>
        <h6 className='undp-typography margin-top-00 margin-bottom-00' style={{ width: '15%', flexShrink: 0 }}>Years Available</h6>
        <div className='flex-div flex-wrap'>{indicatorData.years.map((d) => <div className='undp-chip undp-chip-small'>{d}</div>)}</div>
      </div>
      <div className='flex-div margin-bottom-07' style={{ alignItems: 'baseline' }}>
        <h6 className='undp-typography margin-top-00 margin-bottom-00' style={{ width: '15%', flexShrink: 0 }}>Data By</h6>
        <div>{indicatorData.DataSourceName}</div>
      </div>
      <div className='flex-div margin-bottom-07' style={{ alignItems: 'baseline' }}>
        <h6 className='undp-typography margin-top-00 margin-bottom-00' style={{ width: '15%', flexShrink: 0 }}>Data Link</h6>
        {
          indicatorData.DataSourceLink !== ''
            ? (
              <div>
                {
                  indicatorData.DataSourceLink.split(';').map((d, i) => (
                    <div key={i}>
                      <a href={d} target='_blank' rel='noreferrer' className='undp-style'>
                        {d}
                      </a>
                    </div>
                  ))
                }
              </div>
            )
            : <div />
        }
      </div>
      <div className='flex-div margin-bottom-00 gap-07'>
        <DownloadExcel
          data={dataTableForExcel(data, indicatorData)}
          indicatorTitle={indicatorData.Indicator}
        />
        <CSVLink
          headers={
          [
            { label: 'Country or Area', key: 'country' },
            { label: 'Alpha-3 code', key: 'countryCode' },
            { label: 'Year', key: 'year' },
            { label: indicatorData.Indicator, key: 'value' },
          ]
        }
          enclosingCharacter=''
          separator=';'
          data={dataTable(data, indicatorData)}
          filename={`${indicatorData.Indicator.replaceAll(',', '').replaceAll('.', ' ')}.csv`}
          asyncOnClick
          target='_blank'
        >
          <div className='undp-button button-tertiary button-arrow'>
            Download Data as CSV
          </div>
        </CSVLink>
      </div>
    </div>
  );
};
