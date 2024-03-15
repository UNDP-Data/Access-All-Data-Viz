import { useContext, useEffect, useState } from 'react';
import { json } from 'd3-request';
import { queue } from 'd3-queue';
import {
  CountryGroupDataType,
  CountryListType,
  CountryTaxonomyDataType,
  CtxDataType,
  DisaggregationMetaDataType,
  IndicatorMetaDataType,
  IndicatorSimplifiedDataType,
} from '../Types';
import Context from '../Context/Context';
import { DataExplorerGraphingEl } from './GraphingEl';
import { COUNTRIES_BY_UNDP_REGIONS, DATALINK } from '../Constants';

interface Props {
  indicators: IndicatorMetaDataType[];
  disaggregationMetaData: DisaggregationMetaDataType[];
  regions?: string[];
  countries: CountryListType[];
  UNDPRegion?: string;
  taxonomyData: CountryTaxonomyDataType[];
}

export function GrapherComponent(props: Props) {
  const {
    indicators,
    regions,
    countries,
    UNDPRegion,
    taxonomyData,
    disaggregationMetaData,
  } = props;
  const {
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    colorIndicator,
    disaggregationIndicator,
  } = useContext(Context) as CtxDataType;
  const [data, setData] = useState<CountryGroupDataType[]>(
    taxonomyData.map(d => ({ ...d, indicators: [] })),
  );
  const [regionData, setRegionData] = useState<CountryGroupDataType>({
    'Alpha-3 code': UNDPRegion || 'WLD',
    'Country or Area':
      COUNTRIES_BY_UNDP_REGIONS.findIndex(
        d => d.region === `UNDP_${UNDPRegion}`,
      ) === -1 || !UNDPRegion
        ? 'World'
        : COUNTRIES_BY_UNDP_REGIONS[
            COUNTRIES_BY_UNDP_REGIONS.findIndex(
              d => d.region === `UNDP_${UNDPRegion}`,
            )
          ].name,
    'Group 1': '',
    'Group 2': '',
    LDC: false,
    LLDC: false,
    'Latitude (average)': 0,
    'Longitude (average)': 0,
    SIDS: false,
    'Income group': '',
    indicators: [],
    UNDP_Region: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let q = queue();
    setLoading(true);
    if (
      xAxisIndicator !== undefined &&
      data[0].indicators.findIndex(d => d.indicator === xAxisIndicator) === -1
    ) {
      const indicatorId =
        indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)].id;
      q = q.defer(json, `${DATALINK}/indicatorData/${indicatorId}.json`);
    }
    if (
      yAxisIndicator !== undefined &&
      data[0].indicators.findIndex(d => d.indicator === yAxisIndicator) === -1
    ) {
      const indicatorId =
        indicators[indicators.findIndex(d => d.DataKey === yAxisIndicator)].id;
      q = q.defer(json, `${DATALINK}/indicatorData/${indicatorId}.json`);
    }
    if (
      sizeIndicator !== undefined &&
      data[0].indicators.findIndex(d => d.indicator === sizeIndicator) === -1
    ) {
      const indicatorId =
        indicators[indicators.findIndex(d => d.DataKey === sizeIndicator)].id;
      q = q.defer(json, `${DATALINK}/indicatorData/${indicatorId}.json`);
    }
    if (disaggregationIndicator !== undefined) {
      disaggregationIndicator.DisaggregatedIndicators.forEach(el => {
        if (
          data[0].indicators.findIndex(d => d.indicator === el.DataKey) === -1
        ) {
          q = q.defer(json, `${DATALINK}/indicatorData/${el.id}.json`);
        }
      });
    }
    if (
      colorIndicator !== undefined &&
      colorIndicator !== 'Continents' &&
      colorIndicator !== 'Income Groups' &&
      data[0].indicators.findIndex(d => d.indicator === colorIndicator) === -1
    ) {
      const indicatorId =
        indicators[indicators.findIndex(d => d.DataKey === colorIndicator)].id;
      q = q.defer(json, `${DATALINK}/indicatorData/${indicatorId}.json`);
    }
    q.awaitAll((err, allData: any) => {
      if (err) throw err;
      const dataUpdated: CountryGroupDataType[] = data.map(el => {
        const indicatorsValue = [...el.indicators];
        allData.forEach((all: IndicatorSimplifiedDataType) => {
          const indx = all.countryData.findIndex(
            cData => cData['Alpha-3 code'] === el['Alpha-3 code'],
          );
          if (indx !== -1) {
            indicatorsValue.push({
              indicator: all.indicator,
              yearlyData: all.countryData[indx].data,
            });
          } else {
            indicatorsValue.push({
              indicator: all.indicator,
              yearlyData: [],
            });
          }
        });
        return { ...el, indicators: indicatorsValue };
      });
      const regionalIndicatorsValue = [...regionData.indicators];
      allData.forEach((all: IndicatorSimplifiedDataType) => {
        const regionCode =
          UNDPRegion !== 'WLD' && UNDPRegion ? `UNDP_${UNDPRegion}` : 'WLD';
        const indx = all.countryData.findIndex(
          cData => cData['Alpha-3 code'] === regionCode,
        );
        if (indx !== -1) {
          regionalIndicatorsValue.push({
            indicator: all.indicator,
            yearlyData: all.countryData[indx].data,
          });
        } else {
          regionalIndicatorsValue.push({
            indicator: all.indicator,
            yearlyData: [],
          });
        }
      });
      setData(dataUpdated);
      setRegionData({ ...regionData, indicators: regionalIndicatorsValue });
      setLoading(false);
    });
  }, [
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    colorIndicator,
    disaggregationIndicator,
  ]);
  return (
    <div>
      <DataExplorerGraphingEl
        data={data}
        indicators={indicators}
        disaggregationMetaData={disaggregationMetaData}
        regions={regions}
        countries={countries}
        UNDPRegion={UNDPRegion}
        regionData={regionData}
        loading={loading}
      />
      <p
        className='undp-typography small-font italics'
        style={{ color: 'var(--gray-600)' }}
      >
        Please Note: The aggregation methodology used to compute the aggregate
        values on the DFx can be found{' '}
        <a
          href='https://data.undp.org/sites/g/files/zskgke476/files/2024-02/DFX%20Indicator%20Aggregation%20Methodology.pdf'
          target='_blank'
          rel='noreferrer'
          className='undp-style small-font italics'
          style={{ color: 'var(--gray-600) !important' }}
        >
          here
        </a>
      </p>
    </div>
  );
}
