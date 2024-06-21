import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { SUBNATIONALMETADATALINK } from '../../Constants';
import { CountryAboutPage } from '../../AboutPage/CountryAboutPage';
import { SDGDataExplorer } from '../../CountryPage/SDGDataExplorer';
import { SDGTracker } from '../../CountryPage/SDGTracker';
import { SubNationalVisualization } from '../../CountryPage/SubNationalVisualization';
import { CountryHomePageForCountryPage } from '../../CountryPage';
import { SubNationalMetaDataType } from '../../Types';
import { WDLVisualization } from '../../WDLVisualization';
import { SignalsPage } from '../../SignalsPage';

interface Props {
  countryId: string;
  loginState: boolean;
  countryName: string;
}

export function TabSection(props: Props) {
  const { countryId, loginState, countryName } = props;
  const [subNationalDataAvailability, setSubNationalDataAvailability] =
    useState<SubNationalMetaDataType[] | undefined | 'error'>(undefined);
  useEffect(() => {
    queue()
      .defer(json, `${SUBNATIONALMETADATALINK}${countryId}.json`)
      .await((err: any, subNationalMetaData: SubNationalMetaDataType[]) => {
        if (err) setSubNationalDataAvailability('error');
        else setSubNationalDataAvailability(subNationalMetaData);
      });
  }, []);
  return (
    <div>
      {subNationalDataAvailability !== undefined ? (
        subNationalDataAvailability === 'error' ? (
          <Tabs
            defaultActiveKey='dataExplorer'
            className='undp-tabs subhead-tabs'
            items={[
              {
                key: 'dataExplorer',
                label: 'Data Explorer',
                children: (
                  <CountryHomePageForCountryPage
                    countryId={countryId || 'AFG'}
                    loginState={loginState}
                  />
                ),
              },
              {
                key: 'demographicData',
                label: 'Demographic Data 🔒',
                children: (
                  <WDLVisualization
                    loginState={loginState}
                    link={`/countries-and-territories/${countryId || 'AFG'}`}
                    countryCode={countryId || 'AFG'}
                  />
                ),
              },
              {
                key: 'signals',
                label: 'UNDP Signals 🔒',
                children: (
                  <SignalsPage
                    id={countryName}
                    loginState={loginState}
                    link={`/countries-and-territories/${countryId || 'AFG'}`}
                    type='country'
                  />
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
            ]}
          />
        ) : (
          <Tabs
            defaultActiveKey='dataExplorer'
            className='undp-tabs subhead-tabs'
            items={[
              {
                key: 'dataExplorer',
                label: 'Data Explorer',
                children: (
                  <CountryHomePageForCountryPage
                    countryId={countryId || 'AFG'}
                    loginState={loginState}
                  />
                ),
              },
              {
                key: 'demographicData',
                label: 'Demographic Data 🔒',
                children: (
                  <WDLVisualization
                    loginState={loginState}
                    link={`/countries-and-territories/${countryId || 'AFG'}`}
                    countryCode={countryId || 'AFG'}
                  />
                ),
              },
              {
                key: 'subNationalVisualization',
                label: 'Sub National Data',
                children: (
                  <SubNationalVisualization
                    countryId={countryId || 'AFG'}
                    subNationalDataMetaData={subNationalDataAvailability}
                  />
                ),
              },
              {
                key: 'signals',
                label: 'UNDP Signals 🔒',
                children: (
                  <SignalsPage
                    id={countryName}
                    loginState={loginState}
                    link={`/countries-and-territories/${countryId || 'AFG'}`}
                    type='country'
                  />
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
            ]}
          />
        )
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
