import { createRoot } from 'react-dom/client';
import App from './App';
import { RegionCountryApp, RegionApp, RegionCountriesApp } from './RegionApp';
import reportWebVitals from './reportWebVitals';

const getEl = (embedSelector: string) => {
  if (typeof embedSelector === 'string') {
    const el = document.querySelector(embedSelector);
    if (!el) {
      // eslint-disable-next-line no-console
      console.warn(`No div matching selector "${embedSelector}"`);
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

const getRegion = (embedSelector: string) => {
  const el = document.querySelector(embedSelector);
  if (!el) {
    return undefined;
  }
  const elClass: string[] = el.className.split('~');
  if (elClass[0] === 'region') return elClass[1].replaceAll('+', ' ');
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

const containerEmbed = getEl('[data-bucket-embed]');
if (containerEmbed) {
  const rootEmbed = createRoot(containerEmbed!); // createRoot(container!) if you use TypeScript
  rootEmbed.render(<App
    countryId={getCountry('[data-bucket-embed]')}
    signatureSolution={getSS('[data-bucket-embed]')}
    isSignatureSolutionCountryEmbed={false}
  />);
}

const containerCountryEmbed = getEl('[data-bucket-country-embed]');
if (containerCountryEmbed) {
  const currentURL = window.location;
  const countryCode = currentURL.href.split('?')[0].substr(-1) === '/' ? currentURL.href.split('?')[0].substr(-4).substring(0, 3) : currentURL.href.split('?')[0].substr(-3);
  const rootEmbed = createRoot(containerCountryEmbed!); // createRoot(container!) if you use TypeScript
  rootEmbed.render(<App
    countryId={getCountry('[data-bucket-country-embed]') || countryCode.toUpperCase()}
    signatureSolution={undefined}
    isSignatureSolutionCountryEmbed={false}
  />);
}

const containerRegionEmbed = getEl('[data-bucket-region-embed]');
if (containerRegionEmbed) {
  const rootEmbed = createRoot(containerRegionEmbed!); // createRoot(container!) if you use TypeScript
  rootEmbed.render(<RegionApp
    region={getRegion('[data-bucket-region-embed]')}
  />);
}

const containerRegionCountryEmbed = getEl('[data-bucket-region-country-embed]');
if (containerRegionEmbed) {
  const rootEmbed = createRoot(containerRegionCountryEmbed!); // createRoot(container!) if you use TypeScript
  rootEmbed.render(<RegionCountryApp
    region={getRegion('[data-bucket-region-country-embed]')}
  />);
}

const containerRegionCountriesEmbed = getEl('[data-bucket-region-countries-embed]');
if (containerRegionEmbed) {
  const rootEmbed = createRoot(containerRegionCountriesEmbed!); // createRoot(container!) if you use TypeScript
  rootEmbed.render(<RegionCountriesApp
    region={getRegion('[data-bucket-region-countries-embed]')}
  />);
}

const containerSSCountryEmbed = getEl('[data-bucket-ss-country-embed]');
if (containerSSCountryEmbed) {
  const rootEmbed = createRoot(containerSSCountryEmbed!); // createRoot(container!) if you use TypeScript
  rootEmbed.render(<App
    countryId={undefined}
    signatureSolution={getSS('[data-bucket-ss-country-embed]')}
    isSignatureSolutionCountryEmbed
  />);
}

reportWebVitals();
