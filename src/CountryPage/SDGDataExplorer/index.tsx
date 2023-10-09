import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { json } from 'd3-request';
import { SDGGapsData } from './SDGGapsData';
import { SDGDATASOURCELINK, SDG_GOALS } from '../../Constants';
import {
  CountryDataType,
  StatusesType,
  TimeSeriesDataTypeWithStatusCode,
} from '../../Types';

interface Props {
  countryId: string;
}

export function SDGDataExplorer(props: Props) {
  const { countryId } = props;
  const [statuses, setStatuses] = useState<StatusesType | undefined>(undefined);
  const [countryData, setCountryData] = useState<
    TimeSeriesDataTypeWithStatusCode[] | undefined
  >(undefined);
  const [selectedSDG, setSelectedSDG] = useState('SDG 1: No Poverty');
  useEffect(() => {
    setStatuses(undefined);
    json(
      `${SDGDATASOURCELINK}/data/CountryData/${countryId}.json`,
      (err: any, d: CountryDataType) => {
        if (err) throw err;
        setCountryData(
          d.tsData.map(el => ({
            ...el,
            statusCode:
              el.status === 'On Track' || el.status === 'Target Achieved'
                ? 4
                : el.status === 'Fair progress but acceleration needed' ||
                  el.status === 'Target Not Achieved'
                ? 3
                : el.status === 'Limited or No Progress'
                ? 2
                : el.status === 'Deterioration'
                ? 1
                : 5,
          })),
        );
        const SDGs = [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        ];
        const goalStatus = SDGs.map(sdg =>
          d.goalStatus.findIndex(g => g.goal === sdg) !== -1
            ? d.goalStatus[d.goalStatus.findIndex(g => g.goal === sdg)]
            : {
                goal: sdg,
                noOfIndicatorsWithData: 0,
                status: null,
              },
        );
        setStatuses({
          goalStatus,
          targetStatus: d.targetStatus,
          indicatorStatus: d.indicatorStatus,
        });
      },
    );
  }, [countryId]);
  return (
    <div>
      {countryData && statuses ? (
        <>
          <div
            className='margin-bottom-07'
            style={{
              backgroundColor: 'var(--gray-400)',
            }}
          >
            <div
              className='flex-div gap-03 flex-vert-align-center max-width-1980'
              style={{ padding: 'var(--spacing-06)' }}
            >
              <h5
                className='undp-typography margin-bottom-00'
                style={{ flexShrink: 0 }}
              >
                Explore Data for
              </h5>
              <Select
                className='undp-select'
                placeholder='Select A Country'
                style={{ flexGrow: 0 }}
                showSearch
                value={selectedSDG}
                onChange={d => {
                  setSelectedSDG(d);
                }}
              >
                {SDG_GOALS.map((d, i) => (
                  <Select.Option
                    className='undp-select-option'
                    value={d}
                    key={i}
                  >
                    {d === 'All' ? 'All Signature Solutions' : d}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <SDGGapsData
            statusData={statuses}
            selectedSDG={selectedSDG}
            countryData={countryData}
          />
        </>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
