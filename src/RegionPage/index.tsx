/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import { json } from 'd3-request';
import { queue } from 'd3-queue';
import { Tabs } from 'antd';
import {
  CountryGroupDataType,
  IndicatorMetaDataType,
  CountryListType,
  SubRegionsDataType,
} from '../Types';
import { METADATALINK } from '../Constants';
import RegionalHomePageContext from './RegionalHomePage';

interface Props {
  region?: string;
}

function RegionHomePage(props: Props) {
  const { region } = props;
  const [finalData, setFinalData] = useState<
    CountryGroupDataType[] | undefined
  >(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [countryList, setCountryList] = useState<CountryListType[] | undefined>(
    undefined,
  );

  useEffect(() => {
    queue()
      .defer(json, METADATALINK)
      .defer(
        json,
        `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/regionData/UNDP_${region}.json`,
      )
      .await(
        (
          err: any,
          indicatorMetaDataFromFIle: IndicatorMetaDataType[],
          data: CountryGroupDataType,
        ) => {
          if (err) throw err;
          const indMetaDataFiltered = indicatorMetaDataFromFIle.filter(
            d => d.RegionalAggregation,
          );
          setCountryList(
            [data].map(d => ({
              name: d['Country or Area'],
              code: d['Alpha-3 code'],
            })),
          );
          setFinalData([
            {
              ...data,
              indicators: data.indicators.filter(
                el =>
                  indMetaDataFiltered.findIndex(
                    ind => ind.DataKey === el.indicator,
                  ) !== -1,
              ),
            },
          ]);
          setIndicatorsList(
            indMetaDataFiltered.filter(
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
  }, [region]);
  return (
    <div>
      {indicatorsList && finalData && countryList ? (
        <div className='undp-container'>
          <RegionalHomePageContext
            finalData={finalData}
            indicatorsList={indicatorsList}
            countryList={countryList}
            region={`UNDP_${region}`}
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

interface TabsProps {
  subRegions: SubRegionsDataType[];
}

export function RegionHomePageWithTabs(props: TabsProps) {
  const { subRegions } = props;
  return (
    <Tabs
      defaultActiveKey={subRegions[0].key}
      className='undp-tabs'
      items={subRegions.map(d => ({
        label: d.region,
        key: d.key,
        children: <RegionHomePage region={d.key} />,
      }))}
    />
  );
}

export default RegionHomePage;
