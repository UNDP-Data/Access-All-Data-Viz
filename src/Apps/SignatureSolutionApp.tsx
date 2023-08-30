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
          width: '100%',
        }}
      >
        <div
          style={{
            padding: 'var(--spacing-07)',
          }}
        >
          <h2 className='undp-typography margin-bottom-00'>
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
