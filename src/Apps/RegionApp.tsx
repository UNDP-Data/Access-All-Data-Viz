import { Tabs } from 'antd';
import HomePage from '../HomePage';
import RegionHomePage, { RegionHomePageWithTabs } from '../RegionHomePage';
import CountryHomePage from '../SSCountryHomePage';

interface Props {
  region?: string;
}

export function RegionMainApp(props: Props) {
  const { region } = props;
  const mainTabs =
    region === 'AP'
      ? [
          {
            key: 'regionalOverviewSA',
            label: 'Regional Overview (South Asia)',
            children: <RegionHomePage region='SA' />,
          },
          {
            key: 'regionalOverviewEAP',
            label: 'Regional Overview (East Asia and Pacific)',
            children: <RegionHomePage region='EAP' />,
          },
          {
            key: 'countryProfile',
            label: 'Country Profiles',
            children: <CountryHomePage region={region} />,
          },
          {
            key: 'allCountries',
            label: 'All Countries in the Region',
            children: <HomePage region={region} />,
          },
        ]
      : [
          {
            key: 'regionalOverview',
            label: 'Regional Overview',
            children: <RegionHomePage region={region} />,
          },
          {
            key: 'countryProfile',
            label: 'Country Profiles',
            children: <CountryHomePage region={region} />,
          },
          {
            key: 'allCountries',
            label: 'All Countries in the Region',
            children: <HomePage region={region} />,
          },
        ];
  return (
    <div className='undp-container'>
      <Tabs
        defaultActiveKey={
          region === 'AP' ? 'regionalOverviewSA' : 'regionalOverview'
        }
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
export function RegionApp(props: Props) {
  const { region } = props;
  return (
    <div className='undp-container'>
      {region === 'AP' ? (
        <RegionHomePageWithTabs
          subRegions={[
            {
              key: 'SA',
              region: 'South Asia',
            },
            {
              key: 'EAP',
              region: 'East Asia and Pacific',
            },
          ]}
        />
      ) : (
        <RegionHomePage region={region} />
      )}
    </div>
  );
}

export function RegionCountryApp(props: Props) {
  const { region } = props;
  return (
    <div className='undp-container'>
      <CountryHomePage region={region} />
    </div>
  );
}

export function RegionCountriesApp(props: Props) {
  const { region } = props;
  return (
    <div className='undp-container'>
      <HomePage region={region} />
    </div>
  );
}
