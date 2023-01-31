import CountryHomePage from './CountryHomePage';
import HomePage from './HomePage';

interface Props {
  countryId?: string;
  signatureSolution?: string;
  isEmbeded: boolean
}

const App = (props:Props) => {
  const {
    countryId,
    signatureSolution,
    isEmbeded,
  } = props;
  return (
    <div className='undp-container'>
      {
        countryId
          ? <CountryHomePage countryId={countryId} isEmbeded={isEmbeded} />
          : <HomePage countryId={countryId} signatureSolution={signatureSolution} isEmbeded={isEmbeded} />
      }
    </div>
  );
};

export default App;
