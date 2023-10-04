/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import maxBy from 'lodash.maxby';
import {
  CountryTaxonomyDataType,
  IndicatorSimplifiedDataType,
} from '../../../Types';
import { Graph } from './Graph';
import { COUNTRYTAXONOMYLINK, DATALINK } from '../../../Constants';

interface Props {
  dataId: [string, string];
  title?: string;
  footer?: string;
  maxXValue: number;
  maxYValue: number;
  axisText: [string, string];
  baseYear: number;
  yearIncrement: number;
}

interface DataFormattedProps {
  countryCode: string;
  group1: string;
  yearlyData: {
    year: number;
    xVal: number;
    yVal: number;
  }[];
}

export function ScatterGraph(props: Props) {
  const {
    dataId,
    title,
    footer,
    maxYValue,
    maxXValue,
    axisText,
    baseYear,
    yearIncrement,
  } = props;
  const [data, setData] = useState<undefined | DataFormattedProps[]>(undefined);
  const [finalYear, setFinalYear] = useState<undefined | number>(undefined);
  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}/indicatorData/${dataId[0]}.json`)
      .defer(json, `${DATALINK}/indicatorData/${dataId[1]}.json`)
      .defer(json, COUNTRYTAXONOMYLINK)
      .await(
        (
          err: any,
          dataXAxisFromFile: IndicatorSimplifiedDataType,
          dataYAxisFromFile: IndicatorSimplifiedDataType,
          countryList: CountryTaxonomyDataType[],
        ) => {
          if (err) throw err;
          const countryData: DataFormattedProps[] = countryList.map(d => {
            const xAxisData =
              dataXAxisFromFile.countryData[
                dataXAxisFromFile.countryData.findIndex(
                  el => el['Alpha-3 code'] === d['Alpha-3 code'],
                )
              ].data;
            const yAxisData =
              dataYAxisFromFile.countryData[
                dataYAxisFromFile.countryData.findIndex(
                  el => el['Alpha-3 code'] === d['Alpha-3 code'],
                )
              ].data;
            const yearlyData = xAxisData
              .map(el => {
                const yVal =
                  yAxisData.findIndex(l => l.year === el.year) !== -1
                    ? yAxisData[yAxisData.findIndex(l => l.year === el.year)]
                        .value
                    : -99;
                return {
                  year: el.year,
                  xVal: el.value,
                  yVal,
                };
              })
              .filter(el => el.yVal !== -99);
            return {
              countryCode: d['Alpha-3 code'],
              group1: d['Group 1'],
              yearlyData,
            };
          });
          const maxYearList = countryData
            .map(d => maxBy(d.yearlyData, el => el.year)?.year as number)
            .filter(d => d !== undefined);
          setFinalYear(Math.max(...maxYearList));
          setData(countryData);
        },
      );
  }, []);
  return (
    <>
      {title ? <h5 className='undp-typography'>{title}</h5> : null}
      {data && finalYear ? (
        <Graph
          data={data}
          maxYValue={maxYValue}
          maxXValue={maxXValue}
          axisText={axisText}
          baseYear={baseYear}
          finalYear={finalYear}
          yearIncrement={yearIncrement}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
      {footer ? (
        <div>
          <p
            className='undp-typography margin-bottom-00 italics small-font'
            style={{ color: 'var(--gray-600)' }}
          >
            {footer}
          </p>
        </div>
      ) : null}
    </>
  );
}
