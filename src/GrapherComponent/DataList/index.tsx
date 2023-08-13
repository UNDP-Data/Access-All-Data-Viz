import { useContext, useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import {
  CountryGroupDataType,
  CountryListType,
  CtxDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import { ListEl } from './ListEl';
import { MAP_SETTINGS } from '../../Constants';

interface Props {
  indicators: IndicatorMetaDataType[];
  countries: CountryListType[];
}

export function DataList(props: Props) {
  const { indicators, countries } = props;

  const { selectedCountryOrRegion, dataListCountry } = useContext(
    Context,
  ) as CtxDataType;
  const [data, setData] = useState<CountryGroupDataType | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (dataListCountry || selectedCountryOrRegion) {
      const indx = countries.findIndex(d => d.name === dataListCountry);
      const countryCode = indx === -1 ? 'AFG' : countries[indx].code;
      setData(undefined);
      setLoading(true);
      queue()
        .defer(
          json,
          `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/${
            MAP_SETTINGS.findIndex(
              d => d.region === selectedCountryOrRegion,
            ) === -1
              ? 'countryData'
              : 'regionData'
          }/${
            MAP_SETTINGS.findIndex(
              d => d.region === selectedCountryOrRegion,
            ) === -1 || selectedCountryOrRegion === 'WLD'
              ? ''
              : 'UNDP_'
          }${selectedCountryOrRegion || countryCode}.json`,
        )
        .await((err: any, fileData: CountryGroupDataType) => {
          if (err) throw err;
          if (fileData) {
            setData(fileData);
            setLoading(false);
          }
        });
    }
  }, [selectedCountryOrRegion, dataListCountry]);
  return (
    <div className='flex-div' style={{ width: '100%', alignItems: 'center' }}>
      {!loading ? (
        <div style={{ width: '100%' }}>
          {data ? (
            <ListEl data={data} indicators={indicators} />
          ) : (
            <div
              className='undp-typography flex-div bold'
              style={{
                textAlign: 'center',
                padding: '1rem',
                fontSize: '1.5rem',
                backgroundColor: 'var(--white)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'fit-content',
                margin: 'auto',
              }}
            >
              Select a country on the sidebar
            </div>
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
