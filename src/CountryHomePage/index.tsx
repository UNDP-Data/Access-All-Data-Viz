/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import { json } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import {
  CountryGroupDataType, IndicatorMetaDataType, IndicatorMetaDataWithYear, CountryListType,
} from '../Types';

import {
  METADATALINK,
} from '../Constants';
import CountryHomePageContext from './CountryHomePage';

interface Props {
  countryId?: string;
  signatureSolution?: string;
}

const CountryHomePage = (props:Props) => {
  const {
    countryId,
    signatureSolution,
  } = props;
  const countryFromLink = countryId;
  const [finalData, setFinalData] = useState<CountryGroupDataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<IndicatorMetaDataWithYear[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(undefined);

  useEffect(() => {
    queue()
      .defer(json, `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/countryData/${countryFromLink}.json`)
      .defer(json, METADATALINK)
      .await((err: any, data: CountryGroupDataType, indicatorMetaData: IndicatorMetaDataType[]) => {
        if (err) throw err;
        setFinalData([data]);
        setCountryList([data].map((d) => ({ name: d['Country or Area'], code: d['Alpha-3 code'] })));
        setRegionList(uniqBy([data], (d) => d['Group 2']).map((d) => d['Group 2']));
        const indicatorsFilteredBySS = signatureSolution ? indicatorMetaData.filter((d) => d.SignatureSolution.indexOf(signatureSolution) !== -1) : indicatorMetaData;
        const indicatorWithYears: IndicatorMetaDataWithYear[] = indicatorsFilteredBySS.map((d) => {
          const years: number[][] = [];
          [data].forEach((el) => {
            const indYears = el.indicators[el.indicators.findIndex((ind) => ind.indicator === d.DataKey)]?.yearlyData.map((year) => year.year);
            if (indYears) years.push(indYears);
          });
          return {
            ...d,
            years: sortedUniq(flattenDeep(years)),
          };
        });
        setIndicatorsList(indicatorWithYears.filter((d) => d.years.length > 0));
      });
  }, []);
  return (
    <>
      {
        indicatorsList && finalData && regionList && countryList
          ? (
            <div className='undp-container'>
              <CountryHomePageContext
                finalData={finalData}
                indicatorsList={indicatorsList}
                regionList={regionList}
                countryList={countryList}
                countryId={countryId}
                signatureSolution={signatureSolution}
              />
            </div>
          )
          : (
            <div className='undp-loader-container undp-container'>
              <div className='undp-loader' />
            </div>
          )
      }
    </>
  );
};

export default CountryHomePage;
