import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Slider } from 'antd';
import intersection from 'lodash.intersection';
import {
  CountryGroupDataType, CountryListType, CtxDataType, IndicatorMetaDataWithYear,
} from '../Types';
import Context from '../Context/Context';
import { HorizontalBarChart } from './HorizontalBarChart';
import { ScatterPlot } from './ScatterPlot';
import { BiVariateMap } from './BiVariateMap';
import { UnivariateMap } from './UnivariateMap';
import { MultiLineChart } from './MultiLineChart';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PauseIcon, PlayIcon } from '../Icons';
import { DataList } from './DataList';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
  countries: CountryListType[];
}

const getMarks = (arr: number[]) => {
  const marksTemp: any = {};
  arr.forEach((d) => {
    marksTemp[`${d}`] = d;
  });
  return marksTemp;
};

export const Graph = (props: Props) => {
  const {
    data,
    indicators,
    countries,
  } = props;
  const {
    year,
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    showMostRecentData,
    updateYear,
    verticalBarLayout,
  } = useContext(Context) as CtxDataType;
  const [commonYears, setCommonYears] = useState<number[]>([]);
  const [marks, setMarks] = useState<any>(undefined);
  const [play, setPlay] = useState(false);
  const [yearForPlay, setYearForPlay] = useState<undefined | number>(undefined);
  // eslint-disable-next-line no-undef
  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    setPlay(false);
    if (graphType !== 'barGraph') {
      if (yAxisIndicator) {
        if (!sizeIndicator) {
          const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years, indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)].years);
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
          setYearForPlay(intersectedYears.length === 0 ? undefined : intersectedYears[intersectedYears.length - 1]);
        } else {
          const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years,
            indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)].years,
            indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)].years);
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
          setYearForPlay(intersectedYears.length === 0 ? undefined : intersectedYears[intersectedYears.length - 1]);
        }
      } else if (!sizeIndicator) {
        setCommonYears(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years);
        setMarks(getMarks(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years));
        updateYear(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
        setYearForPlay(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
      } else {
        const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years, indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)].years);
        setCommonYears(intersectedYears);
        setMarks(getMarks(intersectedYears));
        updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
        setYearForPlay(intersectedYears.length === 0 ? undefined : intersectedYears[intersectedYears.length - 1]);
      }
    } else {
      setCommonYears(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years);
      setMarks(getMarks(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years));
      updateYear(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
      setYearForPlay(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
    }
  }, [xAxisIndicator, yAxisIndicator, sizeIndicator, graphType]);
  useEffect(() => {
    if (play && yearForPlay) {
      timer.current = setInterval(() => {
        setYearForPlay((prevCounter) => (prevCounter ? commonYears.indexOf(prevCounter) === commonYears.length - 1 ? commonYears[0] : commonYears[commonYears.indexOf(prevCounter) + 1] : commonYears[0]));
      }, 1000);
    }
    if (!play && timer.current) clearInterval(timer.current);
  }, [play, commonYears]);
  useEffect(() => {
    if (yearForPlay !== undefined) { updateYear(yearForPlay as number); }
  }, [yearForPlay]);
  return (
    <div
      id='graph-node'
      className={`undp-scrollbar graph-el${graphType !== 'barGraph' && graphType !== 'dataList' ? ' no-overflow' : ''}`}
    >
      {
        graphType === 'trendLine' || graphType === 'multiCountryTrendLine' || graphType === 'dataList' ? null
          : commonYears.length > 1 && !showMostRecentData ? (
            <div className='slider-background'>
              <button className='undp-button button-no-background' type='button' aria-label='Click to play or stop time animation' onClick={() => { setPlay(!play); }}>
                {
                  play
                    ? <PauseIcon size={24} fill='#D12800' />
                    : <PlayIcon size={24} fill='#D12800' />
                }
              </button>
              <Slider
                min={marks[Object.keys(marks)[0]]}
                max={marks[Object.keys(marks)[Object.keys(marks).length - 1]]}
                marks={marks}
                step={null}
                value={year}
                style={{ width: '97%', margin: '0 auto' }}
                onChange={(d) => { updateYear(d); setYearForPlay(d); }}
                className='undp-slider'
                tooltip={{
                  open: true, placement: 'top', prefixCls: 'undp-slider-tooltip', getPopupContainer: (triggerNode) => triggerNode.parentNode as HTMLElement,
                }}
              />
            </div>
          ) : commonYears.length === 0 || showMostRecentData ? (
            <div className='error-el'>
              {
                commonYears.length === 0
                  ? 'The data selected are not available for the same years therefore showing the last available data for all the countries.'
                  : 'Showing the last available data for all the countries.'
              }
            </div>
          ) : (
            <div className='info-el'>
              The common year for the data selected is
              {' '}
              {commonYears[0]}
            </div>
          )
      }
      <>
        {
          graphType === 'scatterPlot'
            ? yAxisIndicator
              ? (
                <ScatterPlot
                  data={data}
                  indicators={indicators}
                />
              ) : null
            : graphType === 'map'
              ? yAxisIndicator
                ? (
                  <BiVariateMap
                    data={data}
                    indicators={indicators}
                  />
                )
                : (
                  <UnivariateMap
                    data={data}
                    indicators={indicators}
                  />
                )
              : graphType === 'barGraph'
                ? verticalBarLayout ? (
                  <HorizontalBarChart
                    data={data}
                    indicators={indicators}
                  />
                )
                  : (
                    <BarChart
                      data={data}
                      indicators={indicators}
                    />
                  )
                : graphType === 'trendLine'
                  ? (
                    <LineChart
                      data={data}
                      indicators={indicators}
                      countries={countries}
                    />
                  )
                  : graphType === 'dataList'
                    ? (
                      <DataList
                        data={data}
                        indicators={indicators}
                        countries={countries}
                      />
                    )
                    : (
                      <MultiLineChart
                        data={data}
                        indicators={indicators}
                        countries={countries}
                      />
                    )

        }
      </>
    </div>
  );
};
