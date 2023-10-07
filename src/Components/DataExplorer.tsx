/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import { json } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import { Select } from 'antd';
import sortBy from 'lodash.sortby';
import {
  CountryGroupDataType,
  IndicatorMetaDataType,
  CountryListType,
  CountryTaxonomyDataType,
} from '../Types';

import {
  COUNTRIES_BY_UNDP_REGIONS,
  COUNTRYTAXONOMYLINK,
  DATALINK,
  METADATALINK,
  REGION_ACRONYMS,
} from '../Constants';
import CountryVisualization from './CountryVisualization';
import { RegionVisualization } from '../RegionVisualization';

interface Props {
  signatureSolution?: string;
  topicToFilter?: string;
  region: {
    name: string;
    code: string;
  };
}

function DataExplorer(props: Props) {
  const { signatureSolution, region, topicToFilter } = props;
  const [countryId, setCountryId] = useState(region.code);
  const [loading, setLoading] = useState(true);
  const [finalData, setFinalData] = useState<
    CountryGroupDataType[] | undefined
  >(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryTaxonomy, setCountryTaxonomyList] = useState<
    CountryListType[] | undefined
  >(undefined);
  const [indicatorMetaData, setIndicatorMetaData] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);

  useEffect(() => {
    queue()
      .defer(json, COUNTRYTAXONOMYLINK)
      .defer(json, METADATALINK)
      .await(
        (
          err: any,
          data: CountryTaxonomyDataType[],
          indicatorMetaDataFromFile: IndicatorMetaDataType[],
        ) => {
          if (err) throw err;
          const filteredCountry =
            region.code !== 'WLD'
              ? data.filter(
                  d =>
                    COUNTRIES_BY_UNDP_REGIONS[
                      COUNTRIES_BY_UNDP_REGIONS.findIndex(
                        el => el.region === `UNDP_${region.code}`,
                      )
                    ].Countries.indexOf(d['Alpha-3 code']) !== -1,
                )
              : data;
          const filteredCountryList = sortBy(
            filteredCountry.map(d => ({
              name: d['Country or Area'],
              code: d['Alpha-3 code'],
            })),
            d => d.name,
          );
          filteredCountryList.unshift(region);
          setCountryTaxonomyList(filteredCountryList);
          setIndicatorMetaData(indicatorMetaDataFromFile);
          setRegionList(
            uniqBy(filteredCountry, d => d['Group 2']).map(d => d['Group 2']),
          );
        },
      );
  }, []);

  useEffect(() => {
    if (indicatorMetaData) {
      setFinalData(undefined);
      setLoading(true);
      const folderName =
        countryId === 'WLD'
          ? 'regionData'
          : REGION_ACRONYMS.indexOf(countryId) !== -1
          ? 'regionData'
          : 'countryData';
      const id =
        countryId === 'WLD'
          ? 'WLD'
          : REGION_ACRONYMS.indexOf(countryId) !== -1
          ? `UNDP_${countryId}`
          : countryId;
      json(
        `${DATALINK}/${folderName}/${id}.json`,
        (err: any, data: CountryGroupDataType) => {
          if (err) throw err;
          const queryParams = new URLSearchParams(window.location.search);
          const topic =
            queryParams.get('topic')?.replaceAll('_', "'") || topicToFilter;
          const indicatorsFilteredBySS = signatureSolution
            ? indicatorMetaData.filter(
                d => d.SignatureSolution.indexOf(signatureSolution) !== -1,
              )
            : indicatorMetaData;
          const indicatorsFilteredByTopics = topic
            ? indicatorsFilteredBySS.filter(
                d => d.SSTopics.indexOf(topic) !== -1,
              )
            : indicatorsFilteredBySS;
          const indicatorTypes: IndicatorMetaDataType[] =
            indicatorsFilteredByTopics.map(d => {
              const years: number[][] = [];
              [data].forEach(el => {
                const indYears = el.indicators[
                  el.indicators.findIndex(ind => ind.indicator === d.DataKey)
                ]?.yearlyData.map(year => year.year);
                if (indYears) years.push(indYears);
              });
              return {
                ...d,
                years: sortedUniq(flattenDeep(years)),
              };
            });
          setFinalData([
            {
              ...data,
              indicators: data.indicators.filter(
                el =>
                  indicatorsFilteredByTopics.findIndex(
                    ind => ind.DataKey === el.indicator,
                  ) !== -1,
              ),
            },
          ]);
          setLoading(false);
          setIndicatorsList(indicatorTypes);
        },
      );
    }
  }, [countryId, indicatorMetaData]);
  return (
    <div>
      {countryTaxonomy ? (
        <>
          {topicToFilter ? null : (
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--gray-400)',
                margin: '-2.5rem -1rem 2rem -1rem',
              }}
            >
              <div className='flex-div gap-03 flex-vert-align-center max-width-1980'>
                <h5
                  className='undp-typography margin-bottom-00'
                  style={{ flexShrink: 0 }}
                >
                  Explore all {signatureSolution} Related Data for
                </h5>
                <Select
                  className='undp-select'
                  placeholder='Select A Country'
                  style={{ flexGrow: 0 }}
                  showSearch
                  value={
                    countryTaxonomy[
                      countryTaxonomy.findIndex(el => el.code === countryId)
                    ].name
                  }
                  onChange={d => {
                    setCountryId(
                      countryTaxonomy[
                        countryTaxonomy.findIndex(el => el.name === d)
                      ].code,
                    );
                  }}
                >
                  {countryTaxonomy.map((d, i) => (
                    <Select.Option
                      className='undp-select-option'
                      value={d.name}
                      key={i}
                    >
                      {d.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          )}
          <div className='undp-container max-width-1980'>
            {countryId !== 'WLD' &&
            REGION_ACRONYMS.indexOf(countryId) === -1 ? (
              <div>
                {indicatorsList && finalData && regionList ? (
                  <div>
                    {indicatorsList.length > 0 ? (
                      <CountryVisualization
                        finalData={finalData}
                        indicatorsList={indicatorsList}
                        regionList={regionList}
                        countryList={countryTaxonomy}
                        countryId={countryId}
                        signatureSolution={signatureSolution}
                        loading={loading}
                        idForOverview={
                          topicToFilter || signatureSolution || countryId
                        }
                        defaultViewId={
                          topicToFilter || signatureSolution || countryId
                        }
                      />
                    ) : (
                      <p
                        className='undp-typography bold'
                        style={{
                          textAlign: 'center',
                          backgroundColor: 'var(--gray-200)',
                          border: '1px solid var(--red)',
                          borderRadius: '0.25rem',
                          padding: 'var(--spacing-05)',
                          color: 'var(--dark-red)',
                        }}
                      >
                        No Data available
                      </p>
                    )}
                  </div>
                ) : (
                  <div className='undp-loader-container undp-container'>
                    <div className='undp-loader' />
                  </div>
                )}
              </div>
            ) : (
              <div>
                {finalData ? (
                  <RegionVisualization
                    signatureSolution={signatureSolution}
                    UNDPRegion={countryId}
                    finalData={finalData}
                    idForOverview={signatureSolution || countryId}
                    topic={topicToFilter}
                  />
                ) : (
                  <div className='undp-loader-container undp-container'>
                    <div className='undp-loader' />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}

export default DataExplorer;
