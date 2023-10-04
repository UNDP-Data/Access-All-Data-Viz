import { Tabs } from 'antd';
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

interface Props {
  signatureSolution?: string;
}

export function SignatureSolutionApp(props: Props) {
  const { signatureSolution } = props;
  const mainTabs = [
    {
      key: 'dataExplorer',
      label: 'Data Explorer',
      children: (
        <DataExplorer
          signatureSolution={signatureSolution || 'Poverty and Inequality'}
          region={{ code: 'WLD', name: 'World' }}
        />
      ),
    },
    {
      key: 'datasets',
      label: 'Datasets',
      children: (
        <DataSetList
          signatureSolution={signatureSolution || 'Poverty and Inequality'}
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
  ];
  return (
    <div className='undp-container'>
      <div
        style={{
          backgroundColor: 'var(--gray-300)',
          width: '100%',
        }}
      >
        <div
          style={{
            padding: 'var(--spacing-09) var(--spacing-07) 0 var(--spacing-07)',
          }}
        >
          <h2 className='undp-typography margin-bottom-03 page-title'>
            {
              INTRO_TEXT[INTRO_TEXT.findIndex(d => d.id === signatureSolution)]
                .title
            }
          </h2>
          {
            INTRO_TEXT[INTRO_TEXT.findIndex(d => d.id === signatureSolution)]
              .bodyText
          }
        </div>
        <div
          className='padding-top-07 padding-bottom-07'
          style={{
            backgroundColor: 'var(--gray-300)',
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
      <Tabs
        defaultActiveKey='dataExplorer'
        className='undp-tabs subhead-tabs'
        items={mainTabs.map(d => ({
          label: d.label,
          key: d.key,
          children: d.children,
        }))}
      />
    </div>
  );
}
