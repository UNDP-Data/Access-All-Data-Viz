/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { CountryGroupDataType, IndicatorDataType } from '../../../Types';
import { Graph } from './Graph';
import { generateUniqueRandomPointsArray } from '../../../Utils/RandomPointsGenerator';
import { DATALINK } from '../../../Constants';

interface Props {
  dataId: string;
  isDataPercent: boolean;
  colorKeys: [string, string];
  title?: string;
  footer: string;
  baseYear: number;
  endYear: number;
  isDataAccess: boolean;
  timer?: number;
  scale: number;
}

interface CoordinatesProps {
  x: number;
  y: number;
  distanceFromCenter: number;
}
export function AnimatedClusterPlot(props: Props) {
  const {
    dataId,
    isDataPercent,
    colorKeys,
    title,
    footer,
    baseYear,
    endYear,
    isDataAccess,
    timer,
    scale,
  } = props;
  const [dotsList, setDotsList] = useState<undefined | CoordinatesProps[]>(
    undefined,
  );
  const [headCount, setHeadCount] = useState<undefined | IndicatorDataType>(
    undefined,
  );
  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}/regionData/WLD.json`)
      .await((err: any, data: CountryGroupDataType) => {
        if (err) throw err;
        const dataForIndicator =
          data.indicators[
            data.indicators.findIndex(d => d.indicator === dataId)
          ];
        const populationTotal =
          data.indicators[
            data.indicators.findIndex(d => d.indicator === 'Population, total')
          ];
        const dataHeadCountData = isDataPercent
          ? dataForIndicator.yearlyData
              .filter(d => d.year <= endYear)
              .map(d => ({
                year: d.year,
                value: isDataAccess
                  ? Math.round(
                      populationTotal.yearlyData[
                        populationTotal.yearlyData.findIndex(
                          el => el.year === d.year,
                        )
                      ].value -
                        (d.value *
                          populationTotal.yearlyData[
                            populationTotal.yearlyData.findIndex(
                              el => el.year === d.year,
                            )
                          ].value) /
                          100,
                    )
                  : Math.round(
                      (d.value *
                        populationTotal.yearlyData[
                          populationTotal.yearlyData.findIndex(
                            el => el.year === d.year,
                          )
                        ].value) /
                        100,
                    ),
              }))
          : dataForIndicator.yearlyData.map(d => ({
              year: d.year,
              value: Math.round(d.value),
            }));
        const dots = generateUniqueRandomPointsArray(
          Math.round(
            dataHeadCountData[
              dataHeadCountData.findIndex(d => d.year === baseYear)
            ].value * scale,
          ),
          160,
          5,
        );
        setHeadCount({
          indicator: '',
          yearlyData: dataHeadCountData.filter(d => d.year > baseYear - 1),
        });
        setDotsList(dots);
      });
  }, []);
  return (
    <>
      {title ? <h6 className='undp-typography'>{title}</h6> : null}
      {headCount && dotsList ? (
        <Graph
          dots={dotsList}
          data={headCount}
          colorKeys={colorKeys}
          baseYear={baseYear}
          timer={timer || 250}
          scale={scale}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
      {footer ? (
        <div>
          <p
            className='undp-typography margin-bottom-00 small-font'
            style={{ color: 'var(--gray-600)' }}
          >
            {footer}
          </p>
        </div>
      ) : null}
    </>
  );
}
