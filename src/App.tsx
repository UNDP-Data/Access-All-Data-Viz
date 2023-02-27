import CountryHomePage from './CountryHomePage';
import SSCountryHomePage from './SSCountryHomePage';
import HomePage from './HomePage';

interface Props {
  countryId?: string;
  signatureSolution?: string;
  isSignatureSolutionCountryEmbed: boolean;
}

const App = (props:Props) => {
  const {
    countryId,
    signatureSolution,
    isSignatureSolutionCountryEmbed,
  } = props;
  return (
    <div className='undp-container'>
      {
        isSignatureSolutionCountryEmbed
          ? <SSCountryHomePage signatureSolution={signatureSolution} />
          : countryId
            ? <CountryHomePage countryId={countryId} />
            : <HomePage signatureSolution={signatureSolution} />
      }
    </div>
  );
};

export default App;
