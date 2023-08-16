/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import { json } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import { Select } from 'antd';
import {
  CountryGroupDataType,
  IndicatorMetaDataType,
  CountryListType,
  CountryTaxonomyDataType,
} from '../Types';

import {
  COUNTRYTAXONOMYLINK,
  METADATALINK,
  SIGNATURE_SOLUTIONS_LIST,
} from '../Constants';
import CountryVisualization from '../Components/CountryVisualization';

interface PropsWithoutSS {
  countryId?: string;
}

export function CountryHomePageForCountryPage(props: PropsWithoutSS) {
  const { countryId } = props;
  const countryFromLink = countryId || 'AFG';
  const [finalData, setFinalData] = useState<
    CountryGroupDataType[] | undefined
  >(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [countryTaxonomy, setCountryTaxonomy] = useState<
    CountryTaxonomyDataType[] | undefined
  >(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(
    undefined,
  );
  const [signatureSolution, setSignatureSolution] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    queue()
      .defer(
        json,
        `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/countryData/${countryFromLink}.json`,
      )
      .defer(json, METADATALINK)
      .defer(json, COUNTRYTAXONOMYLINK)
      .await(
        (
          err: any,
          data: CountryGroupDataType,
          indicatorMetaData: IndicatorMetaDataType[],
          countryTaxonomyDataFromFile: CountryTaxonomyDataType[],
        ) => {
          if (err) throw err;
          setCountryTaxonomy(countryTaxonomyDataFromFile);
          setFinalData([data]);
          setCountryList(
            [data].map(d => ({
              name: d['Country or Area'],
              code: d['Alpha-3 code'],
            })),
          );
          setRegionList(
            uniqBy([data], d => d['Group 2']).map(d => d['Group 2']),
          );
          setIndicatorsList(
            indicatorMetaData.filter(
              d =>
                data.indicators.findIndex(el => el.indicator === d.DataKey) !==
                  -1 &&
                data.indicators[
                  data.indicators.findIndex(el => el.indicator === d.DataKey)
                ].yearlyData.length > 0,
            ),
          );
        },
      );
  }, []);
  return (
    <div>
      <div
        className='flex-div gap-03 flex-vert-align-center'
        style={{
          padding: '1.5rem',
          backgroundColor: 'var(--gray-400)',
          margin: '-2.5rem -1rem 2rem -1rem',
        }}
      >
        <h5
          className='undp-typography margin-bottom-00'
          style={{ flexShrink: 0 }}
        >
          Explore Data for
        </h5>
        <Select
          className='undp-select'
          placeholder='Select A Country'
          style={{ flexGrow: 0 }}
          showSearch
          value={signatureSolution || 'All'}
          onChange={d => {
            setSignatureSolution(d === 'All' ? undefined : d);
          }}
        >
          {SIGNATURE_SOLUTIONS_LIST.map((d, i) => (
            <Select.Option className='undp-select-option' value={d} key={i}>
              {d === 'All' ? 'All Signature Solutions' : d}
            </Select.Option>
          ))}
        </Select>
      </div>
      {indicatorsList &&
      finalData &&
      regionList &&
      countryList &&
      countryTaxonomy ? (
        <div className='undp-container'>
          <CountryVisualization
            finalData={finalData}
            indicatorsList={indicatorsList}
            regionList={regionList}
            countryList={[
              {
                code: countryFromLink,
                name: countryTaxonomy[
                  countryTaxonomy.findIndex(
                    d => d['Alpha-3 code'] === countryFromLink,
                  )
                ]['Country or Area'],
              },
            ]}
            countryId={countryFromLink}
            signatureSolution={signatureSolution}
            loading={false}
            idForOverview={signatureSolution || countryId || 'Default'}
          />
        </div>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
