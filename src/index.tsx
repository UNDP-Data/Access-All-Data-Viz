import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const getEl = (embedSelector: string) => {
  if (typeof embedSelector === 'string') {
    const el = document.querySelector(embedSelector);
    if (!el) {
      // eslint-disable-next-line no-console
      console.error(`No div matching selector "${embedSelector}"`);
      return null;
    }
    return el;
  }
  return embedSelector;
};

const getCountry = (embedSelector: string) => {
  const el = document.querySelector(embedSelector);
  if (!el) {
    return undefined;
  }
  const elClass: string[] = el.className.split('~');
  if (elClass[0] === 'country') return elClass[1].replaceAll('+', ' ');
  return undefined;
};

const getSS = (embedSelector: string) => {
  const el = document.querySelector(embedSelector);
  if (!el) {
    return undefined;
  }
  const elClass: string[] = el.className.split('~');
  if (elClass[0] === 'signatureSolution') return elClass[1].replaceAll('+', ' ');
  return undefined;
};

const containerEmbeded = getEl('[data-bucket-embed]');
if (containerEmbeded) {
  const rootEmbeded = createRoot(containerEmbeded!); // createRoot(container!) if you use TypeScript
  rootEmbeded.render(<App
    countryId={getCountry('[data-bucket-embed]')}
    signatureSolution={getSS('[data-bucket-embed]')}
  />);
}

const containerCountryEmbeded = getEl('[data-bucket-country-embed]');
if (containerCountryEmbeded) {
  const currentURL = window.location;
  const countryCode = currentURL.href.split('?')[0].substr(-1) === '/' ? currentURL.href.split('?')[0].substr(-4).substring(0, 3) : currentURL.href.split('?')[0].substr(-3);
  const rootEmbeded = createRoot(containerCountryEmbeded!); // createRoot(container!) if you use TypeScript
  rootEmbeded.render(<App
    countryId={countryCode.toUpperCase()}
    signatureSolution={undefined}
  />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
