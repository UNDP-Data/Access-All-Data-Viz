import { useEffect, useState } from 'react';
import { json } from 'd3-request';
import { SDGDATASOURCELINK } from '../../Constants';
import {
  CountryDataType,
  StatusesType,
  TimeSeriesDataTypeWithStatusCode,
} from '../../Types';
import { SDGTrackerViz } from './SDGTrackerViz';

interface Props {
  countryId: string;
}

export function SDGTracker(props: Props) {
  const { countryId } = props;
  const [statuses, setStatuses] = useState<StatusesType | undefined>(undefined);
  const [countryData, setCountryData] = useState<
    TimeSeriesDataTypeWithStatusCode[] | undefined
  >(undefined);
  useEffect(() => {
    setStatuses(undefined);
    json(
      `${SDGDATASOURCELINK}/${countryId}.json`,
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
          <SDGTrackerViz targetStatuses={statuses.targetStatus} />
          <p
            className='undp-typography small-font italics'
            style={{ textAlign: 'center' }}
          >
            For more information on the data and methodology visit:{' '}
            <a
              href={`https://sdgdiagnostics.data.undp.org/${countryId}/sdg-trends`}
              className='undp-style small-font'
            >
              SDG Push Diagnostics
            </a>
          </p>
        </>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
