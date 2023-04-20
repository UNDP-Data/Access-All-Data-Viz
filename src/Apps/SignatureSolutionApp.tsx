import { Tabs } from 'antd';
import SSCountryHomePage from '../SSCountryHomePage';
import HomePage from '../HomePage';

interface Props {
  signatureSolution?: string;
}

export function SSMainApp(props: Props) {
  const { signatureSolution } = props;
  const mainTabs = [
    {
      key: 'worldData',
      label: 'World Data',
      children: <HomePage signatureSolution={signatureSolution} />,
    },
    {
      key: 'countryProfile',
      label: 'Country Profiles',
      children: <SSCountryHomePage signatureSolution={signatureSolution} />,
    },
  ];
  return (
    <div className='undp-container'>
      <Tabs
        defaultActiveKey='worldData'
        className='undp-tabs'
        items={mainTabs.map(d => ({
          label: d.label,
          key: d.key,
          children: d.children,
        }))}
      />
    </div>
  );
}
export function SSApp(props: Props) {
  const { signatureSolution } = props;
  return (
    <div className='undp-container'>
      <HomePage signatureSolution={signatureSolution} />
    </div>
  );
}

export function SSCountryApp(props: Props) {
  const { signatureSolution } = props;
  return (
    <div className='undp-container'>
      <SSCountryHomePage signatureSolution={signatureSolution} />
    </div>
  );
}
