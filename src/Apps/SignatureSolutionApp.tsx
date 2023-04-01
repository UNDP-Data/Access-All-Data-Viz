import SSCountryHomePage from '../SSCountryHomePage';
import HomePage from '../HomePage';

interface Props {
  signatureSolution?: string;
}

export const SSApp = (props:Props) => {
  const {
    signatureSolution,
  } = props;
  return (
    <div className='undp-container'>
      <HomePage signatureSolution={signatureSolution} />
    </div>
  );
};

export const SSCountryApp = (props:Props) => {
  const {
    signatureSolution,
  } = props;
  return (
    <div className='undp-container'>
      <SSCountryHomePage signatureSolution={signatureSolution} />
    </div>
  );
};
