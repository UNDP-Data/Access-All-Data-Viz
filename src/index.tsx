import ReactDOM from 'react-dom/client';
import { CountryApp, CountryWithoutSummaryApp } from './Apps/CountryApp';
import { App } from './Apps/MainApp';
import {
  RegionCountryApp,
  RegionApp,
  RegionCountriesApp,
  RegionMainApp,
} from './Apps/RegionApp';
import { SSApp, SSCountryApp, SSMainApp } from './Apps/SignatureSolutionApp';
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
  if (elClass[0] === 'signatureSolution')
    return elClass[1].replaceAll('+', ' ');
  return undefined;
};

/*
! Main visualization renderer
*/
const containerEmbed = getEl('[data-bucket-embed]');
if (containerEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerEmbed);
  rootEmbed.render(<App />);
}

/*
! Visualizations on the signature solution pages
*/
const containerSSEmbedMain = getEl('[data-bucket-ss-embed-main]');
if (containerSSEmbedMain) {
  const rootEmbed = ReactDOM.createRoot(containerSSEmbedMain);
  rootEmbed.render(
    <SSMainApp signatureSolution={getSS('[data-bucket-ss-embed-main]')} />,
  );
}

const containerSSEmbed = getEl('[data-bucket-ss-embed]');
if (containerSSEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerSSEmbed);
  rootEmbed.render(
    <SSApp signatureSolution={getSS('[data-bucket-ss-embed]')} />,
  );
}

const containerSSCountryEmbed = getEl('[data-bucket-ss-country-embed]');
if (containerSSCountryEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerSSCountryEmbed);
  rootEmbed.render(
    <SSCountryApp
      signatureSolution={getSS('[data-bucket-ss-country-embed]')}
    />,
  );
}

/*
! Visualizations on the country pages
*/
const containerCountryWithoutSummaryEmbed = getEl(
  '[data-bucket-country-without-summary-embed]',
);
if (containerCountryWithoutSummaryEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerCountryWithoutSummaryEmbed);
  rootEmbed.render(
    <CountryWithoutSummaryApp
      countryId={getCountry('[data-bucket-country-without-summary-embed]')}
    />,
  );
}

const containerCountryEmbed = getEl('[data-bucket-country-embed]');
if (containerCountryEmbed) {
  const currentURL = window.location;
  const countryCode =
    currentURL.href.split('?')[0].substr(-1) === '/'
      ? currentURL.href.split('?')[0].substr(-4).substring(0, 3)
      : currentURL.href.split('?')[0].substr(-3);
  const rootEmbed = ReactDOM.createRoot(containerCountryEmbed);
  rootEmbed.render(
    <CountryApp
      countryId={
        getCountry('[data-bucket-country-embed]') || countryCode.toUpperCase()
      }
    />,
  );
}

/*
! Visualizations on the regional pages
*/
const containerRegionMainEmbed = getEl('[data-bucket-region-embed-main]');
if (containerRegionMainEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerRegionMainEmbed);
  rootEmbed.render(
    <RegionMainApp region={getRegion('[data-bucket-region-embed-main]')} />,
  );
}

const containerRegionEmbed = getEl('[data-bucket-region-embed]');
if (containerRegionEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerRegionEmbed);
  rootEmbed.render(
    <RegionApp region={getRegion('[data-bucket-region-embed]')} />,
  );
}

const containerRegionCountryEmbed = getEl('[data-bucket-region-country-embed]');
if (containerRegionCountryEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerRegionCountryEmbed);
  rootEmbed.render(
    <RegionCountryApp
      region={getRegion('[data-bucket-region-country-embed]')}
    />,
  );
}

const containerRegionCountriesEmbed = getEl(
  '[data-bucket-region-countries-embed]',
);
if (containerRegionCountriesEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerRegionCountriesEmbed);
  rootEmbed.render(
    <RegionCountriesApp
      region={getRegion('[data-bucket-region-countries-embed]')}
    />,
  );
}

reportWebVitals();
