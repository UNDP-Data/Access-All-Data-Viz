import { Tabs } from 'antd';
import DataExplorer from '../Components/DataExplorer';
import { DataSetList } from '../Components/DataSetList';
import { AboutPage } from '../AboutPage';

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
          padding: 'var(--spacing-07)',
          width: 'calc(100% - 4rem)',
        }}
      >
        <div>
          <h2
            className='undp-typography margin-bottom-00'
            style={{
              fontFamily: 'SohneBreit,ProximaNova,sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {signatureSolution
              ? signatureSolution === 'Gender'
                ? 'Gender Equality'
                : signatureSolution
              : 'Poverty and Inequality'}
          </h2>
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
