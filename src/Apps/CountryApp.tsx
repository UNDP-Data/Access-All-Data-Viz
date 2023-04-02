import CountryHomePage from '../CountryHomePage';

interface CountryProps {
  countryId?: string;
}

export function CountryWithoutSummaryApp(props: CountryProps) {
  const { countryId } = props;
  return (
    <div className='undp-container'>
      <CountryHomePage countryId={countryId} showCountrySummary={false} />
    </div>
  );
}

export function CountryApp(props: CountryProps) {
  const { countryId } = props;
  return (
    <div className='undp-container'>
      <CountryHomePage countryId={countryId} showCountrySummary />
    </div>
  );
}
