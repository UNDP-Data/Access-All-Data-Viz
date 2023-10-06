import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { format } from 'd3-format';
import { Graph, ColumnGraph } from './Graph';
import { CountryGroupDataType } from '../../../Types';
import { DATALINK } from '../../../Constants';

interface ColumnProps {
  width: number[];
  backgroundColor: string[];
  scale: number;
  color: string[];
  title: string;
  dataId: string;
  circleRadius: number;
  footer?: string;
  multiplyByPopulation: boolean;
  suffix?: string;
  baseYears: number[];
}

interface RowProps {
  data: number[];
  backgroundColor: string[];
  scale: number;
  color: string[];
  notes: string[];
  sideNotes: string[];
  height: number[];
  title: string;
  circleRadius: number;
}

export function ParticleRowChart(props: RowProps) {
  const {
    data,
    scale,
    backgroundColor,
    color,
    notes,
    height,
    sideNotes,
    title,
    circleRadius,
  } = props;
  return (
    <>
      {title ? <h6 className='undp-typography'>{title}</h6> : null}
      {data ? (
        <Graph
          data={data}
          height={height}
          scale={scale}
          backgroundColor={backgroundColor}
          color={color}
          notes={notes}
          sideNotes={sideNotes}
          overlayText={false}
          circleRadius={circleRadius}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </>
  );
}

export function ParticleColumnChart(props: ColumnProps) {
  const {
    width,
    scale,
    backgroundColor,
    color,
    title,
    dataId,
    circleRadius,
    multiplyByPopulation,
    suffix,
    footer,
    baseYears,
  } = props;
  const [data, setData] = useState<number[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  useEffect(() => {
    queue()
      .defer(json, `${DATALINK}/regionData/WLD.json`)
      .await((err: any, dataFromFile: CountryGroupDataType) => {
        if (err) throw err;
        const dataForIndicator =
          dataFromFile.indicators[
            dataFromFile.indicators.findIndex(d => d.indicator === dataId)
          ];
        const populationTotal =
          dataFromFile.indicators[
            dataFromFile.indicators.findIndex(
              d => d.indicator === 'Population, total',
            )
          ];
        const finalYear =
          dataForIndicator.yearlyData[dataForIndicator.yearlyData.length - 1]
            .year;
        const years = baseYears.map(d => d);
        years.push(finalYear);
        const dataList = years.map(el =>
          multiplyByPopulation
            ? dataForIndicator.yearlyData[
                dataForIndicator.yearlyData.findIndex(d => d.year === el)
              ].value *
              populationTotal.yearlyData[
                populationTotal.yearlyData.findIndex(d => d.year === el)
              ].value
            : dataForIndicator.yearlyData[
                dataForIndicator.yearlyData.findIndex(d => d.year === el)
              ].value,
        );
        const notesList = years.map(
          (el, i) =>
            `${el}: ${format('.2s')(dataList[i]).replace('G', 'B')}${
              suffix || ''
            }`,
        );
        setNotes(notesList);
        setData(dataList);
      });
  }, []);
  return (
    <>
      {title ? <h6 className='undp-typography'>{title}</h6> : null}
      {data.length > 0 && notes.length > 0 ? (
        <div>
          <ColumnGraph
            data={data}
            width={width}
            scale={scale}
            backgroundColor={backgroundColor}
            color={color}
            notes={notes}
            overlayText
            circleRadius={circleRadius}
          />
          {footer ? (
            <div
              className='flex-div gap-03 flex-vert-align-center margin-bottom-00'
              style={{ width: '100%' }}
            >
              <p
                className='undp-typography margin-bottom-00 small-font'
                style={{
                  color: 'var(--gray-600)',
                  marginTop: '-36px',
                }}
              >
                {footer}
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </>
  );
}
