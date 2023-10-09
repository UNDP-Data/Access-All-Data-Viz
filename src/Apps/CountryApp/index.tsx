import { Tabs } from 'antd';
import flattenDeep from 'lodash.flattendeep';
import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { CountryHomePageForCountryPage } from '../../CountryPage';
import { SDGDataExplorer } from '../../CountryPage/SDGDataExplorer';
import { CountryAboutPage } from '../../AboutPage/CountryAboutPage';
import { COUNTRYTAXONOMYLINK } from '../../Constants';
import { SubNationalVisualization } from '../../CountryPage/SubNationalVisualization';
import { SDGTracker } from '../../CountryPage/SDGTracker';
import { CountryTaxonomyDataType } from '../../Types';
import { SUB_NATIONAL_DATA_OPTIONS } from '../../SubNationalDataOptions';
import { CountryHDIViz } from './CountryHDIViz';

interface CountryProps {
  countryId?: string;
}

export function CountryApp(props: CountryProps) {
  const { countryId } = props;
  const countryList = flattenDeep(
    SUB_NATIONAL_DATA_OPTIONS.map(d => d.countries),
  );
  const [countryData, setCountryData] = useState<
    CountryTaxonomyDataType[] | undefined
  >(undefined);
  const mainTabs =
    countryList.indexOf(countryId || 'AFG') !== -1
      ? [
          {
            key: 'dataExplorer',
            label: 'Data Explorer',
            children: (
              <CountryHomePageForCountryPage countryId={countryId || 'AFG'} />
            ),
          },
          {
            key: 'subNationalVisualization',
            label: 'Sub National Data',
            children: (
              <SubNationalVisualization countryId={countryId || 'AFG'} />
            ),
          },
          {
            key: 'sdgTracker',
            label: 'SDG Tracker',
            children: <SDGTracker countryId={countryId || 'AFG'} />,
          },
          {
            key: 'sdgDataExplorer',
            label: 'SDG Data Explorer',
            children: <SDGDataExplorer countryId={countryId || 'AFG'} />,
          },
          {
            key: 'about',
            label: 'About',
            children: <CountryAboutPage countryId={countryId || 'AFG'} />,
          },
        ]
      : [
          {
            key: 'dataExplorer',
            label: 'Data Explorer',
            children: (
              <CountryHomePageForCountryPage countryId={countryId || 'AFG'} />
            ),
          },
          {
            key: 'sdgTracker',
            label: 'SDG Tracker',
            children: <SDGTracker countryId={countryId || 'AFG'} />,
          },
          {
            key: 'sdgDataExplorer',
            label: 'SDG Data Explorer',
            children: <SDGDataExplorer countryId={countryId || 'AFG'} />,
          },
          {
            key: 'about',
            label: 'About',
            children: <CountryAboutPage countryId={countryId || 'AFG'} />,
          },
        ];
  useEffect(() => {
    queue()
      .defer(json, COUNTRYTAXONOMYLINK)
      .await(
        (err: any, countryTaxonomyDataFromFile: CountryTaxonomyDataType[]) => {
          if (err) throw err;
          setCountryData(countryTaxonomyDataFromFile);
        },
      );
  }, []);
  return (
    <div className='undp-container'>
      {countryData ? (
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
              <Tabs
                defaultActiveKey='dataExplorer'
                className='undp-tabs subhead-tabs'
                items={mainTabs.map(d => ({
                  label: d.label,
                  key: d.key,
                  children: d.children,
                }))}
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
