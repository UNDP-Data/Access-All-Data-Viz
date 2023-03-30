/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import { json } from 'd3-request';
import { queue } from 'd3-queue';
import {
  CountryGroupDataType, IndicatorMetaDataType, IndicatorMetaDataWithYear, CountryListType,
} from '../Types';
import { METADATALINK } from '../Constants';
import RegionalHomePageContext from './RegionalHomePage';

interface Props {
  region?: string;
}

const RegionHomePage = (props:Props) => {
  const {
    region,
  } = props;
  const [finalData, setFinalData] = useState<CountryGroupDataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<IndicatorMetaDataWithYear[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(undefined);

  useEffect(() => {
    queue()
      .defer(json, METADATALINK)
      .defer(json, `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/regionData/UNDP_${region}.json`)
      .await((err: any, indicatorMetaDataFromFIle: IndicatorMetaDataType[], data: CountryGroupDataType) => {
        if (err) throw err;
        const indMetaDataFiltered = indicatorMetaDataFromFIle.filter((d) => d.RegionalAggregation);
        const indicatorWithYears: IndicatorMetaDataWithYear[] = indMetaDataFiltered.map((d) => {
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
        setCountryList([data].map((d) => ({ name: d['Country or Area'], code: d['Alpha-3 code'] })));
        setFinalData([{ ...data, indicators: data.indicators.filter((el) => indMetaDataFiltered.findIndex((ind) => ind.DataKey === el.indicator) !== -1) }]);
        setIndicatorsList(indicatorWithYears.filter((d) => d.years.length > 0));
      });
  }, [region]);
  return (
    <>
      {
        indicatorsList && finalData && countryList
          ? (
            <div className='undp-container'>
              <RegionalHomePageContext
                finalData={finalData}
                indicatorsList={indicatorsList}
                countryList={countryList}
                region={`UNDP_${region}`}
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

export default RegionHomePage;
