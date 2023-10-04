/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { DATALINK } from '../../Constants';
import {
  CountryTaxonomyDataType,
  IndicatorSimplifiedDataType,
} from '../../Types';
import { HDIViz } from './HDIViz';

interface CountryProps {
  country: CountryTaxonomyDataType;
}

export function CountryHDIViz(props: CountryProps) {
  const { country } = props;
  const [data, setData] = useState<undefined | IndicatorSimplifiedDataType[]>(
    undefined,
  );
  useEffect(() => {
    queue()
      .defer(
        json,
        `${DATALINK}/indicatorData/humandevelopmentindex_undphdi.json`,
      )
      .defer(
        json,
        `${DATALINK}/indicatorData/life_expectancy_at_birth_years_hdr.json`,
      )
      .defer(
        json,
        `${DATALINK}/indicatorData/mean_years_of_schooling_years_hdr.json`,
      )
      .defer(
        json,
        `${DATALINK}/indicatorData/gross_national_income_per_capita_hdr.json`,
      )
      .await(
        (
          err: any,
          hdiDataFromFile: IndicatorSimplifiedDataType,
          lifeExpectancyDataFromFile: IndicatorSimplifiedDataType,
          meanYearOfSchoolingDataFromFile: IndicatorSimplifiedDataType,
          gniDataFromFile: IndicatorSimplifiedDataType,
        ) => {
          if (err) throw err;
          setData([
            hdiDataFromFile,
            lifeExpectancyDataFromFile,
            meanYearOfSchoolingDataFromFile,
            gniDataFromFile,
          ]);
        },
      );
  }, []);
  return (
    <div className='undp-container'>
      {data ? (
        <>
          {data[0].countryData
            .filter(d => d.data.length > 0)
            .findIndex(el => el['Alpha-3 code'] === country['Alpha-3 code']) !==
          -1 ? (
            <HDIViz
              hdiData={data[0]}
              lifeExpectancyData={data[1]}
              meanYearOfSchoolingData={data[2]}
              gniData={data[3]}
              country={country}
            />
          ) : null}
        </>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
