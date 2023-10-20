/* eslint-disable jsx-a11y/iframe-has-title */
import { useState } from 'react';
import { Select } from 'antd';
import sortBy from 'lodash.sortby';
import groupBy from 'lodash.groupby';
import { MapLayerOptionDataType, SubNationalMetaDataType } from '../../Types';
import { CountryMap } from './CountryMaps';
import { SUB_NATIONAL_DATA_OPTIONS } from '../../SubNationalDataOptions';

interface Props {
  countryId?: string;
  subNationalDataMetaData: SubNationalMetaDataType[];
}

export function SubNationalVisualization(props: Props) {
  const { countryId, subNationalDataMetaData } = props;
  const countryFromLink = countryId || 'AFG';
  const subNationalDataMetaDataSorted = sortBy(subNationalDataMetaData, [
    'group',
    'indicator_name',
  ]);
  const subNationalDataMetaDataGrouped = groupBy(
    subNationalDataMetaDataSorted,
    d => d.group,
  );
  const [selectedMap, setSelectedMap] = useState<MapLayerOptionDataType>(
    SUB_NATIONAL_DATA_OPTIONS[
      SUB_NATIONAL_DATA_OPTIONS.findIndex(
        el => el.id === subNationalDataMetaDataSorted[0].indicator_id,
      )
    ],
  );
  return (
    <div>
      <div
        className='margin-bottom-07'
        style={{
          backgroundColor: 'var(--gray-400)',
        }}
      >
        <div
          className='flex-div gap-03 flex-vert-align-center max-width-1980'
          style={{
            padding: 'var(--spacing-06)',
          }}
        >
          <h5
            className='undp-typography margin-bottom-00'
            style={{ flexShrink: 0 }}
          >
            Explore Sub National Data for
          </h5>
          <Select
            className='undp-select'
            placeholder='Select an indicator'
            style={{ flexGrow: 0 }}
            showSearch
            value={selectedMap.id}
            onChange={d => {
              const subNationalLayerIndx = SUB_NATIONAL_DATA_OPTIONS.findIndex(
                el => el.id === d,
              );
              setSelectedMap(SUB_NATIONAL_DATA_OPTIONS[subNationalLayerIndx]);
            }}
          >
            {Object.keys(subNationalDataMetaDataGrouped).map((d, i) => (
              <Select.OptGroup key={i} label={d}>
                {subNationalDataMetaDataGrouped[d].map(el => (
                  <Select.Option
                    className='undp-select-option'
                    value={el.indicator_id}
                    key={el.indicator_id}
                  >
                    {el.indicator_name}
                  </Select.Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
        </div>
      </div>
      <CountryMap
        countryId={countryFromLink}
        mapLayer={selectedMap}
        subNationalDataMetaData={subNationalDataMetaData}
      />
    </div>
  );
}
