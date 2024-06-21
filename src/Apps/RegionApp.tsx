import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import { DataSetList } from '../DataSetList';
import DataExplorer from '../DataExplorer';
import { COUNTRIES_BY_UNDP_REGIONS } from '../Constants';
import { AboutPage } from '../AboutPage';
import { AggregatedRegionVisualization } from '../RegionVisualization';
import { INTRO_TEXT } from '../IntroductionText';
import { CheckIfLoginOrNot } from '../Utils/CheckIfLoginOrNot';
import { LoginBanner } from '../Components/LoginBanner';
import { SignalsPage } from '../SignalsPage';

interface Props {
  region?: string;
}

export function RegionApp(props: Props) {
  const { region } = props;
  const [tabs, setTabs] = useState<any>(undefined);
  const [loginState, setLoginState] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    CheckIfLoginOrNot().then(d => {
      setTabs([
        {
          key: 'dataExplorer',
          label: 'Data Explorer',
          children: (
            <DataExplorer
              region={{
                code: region || 'WLD',
                name:
                  COUNTRIES_BY_UNDP_REGIONS[
                    COUNTRIES_BY_UNDP_REGIONS.findIndex(
                      el => el.region === `UNDP_${region}`,
                    )
                  ].name || 'World',
              }}
              loginState={d}
            />
          ),
        },
        {
          key: 'aggregatedDataExplorer',
          label: 'Aggregated Data Explorer',
          children: (
            <AggregatedRegionVisualization
              UNDPRegion={region || 'WLD'}
              loginState={d}
            />
          ),
        },
        {
          key: 'signals',
          label: 'UNDP Signals 🔒',
          children: (
            <SignalsPage
              id={
                COUNTRIES_BY_UNDP_REGIONS[
                  COUNTRIES_BY_UNDP_REGIONS.findIndex(
                    el => el.region === `UNDP_${region}`,
                  )
                ].bureauName
              }
              loginState={d}
              link={
                COUNTRIES_BY_UNDP_REGIONS[
                  COUNTRIES_BY_UNDP_REGIONS.findIndex(
                    el => el.region === `UNDP_${region}`,
                  )
                ].link
              }
              type='region'
            />
          ),
        },
        {
          key: 'datasets',
          label: 'Datasets',
          children: <DataSetList loginState={d} />,
        },
        {
          key: 'about',
          label: 'About',
          children: <AboutPage id={region || 'AS'} region />,
        },
      ]);
      setLoginState(d);
    });
  }, []);
  return (
    <div className='undp-container'>
      {tabs && loginState !== undefined ? (
        COUNTRIES_BY_UNDP_REGIONS.findIndex(
          d => d.region === `UNDP_${region}`,
        ) === -1 ? (
          <div
            className='undp-container'
            style={{
              backgroundColor: 'var(--gray-300)',
              padding: 'var(--spacing-06)',
              width: 'calc(100% - 3rem)',
            }}
          >
            <div className='max-width-1980'>
              <h4
                className='undp-typography margin-bottom-03'
                style={{
                  fontFamily: 'SohneBreit,ProximaNova,sans-serif',
                  width: 'calc(100% - 3rem)',
                }}
              >
                We regret to inform you that the region you are inquiring about
                cannot be ascertained within our current digital framework. Our
                team is actively engaged in addressing this matter.
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
                <h2 className='undp-typography margin-bottom-03 page-title'>
                  {INTRO_TEXT[INTRO_TEXT.findIndex(d => d.id === region)].title}
                </h2>
                {
                  INTRO_TEXT[INTRO_TEXT.findIndex(d => d.id === region)]
                    .bodyText
                }
                {loginState ? null : (
                  <LoginBanner
                    link={
                      INTRO_TEXT[INTRO_TEXT.findIndex(d => d.id === region)]
                        .link
                    }
                  />
                )}
              </div>
            </div>
            <Tabs
              defaultActiveKey='dataExplorer'
              className='undp-tabs subhead-tabs'
              items={tabs.map((d: any) => ({
                label: d.label,
                key: d.key,
                children: d.children,
              }))}
            />
          </>
        )
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
