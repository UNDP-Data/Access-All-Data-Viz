import CountryHomePage from './CountryHomePage';
import HomePage from './HomePage';

interface Props {
  countryId?: string;
  signatureSolution?: string;
}

const App = (props:Props) => {
  const {
    countryId,
    signatureSolution,
  } = props;
  return (
    <div className='undp-container'>
      {
        countryId
          ? <CountryHomePage countryId={countryId} />
          : <HomePage countryId={countryId} signatureSolution={signatureSolution} />
      }
    </div>
  );
};

export default App;
