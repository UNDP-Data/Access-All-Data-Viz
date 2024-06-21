/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import { json } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import sortBy from 'lodash.sortby';
import {
  IndicatorMetaDataType,
  CountryListType,
  CountryTaxonomyDataType,
  CountryGroupDataType,
  DisaggregationMetaDataType,
} from '../Types';
import {
  COUNTRIES_BY_UNDP_REGIONS,
  COUNTRYTAXONOMYLINK,
  DATALINK,
  MAP_SETTINGS,
  METADATALINK,
} from '../Constants';
import VisualizationEl from './Visualization';
import AggregatedDataExplorer from '../Components/AggregatedDataExplorer';

interface Props {
  signatureSolution?: string;
  disaggregationMetaData: DisaggregationMetaDataType[];
  indicatorsList: IndicatorMetaDataType[];
  UNDPRegion?: string;
  finalData: CountryGroupDataType[];
  idForOverview: string;
  topic?: string;
}

const getFilteredIndicatorList = (
  indicatorMetaData: IndicatorMetaDataType[],
  signatureSolution?: string,
  topic?: string,
) => {
  const indicatorsFilteredBySS = signatureSolution
    ? sortBy(indicatorMetaData, d => d.IndicatorLabel).filter(
        d => d.SignatureSolution.indexOf(signatureSolution) !== -1,
      )
    : sortBy(indicatorMetaData, d => d.IndicatorLabel);
  const indicatorsFiltered = topic
    ? indicatorsFilteredBySS.filter(d => d.SSTopics.indexOf(topic) !== -1)
    : indicatorsFilteredBySS;
  return indicatorsFiltered;
};

export function RegionVisualization(props: Props) {
  const {
    signatureSolution,
    UNDPRegion,
    finalData,
    idForOverview,
    topic,
    indicatorsList,
    disaggregationMetaData,
  } = props;
  const [taxonomyData, setTaxonomyData] = useState<
    CountryTaxonomyDataType[] | undefined
  >(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(
    undefined,
  );

  useEffect(() => {
    queue()
      .defer(json, COUNTRYTAXONOMYLINK)
      .await((err: any, countryTaxonomy: CountryTaxonomyDataType[]) => {
        if (err) throw err;
        setTaxonomyData(countryTaxonomy);
        const countriesFiltered =
          UNDPRegion !== 'WLD' && UNDPRegion
            ? countryTaxonomy.filter(
                d =>
                  COUNTRIES_BY_UNDP_REGIONS[
                    COUNTRIES_BY_UNDP_REGIONS.findIndex(
                      el => el.region === `UNDP_${UNDPRegion}`,
                    )
                  ].Countries.indexOf(d['Alpha-3 code']) !== -1,
              )
            : countryTaxonomy;

        setCountryList(
          countriesFiltered.map(d => ({
            name: d['Country or Area'],
            code: d['Alpha-3 code'],
          })),
        );
        setRegionList(
          uniqBy(countriesFiltered, d => d['Group 2']).map(d => d['Group 2']),
        );
      });
  }, []);
  return (
    <div>
      {taxonomyData && regionList && countryList ? (
        <div>
          {indicatorsList.length > 0 ? (
            <VisualizationEl
              UNDPRegion={UNDPRegion}
              taxonomyData={taxonomyData}
              indicatorsList={getFilteredIndicatorList(
                indicatorsList,
                signatureSolution,
                topic,
              )}
              disaggregationMetaData={disaggregationMetaData}
              regionList={regionList}
              countryList={countryList}
              signatureSolution={signatureSolution}
              regionData={finalData}
              idForOverview={idForOverview}
              defaultViewId={topic || UNDPRegion || 'Default'}
              topic={topic}
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
  );
}

interface AggregatedVisualizationProps {
  UNDPRegion: string;
  loginState: boolean;
}

export function AggregatedRegionVisualization(
  props: AggregatedVisualizationProps,
) {
  const { UNDPRegion, loginState } = props;
  const [finalData, setFinalData] = useState<
    CountryGroupDataType[] | undefined
  >(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  useEffect(() => {
    const q = queue();
    MAP_SETTINGS.forEach(d => {
      q.defer(
        json,
        `${DATALINK}/regionData/${
          d.region === 'WLD' ? 'WLD' : `UNDP_${d.region}`
        }.json`,
      );
    });
    queue()
      .defer(json, METADATALINK)
      .await((err: any, indicatorMetaData: IndicatorMetaDataType[]) => {
        if (err) throw err;
        const queryParams = new URLSearchParams(window.location.search);
        const topic = queryParams.get('topic')?.replaceAll('_', "'");
        const indicatorsFiltered = sortBy(
          indicatorMetaData,
          d => d.IndicatorLabel,
        ).filter(d => d.RegionalAggregation);
        const indicatorFilteredByAccess = loginState
          ? indicatorsFiltered
          : indicatorsFiltered.filter(d => d.Access !== 'undp');
        const indicatorsFilteredByTopic = topic
          ? indicatorFilteredByAccess.filter(
              d => d.SSTopics.indexOf(topic) !== -1,
            )
          : indicatorFilteredByAccess;
        setIndicatorsList(indicatorsFilteredByTopic);
        q.awaitAll((error: any, allData: any) => {
          if (error) throw error;
          const dataFormatted: CountryGroupDataType[] = allData.map(
            (el: CountryGroupDataType) => ({
              ...el,
              indicators: el.indicators.filter(
                indicator =>
                  indicatorsFiltered.findIndex(
                    ind => ind.DataKey === indicator.indicator,
                  ) !== -1,
              ),
            }),
          );
          setFinalData(dataFormatted);
        });
      });
  }, []);
  return (
    <div>
      {indicatorsList && finalData ? (
        <div className='undp-container'>
          {indicatorsList.length > 0 ? (
            <AggregatedDataExplorer
              finalData={finalData}
              indicatorsList={indicatorsList}
              regionId={UNDPRegion}
              defaultViewId={UNDPRegion}
            />
          ) : (
            <p
              className='undp-typography bold max-width-1980'
              style={{
                textAlign: 'center',
                backgroundColor: 'var(--gray-200)',
                border: '1px solid var(--red)',
                borderRadius: '0.25rem',
                padding: 'var(--spacing-06)',
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
  );
}
