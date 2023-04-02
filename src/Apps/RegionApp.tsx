import HomePage from '../HomePage';
import RegionHomePage from '../RegionHomePage';
import CountryHomePage from '../SSCountryHomePage';

interface Props {
  region?: string;
}

export function RegionApp(props: Props) {
  const { region } = props;
  return (
    <div className='undp-container'>
      <RegionHomePage region={region} />
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
