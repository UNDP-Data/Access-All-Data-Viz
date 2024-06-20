import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import DataExplorer from '../Components/DataExplorer';
import { DataSetList } from '../Components/DataSetList';
import { AboutPage } from '../AboutPage';
import { INTRO_TEXT } from '../IntroductionText';
import { PovertyAndInequalityKeyInsights } from '../KeyInsights/PovertyAndInequalityKeyInsights';
import { EnvironmentKeyInsights } from '../KeyInsights/EnvironmentKeyInsights';
import { EnergyKeyInsights } from '../KeyInsights/EnergyKeyInsights';
import { GovernanceKeyInsights } from '../KeyInsights/GovernanceKeyInsights';
import { GenderKeyInsights } from '../KeyInsights/GenderKeyInsights';
import { ResilienceKeyInsights } from '../KeyInsights/ResilienceKeyInsights';
import { CheckIfLoginOrNot } from '../Utils/CheckIfLoginOrNot';
import { LoginBanner } from '../Components/LoginBanner';
import { SignalsPage } from '../SignalsPage';

interface Props {
  signatureSolution?: string;
}

export function SignatureSolutionApp(props: Props) {
  const { signatureSolution } = props;
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
              signatureSolution={signatureSolution || 'Poverty and Inequality'}
              region={{ code: 'WLD', name: 'World' }}
              loginState={d}
            />
          ),
        },
        {
          key: 'datasets',
          label: 'Datasets',
          children: (
            <DataSetList
              signatureSolution={signatureSolution || 'Poverty and Inequality'}
              loginState={d}
            />
          ),
        },
        {
          key: 'signals',
          label: 'UNDP Signals 🔒',
          children: (
            <SignalsPage
              id={signatureSolution || 'Poverty and Inequality'}
              loginState
              link={
                INTRO_TEXT[
                  INTRO_TEXT.findIndex(el => el.id === signatureSolution)
                ].link
              }
              type='signatureSolution'
            />
          ),
        },
        {
          key: 'about',
          label: 'About',
          children: (
            <AboutPage
              id={signatureSolution || 'Poverty and Inequality'}
              region={false}
            />
          ),
        },
      ]);
      setLoginState(d);
    });
  }, []);
  return (
    <div className='undp-container'>
      {tabs && loginState !== undefined ? (
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
                padding:
                  'var(--spacing-09) var(--spacing-06) 0 var(--spacing-06)',
              }}
            >
              <h2 className='undp-typography margin-bottom-03 page-title'>
                {
                  INTRO_TEXT[
                    INTRO_TEXT.findIndex(d => d.id === signatureSolution)
                  ].title
                }
              </h2>
              {
                INTRO_TEXT[
                  INTRO_TEXT.findIndex(d => d.id === signatureSolution)
                ].bodyText
              }
              {loginState ? null : (
                <LoginBanner
                  link={
                    INTRO_TEXT[
                      INTRO_TEXT.findIndex(d => d.id === signatureSolution)
                    ].link
                  }
                />
              )}
            </div>
            <div
              className='padding-top-07 padding-bottom-07'
              style={{
                backgroundColor: 'var(--gray-300)',
              }}
            >
              <div
                className='max-width-1980'
                style={{
                  padding: '0 var(--spacing-06)',
                }}
              >
                {signatureSolution === 'Poverty and Inequality' ? (
                  <PovertyAndInequalityKeyInsights />
                ) : signatureSolution === 'Environment' ? (
                  <EnvironmentKeyInsights />
                ) : signatureSolution === 'Energy' ? (
                  <EnergyKeyInsights />
                ) : signatureSolution === 'Governance' ? (
                  <GovernanceKeyInsights />
                ) : signatureSolution === 'Resilience' ? (
                  <ResilienceKeyInsights />
                ) : signatureSolution === 'Gender' ? (
                  <GenderKeyInsights />
                ) : (
                  <PovertyAndInequalityKeyInsights />
                )}
              </div>
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
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
