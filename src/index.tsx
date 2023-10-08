import ReactDOM from 'react-dom/client';
import { CountryApp } from './Apps/CountryApp';
import { AccessAllDataApp, DataExplorerApp } from './Apps/AccessAllDataApp';
import { RegionApp } from './Apps/RegionApp';
import { SignatureSolutionApp } from './Apps/SignatureSolutionApp';
import reportWebVitals from './reportWebVitals';

const getEl = (embedSelector: string) => {
  if (typeof embedSelector === 'string') {
    const el = document.querySelector(embedSelector);
    if (!el) {
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

const getTopic = (embedSelector: string) => {
  const el = document.querySelector(embedSelector);
  if (!el) {
    return undefined;
  }
  const elClass: string[] = el.className.split('~');
  if (elClass[0] === 'topic') return elClass[1].replaceAll('+', ' ');
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
  rootEmbed.render(<AccessAllDataApp />);
}

/*
! Visualizations on the signature solution pages
*/
const containerSSEmbedMain = getEl('[data-bucket-ss-embed-main]');
if (containerSSEmbedMain) {
  const rootEmbed = ReactDOM.createRoot(containerSSEmbedMain);
  rootEmbed.render(
    <SignatureSolutionApp
      signatureSolution={getSS('[data-bucket-ss-embed-main]')}
    />,
  );
}

/*
! Visualizations on the country pages
*/

const containerCountryEmbed = getEl('[data-bucket-country-embed]');
if (containerCountryEmbed) {
  const currentURL = window.location;
  const countryCode =
    currentURL.href.split('?')[0].split('#')[0].slice(-1) === '/'
      ? currentURL.href.split('?')[0].split('#')[0].slice(-4).substring(0, 3)
      : currentURL.href.split('?')[0].split('#')[0].slice(-3);
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
    <RegionApp region={getRegion('[data-bucket-region-embed-main]')} />,
  );
}

/*
! Visualizations for Topic
*/
const containerTopicMainEmbed = getEl('[data-bucket-embed-topic]');
if (containerTopicMainEmbed) {
  const rootEmbed = ReactDOM.createRoot(containerTopicMainEmbed);
  rootEmbed.render(
    <DataExplorerApp topic={getTopic('[data-bucket-embed-topic]')} />,
  );
}

reportWebVitals();
