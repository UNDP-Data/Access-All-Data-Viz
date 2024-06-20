import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { COUNTRYTAXONOMYLINK } from '../../Constants';
import { CountryTaxonomyDataType } from '../../Types';
import { CountryHDIViz } from './CountryHDIViz';
import { TabSection } from './TabSection';
import { CheckIfLoginOrNot } from '../../Utils/CheckIfLoginOrNot';
import { LoginBanner } from '../../Components/LoginBanner';

interface CountryProps {
  countryId?: string;
}

export function CountryApp(props: CountryProps) {
  const { countryId } = props;
  const [loginState, setLoginState] = useState<boolean | undefined>(undefined);
  const [countryData, setCountryData] = useState<
    CountryTaxonomyDataType[] | undefined
  >(undefined);
  useEffect(() => {
    queue()
      .defer(json, COUNTRYTAXONOMYLINK)
      .await(
        (err: any, countryTaxonomyDataFromFile: CountryTaxonomyDataType[]) => {
          if (err) throw err;
          setCountryData(countryTaxonomyDataFromFile);
          CheckIfLoginOrNot().then(d => {
            setLoginState(d);
          });
        },
      );
  }, []);
  return (
    <div className='undp-container'>
      {countryData && loginState !== undefined ? (
        <div>
          {countryData.findIndex(d => d['Alpha-3 code'] === countryId) ===
          -1 ? (
            <div
              style={{
                backgroundColor: 'var(--gray-300)',
                width: '100%',
              }}
            >
              <div
                style={{ padding: 'var(--spacing-06)' }}
                className='max-width-1980'
              >
                <h4
                  className='undp-typography margin-bottom-00'
                  style={{
                    fontFamily: 'SohneBreit,ProximaNova,sans-serif',
                    width: 'calc(100% - 3rem)',
                  }}
                >
                  We regret to inform you that the country you are inquiring
                  about cannot be ascertained within our current digital
                  framework. Our team is actively engaged in addressing this
                  matter.
                </h4>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: 'var(--gray-300)',
                  width: '100%',
                }}
              >
                <div
                  className='max-width-1980'
                  style={{
                    padding: 'var(--spacing-09) var(--spacing-06)',
                  }}
                >
                  <h2 className='undp-typography margin-bottom-00 page-title'>
                    {
                      countryData[
                        countryData.findIndex(
                          d => d['Alpha-3 code'] === countryId,
                        )
                      ]['Country or Area']
                    }
                  </h2>
                  {loginState ? null : (
                    <LoginBanner
                      link={`/countries-and-territories/${countryId}`}
                    />
                  )}
                  <CountryHDIViz
                    country={
                      countryData[
                        countryData.findIndex(
                          d => d['Alpha-3 code'] === countryId,
                        )
                      ]
                    }
                  />
                </div>
              </div>
              <TabSection
                countryId={countryId || 'AFG'}
                loginState={loginState}
              />
            </>
          )}
        </div>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
