import SSCountryHomePage from '../SSCountryHomePage';
import HomePage from '../HomePage';

interface Props {
  signatureSolution?: string;
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
