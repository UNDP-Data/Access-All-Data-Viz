// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
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
    // eslint-disable-next-line no-console
    console.error(`No div matching selector "${embedSelector}"`);
    return undefined;
  }
  const elClass: string[] = el.className.split('~');
  if (elClass[0] === 'country') return elClass[1].replaceAll('+', ' ');
  return undefined;
};

const getSS = (embedSelector: string) => {
  const el = document.querySelector(embedSelector);
  if (!el) {
    // eslint-disable-next-line no-console
    console.error(`No div matching selector "${embedSelector}"`);
    return undefined;
  }
  const elClass: string[] = el.className.split('~');
  if (elClass[0] === 'signatureSolution') return elClass[1].replaceAll('+', ' ');
  return undefined;
};

ReactDOM.render(
  <React.StrictMode>
    <App
      countryId={getCountry('[data-bucket-embed]')}
      signatureSolution={getSS('[data-bucket-embed]')}
    />
  </React.StrictMode>,
  getEl('[data-bucket-embed]'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
