/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import styled from 'styled-components';
import { json } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import {
  CountryGroupDataType, IndicatorMetaDataType, IndicatorMetaDataWithYear, CountryListType,
} from '../Types';
import {
  DATALINK, METADATALINK,
} from '../Constants';
import HomePageContext from './HomePage';

const VizAreaEl = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 10rem;
`;

interface Props {
  countryId?: string;
  signatureSolution?: string;
  isEmbeded: boolean;
}

const HomePage = (props:Props) => {
  const {
    countryId,
    signatureSolution,
    isEmbeded,
  } = props;
  const queryParams = new URLSearchParams(window.location.search);
  const [finalData, setFinalData] = useState<CountryGroupDataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<IndicatorMetaDataWithYear[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(undefined);

  useEffect(() => {
    queue()
      .defer(json, DATALINK)
      .defer(json, METADATALINK)
      .await((err: any, data: CountryGroupDataType[], indicatorMetaData: IndicatorMetaDataType[]) => {
        if (err) throw err;
        const topic = queryParams.get('topic');
        setFinalData(data);
        setCountryList(data.map((d) => ({ name: d['Country or Area'], code: d['Alpha-3 code'] })));
        setRegionList(uniqBy(data, (d) => d['Group 2']).map((d) => d['Group 2']));
        const indicatorsFilteredBySS = signatureSolution ? indicatorMetaData.filter((d) => d.SignatureSolution.indexOf(signatureSolution) !== -1) : indicatorMetaData;
        const indicatorsFiltered = topic ? indicatorsFilteredBySS.filter((d) => d.SSTopics.indexOf(topic) !== -1) : indicatorsFilteredBySS;
        const indicatorWithYears: IndicatorMetaDataWithYear[] = indicatorsFiltered.map((d) => {
          const years: number[][] = [];
          data.forEach((el) => {
            const indYears = el.indicators[el.indicators.findIndex((ind) => ind.indicator === d.DataKey)]?.yearlyData.map((year) => year.year);
            if (indYears) years.push(indYears);
          });
          return {
            ...d,
            years: sortedUniq(flattenDeep(years).sort()),
          };
        });
        setIndicatorsList(indicatorWithYears);
      });
  }, []);
  return (
    <>
      {
        indicatorsList && finalData && regionList && countryList
          ? (
            <div className='undp-container'>
              <HomePageContext
                finalData={finalData}
                indicatorsList={indicatorsList}
                regionList={regionList}
                countryList={countryList}
                isEmbeded={isEmbeded}
                countryId={countryId}
                signatureSolution={signatureSolution}
              />
            </div>
          )
          : (
            <VizAreaEl className='undp-container'>
              <div className='undp-loader' />
            </VizAreaEl>
          )
      }
    </>
  );
};

export default HomePage;
