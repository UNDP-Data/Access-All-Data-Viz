import { Pagination, PaginationProps } from 'antd';
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useState, useEffect } from 'react';
import { LoginBannerForTabs } from '../Components/LoginBannerForTabs';
import { SIGNAL_ACCESS_CODE, SIGNAL_API_LINK } from './Constants';
import { ChoicesDataType, SignalDataType } from './Types';
import { CardList } from './CardList';

interface Props {
  loginState: boolean;
  id: string;
  link: string;
  type: 'signatureSolution' | 'region' | 'country';
}

export function SignalsPage(props: Props) {
  const { loginState, id, link, type } = props;
  const [paginationValue, setPaginationValue] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [signalList, setSignalList] = useState<undefined | SignalDataType[]>(
    undefined,
  );
  const [choices, setChoices] = useState<undefined | ChoicesDataType>(
    undefined,
  );

  const GetURL = (queryParameter: string) => {
    const linkQueryParameter = `&${queryParameter}=${id.replaceAll(
      ' ',
      '%20',
    )}`;
    const urlForListing = `${SIGNAL_API_LINK}signals/list?page=${paginationValue}&per_page=${pageSize}${linkQueryParameter}&statuses=Approved`;
    return urlForListing;
  };

  useEffect(() => {
    axios
      .get('https://signals-and-trends-api.azurewebsites.net/v1/choices/list', {
        headers: {
          access_token: SIGNAL_ACCESS_CODE,
        },
      })
      .then((response: AxiosResponse) => {
        setChoices(response.data);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setSignalList([]);
          setTotalCount(0);
        } else {
          setError(
            `Error code ${err.response?.status}: ${err.response?.data}. ${
              err.response?.status === 500
                ? 'Please try again in some time'
                : ''
            }`,
          );
        }
      });
  }, []);
  useEffect(() => {
    setSignalList(undefined);
    axios
      .get(
        GetURL(
          type === 'signatureSolution'
            ? 'signature_primary'
            : type === 'region'
            ? 'bureau'
            : 'location',
        ),
        {
          headers: {
            access_token: SIGNAL_ACCESS_CODE,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setSignalList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        );
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setSignalList([]);
          setTotalCount(0);
        } else {
          setError(
            `Error code ${err.response?.status}: ${err.response?.data}. ${
              err.response?.status === 500
                ? 'Please try again in some time'
                : ''
            }`,
          );
        }
      });
  }, [paginationValue]);
  useEffect(() => {
    setError(undefined);
    setSignalList(undefined);
    axios
      .get(
        GetURL(
          type === 'signatureSolution'
            ? 'signature_primary'
            : type === 'region'
            ? 'bureau'
            : 'location',
        ),
        {
          headers: {
            access_token: SIGNAL_ACCESS_CODE,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setSignalList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        );
        setTotalCount(response.data.total_count);
        setPaginationValue(1);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setSignalList([]);
          setTotalCount(0);
        } else {
          setError(
            `Error code ${err.response?.status}: ${err.response?.data}. ${
              err.response?.status === 500
                ? 'Please try again in some time'
                : ''
            }`,
          );
        }
      });
  }, [pageSize]);
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
  };
  return (
    <div className='undp-container max-width-1980'>
      {loginState ? (
        <>
          <div className='padding-left-06 padding-right-06'>
            <div
              className='margin-top-07 flex-div flex-wrap flex-vert-align-center flex-space-between'
              style={{
                padding: '1.25rem',
                backgroundColor: 'var(--gray-200)',
                border: '1px solid var(--gray-300)',
                borderRadius: '0.25rem',
              }}
            >
              <h5 className='undp-typography margin-bottom-00'>
                Explore the UNDP Signal and Trend System to learn more
              </h5>
              <a
                href='https://signals.data.undp.org/'
                className='undp-button button-primary button-arrow'
                style={{
                  textDecoration: 'none',
                  width: 'fit-content',
                }}
              >
                Visit UNDP Signals & Trends
              </a>
            </div>
          </div>
          <div className='margin-bottom-09' style={{ padding: '0 1rem' }}>
            {signalList && totalCount !== undefined && choices ? (
              <div>
                <div
                  className='margin-bottom-05 margin-top-05 flex-div'
                  style={{
                    padding: '1rem',
                    backgroundColor: 'var(--gray-200)',
                    justifyContent: 'center',
                    width: 'calc(100% - 2rem)',
                    alignItems: 'center',
                  }}
                >
                  <div className='bold'>
                    {`${totalCount}${
                      type === 'signatureSolution' ? ` ${id} related` : ''
                    } signal${totalCount > 1 ? 's' : ''} available${
                      type === 'signatureSolution' ? '' : ` in ${id}`
                    }`}
                  </div>
                </div>
                <div className='flex-div flex-wrap listing'>
                  {signalList.length > 0 ? (
                    <CardList data={signalList} choices={choices} />
                  ) : null}
                </div>
                {signalList.length > 0 ? (
                  <div className='flex-div flex-hor-align-center margin-top-07'>
                    <Pagination
                      className='undp-pagination'
                      onChange={e => {
                        setPaginationValue(e);
                      }}
                      defaultCurrent={1}
                      current={paginationValue}
                      total={totalCount}
                      pageSize={pageSize}
                      showSizeChanger
                      onShowSizeChange={onShowSizeChange}
                    />
                  </div>
                ) : null}
              </div>
            ) : error ? (
              <p
                className='margin-top-00 margin-bottom-00'
                style={{ color: 'var(--dark-red)' }}
              >
                {error}
              </p>
            ) : (
              <div className='undp-loader-container'>
                <div className='undp-loader' />
              </div>
            )}
          </div>
        </>
      ) : (
        <LoginBannerForTabs link={link} />
      )}
    </div>
  );
}
