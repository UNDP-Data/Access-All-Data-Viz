/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import { json } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { queue } from 'd3-queue';
import sortBy from 'lodash.sortby';
import { CountryListType, CountryTaxonomyDataType } from '../Types';

import { COUNTRY_TAXONOMY_LINK } from '../Constants';
import { RegionVisualization } from '../RegionVisualization';

interface Props {
  countryCode?: string;
}

function DataExplorer(props: Props) {
  const { countryCode } = props;
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryTaxonomy, setCountryTaxonomy] = useState<
    CountryListType[] | undefined
  >(undefined);
  const [taxonomyData, setTaxonomyData] = useState<
    CountryTaxonomyDataType[] | undefined
  >(undefined);
  useEffect(() => {
    queue()
      .defer(json, COUNTRY_TAXONOMY_LINK)
      .await((err: any, data: CountryTaxonomyDataType[]) => {
        if (err) throw err;
        const filteredCountry = data;
        const filteredCountryList = sortBy(
          filteredCountry.map(d => ({
            name: d['Country or Area'],
            code: d['Alpha-3 code'],
          })),
          d => d.name,
        );
        setCountryTaxonomy(filteredCountryList);
        setRegionList(
          uniqBy(filteredCountry, d => d['Group 2']).map(d => d['Group 2']),
        );
        setTaxonomyData(data);
      });
  }, []);
  return (
    <div>
      {countryTaxonomy && taxonomyData && regionList ? (
        <div
          className='undp-container max-width-1980'
          style={{
            padding: '0 var(--spacing-06)',
          }}
        >
          <RegionVisualization
            regionList={regionList}
            taxonomyData={taxonomyData}
            countryTaxonomy={countryTaxonomy}
            countryCode={countryCode}
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

export default DataExplorer;
