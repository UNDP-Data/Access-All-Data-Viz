/* eslint-disable jsx-a11y/iframe-has-title */
import { useState } from 'react';
import { Select } from 'antd';
import { MapLayerOptionDataType } from '../../Types';
import { CountryMap } from './CountryMaps';
import { SUB_NATIONAL_DATA_OPTIONS } from '../../SubNationalDataOptions';

interface Props {
  countryId?: string;
}

export function SubNationalVisualization(props: Props) {
  const { countryId } = props;
  const countryFromLink = countryId || 'AFG';
  const subNationalOptions = SUB_NATIONAL_DATA_OPTIONS.filter(
    d => d.countries.indexOf(countryFromLink) !== -1,
  );
  const [selectedMap, setSelectedMap] = useState<MapLayerOptionDataType>({
    mapId: subNationalOptions[0].id,
    regionID: subNationalOptions[0].regionID,
    countryID: subNationalOptions[0].countryID,
    option: subNationalOptions[0].options[0].label,
    pmTiles: subNationalOptions[0].pmTilesSource,
    mapLayerDetails: subNationalOptions[0].options[0],
  });
  return (
    <div>
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
            Explore Sub National Data for
          </h5>
          <Select
            className='undp-select'
            placeholder='Select an indicator'
            style={{ flexGrow: 0 }}
            showSearch
            value={`${selectedMap.mapId}_${selectedMap.option}`}
            onChange={d => {
              const subNationalLayerIndx = subNationalOptions.findIndex(
                el => el.id === d.split('_')[0],
              );
              const subNationalOptionIndx = subNationalOptions[
                subNationalLayerIndx
              ].options.findIndex(el => el.label === d.split('_')[1]);
              setSelectedMap({
                mapId: d.split('_')[0],
                option: d.split('_')[1],
                pmTiles: subNationalOptions[subNationalLayerIndx].pmTilesSource,
                regionID: subNationalOptions[subNationalLayerIndx].regionID,
                countryID: subNationalOptions[subNationalLayerIndx].countryID,
                mapLayerDetails:
                  subNationalOptions[subNationalLayerIndx].options[
                    subNationalOptionIndx
                  ],
              });
            }}
          >
            {subNationalOptions.map((d, i) => (
              <Select.OptGroup key={i} label={d.title}>
                {d.options.map(el => (
                  <Select.Option
                    className='undp-select-option'
                    value={`${d.id}_${el.label}`}
                    key={`${d.id}_${el.label}`}
                  >
                    {el.label}
                  </Select.Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
        </div>
      </div>
      <CountryMap countryId={countryFromLink} mapLayer={selectedMap} />
    </div>
  );
}
