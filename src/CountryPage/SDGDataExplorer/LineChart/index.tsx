import { useEffect, useRef, useState } from 'react';
import uniqBy from 'lodash.uniqby';
import { useParams } from 'react-router-dom';
import { Graph } from './Graph';
import { KEYS_TO_AVOID, SERIES_TAGS_LABELS } from '../../../Constants';
import { TimeSeriesDataTypeWithStatusCode } from '../../../Types';

interface Props {
  data: TimeSeriesDataTypeWithStatusCode;
}
export function LineChart(props: Props) {
  const { data } = props;
  const graphRef = useRef<HTMLDivElement>(null);
  const [graphWidth, setGraphWidth] = useState(0);
  const countryCode = useParams().country || 'ZAF';
  const values = uniqBy(data.values, 'year').filter(d => d.value !== null);
  useEffect(() => {
    if (graphRef.current) {
      setGraphWidth(graphRef.current.clientWidth);
    }
  }, [graphRef]);
  return (
    <div
      className='margin-bottom-05'
      style={{
        width: '85%',
        flexShrink: 0,
        minWidth: '20rem',
        maxWidth: '50rem',
        backgroundColor: 'var(--gray-100)',
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        scrollSnapAlign: 'start',
      }}
      ref={graphRef}
    >
      <div>
        <h6 className='undp-typography margin-top-05'>
          {data.seriesDescription}
        </h6>
        <div className='flex-div flex-wrap margin-bottom-07'>
          {Object.keys(data).map((d, i) => {
            if (KEYS_TO_AVOID.indexOf(d) !== -1) return null;
            return (
              <div
                className='undp-chip undp-chip-small'
                key={i}
                style={{
                  fontFamily:
                    'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                }}
              >
                {SERIES_TAGS_LABELS.findIndex(el => el.key === d) === -1
                  ? d
                  : SERIES_TAGS_LABELS[
                      SERIES_TAGS_LABELS.findIndex(el => el.key === d)
                    ].label}
                :{' '}
                {SERIES_TAGS_LABELS.findIndex(
                  el => el.key === (data as any)[d],
                ) === -1
                  ? !(data as any)[d] || (data as any)[d] === ''
                    ? 'NA'
                    : (data as any)[d]
                  : SERIES_TAGS_LABELS[
                      SERIES_TAGS_LABELS.findIndex(
                        el => el.key === (data as any)[d],
                      )
                    ].label}
              </div>
            );
          })}
          {data.status ? (
            <div
              className={`undp-chip undp-chip-small ${
                data.status === 'On Track' || data.status === 'Target Achieved'
                  ? 'undp-chip-green'
                  : data.status === 'Fair progress but acceleration needed'
                  ? 'undp-chip-yellow'
                  : data.status === 'Limited or No Progress' ||
                    data.status === 'Target Not Achieved'
                  ? 'undp-chip-red'
                  : data.status === 'Deterioration'
                  ? 'undp-chip-red'
                  : 'undp-chip-gray'
              }`}
            >
              {data.status === 'No Data After 2015'
                ? 'Insufficient Data: No Data after 2015'
                : data.status}
            </div>
          ) : null}
        </div>
      </div>
      <div>
        {!graphWidth ? (
          <div className='undp-loader' style={{ margin: 'auto' }} />
        ) : (
          <div>
            {values.length === 0 ? (
              <h6 className='undp-typography'>No Data Available</h6>
            ) : (
              <>
                <Graph svgWidth={graphWidth} data={data} />
                <div className='flex-div margin-top-05 margin-bottom-05'>
                  {data.methodology ? (
                    data.methodology.targetValue ? (
                      <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                        Target value: {data.methodology.targetValue}
                      </div>
                    ) : null
                  ) : null}
                  {data.methodology ? (
                    data.methodology.baseYear ? (
                      <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                        Base year: {data.methodology.baseYear}
                      </div>
                    ) : null
                  ) : null}
                </div>
                {data.series === '***' ||
                data['Custodian_Agency(ies)'] === 'Country Office' ? (
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    Data Source: Country office
                  </div>
                ) : (
                  <a
                    style={{ fontSize: '0.875rem', opacity: 0.7 }}
                    href={`https://unstats.un.org/sdgs/dataportal/countryprofiles/${countryCode}`}
                    className='undp-style margin-top-05'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Data Source: UNStats
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
