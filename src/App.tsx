import CountryHomePage from './CountryHomePage';
import SSCountryHomePage from './SSCountryHomePage';
import HomePage from './HomePage';

interface Props {
  countryId?: string;
  signatureSolution?: string;
  isSSSCountryEmbed: boolean;
}

const App = (props:Props) => {
  const {
    countryId,
    signatureSolution,
    isSSSCountryEmbed,
  } = props;
  return (
    <div className='undp-container'>
      {
        isSSSCountryEmbed
          ? <SSCountryHomePage signatureSolution={signatureSolution} />
          : countryId
            ? <CountryHomePage countryId={countryId} />
            : <HomePage signatureSolution={signatureSolution} />
      }
    </div>
  );
};

export default App;
