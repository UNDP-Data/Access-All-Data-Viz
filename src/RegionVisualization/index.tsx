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
} from '../Types';
import {
  COUNTRIES_BY_UNDP_REGIONS,
  COUNTRYTAXONOMYLINK,
  METADATALINK,
} from '../Constants';
import VisualizationEl from './Visualization';
import AggregatedDataExplorer from '../Components/AggregatedDataExplorer';

interface Props {
  signatureSolution?: string;
  UNDPRegion?: string;
  finalData: CountryGroupDataType[];
  idForOverview: string;
  topic?: string;
}

export function RegionVisualization(props: Props) {
  const { signatureSolution, UNDPRegion, finalData, idForOverview, topic } =
    props;
  const [taxonomyData, setTaxonomyData] = useState<
    CountryTaxonomyDataType[] | undefined
  >(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(
    undefined,
  );

  useEffect(() => {
    queue()
      .defer(json, METADATALINK)
      .defer(json, COUNTRYTAXONOMYLINK)
      .await(
        (
          err: any,
          indicatorMetaData: IndicatorMetaDataType[],
          countryTaxonomy: CountryTaxonomyDataType[],
        ) => {
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
          const indicatorsFilteredBySS = signatureSolution
            ? sortBy(indicatorMetaData, d => d.IndicatorLabelTable).filter(
                d => d.SignatureSolution.indexOf(signatureSolution) !== -1,
              )
            : sortBy(indicatorMetaData, d => d.IndicatorLabelTable);
          const indicatorsFiltered = topic
            ? indicatorsFilteredBySS.filter(
                d => d.SSTopics.indexOf(topic) !== -1,
              )
            : indicatorsFilteredBySS;
          setIndicatorsList(indicatorsFiltered);
        },
      );
  }, []);
  return (
    <div>
      {indicatorsList && taxonomyData && regionList && countryList ? (
        <div>
          {indicatorsList.length > 0 ? (
            <VisualizationEl
              UNDPRegion={UNDPRegion}
              taxonomyData={taxonomyData}
              indicatorsList={indicatorsList}
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
}

export function AggregatedRegionVisualization(
  props: AggregatedVisualizationProps,
) {
  const { UNDPRegion } = props;
  const [finalData, setFinalData] = useState<
    CountryGroupDataType[] | undefined
  >(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  useEffect(() => {
    queue()
      .defer(json, METADATALINK)
      .defer(
        json,
        `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/regionData/${
          UNDPRegion === 'WLD' ? 'WLD' : `UNDP_${UNDPRegion}`
        }.json`,
      )
      .await(
        (
          err: any,
          indicatorMetaData: IndicatorMetaDataType[],
          data: CountryGroupDataType,
        ) => {
          if (err) throw err;
          const queryParams = new URLSearchParams(window.location.search);
          const topic = queryParams.get('topic')?.replaceAll('_', "'");
          const indicatorsFiltered = sortBy(
            indicatorMetaData,
            d => d.IndicatorLabelTable,
          ).filter(d => d.RegionalAggregation);
          const indicatorsFilteredByTopic = topic
            ? indicatorsFiltered.filter(d => d.SSTopics.indexOf(topic) !== -1)
            : indicatorsFiltered;
          setIndicatorsList(indicatorsFilteredByTopic);
          setFinalData([
            {
              ...data,
              indicators: data.indicators.filter(
                el =>
                  indicatorsFiltered.findIndex(
                    ind => ind.DataKey === el.indicator,
                  ) !== -1,
              ),
            },
          ]);
        },
      );
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
