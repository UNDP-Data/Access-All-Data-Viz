import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
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
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage countryId={countryId} signatureSolution={signatureSolution} />,
      children: [
        {
          path: '/country-profile/:country/',
          element: <CountryHomePage />,
        },
        {
          path: '/signature-solution/:signatureSolution/',
          element: <HomePage />,
        },
      ],
    },
  ]);
  return (
    <div className='undp-container'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
