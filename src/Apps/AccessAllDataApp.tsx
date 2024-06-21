import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import DataExplorer from '../DataExplorer';
import { DataSetList } from '../DataSetList';
import { AggregatedRegionVisualization } from '../RegionVisualization';
import { CheckIfLoginOrNot } from '../Utils/CheckIfLoginOrNot';
import { LoginBanner } from '../Components/LoginBanner';
import { WDLVisualization } from '../WDLVisualization';

export function AccessAllDataApp() {
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
              region={{ code: 'WLD', name: 'World' }}
              loginState={d}
            />
          ),
        },
        {
          key: 'aggregatedDataExplorer',
          label: 'Aggregated Data Explorer',
          children: (
            <AggregatedRegionVisualization UNDPRegion='WLD' loginState={d} />
          ),
        },
        {
          key: 'demographicData',
          label: 'Demographic Data 🔒',
          children: <WDLVisualization loginState link='/access-all-data' />,
        },
        {
          key: 'datasets',
          label: 'Datasets',
          children: <DataSetList loginState={d} />,
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
                padding: 'var(--spacing-09) var(--spacing-06)',
              }}
            >
              <h2 className='undp-typography margin-bottom-03 page-title'>
                Access All Data
              </h2>
              {loginState ? null : <LoginBanner link='/access-all-data' />}
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

interface TopicProps {
  topic?: string;
}

export function DataExplorerApp(props: TopicProps) {
  const { topic } = props;
  return (
    <div className='undp-container'>
      <DataExplorer
        region={{ code: 'WLD', name: 'World' }}
        topicToFilter={topic}
        loginState={false}
      />
    </div>
  );
}
